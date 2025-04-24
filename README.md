# 🌟 PerfumeBay 🌟

A full-stack application for buying and trading perfumes.

## 📋 Project Overview

PerfumeBay is a comprehensive web application that allows users to buy, sell, and manage perfume products. This platform connects perfume enthusiasts and enables seamless transactions.

## 🚀 Features

- 👤 **User Authentication**

  - Login and registration system
  - JWT-based authentication and authorization

- 🛍️ **Product Management**

  - Create your own perfume listings
  - View products created by all users
  - Edit and delete your own listings
  - Purchase products from other users
  - View your purchased products list

- 🔜 **Coming Soon**
  - Perfume rental system
  - Dedicated views for rented, sold, and lent items

## 💻 Technology Stack

### Frontend

- 🖌️ Vue.js framework
- 🧩 PrimeVue component library
- 🎨 TailwindCSS for styling
- 🔄 Apollo Client with caching enabled

### Backend

- 🏗️ NestJS with Fastify adapter
- 🚀 Apollo Server for GraphQL implementation
- 🔒 JWT authentication and authorization
- 🗄️ Prisma ORM for database operations

### Database

- 📊 PostgreSQL hosted by Supabase

### API

- 📡 GraphQL for frontend-backend communication

## 🐳 Deployment

The entire project is containerized with Docker for easy setup and deployment.

### Quick Start

1. Clone the repository
2. Open a terminal in the parent folder
3. Run the following command:
   ```
   docker-compose up -d
   ```

## 🔧 Project Structure

```
perfumebay/
├── frontend/          # Vue.js client application
├── backend/           # NestJS server application
├── docker-compose.yml # Docker configuration
└── README.md          # This file
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve PerfumeBay.

## 📝 License

[Your license information here]

---

⭐ Developed with passion for perfume enthusiasts everywhere! ⭐
