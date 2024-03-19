// import React, { useEffect } from 'react'
// import { useCart, useData } from "./CartContext";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function Cartitems() {
//     const {
//         cartItems,
//         calculateTotalPrice,
//         removeFromCart,
//         setCartItems,
//         // incrementQuantity,
//         // decrementQuantity,
//         wishItems,
//         removeFromWishlist,
//         moveFromWishlistToCart,
//         selectedWishlistItems,
//         handleCheckboxChange,
//       } = useCart();
//   const totalPrice = calculateTotalPrice();
// const navigate = useNavigate();
//   useEffect( () => {
//     axios
//       .get("http://localhost:8080/addcart")
//       .then((response) => {
//         if (response.data !== "Fail" && response.data !== "Error") {
//           if (sessionStorage.getItem("user-token") !== null) {
//             sessionStorage.getItem("token") === "user" &&
//               setCartItems(
//                 response.data.filter(
//                   (item) =>
//                     item.userid !== null &&
//                     item.userid.toString() ===
//                       sessionStorage.getItem("user-token")
//                 )
//               );
//           }
//           else{
//             setCartItems(response.data)
//           }
//         } else {
//           console.log("No Items in the cart");
//         }
//       })
//       .catch((error) => {
//         console.log("Error fetching cart items:", error);
//       });
//   } , []);

//   const checkout = () => {
//     if (sessionStorage.getItem("token") !== null) {
//       navigate("/checkoutpage");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <div>
//         <div>
//         <table className="table table-hover">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Product Name</th>
//                   <th>Product Image</th>
//                   <th>Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((product, index) => (
//                   <tr key={index}>
//                     <td>
//                       <button
//                         type="button"
//                         className="btn-close w-50"
//                         onClick={() => removeFromCart(product.id)}
//                       ></button>
//                     </td>
//                     <td>
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         style={{ maxWidth: "50px", maxHeight: "80px" }}
//                       />
//                     </td>
//                     <td className="text-secondary">{product.name}</td>
//                     <td>{product.price}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//         </div>
//        <div>
//        <button
//                 type="button"
//                 className="btn btn-danger"
//               >
//                 Close
//               </button>
//               <div className="d-md-flex gap-1">
//                 <p className="mt-1">Total Price: {totalPrice}</p>
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   disabled={cartItems.length === 0} // Disable the button if cart is empty
//                   onClick={checkout}
//                 >
//                   Checkout
//                 </button>
//               </div>
//        </div>
//     </div>
//   )
// }
