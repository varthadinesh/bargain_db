import React, { useEffect, useState } from 'react'
import MyNavbar from './navbar'
import Filterdisplaynav from './filterdisplaynav'
import Product from './Product'
import Pagination from './pagination'
import Footer from './footer'
import axios from 'axios'

export default function Acceptproduct() {
    const [products, setProducts] = useState([]);
    const [pageSize, setPageSize] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    // eslint-disable-next-line no-unused-vars
    const [viewRowIndex, setViewRowIndex] = useState(null);
    useEffect(() => {
      axios
        .get("http://localhost:8080/adminproducts")
        .then((res) => {
            console.log(res.data);

          if (res.data !== "Fail" && res.data !== "Error") {
            setProducts(res.data);
            setFilteredProducts(res.data);
          }
        })
        .catch((err) => console.log(err));
    }, []);
  
    useEffect(() => {
      setCurrentPage(1);
      setViewRowIndex(null);
    }, [pageSize]);
  
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const tableData = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="fullscreen">
    <MyNavbar />
    <main>
    <div className="col-xs-12 col-md-12 col-lg-12">
          <Filterdisplaynav pageSize={pageSize} setPageSize={setPageSize} />

          <div className="d-flex flex-wrap  justify-content-around gap-3">
            {tableData.length > 0 ? (
              tableData.map((product, index) => (
                <Product product={product} key={index} admin="admin"/>
              ))
            ) : (
              <h4>No products to display</h4>
            )}
          </div>
          <Pagination
            stateData={products}
            pageSize={pageSize}
            setViewRowIndex={setViewRowIndex}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
