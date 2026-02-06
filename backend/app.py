from flask import Flask, request, jsonify
from flask_cors import CORS

# Existing services (DO NOT MODIFY THESE FILES)
from backend.services.stt_service import transcribe_audio
from backend.services.soap_service import generate_soap_note

app = Flask(__name__)
CORS(app)


# --------------------------------------------------
# Health check
# --------------------------------------------------
@app.route("/", methods=["GET"])
def health():
    return {"status": "Scribe AI backend running"}


# --------------------------------------------------
# STEP 1 ONLY: Transcription (already working)
# --------------------------------------------------
@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "audio" not in request.files:
        return jsonify({"error": "Audio file required"}), 400

    audio_file = request.files["audio"]
    transcript = transcribe_audio(audio_file)

    return jsonify({
        "transcript": transcript
    })


# --------------------------------------------------
# STEP 2 ONLY: SOAP note from text
# --------------------------------------------------
@app.route("/generate-note", methods=["POST"])
def generate_note():
    data = request.get_json()

    if not data or "transcript" not in data:
        return jsonify({"error": "Transcript required"}), 400

    soap_note = generate_soap_note(data["transcript"])
    return jsonify(soap_note)


# --------------------------------------------------
# 🔥 FINAL AUTOMATIC PIPELINE
# Audio → Transcript → SOAP (ONE CALL)
# --------------------------------------------------
@app.route("/process-audio", methods=["POST"])
def process_audio():
    if "audio" not in request.files:
        return jsonify({"error": "Audio file required"}), 400

    audio_file = request.files["audio"]

    # 1. Transcribe
    transcript = transcribe_audio(audio_file)

    # 2. Generate SOAP note
    soap_note = generate_soap_note(transcript)

    # 3. Return full result
    return jsonify({
        "transcript": transcript,
        "soap_note": soap_note
    })


# --------------------------------------------------
# App runner (Windows-safe)
# --------------------------------------------------
if __name__ == "__main__":
    app.run(debug=False, use_reloader=False)
