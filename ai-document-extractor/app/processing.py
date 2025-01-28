import re

def extract_invoice_data(text):
    """
    Extract specific fields from the invoice text using regex.
    """
    # Define regex patterns for invoice fields
    invoice_number_pattern = r'Invoice\s*Number:\s*(\w+)'
    date_pattern = r'Date:\s*(\d{2}/\d{2}/\d{4})'
    total_amount_pattern = r'Total\s*Amount:\s*(\$\d+\.\d{2})'

    # Extract fields using regex
    invoice_number = re.search(invoice_number_pattern, text)
    date = re.search(date_pattern, text)
    total_amount = re.search(total_amount_pattern, text)

    # Create a dictionary with extracted data
    invoice_data = {
        "invoice_number": invoice_number.group(1) if invoice_number else None,
        "date": date.group(1) if date else None,
        "total_amount": total_amount.group(1) if total_amount else None,
    }

    return invoice_data
