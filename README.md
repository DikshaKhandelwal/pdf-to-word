# PDF to Word Converter

## 🌐 Live Demo
- **Frontend:** [GitHub Pages](https://DikshaKhandelwal.github.io/pdf-to-word)
- **Backend (FastAPI):** [Render Deployment](https://pdf-to-word-efye.onrender.com/)

## 🚀 Features
- Upload a **PDF file** and convert it to **Word (DOCX)** format.
- Drag & drop support for easy file selection.
- Real-time upload progress tracking.
- Works both **locally** and via the **deployed version**.

---
## 🛠️ How to Run Locally
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/DikshaKhandelwal/pdf-to-word.git
cd pdf-to-word
```
### 2️⃣ Run the Backend
Ensure you have Python installed, then run:
```sh
cd backend  # Navigate to backend folder
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
Backend will now be available at `http://127.0.0.1:8000/`

### 3️⃣ Run the Frontend
Ensure you have Node.js installed, then run:
```sh
cd frontend  # Navigate to frontend folder
npm install  # Install dependencies
npm start    # Start frontend server
```
Frontend will now be available at `http://localhost:3000/`

---
## 🖥️ How to Use the Deployed Versions
### 📌 Using the Deployed Frontend
Simply visit: [Frontend Live Demo](https://DikshaKhandelwal.github.io/pdf-to-word)

### 📌 Using the Deployed Backend (API)
You can directly send a `POST` request to:
```sh
https://pdf-to-word-efye.onrender.com/convert/
```
Example CURL request:
```sh
curl -X POST https://pdf-to-word-efye.onrender.com/convert/ \
     -F "file=@yourfile.pdf" 
```

---
## 📜 API Endpoints
| Method | Endpoint          | Description                |
|--------|------------------|----------------------------|
| POST   | `/convert/`       | Upload a PDF and convert it to Word |

---
## 🛠️ Tech Stack
- **Frontend:** React, Axios
- **Backend:** FastAPI, pdf2docx
- **Deployment:** GitHub Pages (Frontend), Render (Backend)

---
## 🔗 Useful Links
- **Frontend Repo:** [GitHub](https://github.com/DikshaKhandelwal/pdf-to-word)
- **Backend Repo:** [GitHub](https://github.com/DikshaKhandelwal/pdf-to-word-backend)
- **FastAPI Docs:** [FastAPI](https://fastapi.tiangolo.com/)
- **React Docs:** [React](https://react.dev/)

---
## 🤝 Contributing
Feel free to fork this repository and submit a pull request. Contributions are always welcome!

---
