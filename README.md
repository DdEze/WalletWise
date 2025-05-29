# WalletWise

![React Version](https://img.shields.io/badge/react-18.2.0-blue)
![MongoDB](https://img.shields.io/badge/mongodb-4.4-green)
![Node.js](https://img.shields.io/badge/node-%3E=16.0.0-brightgreen)
[![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow?logo=javascript&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML](https://img.shields.io/badge/html5-HTML-orange?logo=html5&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/css3-CSS-blue?logo=css3&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/CSS)

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

### Frontend

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

### Categorías

- GET /api/categories — Listar categorías

- POST /api/categories — Crear categoría

- DELETE /api/categories/:id — Eliminar categoría

### Transacciones

- GET /api/transactions — Listar transacciones

- POST /api/transactions — Crear transacción

- PUT /api/transactions/:id — Editar transacción

- DELETE /api/transactions/:id — Eliminar transacción

- GET /api/transactions/filter — Filtrar transacciones

- GET /api/transactions/summary/monthly — Resumen mensual de transacciones

- GET /api/transactions/balance — Obtener balance actual

### Usuarios

- POST /api/users/register — Registrar nuevo usuario

- POST /api/users/login — Iniciar sesión

- POST /api/users/logout — Cerrar sesión

- PUT /api/users/change-password — Cambiar contraseña del usuario

- DELETE /api/users/me — Eliminar cuenta de usuario

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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
