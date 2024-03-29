import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteProductShop,
  getAllProductsShop,
} from "../../redux/actions/product";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";

import NotFoundPage from "../../pages/CustomerPages/NotFoundPage";
const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);
  const handleDelele = (id, token) => {
    // console.log({ id });

    dispatch(deleteProductShop(id, token));

    // window.location.assign("/dashboard-products");
    window.location.reload();
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller[0]._id));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Review",
      headerName: "Review",

      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delelte",
      headerName: "Delete",
      type: "number",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelele(params.id, seller[1])}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return isLoading ? (
    <NotFoundPage />
  ) : (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AllProducts;
