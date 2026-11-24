# Flask Backend with SQLAlchemy & SQLite

This directory contains the complete Python Flask backend implementation for Aniket Badhe's Portfolio and Admin Panel. It uses SQLAlchemy ORM with an SQLite database to store and manage projects, skills, career experiences, education, certifications, achievements, services, and user feedback messages.

---

## Architecture Overview

```
backend/
├── app.py              # Flask Application Factory & Server Entry Point
├── config.py           # Configuration (SQLite DB path, Secret keys, CORS)
├── models.py           # SQLAlchemy Database Models
├── seed.py             # CLI Database Seeding Script
├── requirements.txt    # Python Dependencies
├── portfolio.db        # SQLite Database (generated on app start)
└── routes/
    └── api.py          # Flask Blueprints for RESTful CRUD Endpoints
```

---

## Database Models (SQLAlchemy)

The SQLite database schema includes the following ORM models:

1. **`Project`**: Portfolio projects (Title, Category, Problem Statement, Description, Tags JSON, Live/GitHub URLs, Image, Status, Featured flag).
2. **`Skill`**: Technical skill node (Name, Category, Level, Percentage %, Icon Name, Description).
3. **`Experience`**: Career positions (Company, Role, Period, Points JSON, Tags JSON).
4. **`Education`**: Academic qualifications (Degree, Institution, Period, Location, Details).
5. **`Certification`**: Industry credentials (Title, Issuer, Issue Date, Credential ID, Verification Status).
6. **`Achievement`**: Honors & Hackathons (Title, Issuer, Date, Description, Category).
7. **`Service`**: Technical offerings (Title, Description, Icon Name, Tags JSON).
8. **`Feedback`**: Inbox messages from contact form (Sender, Email, Subject, Body, Read flag, Timestamp).

---

## API Endpoints (Flask Blueprint `/api`)

### 1. Health Check
- `GET /api/health` -> Check Flask server status.

### 2. Projects API
- `GET /api/projects` -> List all projects.
- `POST /api/projects` -> Create a new project record.
- `DELETE /api/projects/<proj_id>` -> Delete a project by ID.

### 3. Skills API
- `GET /api/skills` -> List all skill nodes.
- `POST /api/skills` -> Create a new skill node.
- `DELETE /api/skills/<skill_id>` -> Delete a skill node.

### 4. Experience API
- `GET /api/experiences` -> List career positions.
- `POST /api/experiences` -> Create an experience record.
- `DELETE /api/experiences/<exp_id>` -> Delete an experience record.

### 5. Education API
- `GET /api/education` -> List academic degrees.
- `POST /api/education` -> Create an education entry.
- `DELETE /api/education/<edu_id>` -> Delete an education entry.

### 6. Certifications API
- `GET /api/certifications` -> List verified certifications.
- `POST /api/certifications` -> Add a new certification.
- `DELETE /api/certifications/<cert_id>` -> Delete a certification.

### 7. Achievements API
- `GET /api/achievements` -> List honors and hackathon awards.
- `POST /api/achievements` -> Add an achievement entry.
- `DELETE /api/achievements/<ach_id>` -> Delete an achievement.

### 8. Services API
- `GET /api/services` -> List technical services.
- `POST /api/services` -> Add a new service offering.
- `DELETE /api/services/<srv_id>` -> Delete a service.

### 9. Feedback / Inbox API
- `GET /api/feedback` -> List all inbox messages.
- `POST /api/feedback` -> Submit feedback/contact message.
- `PATCH /api/feedback/<fb_id>/read` -> Mark feedback message as read.
- `DELETE /api/feedback/<fb_id>` -> Delete a feedback message.

---

## Quick Start & Execution

### 1. Install Dependencies
```bash
pip install -r backend/requirements.txt
```

### 2. Seed Database
```bash
python backend/seed.py
```

### 3. Start Flask Development Server
```bash
python backend/app.py
```
The Flask API will run on `http://localhost:5000/api`.
