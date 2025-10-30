# PDFDragDrop

Cross-platform CLI tool for PDF operations: compress, merge, rotate, split, and convert to images. Built with Node.js and TypeScript for maximum compatibility and ease of use.

## ✨ Features

- **📦 Compress** - Reduce PDF file size while maintaining quality
- **🔗 Merge** - Combine multiple PDF files into one
- **🔄 Rotate** - Rotate PDF pages by 90°, 180°, or 270°
- **✂️ Split** - Split PDF into separate pages or page ranges
- **🖼️ Convert** - Convert PDF pages to JPG or PNG images

## 🚀 Installation

### Prerequisites

- Node.js 18+ installed on your system

### Install Globally

```bash
npm install -g pdfdragdrop
```

### Install Locally (for development)

```bash
git clone https://github.com/gvoze32/pdfdragdrop.git
cd pdfdragdrop
npm install
npm run build
```

## 📖 Usage

After installation, you can use the `pdf` command from anywhere in your terminal:

### Compress PDF

```bash
pdf compress file.pdf
```

Output: `file-compress.pdf`

### Merge PDFs

```bash
pdf merge file1.pdf file2.pdf file3.pdf
pdf merge file1.pdf file2.pdf -o combined.pdf
```

Output: `merged.pdf` (or custom name with `-o`)

### Rotate PDF

```bash
# Rotate all pages 90 degrees
pdf rotate file.pdf

# Rotate all pages 180 degrees
pdf rotate file.pdf -d 180

# Rotate specific pages
pdf rotate file.pdf -d 90 -p 1,3,5
```

Output: `file-rotated.pdf`

### Split PDF

```bash
# Split all pages
pdf split file.pdf

# Split specific page range
pdf split file.pdf -p 1-3

# Split specific pages
pdf split file.pdf -p 1,3,5
```

Output: `file-split-1.pdf`, `file-split-2.pdf`, etc.

### Convert to JPG

```bash
# Convert all pages
pdf to-jpg file.pdf

# Convert with quality setting (1-100)
pdf to-jpg file.pdf -q 95

# Convert specific pages
pdf to-jpg file.pdf -p 1,3,5
```

Output: `file-page-1.jpg`, `file-page-2.jpg`, etc.

### Convert to PNG

```bash
# Convert all pages
pdf to-png file.pdf

# Convert specific pages
pdf to-png file.pdf -p 1,3
```

Output: `file-page-1.png`, `file-page-2.png`, etc.

## 🎯 Command Reference

```bash
pdf compress <file>                          # Compress PDF
pdf merge <files...> [-o output]             # Merge PDFs
pdf rotate <file> [-d degrees] [-p pages]    # Rotate pages
pdf split <file> [-p pages]                  # Split PDF
pdf to-jpg <file> [-q quality] [-p pages]    # Convert to JPG
pdf to-png <file> [-p pages]                 # Convert to PNG
```

## 🛠️ Tech Stack

- **TypeScript** - Type-safe development
- **pdf-lib** - PDF manipulation
- **pdfjs-dist** - PDF rendering
- **canvas** - Image generation
- **Commander.js** - CLI framework
- **Chalk** - Beautiful terminal output
- **Ora** - Elegant terminal spinners

## 🌍 Cross-Platform

Works on:

- ✅ Windows
- ✅ macOS
- ✅ Linux

## 📜 License

MIT

## 👤 Author

gvoze32
