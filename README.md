# URL Shortener API

## Descripción

Esta es una API RESTful desarrollada con **Node.js**, **Express**, y **Sequelize** que permite a los usuarios:
- Crear, obtener, actualizar y eliminar URLs acortadas.
- Manejar usuarios y roles con autenticación basada en JWT.
- Realizar operaciones CRUD para cada entidad del sistema.

El proyecto sigue el patrón MVC (Modelo-Vista-Controlador) y está estructurado de manera modular para ser mantenible y escalable.

---

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para bases de datos SQL.
- **MySQL**: Base de datos relacional.
- **bcrypt**: Hashing seguro para contraseñas.
- **JWT**: Autenticación segura basada en tokens.

---

## Requisitos Previos

1. **Node.js**: [Descargar Node.js](https://nodejs.org/)
2. **XAMPP o MySQL**: Servidor para la base de datos.
3. **Git**: Para clonar el repositorio.
4. **ThunderClient/Postman**: Herramientas para probar la API.

---

## Configuración del Proyecto

### 1. Clonar el Repositorio
```bash
git clone https://github.com/juanlurbe/url-shortener.git
cd url-shortener

npm install

npm run start

###Endpoints Principales

Usuarios
POST /users: Crear un usuario.
POST /users/login: Iniciar sesión.
GET /users/me: Obtener datos del usuario logueado.
GET /users: Listar usuarios (Solo Admin).

URLs
POST /urls: Crear una URL acortada.
GET /urls: Listar todas las URLs (Solo Admin) o las propias del usuario.
GET /urls/: Obtener una URL por ID.
PUT /urls/: Actualizar una URL (Solo propietario).
DELETE /urls/: Eliminar una URL (Solo propietario).

Roles
GET /roles: Listar roles (Solo Admin).



