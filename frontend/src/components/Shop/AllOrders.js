import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";

import { loadShopOrders } from "../../redux/actions/order";
import OrderChart from "./OrderChart";
const AllOders = () => {
  const [ordersData, setOrdersData] = useState();
  const { seller } = useSelector((state) => state.seller);
  const { shopOrders } = useSelector((state) => state.orders);
  const handleDelele = (id, token) => {};
  const dispatch = useDispatch();

  useEffect(() => {
    seller && dispatch(loadShopOrders(seller[1]));
    setOrdersData(Object.values(frequency));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.api.getCellValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  const month =
    shopOrders && shopOrders.map((order) => order.createdAt.slice(5, 7) * 1);
  const frequency = {};

  month &&
    month.forEach((element) => {
      if (frequency[element]) {
        frequency[element]++;
      } else {
        frequency[element] = 1;
      }
    });

  shopOrders &&
    shopOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full mx-5 pt-1 mt-5 bg-white">
      <div className="w-[1000px] justify-center flex  ml-[250px] ">
        <OrderChart
          ordersData={ordersData}
          name={"Orders"}
          precision={0}
          type={"Bar"}
        />
      </div>
      <h3 className="text-[22px] font-Poppins pb-2"> Orders</h3>
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

export default AllOders;
