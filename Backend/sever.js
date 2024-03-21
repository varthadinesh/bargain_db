const express = require("express");
const mysql = require("mysql");
const db = require("./db");
const paypal = require("paypal-rest-sdk");
const {
  createDatabaseQuery,
  createAdminTableQuery,
  insertAdminTableQuery,
  createRegisterTableQuery,
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
  paymentStatusQuery,
  cartpaymentupdateQuery
} = require("./queries");
const cors = require("cors");
const app = express();
app.use(cors("*"));
app.use(express.json());

var nodemailer = require("nodemailer");

let savedOTPS = {};

var smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",
  auth: {
    type: "OAuth2",
    user: process.env.REACT_APP_USER, // Your gmail address.
    // Not @developer.gserviceaccount.com
    clientId: process.env.REACT_APP_CLIENTID,
    clientSecret: process.env.REACT_APP_CLIENTSECRET,
    refreshToken: process.env.REACT_APP_REFRESH_TOKEN,
  },
});

app.post("/sendotp", (req, res) => {
  let email = req.body.email;
  let digits = "0123456789";
  let limit = 4;
  let otp = "";
  for (i = 0; i < limit; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  var mailOptions = {
    from: process.env.REACT_APP_FROMMAIL,
    to: `${email}`,
    subject: "Verification mail to register for Bargain fashion",
    generateTextFromHTML: true,
    html: `<b>Hello user, Please use this otp ${otp} for verification</b>`,
  };

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      response.send("couldn't send");
    } else {
      savedOTPS[email] = otp;
      setTimeout(() => {
        delete savedOTPS.email;
      }, 60000);
      return res.json(response);
    }
    smtpTransport.close();
  });
});

app.post("/verify", (req, res) => {
  let otprecived = req.body.otp;
  let email = req.body.email;
  if (savedOTPS[email] == otprecived) {
    res.send("Verfied");
  } else {
    res.status(500).send("Invalid OTP");
  }
});

