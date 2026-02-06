export async function processAudio(file) {
  const formData = new FormData();
  formData.append("audio", file);

  const res = await fetch("http://127.0.0.1:5000/process-audio", {
    method: "POST",
    body: formData
  });

  if (!res.ok) throw new Error("Backend error");

  return res.json();
}
