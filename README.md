# 🔐 API REST - Sistema de Login con MongoDB

API REST completa para autenticación y gestión de usuarios con Node.js, Express, MongoDB y JWT.

## 🚀 Características

- ✅ Registro de usuarios con encriptación de contraseñas (bcrypt)
- ✅ Login con JWT (JSON Web Tokens)
- ✅ CRUD completo de usuarios (Create, Read, Update, Delete)
- ✅ Protección de rutas con middleware de autenticación
- ✅ Roles de usuario (admin/user)
- ✅ Validación de datos
- ✅ CORS habilitado

## ⚡ Inicio Rápido

```bash
# 1. Iniciar MongoDB
net start MongoDB

# 2. Instalar dependencias del backend
cd backend
npm install

# 3. Iniciar el servidor
npm start
```

**Backend:** http://localhost:4000  
**Frontend:** http://localhost/loginMongo/ (con XAMPP)

---

## 📁 Estructura del Proyecto

```
loginMongo/
├── backend/                     # 🔧 API REST (Node.js + Express)
│   ├── src/
│   │   ├── controllers/         # Lógica de negocio
│   │   │   ├── authController.js    # Registro y login
│   │   │   └── userController.js    # CRUD de usuarios
│   │   ├── middleware/          # Autenticación JWT
│   │   │   └── authMiddleware.js
│   │   ├── models/              # Modelos MongoDB
│   │   │   └── User.js
│   │   └── routes/              # Endpoints API
│   │       ├── authRoutes.js    # Rutas públicas
│   │       └── userRoutes.js    # Rutas protegidas
│   ├── .env                     # Variables de entorno
│   ├── .gitignore
│   ├── server.js                # Punto de entrada
│   ├── package.json             # Dependencias backend
│   └── node_modules/            # Dependencias instaladas
│
├── index.html                   # 🎨 Frontend simple (HTML + CSS + JS)
├── test-api.http                # 🧪 Tests de la API
├── README.md                    # 📖 Documentación
└── .gitignore
```

### 🎯 Separación de Responsabilidades

**Backend (`/backend/`):**
- API REST con Express
- Autenticación JWT
- Conexión a MongoDB
- Lógica de negocio

**Frontend (`index.html`):**
- Interfaz de usuario simple
- Sin dependencias (HTML + CSS + JS vanilla)
- Peticiones HTTP al backend

## 📋 Requisitos Previos

1. **Node.js** v14 o superior
2. **MongoDB** instalado y corriendo en `localhost:27017`

### Verificar MongoDB:

```bash
# Windows
net start MongoDB
```

Si no tienes MongoDB instalado: https://www.mongodb.com/try/download/community

## 🔧 Instalación

1. **Instalar dependencias del backend:**

```bash
cd backend
npm install
```

2. **Configurar variables de entorno:**

El archivo `backend/.env` ya está configurado:
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/loginMDB
JWT_SECRET=mi_secreto
```

3. **Iniciar el servidor:**

```bash
cd backend
npm start
```

O para desarrollo con auto-recarga:
```bash
cd backend
npm run dev
```

El servidor estará disponible en: **http://localhost:4000**

4. **Abrir el frontend (opcional):**

Abre `index.html` en tu navegador o usa un servidor local:
```bash
# Con Python
python -m http.server 8000

# Con Node (http-server)
npx http-server

# O simplemente abre index.html en el navegador
```

## 📡 API Endpoints

### 🔓 Rutas Públicas (No requieren autenticación)

#### Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "role": "user"  // "user" o "admin"
}
```

**Respuesta exitosa:**
```json
{
  "msg": "Usuario creado"
}
```

#### Inicio de Sesión
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 🔒 Rutas Protegidas (Requieren JWT)

**Header requerido en todas las peticiones:**
```http
Authorization: Bearer <tu_token_jwt>
```

#### Listar Todos los Usuarios
```http
GET /users
Authorization: Bearer <token>
```

**Respuesta:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "email": "usuario@ejemplo.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Crear Usuario
```http
POST /users
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "nuevo@ejemplo.com",
  "password": "pass123",
  "role": "user"
}
```

#### Actualizar Usuario
```http
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "actualizado@ejemplo.com",
  "role": "admin",
  "password": "nueva_pass"  // Opcional
}
```

#### Eliminar Usuario
```http
DELETE /users/:id
Authorization: Bearer <token>
```

## 🧪 Probar la API

### Con cURL

**Registro:**
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456","role":"user"}'
```

**Login:**
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

**Listar usuarios (con token):**
```bash
curl -X GET http://localhost:4000/users \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### Con Postman o Thunder Client

1. **Registrar usuario:** POST a `/auth/register`
2. **Hacer login:** POST a `/auth/login` → Copiar el token
3. **Usar el token:** Agregar header `Authorization: Bearer <token>`
4. **Probar endpoints protegidos:** GET, POST, PUT, DELETE en `/users`

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **bcryptjs** - Encriptación de contraseñas
- **dotenv** - Variables de entorno
- **CORS** - Comunicación cross-origin

## 🔒 Seguridad

- Las contraseñas se encriptan con **bcrypt** (10 salt rounds)
- Los tokens **JWT** expiran en 1 hora
- Las rutas de usuarios están **protegidas** con middleware
- Las contraseñas **nunca** se devuelven en las respuestas
- Variables sensibles en `.env` (no en git)

## 📦 Scripts Disponibles

```bash
npm start       # Iniciar servidor en producción
npm run dev     # Iniciar con nodemon (auto-reload)
```

