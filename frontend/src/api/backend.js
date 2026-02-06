const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

async function api(endpoint, options = {}) {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { ...options.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API error ${res.status}`);
  }
  return res.json();
}

export async function healthCheck() {
  return api("/");
}

export async function processAudio(file) {
  const formData = new FormData();
  formData.append("audio", file);
  const res = await fetch(`${API_BASE}/process-audio`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Processing failed");
  }
  return res.json();
}

export async function transcribe(audioFile) {
  const formData = new FormData();
  formData.append("audio", audioFile);
  return api("/transcribe", {
    method: "POST",
    body: formData,
  });
}

export async function generateNote(transcript) {
  return api("/generate-note", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
  });
}
