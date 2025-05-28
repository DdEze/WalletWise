# WalletWise
## Proyecto de Gestión de Transacciones con React, MongoDB y Chart.js

![Build Status](https://github.com/tu-usuario/tu-repo/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Last Commit](https://img.shields.io/github/last-commit/tu-usuario/tu-repo)
![Issues](https://img.shields.io/github/issues/tu-usuario/tu-repo)
![PRs](https://img.shields.io/github/issues-pr/tu-usuario/tu-repo)
![React Version](https://img.shields.io/badge/react-18.2.0-blue)
![MongoDB](https://img.shields.io/badge/mongodb-4.4-green)
![Node.js](https://img.shields.io/badge/node-%3E=16.0.0-brightgreen)

## Descripción

Aplicación web para administrar transacciones financieras y categorías, con funcionalidades para crear, editar, eliminar y filtrar datos. También permite gestionar el perfil de usuario (cambiar contraseña y eliminar cuenta). La interfaz está desarrollada en React y la base de datos utiliza MongoDB. Para la visualización de datos se usa Chart.js.

---

## Tecnologías

- Frontend: React.js
- Backend: Node.js + Express (API REST)
- Base de datos: MongoDB
- Librería para gráficos: Chart.js
- Axios para comunicación API
- React Router para navegación

---

## Instalación

### Backend

1. Clonar el repositorio y entrar en la carpeta backend:
   ```bash
   git clone <url-del-repo>
   cd backend

2. Instalar dependencias:
    ```bash
    npm install

3. Configurar variables de entorno en .env:
    ```bash
    MONGODB_URI=<tu_uri_de_mongodb>
    PORT=5000
    JWT_SECRET=<tu_secreto_jwt>

4. Ejecutar servidor backend:
    ```bash
    npm run dev

## Frontend

1. Entrar en la carpeta frontend:
    ```bash
    cd frontend

2. Instalar dependencias:
    ```bash
    npm install

3. Ejecutar aplicación React:
    ```bash
    npm start

4. La app abrirá en http://localhost:3000 por defecto.

```
/backend
  ├─ models/              # Modelos de MongoDB (Category, Transaction, User)
  ├─ routes/              # Rutas API (categories, transactions, users)
  ├─ controllers/         # Lógica de controladores
  ├─ middleware/          # Middleware (auth, error handling)
  ├─ config.js            # Configuraciones y conexión a MongoDB

/frontend
  ├─ src/
  │   ├─ components/       # Componentes React (Categories, Transactions, Profile)
  │   ├─ services/         # Servicios Axios para consumir API
  │   ├─ pages/            # Paginas
  │   ├─ css/              # CSS
  │   ├─ App.css
  │   ├─ App.jsx           # Componente principal
  │   ├─ index.css
  │   ├─ index.js          # Entrada React
  ├─ package.json
```
## Endpoints API Principales

- GET /api/categories — Listar categorías

- POST /api/categories — Crear categoría

- DELETE /api/categories/:id — Eliminar categoría

- GET /api/transactions — Listar transacciones

- POST /api/transactions — Crear transacción

- PUT /api/transactions/:id — Editar transacción

- DELETE /api/transactions/:id — Eliminar transacción

- PUT /api/users/change-password — Cambiar contraseña usuario

- DELETE /api/users/me — Eliminar cuenta usuario

## Configuración adicional

- Asegúrate de tener MongoDB corriendo localmente o usar Mongo Atlas.

- Cambia los valores del .env acorde a tu entorno.

Dependencias principales

- React

- Axios

- React Router DOM

- Chart.js y react-chartjs-2

- Express

- Mongoose

- bcryptjs (para hashing de contraseñas)

- jsonwebtoken (para autenticación JWT)

## MIT License
Copyright (c) 2025 [De Dominicis, Ezequiel Anibal]