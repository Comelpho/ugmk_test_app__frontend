import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/charts/chartProducts.css";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

const optionsSelect = [
  {
    name: "Все продукты",
    value: "all",
  },
  {
    name: "Продукт 1",
    value: "product1",
  },
  {
    name: "Продукт 2",
    value: "product2",
  },
  {
    name: "Продукт 3",
    value: "product3",
  },
];

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
      display: false,
    },
  },
};

export function ChartProducts({ data }) {
  const [factory_one_test, setFactory_one_test] = useState([]);
  const [factory_two_test, setFactory_two_test] = useState([]);
  const [selected, setSelected] = useState(
    localStorage.getItem("selected")
      ? localStorage.getItem("selected")
      : optionsSelect[0].value
  );

  const chartRef = useRef();

  const navigate = useNavigate();

  function testt(event) {
    const item = getElementAtEvent(chartRef.current, event);

    const factory_id = item[0].datasetIndex + 1;
    const month_number = item[0].index + 1;

    navigate(`/details/${factory_id}/${month_number}`);
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Фабрика А",
        data: factory_one_test,
        backgroundColor: "rgba(253,2,3,1)",
        hoverBackgroundColor: "rgba(253,2,3,0.8)",
      },
      {
        label: "Фабрика Б",
        data: factory_two_test,
        backgroundColor: "rgba(0,3,239,1)",
        hoverBackgroundColor: "rgba(0,3,239,0.8)",
      },
    ],
    type: "bar",
  };

  function filterProducts(product) {
    setSelected(product);
  }

  useEffect(() => {
    const factory_one = [];
    const factory_two = [];
    localStorage.setItem("selected", selected);
    if (data) {
      for (let i = 0; i < labels.length; i++) {
        let countOne = 0;
        let countTwo = 0;

        data.forEach((item) => {
          if (item.date) {
            const date = new Date();
            const [day, month, year] = item.date.split("/");
            date.setDate(day);
            date.setMonth(month - 1);
            date.setFullYear(year);

            if (date.getMonth() === i) {
              if (selected === "all") {
                if (item.factory_id === "1") {
                  if (item.product1) {
                    countOne += Number(item.product1) / 1000;
                  }
                  if (item.product2) {
                    countOne += Number(item.product2) / 1000;
                  }
                  if (item.product3) {
                    countOne += Number(item.product3) / 1000;
                  }
                } else if (item.factory_id === "2") {
                  if (item.product1) {
                    countTwo += Number(item.product1) / 1000;
                  }
                  if (item.product2) {
                    countTwo += Number(item.product2) / 1000;
                  }
                  if (item.product3) {
                    countTwo += Number(item.product3) / 1000;
                  }
                }
              } else if (selected === "product1") {
                if (item.factory_id === "1") {
                  if (item.product1) {
                    countOne += Number(item.product1) / 1000;
                  }
                } else if (item.factory_id === "2") {
                  if (item.product1) {
                    countTwo += Number(item.product1) / 1000;
                  }
                }
              } else if (selected === "product2") {
                if (item.factory_id === "1") {
                  if (item.product2) {
                    countOne += Number(item.product2) / 1000;
                  }
                } else if (item.factory_id === "2") {
                  if (item.product2) {
                    countTwo += Number(item.product2) / 1000;
                  }
                }
              } else if (selected === "product3") {
                if (item.factory_id === "1") {
                  if (item.product3) {
                    countOne += Number(item.product3) / 1000;
                  }
                } else if (item.factory_id === "2") {
                  if (item.product3) {
                    countTwo += Number(item.product3) / 1000;
                  }
                }
              }
            }
          }
        });

        factory_one.push(Number(countOne.toFixed(0)));
        factory_two.push(Number(countTwo.toFixed(0)));
      }
      setFactory_one_test(factory_one);
      setFactory_two_test(factory_two);
    }
  }, [data, selected]);

  return (
    <div className="chartProducts">
      <div className="chartProducts__filterBlock">
        <span className="chartProducts__filterBlock__title">
          Фильтр по типу продукции
        </span>
        <select
          value={selected}
          onChange={(e) => filterProducts(e.target.value)}
          className="chartProducts__filterBlock__select"
        >
          {optionsSelect.map((option, index) => (
            <option
              value={option.value}
              key={"chartProducts__filterBlock__select__option_" + index}
              className="chartProducts__filterBlock__select__option"
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="chartProducts__chartBlock">
        {factory_one_test && factory_two_test && (
          <Bar
            onClick={testt}
            ref={chartRef}
            options={options}
            data={chartData}
          />
        )}
      </div>
    </div>
  );
}
