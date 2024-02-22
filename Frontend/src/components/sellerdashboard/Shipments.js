import React from 'react'
import Sellernavbar from './Sellernavbar'
import Sellermenu from './Sellermenu'
import Sellerfooter from './Sellerfooter'

export default function Shipments() {
  return (
    <div className=''>
      <Sellernavbar/>
      <div className='d-md-flex'>
        <div className='col-2'>
          <Sellermenu/>
        </div>
        <div className='col-10'>
<div className='fullscreen2'>
  <main>

  </main>
  <Sellerfooter/>
</div>
        </div>
      </div>
    </div>
  )
}
