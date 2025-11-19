-- Add authentication columns to customers table
-- Note: email and password columns already exist in your table

-- Add role column only (comment out if it already exists)
ALTER TABLE customers 
ADD COLUMN role ENUM('USER', 'ADMIN') DEFAULT 'USER';

-- Update existing customer to be admin (using customer_id = 1 for example)
-- Password: admin123 (bcrypt hashed)
UPDATE customers 
SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 
    role = 'ADMIN'
WHERE customer_id = 1;

-- Update another existing customer to be test user (using customer_id = 2 for example)
-- Password: test123 (bcrypt hashed)
UPDATE customers 
SET password = '$2a$10$e0MYzXyjpJS7Pd0RVvHwHe1NoNknz0aVwqz5JhfJ2jGNanECGH/Ty', 
    role = 'USER'
WHERE customer_id = 2;
