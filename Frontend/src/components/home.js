import React, { useEffect, useState } from "react";
import MyNavbar from "./navbar";
import Footer from "./footer";
import Curosel from "./curosal";
import CarouselComponent from "./carouselcomponent";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 1600, min: 1201 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1200, min: 992 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 991, min: 768 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1
    }
  };
  
const Home = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/allproducts")
      .then((response) => {
        const { data1, data2, data3, data4 } = response.data;
        const flattenedProducts = [...data1, ...data2, ...data3, ...data4];
        setAllProducts(flattenedProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(allProducts);

  return (
    <div className="fullscreen">
      <MyNavbar />
      <main>
      <CarouselComponent />

      <h2 className="text-center p-2">Product Categories</h2>
      <Curosel />
      <h2 className="text-center p-2">Featured Products</h2>
      <div className=" mt-4">
        {(allProducts.length>0) ? (
                <Carousel 
                responsive={responsive}
                >
        {allProducts.map((product, index) => (
          <div className="">
              <Product product={product}  key={index}/>
            </div>
            ))}
        </Carousel>
        ) : ("")
        }

      </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
