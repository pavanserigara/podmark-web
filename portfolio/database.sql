-- Drop old tables if they exist to start fresh with the new structure
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS site_updates;

-- Clients Table
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories within each client (e.g., Posters, Reels, Branding)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Media files for each category
CREATE TABLE media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    media_type ENUM('image', 'video') DEFAULT 'image',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Site Updates (for the news/blog section)
CREATE TABLE site_updates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data for Initial Look
INSERT INTO clients (name, description) VALUES ('BOUGAINVILLEA HOMESTAY', 'A premium homestay experience nestled in nature.');
SET @client_id = LAST_INSERT_ID();

INSERT INTO categories (client_id, name) VALUES (@client_id, 'Posters');
SET @cat_id = LAST_INSERT_ID();

-- Using placeholders for media until actual files are uploaded
INSERT INTO media (category_id, file_path) VALUES (@cat_id, 'https://images.unsplash.com/photo-1602322624020-6e4359629671?auto=format&fit=crop&q=80');
INSERT INTO media (category_id, file_path) VALUES (@cat_id, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80');
INSERT INTO media (category_id, file_path) VALUES (@cat_id, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80');
