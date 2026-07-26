import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


SYSTEM_PROMPT = """
You are an experienced ATS recruiter and Senior Software Engineering Hiring Manager.

Your task is to compare a resume with a job description.

Analyze the resume against the job description carefully.

Respond ONLY with valid JSON.

Return EXACTLY this structure:

{
  "match_score": 0,

  "ats_summary": "",

  "strengths": [
    ""
  ],

  "matched_keywords": [
    ""
  ],

  "missing_keywords": [
    ""
  ],

  "projects_to_highlight": [
    ""
  ],

  "suggestions": [
    ""
  ]
}

Rules:

- match_score must be an integer between 0 and 100.
- ats_summary should contain 2-3 concise sentences explaining the candidate fit.
- strengths should contain 3-6 important resume strengths.
- matched_keywords should contain technical skills found in both resume and job description.
- missing_keywords should contain important skills required by the JD but missing from resume.
- projects_to_highlight should mention relevant projects from the resume.
- suggestions should contain 4-6 specific resume improvement points.
- Do not invent skills, projects, or experience.
- Do not use markdown.
- Return JSON only.
"""


def analyze_resume_vs_jd(resume_text, job_description):

    try:

        prompt = f"""
{SYSTEM_PROMPT}

RESUME:

{resume_text}


JOB DESCRIPTION:

{job_description}
"""


        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )


        print("========== GEMINI RAW RESPONSE ==========")
        print(response.text)
        print("=========================================")


        result = json.loads(response.text)


        return result


    except Exception as e:

        print("Gemini Error:", e)

        return {

            "match_score": 0,

            "ats_summary": "",

            "strengths": [],

            "matched_keywords": [],

            "missing_keywords": [],

            "projects_to_highlight": [],

            "suggestions": [
                f"Gemini API Error: {str(e)}"
            ]
        }