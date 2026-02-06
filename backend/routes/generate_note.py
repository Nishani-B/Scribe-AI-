from flask import Blueprint, request, jsonify
from backend.services.soap_service import generate_soap_note

note_bp = Blueprint("generate_note", __name__, url_prefix="/generate-note")

@note_bp.route("", methods=["POST"])
def generate_note():
    data = request.get_json()

    if not data or "transcript" not in data:
        return jsonify({"error": "Transcript required"}), 400

    soap = generate_soap_note(data["transcript"])
    return jsonify(soap)
