### Project Structure

react-nest-project/
├── backend/
│ ├── Dockerfile # Dockerfile for backend (development or production)
│ ├── Dockerfile.dev # Dockerfile for backend development
│ ├── src/ # Backend source code
│ ├── package.json # Backend dependencies
│ ├── tsconfig.json # TypeScript config (for NestJS)
│ ├── .env # Backend environment variables
│ └── init.sql # SQL file for setting up the database (optional for DB initialization)
│
├── frontend/
│ ├── Dockerfile # Dockerfile for frontend (production)
│ ├── Dockerfile.dev # Dockerfile for frontend development
│ ├── public/ # Frontend public files (like index.html)
│ ├── src/ # Frontend source code
│ ├── package.json # Frontend dependencies
│ ├── .env # Frontend environment variables
│ └── nginx.conf # Nginx configuration for production
│
├── mariadb/ # Folder to hold MariaDB initialization SQL file (optional)
│ └── init.sql # SQL script for creating tables (users, articles, etc.)
│
├── .env # Root environment variables (shared between services)
├── docker-compose.yml # Docker Compose configuration for the whole project
├── .dockerignore # Docker ignore file (to exclude unnecessary files)
└── README.md # Project documentation

### Database access

> sudo docker exec -it mariadb mariadb -u mario -p
