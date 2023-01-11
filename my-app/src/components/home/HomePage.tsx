import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const HomePage = () => {
  const {list} = useTypedSelector(store=>store.products);

  const {GetProductList} = useActions();

  useEffect(() => {
    GetProductList();
  },[]);

  const data_content = list.map(product =>
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
            {data_content}
          </tbody>
        </table>
      </div>
      

    </>
  );
};
export default HomePage;
