"""Extract plain text from an uploaded resume (PDF or .txt)."""
import io
from pypdf import PdfReader


def extract_text_from_upload(file_storage):
    """
    file_storage: a Werkzeug FileStorage object from request.files['resume']
    Returns plain text content.
    """
    filename = (file_storage.filename or "").lower()

    if filename.endswith(".pdf"):
        reader = PdfReader(io.BytesIO(file_storage.read()))
        text = "\n".join(page.extract_text() or "" for page in reader.pages)
        return text

    # fallback: treat as plain text
    return file_storage.read().decode("utf-8", errors="ignore")
