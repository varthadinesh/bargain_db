import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Finalcheckoutpage() {
   //eslint-disable-next-line no-unused-vars
   const [product, setProduct] = useState([]);
   
   useEffect(() => {
      const token = sessionStorage.getItem("user-token");
      axios
        .get("http://localhost:8080/addcart")
        .then((response) => {
          if (response.data !== "Fail" && response.data !== "Error") {
            if (sessionStorage.getItem("user-token") !== null) {
              sessionStorage.getItem("token") === "user" &&
                setProduct(
                  response.data.filter((item) => item.userid.toString() === sessionStorage.getItem("user-token"))
                );
              // Perform the update logic here, after fetching the cart items
              response.data.forEach((item) => {
                axios
                  .post(`http://localhost:8080/updatepayment`, { payment_status: true, token, product_id: item.product_id, main_id: item.id })
                  .then((res) => {
                    console.log("Payment status updated successfully for product with ID:", item.product_id, item.id);
                    window.location.href = "http://localhost:3000/bargain_db/";
                  })
                  .catch((err) => console.log("Error updating payment status:", err));
              });
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    }, []); // Trigger the effect only once, on component mount
    
  return <div>Loading...</div>;
}
