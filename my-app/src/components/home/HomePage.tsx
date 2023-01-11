import classNames from "classnames";
import qs from "qs";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ISearchProduct } from "./store/types";

const HomePage = () => {
  const { list, total, count_page, current_page } = useTypedSelector(
    (store) => store.products
  );

  const { GetProductList } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<ISearchProduct>({
    name: searchParams.get("name") || "",
    page: searchParams.get("page") || 1
  });

  function filterNonNull(obj: ISearchProduct) {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
  }
  
  //console.log("Search Product params", search);

  useEffect(() => {
    console.log("Search: ", search);
    GetProductList(search);
  }, [search]);

  const data_content = list.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.detail}</td>
    </tr>
  ));

  const buttons = [];
  for (let i = 1; i <= count_page; i++) {
    buttons.push(i);
  }

  const pagination = buttons.map((page) => (
    <li key={page} className="page-item">
      <Link className={classNames("page-link", {active: page===current_page})} 
        onClick={()=>{ setSearch({...search, page: page} ) }}
        to={"?"+qs.stringify(filterNonNull({...search, page: page}))}>
        {page}
      </Link>
    </li>
  ));

  return (
    <>
      <h1 className="text-center">Головна сторінка</h1>
      <div className="table-responsive">
        <h4>Всього записів: {total}</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Назва</th>
              <th scope="col">Опис</th>
            </tr>
          </thead>
          <tbody>{data_content}</tbody>
        </table>

        <nav>
          <ul className="pagination">
            {pagination}
          </ul>
        </nav>
      </div>
    </>
  );
};
export default HomePage;
