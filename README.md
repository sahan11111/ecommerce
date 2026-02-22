# Ecommerce — Multi‑Vendor Programming Marketplace

A multi-vendor ecommerce web application for a programming marketplace (college curriculum project).

- **Backend:** Django + Django REST Framework (DRF)
- **Frontend:** React (Create React App)

---

## Features (High Level)

- Multi-vendor marketplace concept (vendors can list products)
- REST API backend (DRF)
- JWT authentication (`djangorestframework-simplejwt`)
- API documentation with Swagger/OpenAPI (`drf-yasg`)
- Payment integrations on frontend: **PayPal** and **Khalti**
- Media/product images support (see `media/` and `product_imgs/`)

> If you want, tell me the exact features you implemented (cart, checkout, orders, vendor dashboard, admin, etc.) and I’ll customize this list accurately.

---

## Tech Stack

### Backend
- Python
- Django `5.0.7`
- Django REST Framework `3.15.2`
- SimpleJWT `5.3.1`
- Swagger docs: `drf-yasg`
- Environment variables: `python-dotenv`
- PostgreSQL driver: `psycopg2-binary` *(SQLite is also present in the repo for local dev)*

### Frontend
- React 18 (Create React App)
- Bootstrap 5
- Axios
- React Router
- ApexCharts
- PayPal React SDK
- Khalti Checkout

---

## Repository Structure

