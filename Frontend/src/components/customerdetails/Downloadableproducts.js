import React from 'react'
import MyNavbar from '../navbar'
import Customermenu from './Customermenu'
import Footer from '../footer'
import Customerbanner from './Customerbanner'

export default function Downloadableproducts() {
  return (
    <div>
      <MyNavbar />
      <Customerbanner/>
      <div className="d-lg-flex justify-content-around p-2 ps-lg-5 pe-lg-5">
        <div className="col-lg-3 col-xs-12 col-md-12 p-lg-4 p-2">
          <Customermenu />
        </div>

        <div className="col-xs-12 col-md-12 col-lg-9 p-lg-4 p-2">
          There are no downloadable products
        </div>
      </div>
      <Footer/>
    </div>
  )
}
