import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const TrendingCategory = ({ orders }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      drawChart();
    }
  }, [orders]);

  const calculateTopCategoriesPerMonth = (orders) => {
    const monthlyCategories = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      if (!monthlyCategories[monthYear]) {
        monthlyCategories[monthYear] = {};
      }

      if (!monthlyCategories[monthYear][order.cart[0].category]) {
        monthlyCategories[monthYear][order.cart[0].category] = 0;
      }

      monthlyCategories[monthYear][order.cart[0].category] += order.cart[0].qty;
    });
    // Sort categories by amount and get top 5

    // for (const month in monthlyCategories) {
    //   const sortedCategories = Object.keys(monthlyCategories[month]).sort(
    //     (a, b) => {
    //       return monthlyCategories[month][b] - monthlyCategories[month][a];
    //     }
    //   );
    //   monthlyCategories[month] = sortedCategories.slice(0, 5);
    // }
    return monthlyCategories;
  };

  const drawChart = () => {
    const topCategories = calculateTopCategoriesPerMonth(orders);

    const months = Object.keys(topCategories);
    const categoryData = Object.values(topCategories);
    const amounts = {};

    categoryData.forEach((item) => {
      Object.entries(item).forEach(([category, quantity]) => {
        amounts[category] = (amounts[category] || 0) + quantity;
      });
    });

    const ctx = document.getElementById("topCategoriesChart");
    console.log(categoryData);
    const cate = Object.keys(amounts);
    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: months.reverse(),
        datasets: cate.map((cate, index) => ({
          label: `${cate}`,
          data: categoryData.map((item) => item[cate] || 0),
          borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 1)`,
          fill: false,
        })),
      },
      options: {
        scales: {
          y: {
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });

    setChart(newChart);
  };
  return <canvas id="topCategoriesChart" />;
};

export default TrendingCategory;
