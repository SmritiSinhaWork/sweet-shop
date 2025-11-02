# Sweet Shop Management System

[cite_start]This is a full-stack web application for a "Sweet Shop Management System," built as a TDD Kata[cite: 1, 3]. The application features a robust backend API built with Django REST Framework and a modern, dynamic frontend built with React.

[cite_start]The backend handles user authentication (using JWT), product inventory, and purchase/restock logic[cite: 6, 11, 14]. [cite_start]The frontend provides a user-friendly interface for customers to register, log in, browse products, and make purchases[cite: 32, 36, 37, 39]. [cite_start]Admin users also have access to protected endpoints for managing the shop's inventory[cite: 25, 29].

## Features

* [cite_start]**User Authentication:** Secure user registration (`POST /api/auth/register`) and login (`POST /api/auth/login`) using JWT (JSON Web Tokens)[cite: 13, 14, 17].
* [cite_start]**Dynamic Product Catalog:** The shop page fetches all product data directly from the Django API, including real-time stock quantity[cite: 21, 30].
* **Full Inventory API:**
    * [cite_start]Full CRUD (Create, Read, Update, Delete) for sweets (`GET`, `POST`, `PUT`, `DELETE /api/sweets/`) [cite: 20-25].
    * `DELETE` and `PUT` operations are restricted to Admin users.
* **Inventory Management:**
    * [cite_start]`POST /api/sweets/:id/purchase`: Allows any authenticated user to purchase a sweet, decreasing its quantity[cite: 27, 28].
    * [cite_start]`POST /api/sweets/:id/restock`: An admin-only endpoint to restock a sweet's quantity[cite: 29].
* **Frontend Client:** A responsive React application built with Vite, using React Router for navigation and Sonner for toast notifications.

## Tech Stack

* **Backend:** Python, Django, Django REST Framework, DRF Simple JWT, `django-cors-headers`
* [cite_start]**Database:** SQLite [cite: 11]
* **Frontend:** React, Vite, TypeScript, Tailwind CSS
* **Development:** Git, `python-dotenv`

---

## Getting Started

[cite_start]To run this project locally, you will need to run two separate servers in two separate terminals (one for the backend and one for the frontend)[cite: 69].

### 1. Backend Setup (Django)

1.  **Navigate to the backend folder:**
    ```bash
    cd sweetshop-backend
    ```
2.  **Create and activate a Python virtual environment:**
    ```bash
    # Create the environment
    python -m venv venv
    
    # Activate on Windows
    .\venv\Scripts\activate
    
    # Activate on Mac/Linux
    # source venv/bin/activate
    ```
3.  **Install all required packages:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Set up your environment file:**
    * Create a new file in the `sweetshop-backend` folder named `.env`.
    * Open `backend/settings.py`, **cut** the `SECRET_KEY` value, and paste it into `.env`:
    ```
    SECRET_KEY='your_django_secret_key_goes_here'
    ```
    *(The `settings.py` file is already configured to read this key from the `.env` file).*
5.  **Run the database migrations:**
    ```bash
    python manage.py migrate
    ```
6.  **Create an admin superuser** (to use the admin panel and test admin-only features):
    ```bash
    python manage.py createsuperuser
    ```
7.  **Run the backend server:**
    ```bash
    python manage.py runserver
    ```
    *Backend API is now running at `http://127.0.0.1:8000/`.*

### 2. Frontend Setup (React)

1.  **Open a new, separate terminal.**
2.  **Navigate to the frontend folder:**
    ```bash
    cd spark-react-sweet-shop-frontend
    ```
3.  **Install all node dependencies:**
    ```bash
    npm install
    ```
4.  **Run the frontend server:**
    ```bash
    npm run dev
    ```
    *Frontend application is now running at `http://localhost:8080/`.*

Can now open `http://localhost:8080/` in your browser to use the application.

---

##  Screenshots

<img width="1920" height="1080" alt="Screenshot 2025-11-02 233214" src="https://github.com/user-attachments/assets/60f0d6ca-3b4a-48e0-8d7b-a10058d6e93b" />
<img width="1920" height="1080" alt="Screenshot 2025-11-02 233507" src="https://github.com/user-attachments/assets/920d01b1-b5cb-452f-9b6f-d9bafb2cf835" />
<img width="1920" height="1080" alt="Screenshot 2025-11-02 233750" src="https://github.com/user-attachments/assets/29714a02-2fbf-4dcc-b185-73b48e3b7050" />


---

## My AI Usage

This project was built in accordance with the AI Usage Policy. I used AI as a pair programmer to guide development, provide code suggestions, and debug issues.

### AI tools used
* [cite_start]**lovable ai:** Used for frontend code generation, debugging[cite: 60].
* **Gemini ai:** Used for backend code debugging, and project setup and generate commit messages.

### How you used them
I used my AI assistants collaboratively throughout the entire development lifecycle, rather than for full code generation.

**For the Backend:**
* **Scaffolding:** Gemini helped me set up the Django project by providing the necessary commands for the virtual environment and package installation (`Django`, `djangorestframework`, `simple-jwt`, `cors-headers`, `python-dotenv`).
* **Code Generation:** I used Gemini to assist in writing the core logic for the application. It provided guidance and foundational code examples for:
    * The `Sweet` model in `models.py`.
    * The `UserSerializer` and `SweetSerializer` in `serializers.py`.
    * The `RegisterView` and `SweetViewSet` (including the custom `purchase` and `restock` actions) in `views.py`.
    * The `urls.py` configuration for both the project and the `sweets` app.
* **Security:** Gemini guided me on how to use `python-dotenv` to move my `SECRET_KEY` into a `.env` file and how to create a `.gitignore` to keep my secrets and database out of version control.
* **Debugging:** Gemini helped me debug a `ModuleNotFoundError` when my `views.py` file couldn't find `serializers.py`.

**For the Frontend:**
* **Debugging the Login Security Flaw:** The original frontend code contained a "mock" login function. Gemini was critical in helping me identify this major security bug and provided the key logic to replace the `AuthContext.js` with a new, secure version that actually calls the Django API and handles errors.
* **Debugging Data Fetching:** The shop page was also using "mock" data. I used Gemini to assist in refactoring `Shop.js` to fetch the real product list from the backend API, including the `purchase` logic that sends the auth token.
* **Fixing Form Mismatches:** My `Login.js` and `Register.js` forms were trying to send `email` when the backend expected `username`. Gemini helped me implement the corrected code for both files to add a `username` field.

### Your reflection on how AI impacted your workflow
My reflection is that using an AI like Gemini was like having a senior developer as a pair programmer 24/7. I didn't just get code snippets; I got explanations for *why* the code was needed (like for JWT, CORS, and `z-index`), which helped me make the final decisions.

The AI dramatically accelerated my workflow. Debugging the "mock" API, the login security flaw, and the `.toFixed()` crash would have taken me hours or even days. The AI helped me identify these issues instantly and provided effective solutions, allowing me to focus on building the full application rather than getting stuck on complex bugs.
