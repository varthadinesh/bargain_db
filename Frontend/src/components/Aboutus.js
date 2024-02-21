import React from "react";
import MyNavbar from "./navbar";
import Footer from "./footer";

export default function Aboutus() {
  return (
    <div>
      <MyNavbar />
      <img
        src="https://cohereone.com/wp-content/uploads/2020/06/AboutUs_3.1_1950x500-1.jpg"
        alt="aboutus"
        width="100%"
        height="300px"
      ></img>
      <section className="p-2 m-md-5">
        <p className="fs-6">
          <b>
            <i>Closet Bargain</i>
          </b>{" "}
          is started with the thought of giving a new lease to unused clothes
          and enable sustainability.
        </p>
        <p>
          Weavers, tailors, and designers put in a tremendous amount of work
          into creating an outfit, and trends change so fast that so many of
          these outfits are hardly worn once or twice. In our pursuit of
          dressing according to the latest fashion trends, our closets and
          cupboards get filled with clothes and the planet is paying a high
          price for this.
        </p>
        <p>
          The idea behind this venture was to start a platform that enables
          these beautifully designed clothes to have a second chance to shine.
          This is a space where both buyers and sellers can connect and sell and
          shop for clothes, they can save effort, nature, time, and money.
          Punarvi is a sustainable platform and an attempt from our side to help
          others thrift Indian ethnic wear and give back to the environment even
          if it is in a minuscule way. Customers will not only have the power to
          create change, but they will also find awesome deals on all the latest
          trends. Happy Shopping!
        </p>
      </section>
      <Footer />
    </div>
  );
}
