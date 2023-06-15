import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 18,
        },
      },
    },
    title: {
      display: true,
    },
  },
};

export function ChartDetails({ data }) {
  const [countProduct, setCountProduct] = useState([]);

  useEffect(() => {
    const count = [];
    let countOne = 0;
    let countTwo = 0;
    let countThree = 0;
    data.forEach((item) => {
      if (item.product1) {
        countOne += Number(item.product1) / 1000;
      }
      if (item.product2) {
        countTwo += Number(item.product2) / 1000;
      }
      if (item.product3) {
        countThree += Number(item.product3) / 1000;
      }
    });
    count.push(countOne.toFixed(0));
    count.push(countTwo.toFixed(0));
    count.push(countThree.toFixed(0));
    setCountProduct(count);
  }, [data]);

  const chartData = {
    labels: ["Продукт 1", "Продукт 2", "Продукт 3"],
    datasets: [
      {
        data: countProduct,
        backgroundColor: [
          "rgba(0, 128, 0, 1)",
          "rgba(253, 166, 0, 1)",
          "rgba(0, 3, 239, 1)",
        ],
      },
    ],
  };
  return (
    <div className="chartDetails__chartBlock">
      <Pie data={chartData} options={options} />
    </div>
  );
}
