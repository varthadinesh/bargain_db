const express = require("express");
const mysql = require("mysql");
const db = require("./db");
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

app.post("/user", (req, res) => {
  const sql = "SELECT * FROM register WHERE `email` = ? AND `password` = ?";
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
  const sql = "SELECT * FROM admin WHERE `email` = ? AND `password` = ?";
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

app.post("/updateuser", (req, res) => {
  const email = req.body.email;
  const newData = req.body;
  const sql = "UPDATE register SET ? WHERE email = ?";

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
  const sql = "select * from selleraccount";
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
  const sql =
    "INSERT INTO selleraccount (`name`, `email`, `remittance`, `instagram`, `phone`, `upi_id`, `description`) values (?)";
  const values = [
    req.body.sellername,
    req.body.email,
    req.body.remittance,
    req.body.instaid,
    req.body.phone,
    req.body.upiid,
    req.body.description,
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

// admin to be accepted products
app.get("/adminproducts", (req, res) => {
  const sql = "select * from products WHERE `accepted_by_admin` = (?)";
  const accepted = ["false"];

  db.query(sql,[accepted], (err, data) => {
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

app.post("/adminaccepted", (req,res) => {
  const accepted_by_admin = req.body.accepted_by_admin;
  const  id = req.body.id;
  console.log(accepted_by_admin,id)
  const sql = "UPDATE products SET accepted_by_admin = ? WHERE id = ?";

  db.query(sql, [accepted_by_admin, id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log("Data updated successfully");
    return res.json(data);
  });
})

// all products
app.get("/allproducts", (req, res) => {
  const sql = "select * from products WHERE `accepted_by_admin` = (?)";
  const accepted = "true";

  db.query(sql,[accepted], (err, data) => {
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
  const sql =
    "select * from products WHERE `product_type` = (?) AND `accepted_by_admin` = (?)";
  
  const type = "women";
  const accepted = "true";

  db.query(sql,[type,accepted], (err, data) => {
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
  const sql =
    "select * from products WHERE `product_type` = (?) AND `accepted_by_admin` = (?)";

  const type = "kids";
  const accepted = "true";

  db.query(sql,[type,accepted], (err, data) => {
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
  const sql =
    "select * from products WHERE `product_type` = (?) AND `accepted_by_admin` = (?)";

  const type = "jewellery";
  const accepted = "true";

  db.query(sql,[type,accepted], (err, data) => {
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
  const sql =
    "select * from products WHERE `product_type` = (?) AND `accepted_by_admin` = (?)";

  const type = "books";
  const accepted = "true";

  db.query(sql,[type,accepted], (err, data) => {
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
  const sql =
    "INSERT INTO products (`product_type`,`category`,`name`,`description`,`image`,`location`,`color`,`alteration`,`size`,`measurements`,`worn`,`price`,`accepted_by_admin`) VALUES (?)";
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
    req.body.accepted_by_admin,
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

app.post("/register", (req, res) => {
  const sql =
    "INSERT INTO register (`firstname`,`lastname`,`email`,`password`,`phone` ) VALUES (?)";
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.password,
    req.body.phone,
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

app.post("/addcart", (req, res) => {
  const productData = req.body;

  db.query(`INSERT INTO cart SET ?`, productData, (err, result) => {
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
  const sql = "select * from cart";
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

app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;

  // Construct the DELETE SQL query
  const query = "DELETE FROM cart WHERE id = ?";

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
app.post("/addwishlist", (req, res) => {
  const productData = req.body;

  db.query(`INSERT INTO wish SET ?`, productData, (err, result) => {
    console.log(err);
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Error adding product");
    }
    console.log("Product added successfully");
    res.send("Product added successfully");
  });
});
app.get("/wishlist", (req, res) => {
  const sql = "select * from wish";
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

app.delete("/wishlist/:id", (req, res) => {
  const productId = req.params.id;

  // Construct the DELETE SQL query
  const query = "DELETE FROM wish WHERE id = ?";

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

app.get("/contact", (req, res) => {
  const sql = "Select * from contact";

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
  const sql = "INSERT INTO contact (`name`,`email`,`enquiry`) VALUES(?)";
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

app.post("/");
app.listen(8080, () => {
  console.log("listening");
});
