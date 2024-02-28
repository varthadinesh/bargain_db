import React, { useState } from "react";
import Sellernavbar from "./Sellernavbar";
import Sellermenu from "./Sellermenu";
import Sellerfooter from "./Sellerfooter";
import axios from 'axios';

export default function Addnewproduct() {
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    producttype: "",
    category: "",
    productname: "",
    productdescription: "",
    productimageurl: "",
    location: "",
    color: "",
    alteration: "",
    size: "",
    measurements: "",
    worn: "",
    price: "",
  });

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleProducttype = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    if(event.target.value === "women"){ 
      setCategories(["highendcouture","sarees","lehenga","dresses","twinning-outfits"])  
    }
    else if(event.target.value === "kids"){
      setCategories(["girl","boy"]);
    }
    else if(event.target.value === "jewellery"){
      // setCategories(prev => ([...prev,""]))
    }
    else if(event.target.value === "book"){
    
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/addproducts", values)
      .then((res) => {
        if (res.data === "Error") {
          alert(
            "Error while adding product. Please try again filling all the fields"
          );
        } else {
          alert("Product added successfully");
          window.location.reload(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="fullscreen">
      <Sellernavbar />
      <div className="d-md-flex">
        <div className="col-md-2 selleraccordion">
          <Sellermenu />
        </div>
        <div className="col-md-10">
          <div className="fullscreen2">
            <main>
            <div className="container">
        <h4 className="mt-2 ms-2 ">Add Product</h4>
        <hr className="ms-4 me-4" />
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-8 col-md-6">
            <form className="mb-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="producttype" className="form-label">
                  Product Type
                </label>
                <select
                  id="producttype"
                  name="producttype"
                  className="form-control"
                  onChange={handleProducttype}
                  required
                >
                  <option value="">Select Product Type</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="jewellery">Jewellery</option>
                  <option value="book">Books</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label text-primary">
                  Product Category
                </label>
                <select
                  id="category"
                  value={values.category}
                  className="form-control"
                  name="category"
                  onChange={handleInput}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((item, index)=>{
                    return <option value={item} key={index}>{item}</option>;
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="productname"
                  className="form-label text-primary"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productname"
                  name="productname"
                  placeholder="product name"
                  value={values.productname}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="productdescription"
                  className="form-label text-primary"
                >
                  Product Description
                </label>
                <textarea
                  className="form-control"
                  id="productdescription"
                  name="productdescription"
                  placeholder="product description"
                  value={values.productdescription}
                  onChange={handleInput}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="productimageurl"
                  className="form-label text-primary"
                >
                  Image URL
                </label>
                <textarea
                  className="form-control"
                  id="productimageurl"
                  name="productimageurl"
                  placeholder="image URL"
                  value={values.productimageurl}
                  onChange={handleInput}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="color" className="form-label text-primary">
                  Color
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  name="color"
                  placeholder="color"
                  value={values.color}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label text-primary">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  placeholder="location"
                  value={values.location}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="alteration" className="form-label text-primary">
                  Alteration
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="alteration"
                  name="alteration"
                  placeholder="alteration"
                  value={values.alteration}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="size" className="form-label text-primary">
                  Size
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="size"
                  name="size"
                  placeholder="size"
                  value={values.size}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="measurements"
                  className="form-label text-primary"
                >
                  Measurements
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="measurements"
                  name="measurements"
                  placeholder="measurements"
                  value={values.measurements}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="worn" className="form-label text-primary">
                  Worn
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="worn"
                  name="worn"
                  placeholder="worn"
                  value={values.worn}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label text-primary">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  placeholder="price"
                  value={values.price}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-success me-2"
                  id="btn-save"
                  name="btn-save"
                >
                  <i className="bi bi-save2-fill"></i>&nbsp; Save
                </button>
                <button className="btn btn-danger" type="reset">
                  <i className="bi bi-trash-fill"></i>&nbsp; Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
            </main>
            <Sellerfooter />
          </div>
        </div>
      </div>
    </div>
  );
}
