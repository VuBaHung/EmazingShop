import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";
// import { productData } from '../static/data'
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 10);
    setData(firstFive);
  }, [allProducts]);
  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data ? (
            data.map((i, index) => <ProductCard data={i} key={index} />)
          ) : (
            <p>No Products Founded!</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingPage;