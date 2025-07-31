from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import tempfile
import json

from gemini_evaluator import evaluate_video

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 500 * 1024 * 1024  # 500MB max upload

@app.route("/evaluate", methods=["POST"])
def evaluate():
    if 'questions' not in request.files:
        return jsonify({"error": "File questions.json tidak ditemukan"}), 400

    questions_file = request.files['questions']
    questions = json.load(questions_file)

    results = []

    for i in range(1, 6):
        key = f'video{i}'
        if key not in request.files:
            return jsonify({"error": f"File {key} tidak ditemukan"}), 400
        
        video = request.files[key]
        filename = secure_filename(video.filename)

        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
            video.save(tmp.name)
            print(f"Processing {filename}...")

            try:
                result = evaluate_video(
                    tmp.name,
                    question=questions[i - 1]["question"],
                    topic=questions[i - 1]["topic"]
                )
                results.append({
                    "video": filename,
                    "question": questions[i - 1]["question"],
                    "evaluation": result
                })
            finally:
                os.remove(tmp.name)

    return jsonify({"evaluations": results})


if __name__ == "__main__":
    app.run(debug=True)