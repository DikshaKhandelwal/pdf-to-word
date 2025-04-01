#!/bin/bash
# Install dependencies first
pip install -r requirements.txt
# Run the FastAPI app
uvicorn app:app --host 0.0.0.0 --port $PORT
