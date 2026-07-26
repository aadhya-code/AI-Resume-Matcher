const BASE_URL = "http://127.0.0.1:5001/api";

export async function submitScan({ resumeFile, jdText, jobTitle, companyName }) {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("jd_text", jdText);
  formData.append("job_title", jobTitle || "");
  formData.append("company_name", companyName || "");

  const res = await fetch(`${BASE_URL}/scan`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Scan failed");
  }
  return res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${BASE_URL}/history`);
  return res.json();
}
