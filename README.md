# 🚀 AI Resume Matcher

An AI-powered ATS Resume Analyzer that compares resumes with job descriptions using Google's Gemini AI and provides intelligent match scores, skill analysis, ATS insights, and personalized resume improvement suggestions.

---

## ✨ Features

- 📄 Upload PDF resumes
- 🤖 AI-powered resume analysis using Google Gemini
- 🎯 ATS Match Score with visual progress meter
- 💪 Resume Strengths identification
- ✅ Skills Found
- 📚 Skills to Learn
- 💡 Personalized resume improvement suggestions
- 📊 Interactive analytics dashboard using Recharts
- 📜 Scan History
- 💾 SQLite database for storing previous analyses
- ⚡ Fast React + Flask full-stack architecture

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Recharts
- CSS3

### Backend
- Flask
- SQLAlchemy
- SQLite
- Google Gemini API
- PyPDF2

### AI
- Google Gemini 2.5 Flash

---

## 📸 Screenshots

### Home Page

> *(Add screenshot after deployment)*

### Analysis Dashboard

> *(Add screenshot after deployment)*

### Scan History

> *(Add screenshot after deployment)*

---

## 📊 Dashboard Includes

- ATS Match Score
- ATS Summary
- Resume Strengths
- Skills Found
- Skills To Learn
- Resume Improvement Suggestions
- Match Visualization Chart
- Previous Scan History

---

## 📂 Project Structure

```
AI-Resume-Matcher
│
├── frontend
│   ├── src
│   ├── components
│   └── api.js
│
├── backend
│   ├── app.py
│   ├── routes.py
│   ├── models.py
│   ├── parser.py
│   ├── llm_service.py
│   └── requirements.txt
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/aadhya-code/AI-Resume-Matcher.git

cd AI-Resume-Matcher
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate      # macOS/Linux

pip install -r requirements.txt
```

Create a `.env` file:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Run backend

```bash
python app.py
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🚀 How It Works

1. Upload your resume in PDF format.
2. Paste the target Job Description.
3. The backend extracts resume text.
4. Google Gemini compares the resume with the Job Description.
5. The AI generates:
   - ATS Match Score
   - ATS Summary
   - Resume Strengths
   - Skills Found
   - Missing Skills
   - Resume Suggestions
6. Results are stored for future reference.
7. Users can revisit previous analyses through Scan History.

---

## 📈 Future Improvements

- PDF Report Download
- Multi-resume comparison
- Resume version tracking
- Authentication
- Dark mode
- Multiple AI model support
- Cloud database integration
- Docker deployment

---

## 🌐 Live Demo

Frontend:
> Coming Soon

Backend API:
> Coming Soon

---

## 👩‍💻 Author

**Aadhya Garg**

GitHub:
https://github.com/aadhya-code

---

## 📄 License

This project is licensed under the MIT License.

---

### ⭐ If you found this project helpful, consider giving it a star!