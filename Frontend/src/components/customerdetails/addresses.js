import React from 'react'
import MyNavbar from '../navbar'
import Customermenu from './Customermenu'
import { Link } from 'react-router-dom'
import Footer from '../footer'
import Customerbanner from './Customerbanner'

export default function Addresses() {
  return (
    <div>
      <MyNavbar />
      <Customerbanner/>
      <div className="d-lg-flex justify-content-around p-2 ps-lg-5 pe-lg-5">
        <div className="col-lg-3 col-xs-12 col-md-12 p-lg-4 p-2">
          <Customermenu />
        </div>

        <div className="col-xs-12 col-md-12 col-lg-9 p-lg-4 p-2">
          <p className='fs-6'>No Addresses</p>
          <Link to='/addaddress'>
            <button className='btn btn-success'>Add New</button>
          </Link>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
