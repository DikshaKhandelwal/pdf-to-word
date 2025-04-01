#!/bin/bash

# Project Name
PROJECT_NAME="pdf-to-word"

# Create project structure
echo "📁 Creating project structure..."
mkdir -p $PROJECT_NAME/{backend,frontend,tests}
touch $PROJECT_NAME/{README.md,.gitignore,requirements.txt}
touch $PROJECT_NAME/backend/{app.py,converter.py,requirements.txt}
touch $PROJECT_NAME/tests/test_converter.py

# Install dependencies globally
echo "📦 Installing dependencies globally..."
pip install fastapi uvicorn pdf2docx pdfplumber python-docx
pip freeze > $PROJECT_NAME/backend/requirements.txt

# Git setup
echo "🔧 Initializing Git repository..."
cd $PROJECT_NAME || exit
git init
echo -e "*.pyc\n__pycache__/\n.env" > .gitignore
git add .
git commit -m "Initial commit - PDF to Word Converter"
echo "✅ Git repository initialized!"

# GitHub Repo Setup (Requires GitHub CLI)
echo "🌍 Creating GitHub repository..."
gh repo create $PROJECT_NAME --public --source=. --remote=origin
git push -u origin main
echo "🚀 GitHub repository created successfully!"

echo "🎉 Project setup complete!"
