# CommerceFlow - A Microservices Portfolio Project in TypeScript

CommerceFlow is an advanced microservices-based portfolio project that demonstrates modern back-end development techniques using TypeScript, NestJS, and Docker. The project showcases a scalable, production-grade architecture featuring an API Gateway, automated testing, and CI/CD integration.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Services](#services)
  - [Catalog Service](#catalog-service)
  - [Order Service](#order-service)
  - [API Gateway](#api-gateway)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the Project](#running-the-project)
- [Testing](#testing)
  - [Unit & End-to-End Tests](#unit--end-to-end-tests)
  - [Integration Tests](#integration-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

**CommerceFlow** is built with a microservices architecture to decouple business domains and demonstrate robust, scalable back-end solutions. Each microservice is developed in TypeScript using NestJS and containerized using Docker. An API Gateway acts as a centralized entry point, routing requests to the appropriate service based on URL paths.

---

## Services

### Catalog Service

- **Port:** 3001  
- **Responsibilities:**  
  - Manage products and inventory using an in-memory store.
  - Expose endpoints:
    - `GET /products` – Retrieve a list of products.
    - `POST /products` – Create a new product.
    - `GET /products/:id` – Retrieve a product by its ID.

### Order Service

- **Port:** 3002  
- **Responsibilities:**  
  - Manage customer orders with an in-memory store.
  - Expose endpoints:
    - `GET /orders` – Retrieve a list of orders.
    - `POST /orders` – Create a new order.
    - `GET /orders/:id` – Retrieve an order by its ID.

### API Gateway

- **Port:** 3000  
- **Responsibilities:**  
  - Serve as the single entry point to route requests to the appropriate microservice.
  - Dynamic routing based on URL path:
    - Requests starting with `/catalog` are forwarded to the Catalog Service.
    - Requests starting with `/orders` are forwarded to the Order Service.
  - Supports multiple HTTP methods (GET, POST, PUT, DELETE).

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) & Docker Compose
- [Node.js](https://nodejs.org/en/) and npm (for local development and testing)

### Running the Project

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/commerceflow.git
   cd commerceflow
