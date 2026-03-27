# EasyBuy Global API

## Overview

EasyBuy Global API is a RESTful backend service built with Node.js and
Express.js that powers a modern e-commerce platform. The API manages
user authentication, product and category management, shopping cart
functionality, checkout processing, and order management.

The system is designed with security, scalability, and modular
architecture in mind using:

-   MongoDB for database storage
-   Mongoose ODM for schema modeling
-   JWT authentication for secure routes
-   OTP verification via email for user verification and password
    recovery

This backend can power a web, mobile, or third‑party e‑commerce client
application.

------------------------------------------------------------------------

# Core Features

## User Management

Users can create accounts, manage profiles, and interact with the
platform securely.

### Register User

Endpoint: POST /register

Functionality: - Creates a new user account - Hashes the password using
bcrypt - Generates a One Time Password (OTP) for email verification -
Sends OTP to the user's email

Required Fields: - username - gmail - password

Default values: - admin: false - verified: false

------------------------------------------------------------------------

### Get All Users

Endpoint: GET /users\
Protected Route: Admin only

Returns a list of all registered users.

------------------------------------------------------------------------

### Get User By ID

Endpoint: GET /users/:id\
Protected Route: Authenticated users

Returns details for a specific user.

------------------------------------------------------------------------

### Update User

Endpoint: PUT /users/:id\
Protected Route: Authenticated users

Allows users to update profile information.

------------------------------------------------------------------------

### Delete User

Endpoint: DELETE /users/:id\
Protected Route: Admin only

Removes a user from the system.

------------------------------------------------------------------------

# Authentication System

### Sign In

Endpoint: POST /signin

Functionality: - Validates user credentials - Compares passwords using
bcrypt - Generates a JWT token for authentication

The token is required to access protected routes.

------------------------------------------------------------------------

# Password Recovery System

### Request Password Reset

Endpoint: POST /password/resetRequest

-   Generates OTP
-   Sends OTP to user email

### Validate OTP

Endpoint: POST /password/validate

-   Confirms OTP validity
-   Ensures token has not expired

### Reset Password

Endpoint: POST /password/reset

-   Allows the user to set a new password
-   Password is hashed before saving

------------------------------------------------------------------------

# Category Management

### Create Category

Endpoint: POST /product/category\
Protected Route: Admin only

Creates a new product category.

### Get Categories

Endpoint: GET /categories

Returns all categories.

### Update Category

Endpoint: PUT /product/category/:id\
Protected Route: Admin only

Updates a category.

### Delete Category

Endpoint: DELETE /product/category/:id\
Protected Route: Admin only

Deletes a category.

------------------------------------------------------------------------

# Product Management

### Create Product

Endpoint: POST /products\
Protected Route: Admin only

Creates a new product.

Typical fields:

-   name
-   price
-   color
-   size
-   category
-   image URL

### Get All Products

Endpoint: GET /products

Returns products with optional filtering by:

-   name
-   color
-   size
-   category

### Get Product By ID

Endpoint: GET /products/:id

Returns detailed information for a single product.

### Update Product

Endpoint: PUT /products/:id\
Protected Route: Admin only

Updates product details.

### Delete Product

Endpoint: DELETE /products/:id\
Protected Route: Admin only

Removes a product from the store.

------------------------------------------------------------------------

# Shopping Cart System

Each user has one active cart where products can be added before
checkout.

### Add Product to Cart

Adds a product to the user's cart and calculates:

-   item quantity
-   total item price
-   total cart price

### Update Cart Item

Allows users to:

-   Increase product quantity
-   Decrease product quantity

The system automatically recalculates:

-   totalItemPrice
-   totalCartItemPrice

### Remove Item From Cart

Users can remove products from their cart.

### Get Cart

Returns the authenticated user's cart with:

-   product details
-   quantities
-   total prices

------------------------------------------------------------------------

# Checkout System

The checkout process converts the user's cart into an order.

### Checkout Cart

Endpoint: POST /checkout\
Protected Route: Authenticated users

Functionality:

-   Retrieves the user's cart
-   Copies cart items into a new order
-   Calculates totalOrderPrice
-   Saves shipping address and payment method
-   Clears the cart after order creation

Checkout Fields:

-   paymentMethod
-   shippingAddress
    -   country
    -   street
    -   city

------------------------------------------------------------------------

# Order Management

Orders track purchases made by users.

### Order Status Flow

pending → processing → shipped → delivered

Orders can also be cancelled.

### Payment Status

Tracks payment progress:

-   pending
-   paid
-   failed

### Get My Orders

Endpoint: GET /orders/my-orders\
Protected Route: Authenticated users

Returns all orders belonging to the logged-in user.

### Get Order By ID

Endpoint: GET /orders/:id\
Protected Route: Authenticated users

Returns a specific order if it belongs to the user.

### Get All Orders

Endpoint: GET /orders\
Protected Route: Admin only

Returns all orders in the system.

### Update Order Status

Endpoint: PUT /orders/:id\
Protected Route: Admin only

Admins can update:

-   orderStatus
-   paymentStatus

Example:

{ "orderStatus": "shipped", "paymentStatus": "paid" }

------------------------------------------------------------------------

# Email Notification System

The system automatically sends emails for:

-   User OTP verification
-   Password reset requests

This is implemented using Nodemailer.

------------------------------------------------------------------------

# Security Features

### Password Hashing

Passwords are hashed using bcrypt before being stored.

### JWT Authentication

Protected routes require a valid JSON Web Token.

### OTP Verification

Time-limited OTP tokens secure account verification and password
recovery.

### Environment Variables

Sensitive credentials are stored securely in a .env file.

------------------------------------------------------------------------

# Tech Stack

Backend: - Node.js - Express.js

Database: - MongoDB - Mongoose

Security: - JWT - bcrypt

Email: - Nodemailer

Environment Configuration: - dotenv

Development Tools: - Nodemon - Postman

Deployment: - Render

------------------------------------------------------------------------

# Project Structure

controllers/ Business logic for: - users - authentication - products -
carts - orders - checkout

middlewares/ - authentication middleware - admin middleware

schema/ Database models: - User - Product - Category - Cart - Order

routers/ Defines API routes.

------------------------------------------------------------------------

# Installation

1.  Clone repository

git clone `<repository-url>`{=html}

2.  Navigate into project

cd easybuy-api

3.  Install dependencies

npm install

4.  Create .env file

MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret
KITS_EMAIL=your_email EMAIL_PASS=your_email_password

5.  Start server

npm run dev

or

node server.js

------------------------------------------------------------------------

# Future Improvements

-   Payment gateway integration (Stripe / PayPal)
-   Product image upload with Cloudinary
-   Product reviews and ratings
-   Inventory tracking
-   API rate limiting
-   Logging and monitoring

------------------------------------------------------------------------

# Author

Ikaelelo Motlhako

Backend Developer focused on building scalable backend systems using
Node.js, Express, MongoDB, and REST APIs.
