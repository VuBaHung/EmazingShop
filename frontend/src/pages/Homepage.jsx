import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero.js";
import Categories from "../components/Route/Categories/Categories";
import BestDeal from "../components/Route/BestDeals/BestDeal";
import FeatureProduct from "../components/Route/FeatureProducts/FeatureProduct.js";
import Event from "../components/Route/Events/Event.js";
import Sponsor from "../components/Route/Sponsor/Sponsor.js";
import Footer from "../components/Layout/Footer.js";
const Homepage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeal />
      <Event />
      <FeatureProduct />
      {/* <Sponsor /> */}
      <Footer />
    </div>
  );
};

export default Homepage;
