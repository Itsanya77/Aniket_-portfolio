import os
from flask import Flask
from flask_cors import CORS
from backend.config import Config
from backend.models import db, Project, Skill, Experience, Education, Certification, Achievement, Service, Feedback
from backend.routes.api import api_bp
from datetime import datetime

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS scoped to allowed frontend origins
    allowed_origins = os.environ.get('ALLOWED_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000').split(',')
    CORS(app, resources={r"/api/*": {"origins": [o.strip() for o in allowed_origins if o.strip()]}})

    # Initialize SQLAlchemy database
    db.init_app(app)

    # Register API blueprint
    app.register_blueprint(api_bp)

    # Initialize database tables and seed sample data if empty
    with app.app_context():
        db.create_all()
        seed_initial_data()

    return app

def seed_initial_data():
    if Project.query.first() is None:
        sample_proj = Project(
            id='proj-01',
            title='Customer Segmentation & RFM Analytics Pipeline',
            category='Data Science',
            description='Automated customer behavioral clustering pipeline processing e-commerce transaction streams.',
            problem_statement='E-commerce retailers struggle with generic customer outreach leading to high churn.',
            image_url='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            github_url='https://github.com/aniketbadhe/rfm-segmentation',
            status='Live',
            featured=True
        )
        sample_proj.tags = ['Python', 'Pandas', 'Scikit-Learn', 'K-Means', 'Flask']
        db.session.add(sample_proj)

    if Skill.query.first() is None:
        sample_skills = [
            Skill(id='sk-1', name='Python', category='Programming', level='Expert', percentage=95, icon_name='code-2', description='Data processing, object-oriented design, async scripting'),
            Skill(id='sk-2', name='Pandas & NumPy', category='Data Science', level='Expert', percentage=92, icon_name='bar-chart-3', description='DataFrame manipulation, matrix operations, statistical computations'),
            Skill(id='sk-3', name='SQL & SQLite', category='Database', level='Advanced', percentage=88, icon_name='database', description='Relational schema design, complex JOIN queries, query optimization')
        ]
        db.session.add_all(sample_skills)

    if Feedback.query.first() is None:
        sample_fb = Feedback(
            id='msg-01',
            sender='Priya Sharma',
            email='priya.sharma@techinnovations.in',
            subject='Project Collaboration Inquiry',
            body='Hello Aniket, I reviewed your Python Data Science portfolio and would love to connect regarding a Data Analyst opportunity.',
            read=False,
            created_at=datetime.utcnow()
        )
        db.session.add(sample_fb)

    db.session.commit()

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
