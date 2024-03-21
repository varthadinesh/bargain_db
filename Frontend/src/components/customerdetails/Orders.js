import React, { useEffect,useState } from "react";
import MyNavbar from "../navbar";
import Customermenu from "./Customermenu";
import Footer from "../footer";
import Customerbanner from "./Customerbanner";
import axios from "axios";

export default function Orders() {

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/allproducts")
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
        
          setAllProducts(res.data.filter((item) => item.payment_status === 1 && item.buyer_id === parseInt(sessionStorage.getItem('user-token'))));
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  console.log(allProducts);


  return (
    <div className="fullscreen">
      <MyNavbar />
      <main>
      <Customerbanner />

      <div className="d-lg-flex justify-content-around p-2 ps-lg-5 pe-lg-5">
        <div className="col-lg-3 col-xs-12 col-md-12 p-lg-4 p-2">
          <Customermenu />
        </div>

        <div className="col-xs-12 col-md-12 col-lg-9 p-lg-4 p-2">
  {allProducts.length > 0 ? (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Product Image</th>
          <th>Product Name</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {allProducts.map((product, index) => (
          <tr key={index}>
            <td>
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: "60px", maxHeight: "100px" }}
              />
            </td>
            <td className="text-secondary">{product.name}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No orders</p>
  )}
</div>


      </div>
      </main>
      <Footer />
    </div>
  );
}
