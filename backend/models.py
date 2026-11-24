from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.String(50), primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(50), nullable=False, default='Python')
    description = db.Column(db.Text, nullable=False)
    problem_statement = db.Column(db.Text, nullable=True)
    tags_json = db.Column(db.Text, nullable=False, default='[]')
    image_url = db.Column(db.String(300), nullable=True)
    github_url = db.Column(db.String(300), nullable=True)
    live_url = db.Column(db.String(300), nullable=True)
    status = db.Column(db.String(30), nullable=False, default='Live')
    featured = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    @property
    def tags(self):
        try:
            return json.loads(self.tags_json)
        except Exception:
            return []

    @tags.setter
    def tags(self, value):
        if isinstance(value, list):
            self.tags_json = json.dumps(value)
        else:
            self.tags_json = json.dumps([])

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'description': self.description,
            'problemStatement': self.problem_statement,
            'tags': self.tags,
            'image': self.image_url,
            'githubUrl': self.github_url,
            'liveUrl': self.live_url,
            'status': self.status,
            'featured': self.featured,
            'createdAt': self.created_at.strftime('%Y-%m-%d') if self.created_at else None
        }


class Skill(db.Model):
    __tablename__ = 'skills'

    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False, default='Programming')
    level = db.Column(db.String(30), nullable=False, default='Expert')
    percentage = db.Column(db.Integer, nullable=False, default=90)
    icon_name = db.Column(db.String(50), nullable=True, default='code-2')
    description = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'level': self.level,
            'percentage': self.percentage,
            'iconName': self.icon_name,
            'description': self.description
        }


class Experience(db.Model):
    __tablename__ = 'experiences'

    id = db.Column(db.String(50), primary_key=True)
    company = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(150), nullable=False)
    period = db.Column(db.String(100), nullable=False)
    points_json = db.Column(db.Text, nullable=False, default='[]')
    tags_json = db.Column(db.Text, nullable=False, default='[]')

    @property
    def points(self):
        try:
            return json.loads(self.points_json)
        except Exception:
            return []

    @points.setter
    def points(self, value):
        self.points_json = json.dumps(value if isinstance(value, list) else [])

    @property
    def tags(self):
        try:
            return json.loads(self.tags_json)
        except Exception:
            return []

    @tags.setter
    def tags(self, value):
        self.tags_json = json.dumps(value if isinstance(value, list) else [])

    def to_dict(self):
        return {
            'id': self.id,
            'company': self.company,
            'role': self.role,
            'period': self.period,
            'points': self.points,
            'tags': self.tags
        }


class Education(db.Model):
    __tablename__ = 'education'

    id = db.Column(db.String(50), primary_key=True)
    degree = db.Column(db.String(150), nullable=False)
    institution = db.Column(db.String(150), nullable=False)
    period = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False, default='Pune, India')
    details = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'degree': self.degree,
            'institution': self.institution,
            'period': self.period,
            'location': self.location,
            'details': self.details
        }


class Certification(db.Model):
    __tablename__ = 'certifications'

    id = db.Column(db.String(50), primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    issuer = db.Column(db.String(150), nullable=False)
    issue_date = db.Column(db.String(50), nullable=False)
    credential_id = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(30), nullable=False, default='Verified')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'issuer': self.issuer,
            'issueDate': self.issue_date,
            'credentialId': self.credential_id,
            'status': self.status
        }


class Achievement(db.Model):
    __tablename__ = 'achievements'

    id = db.Column(db.String(50), primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    issuer = db.Column(db.String(150), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False, default='Hackathon')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'issuer': self.issuer,
            'date': self.date,
            'description': self.description,
            'category': self.category
        }


class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.String(50), primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    icon_name = db.Column(db.String(50), nullable=True, default='code')
    tags_json = db.Column(db.Text, nullable=False, default='[]')

    @property
    def tags(self):
        try:
            return json.loads(self.tags_json)
        except Exception:
            return []

    @tags.setter
    def tags(self, value):
        self.tags_json = json.dumps(value if isinstance(value, list) else [])

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'iconName': self.icon_name,
            'tags': self.tags
        }


class Feedback(db.Model):
    __tablename__ = 'feedback'

    id = db.Column(db.String(50), primary_key=True)
    sender = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    subject = db.Column(db.String(200), nullable=True)
    body = db.Column(db.Text, nullable=False)
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'sender': self.sender,
            'email': self.email,
            'subject': self.subject,
            'body': self.body,
            'read': self.read,
            'timestamp': self.created_at.strftime('%Y-%m-%d %H:%M') if self.created_at else None
        }
