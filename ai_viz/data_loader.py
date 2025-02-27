import os
import pandas as pd
from PIL import Image
import PyPDF2

def load_data(source):
    """
    Load data from various file formats or return the source if already loaded.
    Supported file types: CSV, TSV, Excel, images, PDFs.
    """
    if isinstance(source, str) and os.path.isfile(source):
        ext = os.path.splitext(source)[1].lower()
        if ext == ".csv":
            try:
                return pd.read_csv(source, encoding="utf-8")
            except UnicodeDecodeError:
                print("UTF-8 decoding failed, trying 'latin1' encoding.")
                return pd.read_csv(source, encoding="latin1")
        elif ext == ".tsv":
            try:
                return pd.read_csv(source, sep="\t", encoding="utf-8")
            except UnicodeDecodeError:
                print("UTF-8 decoding failed, trying 'latin1' encoding.")
                return pd.read_csv(source, sep="\t", encoding="latin1")
        elif ext in [".xls", ".xlsx"]:
            return pd.read_excel(source)
        elif ext in [".png", ".jpg", ".jpeg", ".bmp", ".gif"]:
            return Image.open(source)
        elif ext == ".pdf":
            with open(source, "rb") as f:
                reader = PyPDF2.PdfReader(f)
                text = ""
                for page in reader.pages:
                    text += page.extract_text()
                return text
        else:
            raise ValueError(f"Unsupported file type: {ext}")
    else:
        # Assume source is already a loaded data object.
        return source
