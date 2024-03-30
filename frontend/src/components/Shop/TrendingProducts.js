import React, { useEffect, useState } from "react";
import { Chart as ChartJs, scales } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

const TrendingProducts = ({ ordersData }) => {
  const [chartData, setChartData] = useState({});
  const products = [];
  ordersData &&
    ordersData.map((order) => {
      products.push(order.cart);
    });
  console.log({ products });

  const aggregatedProducts = products.flat().reduce((accumulator, current) => {
    const existingProduct = accumulator.find(
      (item) => item.name === current.name
    );
    if (existingProduct) {
      existingProduct.qty += current.qty;
    } else {
      accumulator.push({ name: current.name, qty: current.qty });
    }
    return accumulator;
  }, []);
  console.log({ aggregatedProducts });

  // Sort productData by sales in descending order
  const sortedProducts = aggregatedProducts.sort((a, b) => b.sales - a.sales);

  // Get top 5 best-selling products
  const topProducts = sortedProducts.slice(0, 5);

  // Extract product names and sales for chart data
  const productNames = topProducts.map((product) => product.name);
  const productSales = topProducts.map((product) => product.qty);

  // Prepare data for Chart.js
  const data = {
    labels: productNames,
    datasets: [
      {
        label: "Quantity of product",
        data: productSales,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TrendingProducts;
