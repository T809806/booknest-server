# 📚 BookNest - Server

This repository contains the backend API for the BookNest application. It is built using Express.js, TypeScript, MongoDB, and JWT Authentication.

## 🌐 Live API

https://booknest-server-lfvx.onrender.com

## ScreenShot 
<img width="1907" height="838" alt="image" src="https://github.com/user-attachments/assets/65eb4515-6325-4c09-b090-02ad4137836d" />


## 🚀 Features

- User Registration
- User Login
- JWT Authentication
- MongoDB Database
- Add Book
- Get All Books
- Featured Books API
- Search Books
- Category Filter
- Sorting
- Pagination
- Book Details
- Delete Book
- Protected API Routes
- CORS Enabled

## 🛠️ Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT
- bcryptjs
- dotenv
- cors

## 📂 Folder Structure

```
src
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── utils
├── app.ts
└── server.ts
```

## ⚙️ Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGODB_URI=mongodb_connection_string

JWT_SECRET=secret_key
```

## 📦 Installation

Clone

```bash
git clone https://github.com/T809806/booknest-server.git
```

Install

```bash
npm install
```

Run Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Run Production

```bash
npm start
```

## 📚 API Endpoints

### Authentication

POST

```
/api/v1/auth/register
```

POST

```
/api/v1/auth/login
```

---

### Books

GET

```
/api/v1/books
```

GET

```
/api/v1/books/:id
```

POST

```
/api/v1/books/add
```

DELETE

```
/api/v1/books/:id
```

## 🔐 Authentication

JWT Bearer Token Required

Protected Routes

- Add Book
- Delete Book

## 👨‍💻 Developer

**Tahiya Akter**

Junior Frontend Developer

GitHub

https://github.com/T809806

LinkedIn

https://www.linkedin.com/in/tahiya-akter-webdev/
