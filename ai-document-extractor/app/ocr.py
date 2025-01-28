import pytesseract
from pytesseract import Output
import cv2

def preprocess_image(image_path):
    """
    Preprocess the image for better OCR accuracy.
    """
    # Load the image in grayscale
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Apply thresholding to binarize the image
    _, binary_image = cv2.threshold(image, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    return binary_image

def extract_text_from_image(image_path):
    """
    Extract text from the image using Tesseract OCR.
    """
    # Preprocess the image
    processed_image = preprocess_image(image_path)

    # Use Tesseract to extract text
    text_data = pytesseract.image_to_data(processed_image, output_type=Output.DICT)

    # Combine all text into a single string
    text = " ".join(text_data['text'])

    return text, text_data
