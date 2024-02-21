import React, { useState } from "react";
import { Button } from "react-bootstrap";
import MyNavbar from "./navbar";
import Footer from "./footer";

const FAQ = () => {
  const CollapsiblePanel = ({ heading, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div
        className={`p-2 mb-3 bg-light shadow w-100 ${isOpen ? "open" : ""}`}
        style={{ cursor: "pointer" }}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          onClick={togglePanel}
        >
          <h6 className="mb-0 text-dark m-2">{heading}</h6>
          <Button className="btn-toggle bg-transparent border-0">
            <span
              className={`fw-bold fs-5 text-${isOpen ? "danger" : "success"}`}
            >
              {isOpen ? "-" : "+"}
            </span>
          </Button>
        </div>
        {isOpen && (
          <div className="mt-3" style={{ cursor: "text" }}>
            {content}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <MyNavbar />
      <img
        src="https://t3.ftcdn.net/jpg/02/97/83/94/360_F_297839409_rZVu6d08jEp0fxDJZYEJSeWwC05I4r7l.jpg"
        alt="aboutus"
        width="100%"
        height="300px"
      ></img>
      <div className="container mt-lg-5">
        <h4 className="text-center mb-4">FREQUENTLY ASKED QUESTIONS</h4>
        <p className="fs-6">
          Keeping Identity of Sellers and Buyers Anonymous is our first
          priority. For all products uploaded on our platforms for Sale, Bargain
          will be Sole BRAND , & in any case Sellers Cannot Contact / Share /
          Send their Personal / Professional (Business) details to Buyers. In
          case Bargain comes to know that Sellers are reaching out / Sending
          their Personal / Professional (Business) details to Buyers, Bargain
          holds the right to deduct & withhold 30% of Payment towards Breach of
          Terms.
        </p>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <CollapsiblePanel
              heading="How to Sell on Bargain?"
              content={
                <>
                  <p>It is extremely easy to get started as a seller:</p>

                  <ul>
                    <li>Create an Account with us by filling basic details</li>
                    <li>
                      After Successfully registering, Go to Products section &
                      Click on Add a new Product. Fill complete details of
                      Product & Upload at least 3 High Resolution images of
                      Product(s) you want to Sell
                    </li>
                    <li>
                      Once the Team approves your Product(s), they will be Live
                      Published on the Website for sale.
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="How to take Pictures for Uploading on website?"
              content={
                <ul>
                  <li>
                    For Outfit(s), Make sure they are ironed without any
                    wrinkles & Hang to a plain background (preferably white), &
                    For Jewellery, place the Jewellery pieces on a plain flat
                    surface
                  </li>
                  <li>
                    Take high quality Front, Back & Close up Pictures of
                    product(s) & Picture of any other aspect you want to
                    highlight in the product to any buyer
                  </li>
                  <li>Ensure to take the pictures in Bright day lighting</li>
                  <li>
                    Check to see if the images show the same colors as the
                    actual Product
                  </li>
                  <li>
                    You can upload a picture by wearing the product to show
                    buyers the fit. To ensure privacy, we prefer you to crop the
                    worn picture up to neck
                  </li>
                  <li>
                    In case of Combo Products, Make sure to upload a picture by
                    collaging the products you are combining for sale as Cover /
                    Face Picture of Product
                  </li>
                  <li>
                    Click on "How to Sell" option on top of home page & watch
                    complete video of Seller Registering & Uploading Process
                    demonstration along with Reference Pictures shown as a
                    sample to capture the Product pictures for uploading.
                  </li>
                </ul>
              }
            />
            <CollapsiblePanel
              heading="What Description of Products should I Include?"
              content={
                <>
                  <ul>
                    <li>
                      Type of Material & Detailing of Design / work (if any)
                    </li>
                    <li>Colours of Product.</li>
                    <li>
                      Detailed Measurements of outfit (s) in Inches (Bust, Waist
                      & Length are mandatory)
                    </li>
                    <li>
                      Any scope for alterations in Inches in case of outfits
                    </li>
                    <li>
                      Price expected ( Bargain reserves the right to change this
                      based on market statistics). Please note that you need to
                      include an approximate estimate for shipping charges. You
                      as a Seller, will bear the charges to ship the product to
                      the seller, once your listed product has been sold
                    </li>
                    <li>
                      Make sure to give complete measurements which are required
                      by any intended buyer before buying, Please note that in
                      case, you don’t enter/wrongly enter any measurements ,
                      Buyer/Bargain shall not be responsible & decision made by
                      the team thereafter shall be final
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="Once you decide to sell Product with us, please note the following!"
              content={
                <>
                  <ul>
                    <li>
                      For Outfit(s), Make sure they are in pristine condition
                      and has no stains and tears and is washed/dry cleaned and
                      ironed neatly before shipping it
                    </li>
                    <li>
                      For Jewellery, make sure there no missing stones/damages
                    </li>
                    <li>
                      Bargain charges a minimum of 15% of the price marked on
                      the item, and this is non-negotiable
                    </li>
                    <li>
                      Every item posted should be shipped for free by the
                      seller, neither Bargain nor the buyer will bear the
                      shipping cost
                    </li>
                    <li>
                      If the Product is found to be damaged in any way,Team
                      Bargain reserves the right to withhold payment either in
                      part or whole. The next course of action will be decided
                      by team & it will be final. If Team decides to raise a
                      return ticket from buyer, please note that as a seller,
                      you have to pay for Return Shipping Charges.Please note
                      that you need to include an approximate estimate for
                      shipping charges. You as a Seller, will bear the charges
                      to ship the product to the seller, once your listed
                      product has been sold
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="Your Outfits are not approved for Publishing on website for Sale"
              content={
                <>
                  <ul>
                    <li>
                      You will receive an auto generated email to the email id
                      registered with us stating General reasons for Rejections
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="How long my listing will be on the site for sale? & Can I make changes to the details of my Product once I have added it ?"
              content={
                <>
                  <ul>
                    <li>
                      After Submitting Your Product for Sale, Make sure the
                      Product is available for sale on website for atleast 3
                      weeks
                    </li>
                    <li>
                      To change details of product you have added, please
                      contact Team Bargain either via email @
                      teamBargain@gmail.com / You can Direct Message our team on
                      our Official Instagram Account "Closet_Bargain". Please
                      note, once the Product is live published on website for
                      sale , you cannot make any changes other than price
                      reduction
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="As a seller how & when to Ship my Product & Are there any charges for Delayed Shipping?"
              content={
                <>
                  <ul>
                    <li>
                      Once your Product is sold you will receive an auto
                      generated email on your email id Registered with us with
                      Order Details
                    </li>
                    <li>
                      The Product has to be shipped with in 3 business days from
                      the date of sale. The buyers shipping address will be
                      available to you on your SalesOrders screen on the website
                    </li>
                    <li>
                      You can choose any available authorised Courier agency to
                      ship your product
                    </li>
                    <li>
                      In case if you fail to ship within 3 business days, Please
                      note that 10% of actual Price of Product shall be deducted
                      towards delayed shipping Charges
                    </li>
                    <li>
                      After shipping the product(s), it is mandatory to enter
                      the shipment tracking ID under orders section on website &
                      ensure you mark the product as shipped
                    </li>
                    <li>
                      Please retain the original receipt of shipment until the
                      buyer confirms receiving the package and your payment is
                      processed
                    </li>
                    <li>
                      Please note that, if you fail to share the shipment
                      tracking information with us in timely fashion and the
                      buyer does not receive the package, then you forfeit the
                      right to receive payment from us
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="As a seller, what are the necessary precautions to be taken while shipping my product(s)?"
              content={
                <>
                  <ul>
                    <li>
                      Ensure the Product(s) are securely & adequately packed in
                      a sturdy cover or cardboard box.
                    </li>
                    <li>
                      While shipping jewellery, please note that it’s mandatory
                      that they are tightly bubble wrapped.
                    </li>
                    <li>
                      In case of any improper/Inadequate packaging, neither Team
                      Bargain nor Buyer will be responsible and the decision
                      made of the team will be final in handling the further
                      processes
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="As a seller, When will I receive my Payment Processed?"
              content={
                <>
                  <ul>
                    <li>
                      After you have shipped the product(s) to the buyer & it is
                      delivered, Note to login to your account on website &
                      enter date of delivery under "My Account Orders Screen &
                      ensure to mark the product as delivered from your end"
                    </li>
                    <li>
                      The photos sent are not clear (the team will contact you
                      in this case) via email. Please ensure to check your
                      registered email regularly
                    </li>
                    <li>
                      Team Bargain will start processing your payment after 3
                      days from the date of delivery and you will receive the
                      payment to your account registered with us within 3-5
                      Business days
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="How to Buy on Bargain?"
              content={
                <>
                  <ul>
                    <li>It is simple and fast to get started as a buyer</li>
                    <li>
                      Create an Account with us by filling basic details. Click
                      on ‘’How to Buy’’ option on top of home page & watch
                      complete video of Registering & Buying Process
                      demonstration
                    </li>
                    <li>
                      After successfully Registering, Add all your favourite
                      collections to Cart & Proceed to Pay. After successful
                      payment, you will receive an auto generated email on your
                      email id registered with us with complete order details
                    </li>
                    <li>
                      By Registering on our Website, You will be able to see all
                      your orders in one place & you can also track the
                      shipments
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="How do I pay for something I like?"
              content={
                <>
                  <ul>
                    <li>
                      You can pay using your Debit Card / Credit Card / Internet
                      Banking / UPI Id’s
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="What to do after ordering?"
              content={
                <>
                  <ul>
                    <li>
                      Please give the Seller (and Team Bargain) at least a week
                      before contacting us to know about your shipment
                    </li>
                    <li>
                      You can Track the shipment by navigating to our website
                      and logging in to your account under "My Accounts Orders"
                      page.
                    </li>
                    <li>
                      Keep tracking your package using the respective
                      postal/courier service’s online tool
                    </li>
                    <li>
                      Once you receive the package, please place it in good
                      lighting and make sure the whole process of opening and
                      checking the Product(s) for quality is recorded in video
                      format (unboxing video) and share within 3 days from date
                      of delivery
                    </li>
                    <li>
                      Please note that, once you receive the package and all is
                      good, please acknowledge that you have received the
                      package by marking as Order Received on Website. In case
                      of Bulk Orders, You can mark Individual Product as Order
                      Received on Website each time after receiving the delivery
                      of respective Product. This will ensure that the seller
                      receives their money on time
                    </li>
                    <li>
                      In case, if you fail to mark as Order Received within 3
                      days from the date of delivery, Team Bargain shall close
                      the sale after 3 days, & it will be considered as marked
                      as Order received from 4th day. Please note, any
                      Complaints / Returns after expiry of 3 days will not be
                      entertained.
                    </li>
                    <li>
                      Please note, Once the Shipment has been marked as
                      Delivered by the Respective Postal / courier Service,
                      neither Seller nor Team Bargain shall be responsible for
                      theft / missing packages after delivery
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="How to acknowledge that you have received the package?"
              content={
                <>
                  <ul>
                    <li>
                      Please login to your account on our website. Once you have
                      successfully logged in, navigate to My accounts page, by
                      either selecting from the ribbon on the top of your page
                      or at the bottom of your page
                    </li>
                    <li>
                      Navigate to the Orders page and choose the correct Order
                      Number if you have many orders
                    </li>
                    <li>
                      For a given Order Number, please select the Product you
                      received & mark as "ORDER RECEIVED" & Submit
                    </li>
                    <li>
                      This ensures that the package has been received by you as
                      buyer and thus the seller can get paid. Hence it is
                      critical for you to acknowledge receipt of package
                    </li>
                    <li>
                      Please note, Once you mark as Order Received on website,
                      Team Bargain shall close the sale & Proceed to pay the
                      seller immediately. In any Case, marking as order received
                      cannot be unmarked/revoked
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="As a Buyer do I have any Cancellation/ Return/Refund policy?"
              content={
                <>
                  <ul>
                    <li>
                      If the seller fails to ship the product to Buyer within 3
                      weeks from the date of order without prior communication,
                      Team Bargain will cancel the order & refund you the amount
                    </li>
                    <li>
                      We have a ‘Return Policy’ only for extreme damages/stains,
                      provided the buyer notifies us the same with complete
                      UNBOXING VIDEO within 3 days from the date of delivery.
                      Bits and pieces of the unboxing video will not be
                      considered. The mentioned damages should be clearly
                      visible in the video. Please ensure that the video is shot
                      in good lighting. However, Please note that Team Bargain
                      will have the sole discretion to accept/deny any request
                      for refund/return.
                    </li>
                    <li>
                      Any claims for returns/refunds made after 3 days from Date
                      of delivery will not be entertained.
                    </li>
                    <li>
                      In case of Returns, It is advised that the return package
                      should be strongly & adequately packed & neither seller
                      nor team bargain shall be responsible for any
                      improper/inadequate packing. Buyer will receive the refund
                      within 3-5 business days after seller receives the
                      delivery of product back. Please note that Platform fee
                      paid is non – refundable.
                    </li>
                    <li>
                      Team Bargain reserves the right at sole discretion to
                      cancel any order for any reason, & In cases of
                      cancellation of orders, we shall refund you the order
                      amount.
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="General terms & conditions!"
              content={
                <>
                  <ul>
                    <li>
                      ONLY Domestic shipping is available (India to India)
                    </li>
                    <li>
                      This website currently caters to the Inida market only. We
                      have our official website www.ourbargain .com for USA
                      market with domestic shipping facility (USA to USA). We
                      will soon expand our services to other countries
                    </li>
                    <li>
                      Privacy of our customers is highly valued, hence we
                      connect both the parties anonymously. Please note
                      contacting Buyer / Seller directly is against our terms
                    </li>
                    <li>
                      Money of buyers is safeguarded till the shipment is
                      delivered & We consider the respective Postal / courier
                      service tool to check the status of shipment.
                    </li>
                    <li>
                      Once you are registered as Seller on website, you can also
                      Buy the outfits & no separate registration is required &
                      Vice Versa. Single Registration either as a Seller / Buyer
                      will serve you to Buy & Sell Product(s).
                    </li>
                    <li>
                      Our team will communicate you through emails on your
                      registered email id, make sure to check your emails
                      regularly for further communications from us.
                    </li>
                    <li>
                      Registering on our website implies that you have read &
                      acknowledged our FAQ’s & Terms & Conditions & accepted
                      them.
                    </li>
                  </ul>
                </>
              }
            />
            <CollapsiblePanel
              heading="How to Contact us?"
              content={
                <>
                  <ul>
                    <li>
                      You can email us at our official email id – teambargain
                      @gmail.com/You can also Direct message us to our Official
                      Instagram account – "closet_bargain ". Our customer
                      support team will guide you for any queries/for any
                      assistance.
                    </li>
                  </ul>
                </>
              }
            />{" "}
            <CollapsiblePanel
              heading="Want to give us Feedback?"
              content={
                <>
                  <ul>
                    <li>We welcome you to give us Feedback</li>
                    <li>It can be about the outfit(s) that you Sold/Bought.</li>
                    <li>
                      It can be about the Selling/Shopping experience you had
                      with us.
                    </li>
                    <li>
                      It can be about improvements we can do on our website, to
                      enhance the experience for you as consumers or shoppers.
                    </li>
                    <li>Any feedback will be highly appreciated</li>
                    <li>
                      You can also leave your valuable feedback in the Contact
                      Us section below, and we will be happy to read them and
                      get back to you as appropriate
                    </li>
                  </ul>
                </>
              }
            />{" "}
            <CollapsiblePanel
              heading="Why to Sell with us?"
              content={
                <>
                  <ul>
                    <li>
                      Sell your pre-lov’ed ethnic outfits and spread the message
                      of sustainability!
                    </li>
                    <li>
                      Listing your collections for sale is Free. Bargain will
                      not charge any fees for Registering & Listing. Just pay a
                      small percentage on the products that are sold.
                    </li>
                    <li>
                      We have an exclusive Marketing team who will guide you
                      through the whole process and will help you in uploading
                      just the right images at just the right value to ensure
                      you sell your outfits quickly!
                    </li>
                    <li>
                      We have our exclusive Customer support team to assist you
                      / guide you in case of any queries or guidance
                    </li>
                  </ul>
                </>
              }
            />{" "}
            <CollapsiblePanel
              heading="Why to Buy with us?"
              content={
                <>
                  <ul>
                    <li>
                      Thank you for choosing to buy pre-loved clothes. You are
                      one step closer to making the Earth a less polluted place!
                    </li>
                    <li>
                      Choose from a wide range of handpicked and trendy outfits.
                    </li>
                    <li>
                      Buyers do not have to pay any commission for purchasing
                      their outfits, plus you get free shipping!
                    </li>
                  </ul>
                </>
              }
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
