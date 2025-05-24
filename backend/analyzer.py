# analyzer.py
import sys
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import red
from io import BytesIO

# Sample list of legal keywords to highlight
RISKY_TERMS = ["liability", "penalty", "termination", "warranty", "indemnity"]

def highlight_keywords(text, keywords):
    highlights = []
    for keyword in keywords:
        if keyword.lower() in text.lower():
            highlights.append(keyword)
    return list(set(highlights))

def annotate_pdf(input_path, output_path):
    reader = PdfReader(input_path)
    writer = PdfWriter()

    for page_num, page in enumerate(reader.pages):
        packet = BytesIO()
        can = canvas.Canvas(packet, pagesize=letter)
        text = page.extract_text()

        if text:
            risky_words = highlight_keywords(text, RISKY_TERMS)
            if risky_words:
                can.setFillColor(red)
                can.setFont("Helvetica-Bold", 12)
                can.drawString(30, 750, f"⚠️ Risky terms detected: {', '.join(risky_words)}")
        can.save()

        packet.seek(0)
        overlay_pdf = PdfReader(packet)
        page.merge_page(overlay_pdf.pages[0])
        writer.add_page(page)

    with open(output_path, "wb") as out_file:
        writer.write(out_file)

if __name__ == "__main__":
    input_pdf = sys.argv[1]
    output_pdf = sys.argv[2]
    annotate_pdf(input_pdf, output_pdf)
