import { Dispatch } from "react";
import http from "../../../http_common";
import { IPorductResponse, ProductActions, ProductActionTypes } from "./types";

export const GetProductList = () => async(dispatch: Dispatch<ProductActions>) => {
    try{
        const response = await http.get<IPorductResponse>('/api/products');
        const {data} = response;
        console.log("data", data);
        dispatch({
            type: ProductActionTypes.PRODUCT_LIST,
            payload: {
                list: [...data.data],
                count_page: data.current_page,
                total: data.total,
                current_page: data.current_page,
                error_message: ""
            }
        });
    }
    catch(err: any) {
        return Promise.reject();
    }
}