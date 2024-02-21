import React from 'react';
import MyNavbar from './navbar';
import Footer from './footer';
import Curosel from './curosal';
import CarouselComponent from './carouselcomponent';

const Home = () => {

    return (
        <>
                <MyNavbar/>
                <CarouselComponent/>
               
                <h2 className='text-center p-2'>Product Categories</h2>
                <Curosel/>
                <h2 className='text-center p-2'>Featured Products</h2>
                
                <Footer/>
        </>
    );
};

export default Home;