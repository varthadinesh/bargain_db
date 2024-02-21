import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
// import banner1 from '../images/Clothing-boutique-names-banner.webp';
import banner1 from '../images/Womens-Apparels-1.jpg';
import banner2 from '../images/mb-back.jfif'
// import banner2 from '../images/final-banner-1.jpg'
// import banner2 from '../images/kidsBuyingGuide.jpg'
// import banner1 from '../images/banner1.jpg';
// import banner2 from '../images/banner2.webp';
import banner3 from '../images/banner3.jpg';
import banner4 from '../images/banner4.jpeg';


function CarouselComponent() {
  return (
    <div>
    <Carousel>
    <Carousel.Item>
      <div className='image-container'>
      <img
        className="d-block w-100 banner"
        src={banner1}
        alt="First slide"
      />
      </div>
      <Carousel.Caption>
        <h3 className='bannerHead'>Womens Fashion</h3>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <div className='image-container'>
      <img 
        className="d-block w-100 banner"
        src={banner2}
        alt="Second slide"
      />
      </div>

      <Carousel.Caption>
        <h3 className='bannerHead'>Kids Fashion</h3>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <div className='image-container'>

      <img 
        className="d-block w-100 banner"
        src={banner3}
        alt="Third slide"
      />
      </div>

      <Carousel.Caption>
        <h3 className='bannerHead'>Jewellery</h3>
       
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <div className='image-container'>

      <img 
        className="d-block w-100 banner"
        src={banner4}
        alt="Third slide"
      />
      </div>

      <Carousel.Caption>
        <h3 className='bannerHead'>Books Collection</h3>
       
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </div>
  )
}

export default CarouselComponent