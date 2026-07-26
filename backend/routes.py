import json
from flask import Blueprint, request, jsonify

from models import db, ScanResult
from parser import extract_text_from_upload
from llm_service import analyze_resume_vs_jd

api_bp = Blueprint("api", __name__)


@api_bp.route("/scan", methods=["POST"])
def scan():
    """
    Expects multipart/form-data:
      - resume: file (PDF or .txt)
      - jd_text: string (pasted job description)
      - job_title, company_name: optional strings
    """
    if "resume" not in request.files:
        return jsonify({"error": "No resume file uploaded"}), 400

    jd_text = request.form.get("jd_text", "").strip()
    if not jd_text:
        return jsonify({"error": "No job description provided"}), 400

    resume_file = request.files["resume"]
    resume_text = extract_text_from_upload(resume_file)

    result = analyze_resume_vs_jd(resume_text, jd_text)

    scan = ScanResult(

        resume_filename=resume_file.filename,

        job_title=request.form.get("job_title", ""),

        company_name=request.form.get("company_name", ""),

        match_score=result.get("match_score", 0),

        ats_summary=result.get("ats_summary", ""),

        strengths=json.dumps(result.get("strengths", [])),

        matched_keywords=json.dumps(
            result.get("matched_keywords", [])
        ),

        missing_keywords=json.dumps(
            result.get("missing_keywords", [])
        ),

        projects_to_highlight=json.dumps(
            result.get("projects_to_highlight", [])
        ),

        suggestions=json.dumps(
            result.get("suggestions", [])
        ),

    )
    db.session.add(scan)
    db.session.commit()

    return jsonify(scan.to_dict())


@api_bp.route("/history", methods=["GET"])
def history():
    scans = ScanResult.query.order_by(ScanResult.created_at.desc()).limit(20).all()
    return jsonify([s.to_dict() for s in scans])


@api_bp.route("/history/<int:scan_id>", methods=["DELETE"])
def delete_scan(scan_id):
    scan = ScanResult.query.get_or_404(scan_id)
    db.session.delete(scan)
    db.session.commit()
    return jsonify({"deleted": scan_id})
