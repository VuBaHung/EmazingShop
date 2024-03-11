import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/Products/ProductDetails.js";
import { useParams } from "react-router-dom";
// import { productData } from "../static/data.js";
import RelatedProduct from "../components/Products/RelatedProduct.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../server.js";
import NotFoundPage from "./NotFoundPage.jsx";
const ProductDetailPage = () => {
  // const { products, isLoading } = useSelector((state) => state.product);
  const { id } = useParams();

  const [data, setData] = useState([]);
  // const productName = id.replace(/-/g, " ");
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axios
      .get(`${server}/product/get-product/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [reload, id]);
  // useEffect(() => {
  //   const data = products.find((i) => i.name === productName);
  //   setData(data);
  // }, [reload, productName]);

  return (
    <div>
      {/* {console.log(data)} */}
      <Header />
      {data.length > 0 ? <ProductDetails data={data} /> : <NotFoundPage />}
      {data.length > 0 ? (
        <RelatedProduct
          data={data}
          reload={reload}
          setReload={() => setReload}
        />
      ) : (
        <NotFoundPage />
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
