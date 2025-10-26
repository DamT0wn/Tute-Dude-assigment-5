# Assignment 5 — Frontend (Node/Express) + Backend (Flask)

This repository contains a small example of an Express frontend that serves a form and forwards submissions to a Flask backend. It includes Dockerfiles and a `docker-compose.yml` file so you can run both services in containers.

## Structure

- `frontend/` — Express app
  - `public/index.html` — form UI
  - `server.js` — Express server that forwards submissions to the Flask backend
  - `package.json`
  - `Dockerfile`

- `backend/` — Flask app
  - `app.py` — Flask endpoint that processes the form
  - `requirements.txt`
  - `Dockerfile`

- `docker-compose.yml` — compose file that builds and runs both services
- `.gitignore` — ignores node_modules, .vscode, python cache, etc.

## How it works

- The user opens the frontend at `http://localhost:3000`.
- The form is submitted to the Express server (`POST /submit`).
- The Express server forwards the JSON payload to the Flask backend at `http://backend:5000/submit` (internal Docker network hostname).
- The Flask backend processes the data and returns JSON that the frontend displays.

## Local (non-Docker) quick run (dev)

### Backend (Flask)

1. Create and activate a Python virtualenv.
2. Install requirements:

```
python -m venv venv; .\venv\Scripts\Activate.ps1; pip install -r backend/requirements.txt
```

3. Run the backend:

```
python backend/app.py
```

The backend will listen on port 5000.

### Frontend (Node)

1. Install dependencies:

```
cd frontend; npm install
```

2. Run the frontend:

```
npm start
```

The frontend will listen on port 3000 and will forward form submissions to the backend.

## Docker (recommended)

Build and start both services with Docker Compose (from repository root):

```
docker compose up --build
```

Then open `http://localhost:3000` in your browser.

## Build and push images to Docker Hub (manual steps)

> Note: pushing images requires you to have a Docker Hub account and to be logged in (`docker login`). I cannot push images for you from here.

Example commands (replace `yourhubuser` and `repo` with your names):

```
# build images
docker build -t yourhubuser/assignment4-frontend:latest ./frontend
docker build -t yourhubuser/assignment4-backend:latest ./backend

# push images
docker push yourhubuser/assignment4-frontend:latest
docker push yourhubuser/assignment4-backend:latest
```

If you want to use images from Docker Hub in `docker-compose.yml`, replace the `build:` sections with `image: yourhubuser/assignment4-frontend:latest` and `image: yourhubuser/assignment4-backend:latest`.

## Push code to GitHub

1. Initialize git (if not already):

```
git init
git add .
git commit -m "Add frontend and backend scaffold for assignment 4"
# create remote repo on GitHub (manually or via gh cli) then:
git remote add origin https://github.com/<your-user>/<your-repo>.git
git branch -M main
git push -u origin main
```

Note: This repo's `.gitignore` already excludes `frontend/node_modules` and `.vscode`.

## Next steps / Notes

- If you want the browser to directly call the backend (without proxying through Express), you'd need to expose the backend on a routable host and handle CORS in Flask. The current setup forwards from Express so the browser only talks to the frontend origin.
- To push images and code to remote registries, run the commands above locally where you have credentials.

If you'd like, I can:
- Add a tiny GitHub Actions workflow that builds and pushes images (you'll need to provide secrets), or
- Build and push images here if you provide Docker Hub credentials (not recommended in chat). 

