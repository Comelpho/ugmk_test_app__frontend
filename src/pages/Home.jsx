import React from "react";
import { ChartProducts } from "../components/charts/chartProducts";
import { useProducts } from "../hooks/products";

export function Home() {
  const data = useProducts();
  return (
    <div className="container">
      <div className="container__block centerChart">
        {data.length > 0 && <ChartProducts data={data} />}
      </div>
    </div>
  );
}
