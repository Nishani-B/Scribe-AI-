from flask import Blueprint, request, jsonify
from ..services.stt_service import transcribe_audio

transcribe_bp = Blueprint("transcribe", __name__, url_prefix="/transcribe")

@transcribe_bp.route("", methods=["POST"])
def transcribe():
    if "audio" not in request.files:
        return jsonify({"error": "Audio file required"}), 400

    audio_file = request.files["audio"]
    transcript = transcribe_audio(audio_file)

    return jsonify({"transcript": transcript})
