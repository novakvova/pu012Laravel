import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import http from "../../http_common";
import { IProductItem } from "./store/types";

const HomePage = () => {
  const {list} = useTypedSelector(store=>store.products);

  const dispatch = useDispatch();

  useEffect(() => {
    http.get<Array<IProductItem>>('/api/products')
      .then(resp=> {
        console.log("Resp Data ",resp);
        dispatch({type:"PRODUCT_LIST", payload: resp.data});
      });
  },[]);

  const data = list.map(product =>
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.detail}</td>
    </tr>)

  return (
    <>
      <h1 className="text-center">Головна сторінка</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Назва</th>
              <th scope="col">Опис</th>
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </table>
      </div>
      

    </>
  );
};
export default HomePage;
