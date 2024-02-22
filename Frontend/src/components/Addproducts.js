import React, { useState } from "react";
import axios from "axios";

const Addproducts = () => {
  const [values, setValues] = useState({
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
    <>
      <div className="container">
        <h4 className="mt-2 ms-2 text-primary">Add Products</h4>
        <hr className="ms-4 me-4" />
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-8 col-md-6">
            <form className="mb-4" onSubmit={handleSubmit}>
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
                  {/* <option value="highendcouture">Highendcouture</option>
                  <option value="sarees">Sarees</option>
                  <option value="lehenga">Lehenga</option>
                  <option value="dresses">Dresses</option>
                  <option value="twinning-outfits">Twinning Outfits</option> */}
                  <option value="girl">Girl</option>
                  <option value="boy">Boy</option>
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
    </>
  );
};

export default Addproducts;
