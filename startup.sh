#!/bin/bash
# Install dependencies first
pip install -r requirements.txt
# Install uvicorn explicitly if it's not being installed correctly
pip install uvicorn
# Run the FastAPI app
uvicorn app:app --host 0.0.0.0 --port $PORT
