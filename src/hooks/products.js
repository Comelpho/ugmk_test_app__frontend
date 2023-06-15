import axios from "axios";
import { useEffect, useState } from "react";


export function useProducts (qur) {
    const [products, setProducts] = useState([])
    const [query] = useState(qur)



    useEffect(() => {
        try {
            const getProducts = async () => {
                const response = await axios.get(process.env.REACT_APP_API_URL, {
                    params: query
                }).catch(err => {
                    console.log(err);
                });
                setProducts(response.data);
            };
            getProducts();
        } catch (err) {
            console.log(err);
        }
    }, [query]);


    return products

}