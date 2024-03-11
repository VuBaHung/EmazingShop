import React, { useEffect, useState } from "react";

import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import axios from "axios";
import { server } from "../../server";

function RelatedProduct({ data, reload, setReload }) {
  const [relatedProduct, setRelatedProduct] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`${server}/product/get-all-products`);
      console.log(data);
      setRelatedProduct(data);
    };
    getProduct();
  }, []);

  useEffect(() => {
    const d =
      data && data.filter((i) => i.category === relatedProduct.category);

    setRelatedProduct(d);
  }, []);
  const dataArr = Object.values(data);

  return (
    <div>
      {dataArr[0] ? (
        <div className={`${styles.section} `}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {relatedProduct &&
              relatedProduct.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  reload={reload}
                  setReload={setReload}
                />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RelatedProduct;
