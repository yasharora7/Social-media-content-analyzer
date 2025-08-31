# Approach

The project is a **Social Media Content Analyzer** built with a full-stack architecture using **Node.js/Express (backend)** and **React + Vite (frontend)**. The goal was to allow users to upload files (like PDFs, images, or text documents) and analyze their content efficiently.

On the backend, I implemented **Express** with **Multer** to handle file uploads, storing them temporarily for processing. A dedicated controller extracts the raw text and passes it to the analyzer service for further processing, such as sentiment analysis or keyword extraction. The backend is modular, following a clean separation of concerns with routers, controllers, and services, making it easier to maintain and scale.

The frontend was developed with **React + Vite** for fast builds and better developer experience. I integrated API calls to the backend, ensuring users can seamlessly upload files and view results. Environment variables (via `.env`) were used to configure API URLs differently for local development and deployment, ensuring flexibility.

For deployment, the backend and frontend were hosted separately using **Render**. The backend exposes REST APIs, and the frontend is built and served as static files, connected via environment-based API URLs. This approach provides scalability, simplicity, and clear separation between user interaction and data processing.
