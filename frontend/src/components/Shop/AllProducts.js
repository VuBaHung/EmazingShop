import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteProductShop,
  getAllProductsShop,
} from "../../redux/actions/product";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";

import NotFoundPage from "../../pages/CustomerPages/NotFoundPage";
import TrendingCategory from "./TrendingCategory";
import TrendingProducts from "./TrendingProducts";
const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);
  const { shopOrders } = useSelector((state) => state.orders);
  const handleDelele = (id, token) => {
    dispatch(deleteProductShop(id, token));
    window.location.reload();
  };
  const handleUpdate = (id, token) => {};
  const dispatch = useDispatch();
  // const date = new Date(shopOrders[0].createdAt);

  useEffect(() => {
    dispatch(getAllProductsShop(seller[0]._id));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.3,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.3,
    },
    {
      field: "Review",
      headerName: "Review",

      minWidth: 130,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/products/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "modify",
      headerName: "Modify",
      type: "string",
      minWidth: 130,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleUpdate(params.id, seller[1])}>
              <AiOutlineEdit size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: "Delelte",
      headerName: "Delete",
      type: "number",
      minWidth: 130,
      flex: 0.3,
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
    <div className="w-full mx-8 pt-1 mt-10 bg-white items-center">
      {shopOrders && (
        <div className=" flex w-full">
          <div className="w-[50%] justify-start  mb-20 block items-center text-center">
            <TrendingCategory precision={0} orders={shopOrders} />
            <h4 className="text-[22px] font-Poppins pb-2">Top categories</h4>
          </div>

          <div className="w-[50%] justify-start  mb-20 block items-center text-center">
            <TrendingProducts ordersData={shopOrders} />
            <h4 className="text-[22px] font-Poppins pb-2">Top products</h4>
          </div>
        </div>
      )}
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
