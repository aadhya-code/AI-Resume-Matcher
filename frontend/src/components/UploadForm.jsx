import React, { useState } from "react";

export default function UploadForm({ onSubmit, loading }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!resumeFile || !jdText.trim()) return;
    onSubmit({ resumeFile, jdText, jobTitle, companyName });
  }

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label>
          Job title
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="SDE Intern"
          />
        </label>
        <label>
          Company
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Acme Corp"
          />
        </label>
      </div>

      <label className="field-block">
        Resume (PDF)
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={(e) => setResumeFile(e.target.files[0])}
          required
        />
      </label>

      <label className="field-block">
        Job description
        <textarea
          rows={8}
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste the job description here..."
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>
    </form>
  );
}
