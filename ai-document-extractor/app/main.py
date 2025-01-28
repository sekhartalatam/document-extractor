from flask import Flask, request, jsonify
import os
from app.ocr import extract_text_from_image
from app.processing import extract_invoice_data

app = Flask(__name__)

@app.route('/extract', methods=['POST'])
def extract():
    """
    API endpoint to extract data from an uploaded invoice image.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # Save the uploaded file temporarily
    file_path = f"temp_{file.filename}"
    file.save(file_path)

    try:
        # Extract text from the image
        text, _ = extract_text_from_image(file_path)
        print(text)

        # Extract invoice data from the text
        invoice_data = extract_invoice_data(text)

        return jsonify(invoice_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Clean up the temporary file
        if os.path.exists(file_path):
            os.remove(file_path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
