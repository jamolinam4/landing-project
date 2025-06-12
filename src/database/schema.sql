-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS landing_page_db;
USE landing_page_db;

-- Crear tabla de contactos
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de suscriptores
CREATE TABLE IF NOT EXISTS subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de datos de clientes
CREATE TABLE IF NOT EXISTS Customer_Data (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    EmailAddress VARCHAR(100) NOT NULL,
    City VARCHAR(100),
    Age INT,
    Gender VARCHAR(20),
    SubscriptionDate DATETIME DEFAULT CURRENT_TIMESTAMP
);