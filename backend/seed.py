import sys
import os
from datetime import datetime

# Add root project path to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app import create_app
from backend.models import (
    db, Project, Skill, Experience, Education,
    Certification, Achievement, Service, Feedback
)

def run_seed():
    app = create_app()
    with app.app_context():
        print("Re-creating all database tables...")
        db.drop_all()
        db.create_all()

        print("Seeding Projects...")
        p1 = Project(
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
        p1.tags = ['Python', 'Pandas', 'Scikit-Learn', 'K-Means', 'Flask']

        p2 = Project(
            id='proj-02',
            title='Real-Time Sales Forecasting Engine',
            category='Machine Learning',
            description='Time-series prediction engine utilizing ARIMA and Prophet models to forecast monthly revenue.',
            problem_statement='Supply chain bottlenecks caused by poor seasonal inventory forecasting.',
            image_url='https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            github_url='https://github.com/aniketbadhe/sales-forecasting',
            status='Live',
            featured=True
        )
        p2.tags = ['Python', 'Statsmodels', 'Prophet', 'Matplotlib', 'SQLAlchemy']

        db.session.add_all([p1, p2])

        print("Seeding Skills...")
        skills = [
            Skill(id='sk-1', name='Python', category='Programming', level='Expert', percentage=95, icon_name='code-2', description='Data processing, object-oriented design, async scripting'),
            Skill(id='sk-2', name='Pandas & NumPy', category='Data Science', level='Expert', percentage=92, icon_name='bar-chart-3', description='DataFrame manipulation, matrix operations, statistical computations'),
            Skill(id='sk-3', name='SQL & SQLite', category='Database', level='Advanced', percentage=88, icon_name='database', description='Relational schema design, complex JOIN queries, query optimization'),
            Skill(id='sk-4', name='Scikit-Learn', category='Machine Learning', level='Advanced', percentage=85, icon_name='cpu', description='Supervised/unsupervised algorithms, cross-validation, feature scaling'),
            Skill(id='sk-5', name='Flask & REST APIs', category='Web Development', level='Advanced', percentage=90, icon_name='layers', description='Backend RESTful services, SQLAlchemy ORM, blueprint routes')
        ]
        db.session.add_all(skills)

        print("Seeding Services...")
        services = [
            Service(id='srv-1', title='Python Backend Development', description='Scalable REST APIs and microservices built with Flask and FastAPI.', icon_name='code', tags_json='["Flask", "FastAPI", "SQLAlchemy", "REST"]'),
            Service(id='srv-2', title='Exploratory Data Analysis (EDA)', description='Turning raw operational datasets into actionable insights with visualization.', icon_name='bar-chart-3', tags_json='["Pandas", "Matplotlib", "Seaborn", "Tableau"]')
        ]
        db.session.add_all(services)

        print("Seeding Feedback Messages...")
        f1 = Feedback(
            id='msg-01',
            sender='Priya Sharma',
            email='priya.sharma@techinnovations.in',
            subject='Project Collaboration Inquiry',
            body='Hello Aniket, I reviewed your Python Data Science portfolio and would love to connect regarding a Data Analyst opportunity.',
            read=False,
            created_at=datetime.utcnow()
        )
        db.session.add(f1)

        db.session.commit()
        print("Database seeded successfully with initial SQLite portfolio records!")

if __name__ == '__main__':
    run_seed()
