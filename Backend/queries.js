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
    payment_status TINYINT(4) NULL,
    buyer_id INT NULL,
    UNIQUE INDEX id_UNIQUE (id ASC),
    FOREIGN KEY (seller_id) REFERENCES register(user_id));
`;

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
    payment_status TINYINT(4) NULL,
    buyer_id INT NULL, 
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
`;

const addressinfo1 = `
CREATE TABLE IF NOT EXISTS billing_address (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  address1 VARCHAR(255) NOT NULL,
  address2 VARCHAR(255),
  pincode VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  buyer_id INT NULL
);
`;

const addressinfo2 = `
CREATE TABLE IF NOT EXISTS shipping_address (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  address1 VARCHAR(255) NOT NULL,
  address2 VARCHAR(255),
  pincode VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  buyer_id INT NULL
);
`;

const loginCheckQuery = "SELECT * FROM register WHERE `email` = ? AND `password` = ?";
const adminLoginQuery = "SELECT * FROM admin WHERE `email` = ? AND `password` = ?";
const retrievingUsersQuery = "SELECT * FROM register";
const addUserQuery = "INSERT INTO register (`firstname`,`lastname`,`email`,`password`,`phone` ) VALUES (?)";
const updateUserQuery = "UPDATE register SET ? WHERE email = ?";
const retrievingSellersQuery = "select * from selleraccount";
const addingSellerAccountQuery = "INSERT INTO selleraccount SET (?)";
const adminAcceptedProductsQuery = "select * from products WHERE `accepted_by_admin` = (?)";
const adminApprovalQuery = "UPDATE products SET accepted_by_admin = ? WHERE id = ?";
const retrievingAllProductsQuery = "select * from products WHERE `accepted_by_admin` = (?)";
const retrievingWomenProductsQuery = "select * from products WHERE `product_type` = (?) AND `accepted_by_admin` = (?)";
const retrievingKidsProductsQuery = "select * from products WHERE `product_type` = (?) AND `accepted_by_admin` = (?)";
const retrievingJewelleryProductsQuery = "select * from products WHERE `product_type` = (?) AND `accepted_by_admin` = (?)";
const retrievingBooksProductsQuery = "select * from products WHERE `product_type` = (?) AND `accepted_by_admin` = (?)";
const addProductsQuery = "INSERT INTO products (`product_type`,`category`,`name`,`description`,`image`,`location`,`color`,`alteration`,`size`,`measurements`,`worn`,`price`,`accepted_by_admin`,`seller_id`) VALUES (?)";
const addToCartQuery = "INSERT INTO cart (`product_id`, `product_type`, `category`, `name`, `image`, `description`, `location`, `color`, `alteration`, `size`, `measurements`, `worn`, `price`, `accepted_by_admin`, `seller_id`, `userid`) values (?)";
const retrievingCartItemsQuery = "select * from cart";
const updateCartItemsQuery = "UPDATE cart SET userid = ? WHERE id = ?";
const deleteCartItemsQuery = "DELETE FROM cart WHERE id = ?";
const addToWishlistQuery = "INSERT INTO wish SET ? ";
const retrievingWishlistItemsQuery = "select * from wish";
const deleteWishlistItemsQuery = "DELETE FROM wish WHERE id = ?";
const retrieveContactusQuery = "Select * from contact";
const addContactusQuery = "INSERT INTO contact (`name`,`email`,`enquiry`) VALUES(?)";
const addBillingAddress = "INSERT INTO billing_address (firstname, lastname, email, country, state, city, address1, address2, pincode, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
const addShippingAddress = "INSERT INTO shipping_address (firstname, lastname, email, country, state, city, address1, address2, pincode, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
const paymentStatusQuery = "UPDATE products SET payment_status = ? WHERE buyer_id = ?";
const deleteProductsQuery = "DELETE FROM  products WHERE id=?";

module.exports = {
  createAdminTableQuery,
  insertAdminTableQuery,
  createRegisterTableQuery,
  createDatabaseQuery,
  useDatabaseQuery,
  productsList,
  createSellerAccount,
  cartproducts,
  wishproducts,
  contactinfo,
  addressinfo1,
  addressinfo2,
  loginCheckQuery,
  adminLoginQuery,
  retrievingUsersQuery,
  addUserQuery,
  updateUserQuery,
  retrievingSellersQuery,
  addingSellerAccountQuery,
  adminAcceptedProductsQuery,
  adminApprovalQuery,
  retrievingAllProductsQuery,
  retrievingWomenProductsQuery,
  retrievingKidsProductsQuery,
  retrievingJewelleryProductsQuery,
  retrievingBooksProductsQuery,
  addProductsQuery,
  deleteProductsQuery,
  addToCartQuery,
  retrievingCartItemsQuery,
  updateCartItemsQuery,
  deleteCartItemsQuery,
  addToWishlistQuery,
  retrievingWishlistItemsQuery,
  deleteWishlistItemsQuery,
  retrieveContactusQuery,
  addContactusQuery,
  addBillingAddress,
  addShippingAddress,
  paymentStatusQuery
};
