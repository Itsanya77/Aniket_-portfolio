from flask import Blueprint, request, jsonify, current_app
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models import (
    db, Project, Skill, Experience, Education, 
    Certification, Achievement, Service, Feedback
)
import time
import hmac
import hashlib
import base64
import json
import secrets

api_bp = Blueprint('api', __name__, url_prefix='/api')

TOKEN_TTL_SECONDS = 2 * 60 * 60
_claimed_admin_hash = None
_revoked_jtis = {}


def _get_env_admin_password():
    return (current_app.config.get('ADMIN_PASSWORD') or '').strip()


def _issue_token():
    now = int(time.time())
    exp = now + TOKEN_TTL_SECONDS
    payload = {
        'sub': 'admin',
        'jti': secrets.token_hex(16),
        'iat': now,
        'exp': exp
    }
    encoded = base64.urlsafe_b64encode(json.dumps(payload).encode('utf-8')).decode('utf-8').rstrip('=')
    secret = current_app.config['SECRET_KEY'].encode('utf-8')
    sig = base64.urlsafe_b64encode(
        hmac.new(secret, encoded.encode('utf-8'), hashlib.sha256).digest()
    ).decode('utf-8').rstrip('=')
    return f"{encoded}.{sig}", exp * 1000


def _verify_token(token):
    try:
        encoded, provided_sig = token.split('.', 1)
    except ValueError:
        return None
    secret = current_app.config['SECRET_KEY'].encode('utf-8')
    expected_sig = base64.urlsafe_b64encode(
        hmac.new(secret, encoded.encode('utf-8'), hashlib.sha256).digest()
    ).decode('utf-8').rstrip('=')
    if not hmac.compare_digest(provided_sig, expected_sig):
        return None
    try:
        padded = encoded + '=' * (-len(encoded) % 4)
        payload = json.loads(base64.urlsafe_b64decode(padded).decode('utf-8'))
        if payload.get('sub') != 'admin' or int(time.time()) > int(payload.get('exp', 0)):
            return None
        if payload.get('jti') in _revoked_jtis:
            return None
        return payload
    except Exception:
        return None


def require_admin(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Authentication required'}), 401
        token = auth_header[7:].strip()
        payload = _verify_token(token)
        if not payload:
            return jsonify({'error': 'Invalid or expired admin session'}), 401
        return fn(*args, **kwargs)
    return wrapper


# --- HEALTH CHECK ---
@api_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'backend': 'Flask + SQLAlchemy (SQLite)',
        'timestamp': time.time()
    })


# --- ADMIN AUTH ---
@api_bp.route('/admin/status', methods=['GET'])
def admin_status():
    configured = bool(_get_env_admin_password() or _claimed_admin_hash)
    return jsonify({'configured': configured})


@api_bp.route('/admin/setup', methods=['POST'])
def admin_setup():
    global _claimed_admin_hash
    if _get_env_admin_password() or _claimed_admin_hash:
        return jsonify({'error': 'Admin password is already configured'}), 409
    data = request.get_json() or {}
    password = data.get('password', '')
    if not isinstance(password, str) or len(password) < 8 or len(password) > 128:
        return jsonify({'error': 'Password must be between 8 and 128 characters'}), 400
    _claimed_admin_hash = generate_password_hash(password)
    token, expires_at = _issue_token()
    return jsonify({'token': token, 'expiresAt': expires_at}), 201


@api_bp.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json() or {}
    password = data.get('password', '')
    if not isinstance(password, str) or not password:
        return jsonify({'error': 'Password is required'}), 400
    env_pw = _get_env_admin_password()
    is_valid = False
    if env_pw:
        is_valid = hmac.compare_digest(
            hashlib.sha256(password.encode('utf-8')).digest(),
            hashlib.sha256(env_pw.encode('utf-8')).digest()
        )
    elif _claimed_admin_hash:
        is_valid = check_password_hash(_claimed_admin_hash, password)
    else:
        return jsonify({'error': 'Admin password has not been configured yet'}), 409

    if not is_valid:
        return jsonify({'error': 'Invalid admin password'}), 401
    token, expires_at = _issue_token()
    return jsonify({'token': token, 'expiresAt': expires_at})


@api_bp.route('/admin/verify', methods=['GET'])
@require_admin
def admin_verify():
    return jsonify({'authenticated': True})


@api_bp.route('/admin/logout', methods=['POST'])
@require_admin
def admin_logout():
    token = request.headers.get('Authorization', '')[7:].strip()
    payload = _verify_token(token)
    if payload:
        _revoked_jtis[payload['jti']] = payload['exp']
    return jsonify({'success': True})

# --- PROJECTS CRUD ---
@api_bp.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return jsonify([p.to_dict() for p in projects])

