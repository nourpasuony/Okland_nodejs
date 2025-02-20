﻿# Okland_nodejs
Product Warranty Management Dashboard

📌 Project Overview

This project is a dashboard system that allows administrators to create and manage products. Each product group is assigned a QR code, which is printed and placed on product boxes. Inside each box, every individual product has a unique identification code, enabling the warranty activation process.

Customers can scan the product code through a dedicated client page to register their product and determine its warranty period. By scanning the product, customers can check the latest expiration date of their warranty.

🚀 Features

Admin Dashboard: Manage and create products.

QR Code Generation: Generate and assign QR codes to product groups.

Unique Identification Code: Each product has a unique code for tracking.

Warranty Activation: Customers can scan and register their products.

Warranty Validation: Customers can check the warranty expiration date.

User-Friendly Interface: A simple and interactive client-side page for scanning products.

🛠️ Technologies Used

Node.js & Express.js - Backend framework

MongoDB - Database for storing product and warranty data

QR Code Generator - Library for creating QR codes

JWT Authentication - Secure authentication mechanism

Swagger - API documentation

📌 Installation & Setup

Clone the repository:

git clone https://github.com/your-username/your-repo.git

Navigate to the project folder:

cd your-repo

Install dependencies:

npm install

Configure environment variables in a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the server:

npm start

🔗 API Endpoints

POST /admin/products - Create a new product

GET /products/:id - Get product details

POST /warranty/register - Register product warranty

GET /warranty/check/:id - Check warranty status

Full API documentation is available using Swagger.