db.query(createDatabaseQuery, (err) => {
  if (err) throw err;
  db.query(useDatabaseQuery, (err) => {
    if (err) throw err;
    db.query(createAdminTableQuery, (err) => {
      if (err) throw err;
      db.query(insertAdminTableQuery, (err) => {
        if (err) throw err;
        db.query(createRegisterTableQuery, (err) => {
          if (err) throw err;
          db.query(productsList, (err) => {
            if (err) throw err;
            db.query(createSellerAccount, (err) => {
              if (err) throw err;
              db.query(cartproducts, (err) => {
                if (err) throw err;
                db.query(wishproducts, (err) => {
                  if (err) throw err;
                  db.query(contactinfo, (err) => {
                    if (err) throw err;
                    db.query(addressinfo1, (err) => {
                      if (err) throw err;
                      db.query(addressinfo2, (err) => {
                        if (err) throw err;
                        console.log("Database and tables created successfully");
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

app.post("/user", (req, res) => {
  const sql = loginCheckQuery;
  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

app.post("/admin", (req, res) => {
  const sql = adminLoginQuery;
  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

app.get("/user", (req, res) => {
  const sql = retrievingUsersQuery;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

app.post("/register", (req, res) => {
  const sql = addUserQuery;
  const values = req.body;
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    console.log("data added successfully");
    return res.json(data);
  });
});

app.post("/updateuser", (req, res) => {
  const email = req.body.email;
  const newData = req.body;
  const sql = updateUserQuery;

  db.query(sql, [newData, email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log("Data updated successfully");
    return res.json(data);
  });
});

app.get("/selleraccount", (req, res) => {
  const sql = retrievingSellersQuery;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});
app.post("/selleraccount", (req, res) => {
  const sql = addingSellerAccountQuery;
  const values = req.body;

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    console.log("data added successfully");
    return res.json(data);
  });
});

// admin to be accepted products
app.get("/adminproducts", (req, res) => {
  const sql = adminAcceptedProductsQuery;
  const accepted = ["false"];

  db.query(sql, [accepted], (err, data) => {
    if (err) {
      // console.log(err)
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

app.post("/adminaccepted", (req, res) => {
  const accepted_by_admin = req.body.accepted_by_admin;
  const id = req.body.id;
  const sql = adminApprovalQuery;

  db.query(sql, [accepted_by_admin, id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log("Data updated successfully");
    return res.json(data);
  });
});

// all products
app.get("/allproducts", (req, res) => {
  const sql = retrievingAllProductsQuery;
  const accepted = "true";

  db.query(sql, [accepted], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

// women
app.get("/women", (req, res) => {
  const sql = retrievingWomenProductsQuery;

  const type = "women";
  const accepted = "true";

  db.query(sql, [type, accepted], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

//kids
app.get("/kids", (req, res) => {
  const sql = retrievingKidsProductsQuery;

  const type = "kids";
  const accepted = "true";

  db.query(sql, [type, accepted], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});
//jewellery
app.get("/jewellery", (req, res) => {
  const sql = retrievingJewelleryProductsQuery;

  const type = "jewellery";
  const accepted = "true";

  db.query(sql, [type, accepted], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

///books
app.get("/books", (req, res) => {
  const sql = retrievingBooksProductsQuery;

  const type = "books";
  const accepted = "true";

  db.query(sql, [type, accepted], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

// add products
app.post("/addproducts", (req, res) => {
  const sql = addProductsQuery;
  const values = [
    req.body.producttype,
    req.body.category,
    req.body.productname,
    req.body.productdescription,
    req.body.productimageurl,
    req.body.location,
    req.body.color,
    req.body.alteration,
    req.body.size,
    req.body.measurements,
    req.body.worn,
    req.body.price,
    req.body.material,
    req.body.occasion,
    req.body.type,
    req.body.brand,
    req.body.product_condition,
    req.body.style,
    req.body.season,
    req.body.fit,
    req.body.length,
    req.body.accepted_by_admin,
    req.body.seller_id,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    console.log("data added successfully");
    return res.json(data);
  });
});


app.delete("/handleproducts/:id", (req, res) => {
  const productId = req.params.id;

  // Construct the DELETE SQL query
  const query = deleteProductsQuery;

  // Execute the query with the provided product ID
  db.query(query, [productId], (error, results) => {
    if (error) {
      console.error("Error deleting product: " + error.message);
      res.status(500).send("Error deleting product");
      return;
    }

    console.log("Product deleted successfully");
    res.status(200).send("Product deleted successfully");
  });
});

app.post("/addcart", (req, res) => {
  // const productData = req.body;
  const sql = addToCartQuery;
  const data = [
    req.body.id,
    req.body.product_type,
    req.body.category,
    req.body.name,
    req.body.image,
    req.body.description,
    req.body.location,
    req.body.color,
    req.body.alteration,
    req.body.size,
    req.body.measurements,
    req.body.worn,
    req.body.price,
    req.body.accepted_by_admin,
    req.body.seller_id,
    req.body.userid,
  ];

  db.query(sql, [data], (err, result) => {
    console.log(err);
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Error adding product");
    }
    console.log("Product added successfully");
    res.send("Product added successfully");
  });
});

app.get("/addcart", (req, res) => {
  const sql = retrievingCartItemsQuery
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

app.post("/editcart", (req, res) => {
  const token = req.body.token; // Assuming token contains the user's ID or email
  const cartItems = req.body.cartItems;

  // Assuming token contains the user's ID or email
  if (!token) {
    return res.status(400).json({ error: "Token is missing" });
  }

  const sql = updateCartItemsQuery;

  // Loop through each cart item and update the userid
  cartItems.forEach(cartItem => {
    const itemId = cartItem.id;

    db.query(sql, [token, itemId], (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).json({ error: "Error updating cart" });
      }
      console.log("Data updated successfully");
    });
  });

  // Assuming you want to send a response after all items are updated
  return res.json({ message: "Cart updated successfully" });
});

app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;

  // Construct the DELETE SQL query
  const query = deleteCartItemsQuery;

  // Execute the query with the provided product ID
  db.query(query, [productId], (error, results) => {
    if (error) {
      console.error("Error deleting product: " + error.message);
      res.status(500).send("Error deleting product");
      return;
    }

    console.log("Product deleted successfully");
    res.status(200).send("Product deleted successfully");
  });
});

app.get("/wishlist", (req, res) => {
  const sql = retrievingWishlistItemsQuery;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

app.post("/addwishlist", (req, res) => {
  // const productData = req.body;
  const sql = addToWishlistQuery;
  const data = [
    req.body.id,
    req.body.product_type,
    req.body.category,
    req.body.name,
    req.body.image,
    req.body.description,
    req.body.location,
    req.body.color,
    req.body.alteration,
    req.body.size,
    req.body.measurements,
    req.body.worn,
    req.body.price,
    req.body.accepted_by_admin,
    req.body.seller_id,
    req.body.userid,
  ];

  db.query(sql, [data], (err, result) => {
    console.log(err);
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Error adding product");
    }
    res.send("Product added successfully");
  });
});

app.delete("/wishlist/:id", (req, res) => {
  const productId = req.params.id;

  // Construct the DELETE SQL query
  const query = deleteWishlistItemsQuery;

  // Execute the query with the provided product ID
  db.query(query, [productId], (error, results) => {
    if (error) {
      console.error("Error deleting product: " + error.message);
      res.status(500).send("Error deleting product");
      return;
    }
    res.status(200).send("Product deleted successfully");
  });
});

app.get("/contact", (req, res) => {
  const sql = retrieveContactusQuery;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Fail");
    }
  });
});

app.post("/contact", (req, res) => {
  const sql = addContactusQuery;
  const values = [req.body.name, req.body.email, req.body.enquiry];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    console.log("data added successfully");
    return res.json(data);
  });
});

// Endpoint to save billing address
app.post("/saveBillingAddress", (req, res) => {
  const { firstname, lastname, email, country, state, city, address1, address2, pincode, phone } = req.body.billingAddress;
  const sql = addBillingAddress;
  const values = [firstname, lastname, email, country, state, city, address1, address2, pincode, phone];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving billing address:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("Billing address saved successfully");
    return res.status(200).json({ message: "Billing address saved successfully" });
  });
});

// Endpoint to save shipping address
app.post("/saveShippingAddress", (req, res) => {
  const { firstname, lastname, email, country, state, city, address1, address2, pincode, phone } = req.body.shippingAddress;
  const sql = addShippingAddress;
  const values = [firstname, lastname, email, country, state, city, address1, address2, pincode, phone];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving shipping address:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("Shipping address saved successfully");
    return res.status(200).json({ message: "Shipping address saved successfully" });
  });
});


app.post("/updatepayment", (req, res) => {
  const payment_status = req.body.payment_status;
  const token = req.body.token;
  const product_id = req.body.product_id;
  const main_id = req.body.main_id;

  // Update the products table
  const productsSql = paymentStatusQuery
  db.query(productsSql, [payment_status, token, product_id], (err, productsData) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error updating products table" });
    }

    // Update the cart table
    const cartSql = cartpaymentupdateQuery;
    db.query(cartSql, [payment_status, token, main_id], (err, cartData) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error updating cart table" });
      }

      console.log("Data updated successfully in both tables");
      return res.status(200).json({ success: true, message: "Data updated successfully in both tables" });
    });
  });
});

// payment
// Replace these with your PayPal Sandbox API credentials
paypal.configure({
  mode: "sandbox",
  client_id: process.env.REACT_APP_PAYPAL_CLIENTID,
  client_secret: process.env.REACT_APP_PAYPAL_CLIENTSECRET,
});

app.post("/createPayment", (req, res) => {
  const cartItems = req.body.cartItems;
  const items = cartItems.map((item) => ({
    name: item.name,
    amount: item.price,
    currency: "USD",
  }));
  // console.log(items)
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },

    redirect_urls: {
      return_url: "http://localhost:8080/success",
      cancel_url: "http://localhost:8080/cancel",
    },
    transactions: [
      {
        item_list: {
          name: items.name,
        },
        amount: {
          currency: "USD",
          total: cartItems
            .reduce((sum, item) => sum + item.price, 0)
            .toFixed(2),
        },
        description: "Purchase from Shopping Cart.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error(
        "Error creating payment:",
        error.response ? error.response.details : error.message
      );
      res.status(500).json({ error: "Error creating payment" });
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.json({ redirectUrl: payment.links[i].href });
          return;
        }
      }
      res.status(500).json({ error: "Approval URL not found" });
    }
  });
});

app.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.error(
          "Error executing payment:",
          error.response ? error.response.details : error.message
        );
        res.status(500).send("Error executing payment");
      } else {
        // console.log(JSON.stringify(payment));
        // res.send('Payment success!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        res.redirect("http://localhost:3000/bargain_db/finalcheckoutpage");
      }
    }
  );
});

app.get("/cancel", (req, res) => {
  // popup.alert({content : "Payment canceled."});
  // res.write("Hii");
  res.redirect("http://localhost:3000/bargain_db/");
});

app.post("/");
app.listen(8080, () => {
  console.log("listening");
});
