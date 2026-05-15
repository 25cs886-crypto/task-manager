# Flowboard Task Manager

Production-ready MERN full-stack task management platform with realtime collaboration, secure JWT auth, responsive SaaS dashboard UI, and deployment-ready architecture.

## Tech Stack

### Frontend

- React + Vite
- React Router DOM
- Tailwind CSS
- Axios with interceptors
- Context API
- React Hot Toast
- Framer Motion
- Socket.IO client

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs
- Socket.IO
- Helmet + CORS + Rate limiting + Input sanitization

## Project Structure

client/src

- components: reusable UI units
- context: auth, theme, task global state
- hooks: custom logic (debounce, infinite scroll)
- layouts: auth and dashboard page shells
- pages: Login, Register, Dashboard, Profile, NotFound
- routes: central route map and protected routes
- services: API layer and endpoint wrappers
- utils: constants, validators, formatters

server/src

- config: env, DB, CORS
- models: User and Task schemas
- middleware: auth, validation, async, global errors
- validators: request validation modules
- services: business logic
- controllers: route handlers
- routes: auth and task APIs
- sockets: realtime socket server
- utils: response format and errors

## Environment Variables

### Backend (server/.env)

- NODE_ENV=development
- PORT=5000
- CLIENT_URL=http://localhost:5173
- MONGODB_URI=<your mongodb atlas uri>
- JWT_SECRET=<your secure random secret>
- JWT_EXPIRES_IN=7d

### Frontend (client/.env)

- VITE_API_URL=http://localhost:5000/api

## Install and Run

1. Install dependencies from root:
   npm install
2. Create env files from templates:
   server/.env.example -> server/.env
   client/.env.example -> client/.env
3. Start backend:
   npm run server
4. Start frontend in another terminal:
   npm run client

## API Endpoints

### Auth

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- PUT /api/auth/me

### Tasks

- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/status
- PATCH /api/tasks/reorder/list
- GET /api/tasks/analytics/summary

## Core Features

- Secure authentication flow
  - registration/login with hashed passwords
  - JWT token with expiration
  - protected backend routes
  - persistent frontend auth state
- Task management
  - create/edit/delete tasks
  - complete/pending updates
  - priority, due date, description
  - search + filters + sort
- Realtime sync with Socket.IO
  - task create/update/delete/status sync
  - live reordering updates
- Advanced UX
  - dark mode toggle
  - drag and drop task ordering
  - analytics cards
  - optimistic updates
  - infinite scrolling
  - loading/error/empty/skeleton states

## Security

- bcrypt password hashing
- JWT verification middleware
- ownership checks on every task operation
- express-mongo-sanitize
- helmet headers
- rate limiting
- centralized error responses

## Deployment

### Frontend (Vercel)

1. Import client directory into Vercel.
2. Set build command: npm run build
3. Set output directory: dist
4. Add env var VITE_API_URL to deployed backend URL + /api

### Backend (Render/Railway)

1. Deploy server directory as Node service.
2. Start command: npm run start
3. Add backend env vars from above.
4. Set CLIENT_URL to deployed frontend domain.
5. Use MongoDB Atlas connection string for MONGODB_URI.

## Production Notes

- Use a long random JWT secret.
- Configure strict CORS with exact frontend domain.
- Enable MongoDB IP allowlist and DB user with least privilege.
- Add monitoring/log aggregation in production.
- Add unit/integration tests before release.
"# task-manager" 
