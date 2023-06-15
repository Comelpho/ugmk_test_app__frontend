import React from "react";
import { useLocation } from "react-router-dom";
import { useProducts } from "../hooks/products";
import { ChartDetails } from "../components/charts/chartDetails";
import "../assets/css/pages/details.css";

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

const factorys = ["А", "Б"];

export function Details() {
  const [factory_id, month_number] = useLocation()
    .pathname.replace("/details/", "")
    .split("/");

  const products = useProducts({
    factory_id: factory_id,
    month: month_number,
  });

  return (
    <div className="container">
      <div className="container__block">
        <div className="details__container">
          <h1 className="details__container__title">
            Статистика по продукции фабрики {factorys[factory_id - 1]} за{" "}
            {labels[month_number - 1]}
          </h1>

          <div className="details__container__chartBlock">
            {products.length > 0 && <ChartDetails data={products} />}
          </div>
        </div>
      </div>
    </div>
  );
}
