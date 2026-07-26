"""
Resume <-> JD Matcher — Flask backend entry point.

Run locally:
    pip install -r requirements.txt
    export GEMINI_API_KEY=your_api_key     (or set in a .env file)
    python app.py
"""
import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from models import db
from routes import api_bp

load_dotenv()


def create_app():
    app = Flask(__name__)
    CORS(app)  # allow the React frontend (different port) to call this API

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "DATABASE_URL", "sqlite:///matcher.db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    with app.app_context():
        db.create_all()

    app.register_blueprint(api_bp, url_prefix="/api")

    @app.route("/health")
    def health():
        return jsonify({"status": "ok"})

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
