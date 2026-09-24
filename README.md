<div align="center">

# 🛒 Ecommerce — Multi-Vendor Programming Marketplace

**A full-stack, multi-vendor marketplace where vendors list programming products and customers buy them securely online.**

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-5.0.7-092E20?style=for-the-badge&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/DRF-3.15.2-A30000?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Docs-Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

![Stars](https://img.shields.io/github/stars/sahan11111/ecommerce?style=social)
![Forks](https://img.shields.io/github/forks/sahan11111/ecommerce?style=social)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Docs](#-api-documentation) • [Structure](#-project-structure) • [Roadmap](#-roadmap)

</div>

---

## 📖 About

**Ecommerce** is a multi-vendor marketplace built as a college curriculum project. It pairs a **Django REST Framework** backend with a **React** frontend, and supports multiple vendors listing products, token-based authentication, and online payments through **PayPal** and **Khalti**.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🏪 | **Multi-vendor marketplace** | Vendors can list and manage their own products |
| 🔌 | **REST API** | Clean, well-structured backend built with Django REST Framework |
| 🔐 | **JWT authentication** | Secure login and token refresh via `djangorestframework-simplejwt` |
| 📚 | **Interactive API docs** | Auto-generated Swagger / OpenAPI documentation with `drf-yasg` |
| 💳 | **Online payments** | PayPal and Khalti checkout integrated on the frontend |
| 🖼️ | **Product images** | Media uploads for product photos and vendor content |
| 📊 | **Charts & analytics** | ApexCharts-powered visualisations in the UI |
| 📱 | **Responsive UI** | Built with Bootstrap 5 for mobile and desktop |

---

## 🧰 Tech Stack

### Backend
| Tool | Purpose |
|---|---|
| ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white) | Core language |
| ![Django](https://img.shields.io/badge/-Django%205.0.7-092E20?logo=django&logoColor=white) | Web framework |
| ![DRF](https://img.shields.io/badge/-DRF%203.15.2-A30000?logo=django&logoColor=white) | REST API layer |
| ![JWT](https://img.shields.io/badge/-SimpleJWT%205.3.1-000000?logo=jsonwebtokens&logoColor=white) | Authentication |
| ![Swagger](https://img.shields.io/badge/-drf--yasg-85EA2D?logo=swagger&logoColor=black) | API documentation |
| ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white) | Production database (`psycopg2-binary`) |
| ![SQLite](https://img.shields.io/badge/-SQLite-003B57?logo=sqlite&logoColor=white) | Local development database |
| `python-dotenv` | Environment variable management |

### Frontend
| Tool | Purpose |
|---|---|
| ![React](https://img.shields.io/badge/-React%2018-61DAFB?logo=react&logoColor=black) | UI library (Create React App) |
| ![Bootstrap](https://img.shields.io/badge/-Bootstrap%205-7952B3?logo=bootstrap&logoColor=white) | Styling and layout |
| Axios | HTTP client |
| React Router | Client-side routing |
| ApexCharts | Charts and dashboards |
| PayPal React SDK | PayPal payments |
| Khalti Checkout | Khalti payments |

---

## 📁 Project Structure

```bash
ecommerce/
├── .github/workflows/   # CI/CD workflows
├── backend_api/         # Django project settings & configuration
├── main/                # Core Django app (models, views, serializers)
├── frontend/            # React application
├── media/               # Uploaded media files
├── product_imgs/        # Product images
├── env/                 # Python virtual environment
├── manage.py            # Django management entry point
├── requirements.txt     # Python dependencies
├── package.json         # Node dependencies
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.10+
- **Node.js** 18+ and **npm**
- **Git**
- *(Optional)* **PostgreSQL** for production-like setups

### 1️⃣ Clone the repository

```bash
git clone https://github.com/sahan11111/ecommerce.git
cd ecommerce
```

### 2️⃣ Backend setup

```bash
# Create and activate a virtual environment
python -m venv venv

# macOS / Linux
source venv/bin/activate
# Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Create an admin user
python manage.py createsuperuser

# Start the development server
python manage.py runserver
```

The API will be available at **http://127.0.0.1:8000/**

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
npm start
```

The app will open at **http://localhost:3000/**

### 4️⃣ Environment variables

Create a `.env` file in the project root. Example:

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

# Database (only if using PostgreSQL)
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

For the frontend, add your payment keys (for example a PayPal client ID and Khalti public key) in `frontend/.env`.

> ⚠️ **Never commit real secrets.** Keep `.env` files out of version control by adding them to `.gitignore`.

---

## 📚 API Documentation

Interactive documentation is generated with **drf-yasg**. With the server running, open:

| Docs | URL |
|---|---|
| Swagger UI | `http://127.0.0.1:8000/swagger/` |
| ReDoc | `http://127.0.0.1:8000/redoc/` |

### Authentication flow

1. `POST` your credentials to the token endpoint to receive an **access** and **refresh** token.
2. Send the access token with each protected request:
   ```
   Authorization: Bearer <access_token>
   ```
3. Use the refresh token to get a new access token when it expires.

---

## 💳 Payments

| Provider | Region | Integration |
|---|---|---|
| **PayPal** | International | `@paypal/react-paypal-js` |
| **Khalti** | Nepal | Khalti Checkout |

---

## 🗺️ Roadmap

- [ ] Shopping cart and checkout flow
- [ ] Order management and order history
- [ ] Vendor dashboard with sales analytics
- [ ] Product reviews and ratings
- [ ] Search, filters and categories
- [ ] Docker setup for one-command deployment
- [ ] Automated tests and CI pipeline

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Sahan Takhachhen**

[![GitHub](https://img.shields.io/badge/GitHub-sahan11111-181717?style=for-the-badge&logo=github)](https://github.com/sahan11111)

Open to collaborations and internships. Feel free to reach out!

---

<div align="center">

⭐ **If you found this project useful, please give it a star!** ⭐

</div>