## 🗂️ Modelo de Usuario

```javascript
{
  email: String,      // Único, requerido
  password: String,   // Hasheado, requerido
  role: String,       // "user" o "admin", default: "user"
  createdAt: Date,    // Automático
  updatedAt: Date     // Automático
}
```

## 🐛 Solución de Problemas

### MongoDB no conecta
```bash
# Verificar que MongoDB esté corriendo
net start MongoDB

# Verificar puerto
netstat -ano | findstr :27017
```

### Token inválido
- Verifica que el token no haya expirado (1 hora)
- Asegúrate de incluir "Bearer " antes del token
- Verifica que el `JWT_SECRET` no haya cambiado

### Puerto en uso
```bash
# Ver qué proceso usa el puerto 4000
netstat -ano | findstr :4000

# Matar el proceso
taskkill /PID <PID> /F

# O cambiar el puerto en .env
PORT=5000
```

## 🚀 Despliegue

### Preparación para Producción

1. **Usar MongoDB Atlas** (base de datos en la nube)
2. **Configurar variables de entorno** en el servidor
3. **Cambiar JWT_SECRET** a algo más seguro
4. **Habilitar HTTPS**
5. **Configurar rate limiting**

### Plataformas Recomendadas

- **Render** - https://render.com
- **Railway** - https://railway.app
- **Heroku** - https://heroku.com
- **DigitalOcean** - https://digitalocean.com

## 📄 Variables de Entorno

```env
PORT=4000                                    # Puerto del servidor
MONGO_URI=mongodb://localhost:27017/loginMDB # URI de MongoDB
JWT_SECRET=mi_secreto_super_seguro           # Secreto para JWT
```

## 🔄 Flujo de Autenticación

1. Usuario se registra → `/auth/register`
2. Usuario hace login → `/auth/login` → Recibe token JWT
3. Usuario guarda el token
4. Usuario hace peticiones a rutas protegidas con el token
5. Middleware verifica el token
6. Si es válido, permite el acceso

## 📝 Notas

- La base de datos `loginMDB` se crea automáticamente al conectar
- Los tokens expiran en 1 hora por seguridad
- Las contraseñas se hashean con 10 salt rounds
- CORS está habilitado para desarrollo (ajustar en producción)

## 📦 Análisis de Dependencias

### ✅ Dependencias de Producción (TODAS necesarias)

| Paquete | ¿Necesario? | ¿Dónde se usa? | ¿Se puede eliminar? |
|---------|-------------|----------------|---------------------|
| **express** | ✅ SÍ | Servidor HTTP, rutas, middleware | ❌ NO - Es el core del servidor |
| **mongoose** | ✅ SÍ | Conexión a MongoDB, modelos de datos | ❌ NO - Sin esto no hay base de datos |
| **bcryptjs** | ✅ SÍ | Hash de contraseñas en registro/login | ❌ NO - Seguridad crítica |
| **jsonwebtoken** | ✅ SÍ | Generar y verificar tokens JWT | ❌ NO - Sin esto no hay autenticación |
| **dotenv** | ✅ SÍ | Cargar variables de `.env` | ❌ NO - Necesario para configuración |
| **cors** | ✅ SÍ | Permitir peticiones desde el frontend | ❌ NO - Sin esto el HTML no se conecta |

### 🟡 Dependencias de Desarrollo

| Paquete | ¿Necesario? | ¿Para qué? | ¿Se puede eliminar? |
|---------|-------------|------------|---------------------|
| **nodemon** | 🟡 Opcional | Auto-reiniciar servidor en desarrollo | ✅ SÍ - Solo es comodidad |

### 📊 ¿Qué hay en `node_modules`?

Tu proyecto tiene:
- **7 dependencias directas** (las que instalaste)
- **~140 paquetes totales** (incluyendo sub-dependencias)
- **~16 MB de tamaño** (muy optimizado ✅)

**¿Por qué 140 paquetes si solo instalé 7?**

Porque cada dependencia tiene sus propias dependencias:

```
express (30+ sub-dependencias)
├── body-parser
├── cookie
├── debug
└── ...

mongoose (20+ sub-dependencias)
├── mongodb
├── bson
└── ...

jsonwebtoken (10+ sub-dependencias)
├── jws
├── ms
└── ...

nodemon (50+ sub-dependencias)
├── chokidar
├── semver
└── ...
```

### 🎯 Comparación con otros proyectos

| Tipo de Proyecto | Paquetes | Tamaño |
|------------------|----------|--------|
| **Tu API REST** ✅ | ~140 | ~16 MB |
| React básico | ~1,500 | ~200 MB |
| Next.js | ~2,000 | ~300 MB |
| NestJS completo | ~3,000+ | ~500 MB |

**Conclusión:** Tu proyecto está **súper optimizado**. Solo tiene lo necesario, sin bloat. ¡No elimines nada!

---

## 📊 Resumen del Proyecto

| Aspecto | Detalle |
|---------|---------|
| **Backend** | Node.js + Express + MongoDB |
| **Frontend** | HTML + CSS + JavaScript vanilla |
| **Autenticación** | JWT (JSON Web Tokens) |
| **Base de datos** | MongoDB (local o Atlas) |
| **Puerto API** | 4000 |
| **Seguridad** | bcrypt + JWT + CORS |
| **Arquitectura** | API REST + SPA simple |
| **Dependencias** | 7 directas, ~140 totales (~16 MB) |

## 📄 Licencia

ISC

---

**Desarrollado con  usando Node.js + Express + MongoDB + JWT**





