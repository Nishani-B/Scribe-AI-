import whisper
import os
import uuid

# Load Whisper model (CPU safe)
model = whisper.load_model("base")

AUDIO_DIR = "backend/storage/audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

def transcribe_audio(file):
    """
    Stable MP3 transcription on Windows (CPU).
    No crashes, no fp16, no reloader issues.
    """
    filename = f"{uuid.uuid4()}.mp3"
    filepath = os.path.join(AUDIO_DIR, filename)

    # Save uploaded MP3
    file.save(filepath)

    # CRITICAL FIX:
    # fp16=False → prevents Windows crash
    result = model.transcribe(
        filepath,
        fp16=False,
        language="en",
        verbose=False
    )

    return result["text"]
