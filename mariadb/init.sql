-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
    id_article INT AUTO_INCREMENT PRIMARY KEY,
    nom_article VARCHAR(255) NOT NULL,
    quantity INT NOT NULL
);