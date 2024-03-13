const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.REACT_APP_DB_DATABASE}`;
const useDatabaseQuery = `USE ${process.env.REACT_APP_DB_DATABASE}`;

const createAdminTableQuery = `
CREATE TABLE IF NOT EXISTS admin (
    admin_id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(60) NOT NULL,
    lastname VARCHAR(60) NOT NULL,
    phone BIGINT(10) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE INDEX admin_id_UNIQUE (admin_id ASC),
    UNIQUE INDEX phone_UNIQUE (phone ASC),
    UNIQUE INDEX email_UNIQUE (email ASC));
`

const insertAdminTableQuery = `
INSERT IGNORE INTO admin 
  (firstname, email, password) 
VALUES 
  ("admin", "admin@admin", "admin");
`

const createRegisterTableQuery = `
CREATE TABLE IF NOT EXISTS register (
    user_id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(60) NOT NULL,
    lastname VARCHAR(60) NOT NULL,
    phone BIGINT(10) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE INDEX user_id_UNIQUE (user_id ASC),
    UNIQUE INDEX phone_UNIQUE (phone ASC),
    UNIQUE INDEX email_UNIQUE (email ASC),
    PRIMARY KEY (user_id));
`;

const productsList = `
CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT,
    product_type VARCHAR(60) NOT NULL,
    category VARCHAR(90) NOT NULL,
    name VARCHAR(90) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description MEDIUMTEXT NOT NULL,
    location VARCHAR(45) NOT NULL,
    color VARCHAR(60) NOT NULL,
    alteration VARCHAR(45) NOT NULL,
    size VARCHAR(45) NOT NULL,
    measurements TINYTEXT NOT NULL,
    worn INT NOT NULL,
    price INT NOT NULL,
    accepted_by_admin VARCHAR(60) NOT NULL,
    seller_id INT NOT NULL,
    UNIQUE INDEX id_UNIQUE (id ASC),
    FOREIGN KEY (seller_id) REFERENCES register(user_id));
`;

// const insertWomenProductsQuery = `
// INSERT IGNORE INTO women
//   (category, name, image, description, location, color, alteration, size, measurements, worn, price)
// VALUES
//   ("", "");
// `

// const kidproducts = `
// CREATE TABLE IF NOT EXISTS kids (
// id INT NOT NULL AUTO_INCREMENT,
// category VARCHAR(90) NOT NULL,
// name VARCHAR(90) NOT NULL,
// image VARCHAR(255) NOT NULL,
// description MEDIUMTEXT NOT NULL,
// location VARCHAR(45) NOT NULL,
// color VARCHAR(60) NOT NULL,
// alteration VARCHAR(45) NOT NULL,
// size VARCHAR(45) NOT NULL,
// measurements TINYTEXT NOT NULL,
// worn INT NOT NULL,
// price INT NOT NULL,
// UNIQUE INDEX id_UNIQUE (id ASC))
// `;
// const jewelleryproducts = `
// CREATE TABLE IF NOT EXISTS jewellery (
// id INT NOT NULL AUTO_INCREMENT,
// category VARCHAR(90) NOT NULL,
// name VARCHAR(90) NOT NULL,
// image VARCHAR(255) NOT NULL,
// description MEDIUMTEXT NOT NULL,
// location VARCHAR(45) NOT NULL,
// color VARCHAR(60) NOT NULL,
// alteration VARCHAR(45) NOT NULL,
// size VARCHAR(45) NOT NULL,
// measurements TINYTEXT NOT NULL,
// worn INT NOT NULL,
// price INT NOT NULL,
// UNIQUE INDEX id_UNIQUE (id ASC))
// `;
// const booksproducts = `
// CREATE TABLE IF NOT EXISTS books (
// id INT NOT NULL AUTO_INCREMENT,
// category VARCHAR(90) NOT NULL,
// name VARCHAR(90) NOT NULL,
// image VARCHAR(255) NOT NULL,
// description MEDIUMTEXT NOT NULL,
// location VARCHAR(45) NOT NULL,
// color VARCHAR(60) NOT NULL,
// alteration VARCHAR(45) NOT NULL,
// size VARCHAR(45) NOT NULL,
// measurements TINYTEXT NOT NULL,
// worn INT NOT NULL,
// price INT NOT NULL,
// UNIQUE INDEX id_UNIQUE (id ASC))
// `;

const cartproducts = `
CREATE TABLE IF NOT EXISTS cart (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    product_type VARCHAR(60) NOT NULL,
    category VARCHAR(90) NOT NULL,
    name VARCHAR(90) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description MEDIUMTEXT NOT NULL,
    location VARCHAR(45) NOT NULL,
    color VARCHAR(60) NOT NULL,
    alteration VARCHAR(45) NOT NULL,
    size VARCHAR(45) NOT NULL,
    measurements TINYTEXT NOT NULL,
    worn INT NOT NULL,
    price INT NOT NULL,
    accepted_by_admin VARCHAR(60) NOT NULL,
    seller_id INT NULL,
    userid  INT NULL, 
    UNIQUE INDEX id_UNIQUE (id ASC));
`;

const wishproducts = `
CREATE TABLE IF NOT EXISTS wish (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  product_type VARCHAR(60) NOT NULL,
  category VARCHAR(90) NOT NULL,
  name VARCHAR(90) NOT NULL,
  image VARCHAR(255) NOT NULL,
  description MEDIUMTEXT NOT NULL,
  location VARCHAR(45) NOT NULL,
  color VARCHAR(60) NOT NULL,
  alteration VARCHAR(45) NOT NULL,
  size VARCHAR(45) NOT NULL,
  measurements TINYTEXT NOT NULL,
  worn INT NOT NULL,
  price INT NOT NULL,
  accepted_by_admin VARCHAR(60) NOT NULL,
  seller_id INT NULL,
  userid  INT NULL,
  UNIQUE INDEX id_UNIQUE (id ASC));
`;

const createSellerAccount = `
CREATE TABLE IF NOT EXISTS selleraccount (
    account_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    remittance VARCHAR(45) NOT NULL,
    instagram VARCHAR(60) NULL,
    phone BIGINT(10) NOT NULL,
    upi_id VARCHAR(60) NOT NULL,
    description TINYTEXT NULL,
    UNIQUE INDEX account_id_UNIQUE (account_id ASC));
  
`;

const contactinfo = `
  CREATE TABLE IF NOT EXISTS contact (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(60) NOT NULL,
    enquiry VARCHAR(90)NOT NULL,
    UNIQUE INDEX id_UNIQUE (id ASC),
    UNIQUE INDEX email_UNIQUE (email ASC));
`

module.exports = {
  createAdminTableQuery,
  insertAdminTableQuery,
  createRegisterTableQuery,
  createDatabaseQuery,
  useDatabaseQuery,
  productsList,
  // Womenproducts,
  // kidproducts,
  // jewelleryproducts,
  // booksproducts,
  createSellerAccount,
  cartproducts,
  wishproducts,
  contactinfo
};