@api_bp.route('/projects', methods=['POST'])
@require_admin
def create_project():
    data = request.get_json() or {}
    proj_id = data.get('id') or f"proj-{int(time.time() * 1000)}"
    
    project = Project(
        id=proj_id,
        title=data.get('title', 'Untitled Project'),
        category=data.get('category', 'Python'),
        description=data.get('description', ''),
        problem_statement=data.get('problemStatement', ''),
        image_url=data.get('image', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'),
        github_url=data.get('githubUrl'),
        live_url=data.get('liveUrl'),
        status=data.get('status', 'Live'),
        featured=data.get('featured', True)
    )
    project.tags = data.get('tags', [])

    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict()), 201

@api_bp.route('/projects/<string:proj_id>', methods=['DELETE'])
@require_admin
def delete_project(proj_id):
    project = Project.query.get(proj_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    db.session.delete(project)
    db.session.commit()
    return jsonify({'message': f'Project {proj_id} deleted successfully'})

# --- SKILLS CRUD ---
@api_bp.route('/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.all()
    return jsonify([s.to_dict() for s in skills])

@api_bp.route('/skills', methods=['POST'])
@require_admin
def create_skill():
    data = request.get_json() or {}
    skill_id = data.get('id') or f"sk-{int(time.time() * 1000)}"
    
    skill = Skill(
        id=skill_id,
        name=data.get('name', 'New Skill'),
        category=data.get('category', 'Programming'),
        level=data.get('level', 'Expert'),
        percentage=int(data.get('percentage', 90)),
        icon_name=data.get('iconName', 'code-2'),
        description=data.get('description', '')
    )
    db.session.add(skill)
    db.session.commit()
    return jsonify(skill.to_dict()), 201

@api_bp.route('/skills/<string:skill_id>', methods=['DELETE'])
@require_admin
def delete_skill(skill_id):
    skill = Skill.query.get(skill_id)
    if not skill:
        return jsonify({'error': 'Skill not found'}), 404
    db.session.delete(skill)
    db.session.commit()
    return jsonify({'message': f'Skill {skill_id} deleted successfully'})

# --- EXPERIENCE CRUD ---
@api_bp.route('/experiences', methods=['GET'])
def get_experiences():
    experiences = Experience.query.all()
    return jsonify([e.to_dict() for e in experiences])

@api_bp.route('/experiences', methods=['POST'])
@require_admin
def create_experience():
    data = request.get_json() or {}
    exp_id = data.get('id') or f"exp-{int(time.time() * 1000)}"
    
    exp = Experience(
        id=exp_id,
        company=data.get('company', ''),
        role=data.get('role', ''),
        period=data.get('period', '2025 - Present')
    )
    exp.points = data.get('points', [])
    exp.tags = data.get('tags', [])

    db.session.add(exp)
    db.session.commit()
    return jsonify(exp.to_dict()), 201

@api_bp.route('/experiences/<string:exp_id>', methods=['DELETE'])
@require_admin
def delete_experience(exp_id):
    exp = Experience.query.get(exp_id)
    if not exp:
        return jsonify({'error': 'Experience not found'}), 404
    db.session.delete(exp)
    db.session.commit()
    return jsonify({'message': f'Experience {exp_id} deleted successfully'})

# --- EDUCATION CRUD ---
@api_bp.route('/education', methods=['GET'])
def get_education():
    education = Education.query.all()
    return jsonify([e.to_dict() for e in education])

@api_bp.route('/education', methods=['POST'])
@require_admin
def create_education():
    data = request.get_json() or {}
    edu_id = data.get('id') or f"edu-{int(time.time() * 1000)}"
    
    edu = Education(
        id=edu_id,
        degree=data.get('degree', ''),
        institution=data.get('institution', ''),
        period=data.get('period', ''),
        location=data.get('location', 'Pune, India'),
        details=data.get('details', '')
    )
    db.session.add(edu)
    db.session.commit()
    return jsonify(edu.to_dict()), 201

@api_bp.route('/education/<string:edu_id>', methods=['DELETE'])
@require_admin
def delete_education(edu_id):
    edu = Education.query.get(edu_id)
    if not edu:
        return jsonify({'error': 'Education entry not found'}), 404
    db.session.delete(edu)
    db.session.commit()
    return jsonify({'message': f'Education {edu_id} deleted successfully'})

# --- CERTIFICATIONS CRUD ---
@api_bp.route('/certifications', methods=['GET'])
def get_certifications():
    certs = Certification.query.all()
    return jsonify([c.to_dict() for c in certs])

@api_bp.route('/certifications', methods=['POST'])
@require_admin
def create_certification():
    data = request.get_json() or {}
    cert_id = data.get('id') or f"cert-{int(time.time() * 1000)}"
    
    cert = Certification(
        id=cert_id,
        title=data.get('title', ''),
        issuer=data.get('issuer', ''),
        issue_date=data.get('issueDate', '2025'),
        credential_id=data.get('credentialId', ''),
        status=data.get('status', 'Verified')
    )
    db.session.add(cert)
    db.session.commit()
    return jsonify(cert.to_dict()), 201

@api_bp.route('/certifications/<string:cert_id>', methods=['DELETE'])
@require_admin
def delete_certification(cert_id):
    cert = Certification.query.get(cert_id)
    if not cert:
        return jsonify({'error': 'Certification not found'}), 404
    db.session.delete(cert)
    db.session.commit()
    return jsonify({'message': f'Certification {cert_id} deleted successfully'})

# --- ACHIEVEMENTS CRUD ---
@api_bp.route('/achievements', methods=['GET'])
def get_achievements():
    achievements = Achievement.query.all()
    return jsonify([a.to_dict() for a in achievements])

@api_bp.route('/achievements', methods=['POST'])
@require_admin
def create_achievement():
    data = request.get_json() or {}
    ach_id = data.get('id') or f"ach-{int(time.time() * 1000)}"
    
    ach = Achievement(
        id=ach_id,
        title=data.get('title', ''),
        issuer=data.get('issuer', ''),
        date=data.get('date', '2025'),
        description=data.get('description', ''),
        category=data.get('category', 'Hackathon')
    )
    db.session.add(ach)
    db.session.commit()
    return jsonify(ach.to_dict()), 201

@api_bp.route('/achievements/<string:ach_id>', methods=['DELETE'])
@require_admin
def delete_achievement(ach_id):
    ach = Achievement.query.get(ach_id)
    if not ach:
        return jsonify({'error': 'Achievement not found'}), 404
    db.session.delete(ach)
    db.session.commit()
    return jsonify({'message': f'Achievement {ach_id} deleted successfully'})

# --- SERVICES CRUD ---
@api_bp.route('/services', methods=['GET'])
def get_services():
    services = Service.query.all()
    return jsonify([s.to_dict() for s in services])

@api_bp.route('/services', methods=['POST'])
@require_admin
def create_service():
    data = request.get_json() or {}
    srv_id = data.get('id') or f"srv-{int(time.time() * 1000)}"
    
    srv = Service(
        id=srv_id,
        title=data.get('title', ''),
        description=data.get('description', ''),
        icon_name=data.get('iconName', 'code')
    )
    srv.tags = data.get('tags', [])

    db.session.add(srv)
    db.session.commit()
    return jsonify(srv.to_dict()), 201

@api_bp.route('/services/<string:srv_id>', methods=['DELETE'])
@require_admin
def delete_service(srv_id):
    srv = Service.query.get(srv_id)
    if not srv:
        return jsonify({'error': 'Service not found'}), 404
    db.session.delete(srv)
    db.session.commit()
    return jsonify({'message': f'Service {srv_id} deleted successfully'})

# --- FEEDBACK / MESSAGES CRUD ---
@api_bp.route('/feedback', methods=['GET'])
@require_admin
def get_feedback():
    feedback = Feedback.query.order_by(Feedback.created_at.desc()).all()
    return jsonify([f.to_dict() for f in feedback])

@api_bp.route('/feedback', methods=['POST'])
def create_feedback():
    data = request.get_json() or {}
    if not data.get('sender') or not data.get('email') or not data.get('body'):
        return jsonify({'error': 'Sender name, email, and message body are required'}), 400

    fb_id = data.get('id') or f"msg-{int(time.time() * 1000)}"
    fb = Feedback(
        id=fb_id,
        sender=data.get('sender'),
        email=data.get('email'),
        subject=data.get('subject', 'Portfolio Feedback'),
        body=data.get('body')
    )

    db.session.add(fb)
    db.session.commit()
    return jsonify(fb.to_dict()), 201

@api_bp.route('/feedback/<string:fb_id>/read', methods=['PATCH'])
@require_admin
def mark_feedback_read(fb_id):
    fb = Feedback.query.get(fb_id)
    if not fb:
        return jsonify({'error': 'Feedback message not found'}), 404
    fb.read = True
    db.session.commit()
    return jsonify(fb.to_dict())

@api_bp.route('/feedback/<string:fb_id>', methods=['DELETE'])
@require_admin
def delete_feedback(fb_id):
    fb = Feedback.query.get(fb_id)
    if not fb:
        return jsonify({'error': 'Feedback message not found'}), 404
    db.session.delete(fb)
    db.session.commit()
    return jsonify({'message': f'Feedback {fb_id} deleted successfully'})
