### Project Structure
react-node-project/
├── backend/
│   ├── src/                  # Source files for NestJS backend
│   ├── dist/                 # Compiled backend files (ignored by Git)
│   ├── Dockerfile            # For production
│   ├── Dockerfile.dev        # For development
│   ├── package.json          # Backend dependencies
│   ├── package-lock.json     # Backend lock file
│   └── .env                  # Backend environment variables
├── frontend/
│   ├── public/               # Static frontend assets
│   ├── src/                  # React frontend source files
│   ├── build/                # Built frontend files (ignored by Git)
│   ├── Dockerfile            # For production
│   ├── Dockerfile.dev        # For development
│   ├── nginx.conf            # NGINX configuration for production
│   ├── package.json          # Frontend dependencies
│   ├── package-lock.json     # Frontend lock file
│   └── .env                  # Frontend environment variables
├── .dockerignore             # Docker ignore file
├── .gitignore                # Git ignore file
├── docker-compose.yml        # For orchestrating backend and frontend
└── README.md                 # Project documentation


