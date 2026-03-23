# EasyBuy Global API

## Overview

EasyBuy Global API is a backend RESTful service built with Node.js and
Express that powers an e-commerce style platform. The API handles user
authentication, product management, password recovery using OTP
verification, and secure user account management.

The system is designed with scalability and security in mind, using
MongoDB for data persistence and JWT-based authentication for protected
routes.

This backend can serve as the foundation for an e-commerce web or mobile
application.

------------------------------------------------------------------------

# Core Features

## User Management

Users can register, manage their accounts, and interact with the
platform securely.

### Register User

Endpoint: POST /register

Functionality: - Creates a new user account - Hashes the password using
bcrypt before storing it - Generates an OTP for email verification -
Sends OTP to the user's email address

Fields required: - username - gmail - password

Default values applied: - admin: false - verified: false

### Get All Users

Endpoint: GET /users

Returns a list of all users stored in the database.

### Get User By ID

Endpoint: GET /users/:id

Returns detailed information for a specific user.

### Update User

Endpoint: PUT /users/:id

Protected Route: Requires authentication via JWT.

Allows a user to update their account details.

### Delete User

Endpoint: DELETE /users/:id

Protected Route: Requires authentication.

Allows a user to remove their account.

------------------------------------------------------------------------

# Authentication System

Authentication routes manage login and password recovery processes.

## Sign In

Endpoint: POST /signin

Functionality: - Authenticates users using email and password -
Validates password using bcrypt - Generates a JWT token for session
authentication

The token is required to access protected routes.

------------------------------------------------------------------------

# Password Recovery System

The application includes a secure password reset workflow using OTP
verification.

## Request Password Reset

Endpoint: POST /password/resetRequest

Functionality: - Generates a password reset OTP - Sends the OTP to the
user's email

## Validate Password Reset OTP

Endpoint: POST /password/validate

Functionality: - Verifies that the OTP submitted by the user is valid -
Ensures the OTP has not expired

## Reset Password

Endpoint: POST /password/reset

Functionality: - Allows the user to set a new password after OTP
validation - Password is securely hashed before being stored

------------------------------------------------------------------------

# Product Management

Product operations allow administrators to create, update, and manage
products.

## Create Product

Endpoint: POST /products

Protected Route: Requires authentication.

Creates a new product entry in the database.

Typical product fields: - name - price - color - size (optional) -
category - image URL

## Get All Products

Endpoint: GET /products

Returns all available products.

## Get Product By ID

Endpoint: GET /products/:id

Returns information about a specific product.

## Update Product

Endpoint: PUT /products/:id

Protected Route: Requires authentication.

Allows updating product information.

## Delete Product

Endpoint: DELETE /products/:id

Protected Route: Requires authentication.

Removes a product from the database.

------------------------------------------------------------------------

# Email Notification System

The application sends automated emails for:

-   OTP verification during registration
-   Password reset requests

This functionality ensures secure user verification and account
recovery.

------------------------------------------------------------------------

# Security Features

The API includes several security practices:

Password Hashing - bcrypt is used to hash passwords before storing them.

JWT Authentication - Protected routes require a valid JWT token.

OTP Verification - Time-limited OTP tokens help secure account
verification and password resets.

Environment Variables Sensitive credentials such as: - database
connection strings - email credentials - JWT secrets

are stored securely using environment variables.

------------------------------------------------------------------------

# Tech Stack

Backend Framework - Node.js - Express.js

Database - MongoDB - Mongoose ODM

Authentication & Security - JSON Web Tokens (JWT) - bcrypt

Email Service - Nodemailer

Environment Configuration - dotenv

Deployment - Render

Development Tools - Nodemon - Postman for API testing

------------------------------------------------------------------------

# Project Structure

controllers/ Contains business logic for: - users - authentication -
products

middlewares/ Contains custom middleware such as: - authentication
middleware

models/ Defines MongoDB schemas using Mongoose.

routers/ Defines API routes and connects them to controllers.

------------------------------------------------------------------------

# Installation Guide

1.  Clone the repository

git clone `<repository-url>`{=html}

2.  Navigate into the project

cd project-folder

3.  Install dependencies

npm install

4.  Create a .env file and configure:

MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email EMAIL_PASS=your_email_password

5.  Start the server

npm run dev

or

node server.js

------------------------------------------------------------------------

# Deployment

The API is deployed using Render.

Steps include: - connecting the GitHub repository - setting environment
variables - enabling automatic deployments

------------------------------------------------------------------------

# Future Improvements

Potential improvements for the system include:

-   Role-based access control (admin vs user)
-   Product category management
-   Shopping cart system
-   Order processing system
-   Payment integration
-   API rate limiting
-   Logging and monitoring

------------------------------------------------------------------------

# Author

Ikaelelo Motlhako

Backend Developer focused on building secure and scalable backend
systems using Node.js and modern web technologies.

------------------------------------------------------------------------
