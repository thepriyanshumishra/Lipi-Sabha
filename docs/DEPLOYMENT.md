# Lipi Sabha — Production Deployment & Infrastructure Guide

**Target Environments:** Local SQLite (Development) / PostgreSQL (Production)

---

## 1. Production Architecture Overview

```
                      [ Client HTTPS / Browser ]
                                   │
                                   ▼
                       [ Reverse Proxy / Nginx ]
                        /                     \
                       /                       \
                      ▼                         ▼
            [ Static Assets / CDN ]    [ WSGI / Gunicorn (Port 8000) ]
            (Vite / React Build)                │
                                                ▼
                                      [ Django 5 Application ]
                                                │
                                                ▼
                                    [ Managed PostgreSQL 16+ ]
```

---

## 2. Environment Variables Configuration

Create a secure `.env` file in production (never commit to version control):

```bash
# Security
SECRET_KEY=generate-a-strong-random-50-character-secret
DEBUG=False
ALLOWED_HOSTS=lipisabha.org,www.lipisabha.org,api.lipisabha.org

# Database (PostgreSQL)
DATABASE_URL=postgres://lipi_user:secure_password@db-host:5432/lipi_sabha_prod

# Security Cookies & Headers
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
SECURE_HSTS_SECONDS=31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS=True
SECURE_HSTS_PRELOAD=True

# CORS & CSRF
CORS_ALLOW_ALL_ORIGINS=False
CORS_ALLOWED_ORIGINS=https://lipisabha.org,https://www.lipisabha.org
CSRF_TRUSTED_ORIGINS=https://lipisabha.org,https://www.lipisabha.org
```

---

## 3. Database Migration from SQLite to PostgreSQL

1. Install `psycopg2-binary` and `dj-database-url` in Python:
   ```bash
   pip install psycopg2-binary dj-database-url
   ```
2. Update `DATABASES` in `config/settings.py` to parse `os.environ.get('DATABASE_URL')`.
3. Run migrations on the new database instance:
   ```bash
   python manage.py migrate
   python manage.py seed_demo_data
   ```

---

## 4. Static Files & Frontend Build

1. Build production frontend assets:
   ```bash
   cd frontend
   npm run build
   ```
   Outputs to `frontend/dist/`.
2. Configure Nginx to serve `frontend/dist/` as the static root for client routes, with fallback to `index.html` for client-side routing.
3. Collect Django admin static files:
   ```bash
   cd backend
   python manage.py collectstatic --noinput
   ```

---

## 5. Backup & Disaster Recovery Recommendations

- **Automated Database Snapshots:** Daily continuous WAL archiving for PostgreSQL with 30-day retention.
- **Audit Log Offloading:** Export the immutable `AuditEvent` table weekly to write-once-read-many (WORM) cloud object storage.
