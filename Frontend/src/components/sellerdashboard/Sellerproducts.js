import React, {useState, useEffect} from "react";
import Sellernavbar from "./Sellernavbar";
import Sellermenu from "./Sellermenu";
import Sellerfooter from "./Sellerfooter";
import Sellerpagination from "./sellerpagination";

export default function Sellerproducts() {
// eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
// eslint-disable-next-line no-unused-vars
  const [filteredProducts, setFilteredProducts] = useState([]);
// eslint-disable-next-line no-unused-vars
  const [viewRowIndex, setViewRowIndex] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
    setViewRowIndex(null);
  }, [pageSize]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
// eslint-disable-next-line no-unused-vars
  const tableData = filteredProducts.slice(startIndex, endIndex);
  return (
    <div className="">
      <Sellernavbar />
        <div className="d-md-flex">
          <div className="col-2">
            <Sellermenu />
          </div>
          <div className="col-10 ">
            <div className="fullscreen2">
      <main>

            <div className="d-flex justify-content-between m-2">
              <h4>Products</h4>
              <button className="btn btn-primary">
                <i class="bi bi-plus-square-fill"></i> Add new product
              </button>
            </div>

            <div className="p-3 ">
              <div className="table-responsive">
                <table
                  id="dynamic-table"
                  className="table table-striped table-bordered table-hover dataTable no-footer"
                  role="grid"
                  aria-describedby="dynamic-table_info"
                >
                  <thead className="">
                    <tr role="row">
                      <th
                        className="sorting bg-secondary text-white p-3 text-center"
                        tabIndex="0"
                        aria-controls="dynamic-table"
                        rowSpan="1"
                        colSpan="1"
                        aria-label="ID: activate to sort column ascending"
                      >
                        Product ID
                      </th>
                      <th
                        className="sorting bg-secondary text-white p-3 text-center"
                        tabIndex="0"
                        aria-controls="dynamic-table"
                        rowSpan="1"
                        colSpan="1"
                        aria-label="Name: activate to sort column ascending"
                      >
                        Picture
                      </th>
                      <th
                        className="sorting bg-secondary text-white p-3 text-center"
                        tabIndex="0"
                        aria-controls="dynamic-table"
                        rowSpan="1"
                        colSpan="1"
                        aria-label="Address:activate to sort column ascending"
                      >
                        Product Name
                      </th>
                      <th
                        className="hidden-480 sorting bg-secondary text-white p-3 text-center"
                        tabIndex="0"
                        aria-controls="dynamic-table"
                        rowSpan="1"
                        colSpan="1"
                        aria-label="City: activate to sort column ascending"
                      >
                        Price Including Shipping
                      </th>
                      <th
                        className="hidden-480 sorting bg-secondary text-white p-3 text-center"
                        tabIndex="0"
                        aria-controls="dynamic-table"
                        rowSpan="1"
                        colSpan="1"
                        aria-label="Timings: activate to sort column ascending"
                      >
                        Product Status
                      </th>
                      <th
                        className="hidden-480 sorting_disabled bg-secondary text-white p-3 text-center"
                        rowSpan="1"
                        colSpan="1"
                        aria-label="Status"
                      >
                        Order Created Date
                      </th>
                      <th
                        className="hidden-480 sorting_disabled bg-secondary text-white p-3 text-center"
                        rowSpan="1"
                        colSpan="1"
                        aria-label="Status"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr role="row" className="">
                      <td>No data available</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td> row 2</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>

              <Sellerpagination
                stateData={products}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setViewRowIndex={setViewRowIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>

      </main>
      <Sellerfooter />
</div>
          </div>
        </div>
    </div>
  );
}
