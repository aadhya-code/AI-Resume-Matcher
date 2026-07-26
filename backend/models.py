from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class ScanResult(db.Model):
    """One resume-vs-JD scan, stored so users can revisit past results."""

    __tablename__ = "scan_results"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    resume_filename = db.Column(db.String(255))
    job_title = db.Column(db.String(255))
    company_name = db.Column(db.String(255))

    match_score = db.Column(db.Float)

    ats_summary = db.Column(db.Text)

    strengths = db.Column(db.Text)

    matched_keywords = db.Column(db.Text)

    missing_keywords = db.Column(db.Text)

    projects_to_highlight = db.Column(db.Text)

    suggestions = db.Column(db.Text)


    def to_dict(self):

        import json

        return {

            "id": self.id,

            "created_at": self.created_at.isoformat(),

            "resume_filename": self.resume_filename,

            "job_title": self.job_title,

            "company_name": self.company_name,

            "match_score": self.match_score,

            "ats_summary": self.ats_summary or "",

            "strengths": json.loads(self.strengths or "[]"),

            "matched_keywords": json.loads(self.matched_keywords or "[]"),

            "missing_keywords": json.loads(self.missing_keywords or "[]"),

            "projects_to_highlight": json.loads(
                self.projects_to_highlight or "[]"
            ),

            "suggestions": json.loads(self.suggestions or "[]"),

        }