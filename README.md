# ResumeMatch

An AI-powered tool that compares a resume against a job description the way a
hiring manager would — scoring the match, surfacing matched/missing
keywords, and generating specific, actionable rewrite suggestions.

Built to solve a real problem: understanding *why* a resume gets rejected by
ATS screening before applying, not after.

## Why this project exists

Most portfolio projects are CRUD apps or clones. This one came out of a real
personal need — tailoring resumes against job descriptions — and turns that
process into a tool other people can use too.

## Architecture

```
resume-matcher/
├── backend/          Flask API
│   ├── app.py         entry point
│   ├── models.py      SQLAlchemy models (scan history)
│   ├── parser.py       PDF -> text extraction
│   ├── llm_service.py   Anthropic API call + structured JSON parsing
│   └── routes.py         /api/scan, /api/history endpoints
└── frontend/         React (Vite)
    └── src/
        ├── App.jsx
        ├── api.js
        └── components/
            ├── UploadForm.jsx
            └── ResultsDashboard.jsx   (recharts visualization)
```

**Flow:** user uploads a resume PDF + pastes a JD → Flask extracts resume
text → sends both texts to Claude with a structured system prompt → Claude
returns match score, matched/missing keywords, and suggestions as JSON →
result is stored in SQL and rendered on the dashboard.

## Local setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env             # then add your ANTHROPIC_API_KEY
python app.py                     # runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev                       # runs on http://localhost:5173
```

## Deploying to AWS Lightsail (closes the "cloud deployment" gap)

1. **Create a Lightsail instance** — choose the Node.js/Linux blueprint,
   smallest plan ($3.50-5/month, or free-tier eligible for first 3 months).
2. **SSH in**, install Python, Node, and nginx:
   ```bash
   sudo apt update && sudo apt install python3-pip python3-venv nginx -y
   ```
3. **Clone your GitHub repo** onto the instance.
4. **Backend**: set up the venv as above, run with `gunicorn` instead of the
   dev server:
   ```bash
   gunicorn -w 2 -b 127.0.0.1:5000 app:app
   ```
5. **Frontend**: run `npm run build` locally (or on the instance), which
   produces a `dist/` folder of static files.
6. **nginx**: serve the built frontend as static files, and reverse-proxy
   `/api/*` requests to `127.0.0.1:5000` (the gunicorn backend).
7. **Attach a static IP** in the Lightsail console so the address doesn't
   change on reboot.
8. Optional: point a free subdomain (e.g. from Freenom or a Namecheap domain)
   at the static IP for a cleaner URL to put on your resume/GitHub.

This gives you a genuinely deployed, publicly reachable AWS instance to speak
to in interviews — not a claim, an actual answer to "what have you deployed
on AWS."

## Suggested week-long build plan

| Day | Focus |
|---|---|
| 1-2 | Backend: PDF parsing, SQL models, get `/api/scan` returning mock data |
| 2-4 | Wire in the real Anthropic API call, test prompt output on real resumes/JDs |
| 4-5 | Matching/scoring refinement, error handling (bad PDFs, API failures) |
| 5-6 | Frontend: upload form, results dashboard, chart |
| 6-7 | Deploy to AWS Lightsail, polish README, push clean commit history to GitHub |

## Notes for the resume bullet

Once built and deployed, a bullet like this would be accurate and strong:

> Built and deployed ResumeMatch, an AI-powered resume-JD analysis tool
> using Flask, React, and the Anthropic API — parses resumes, generates
> structured match scoring and gap analysis via LLM, and visualizes results
> on an interactive dashboard; deployed on AWS Lightsail.
