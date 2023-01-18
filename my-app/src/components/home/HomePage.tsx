import classNames from "classnames";
import { useFormik } from "formik";
import qs from "qs";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Pagination from "../common/Pagination";
import { ISearchProduct } from "./store/types";

const HomePage = () => {
  const { list, total, count_page, current_page } = useTypedSelector(
    (store) => store.products
  );

  const { GetProductList } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<ISearchProduct>({
    name: searchParams.get("name") || "",
    page: searchParams.get("page") || 1,
  });

  function filterNonNull(obj: ISearchProduct) {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
  }

  //console.log("Search Product params", search);

  useEffect(() => {
    const find: ISearchProduct ={
      name: searchParams.get("name") || "",
      page: searchParams.get("page") || 1,
    }
    GetProductList(find);
    setSearch(find);
    //clear formik data
    formik.values.name=find.name;
  }, [searchParams]);

  const data_content = list.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.detail}</td>
    </tr>
  ));

  const handleClickPaginate = (page: number) => {
    setSearch({ ...search, page: page });
    setSearchParams(qs.stringify(filterNonNull({ ...search, page: page })));
  }

  const onSubmit = (values: ISearchProduct) => {
    setSearchParams(qs.stringify(filterNonNull(values)));
    setSearch(values);
  };

  const formik = useFormik({
    initialValues: search,
    onSubmit,
  });

  return (
    <>
      <h1 className="text-center">Головна сторінка</h1>
      <div className="table-responsive">
        <form
          className=" w-100 mt-3 d-flex flex-wrap border border-secondary rounded-3 position-relative"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-3 p-3 w-25">
            <label htmlFor="name" className="form-label">
              Назва
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="пошук по імені"
            />
          </div>

          <button type="submit" className="btn mb-3 btn-secondary">
            <span>
              <i className="fa fa-search"></i>
            </span>
            <span>Пошук</span>
          </button>
        </form>

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

        <Pagination
          current_page={current_page}
          count_page={count_page}
          onClick={handleClickPaginate}
        />
      </div>
    </>
  );
};
export default HomePage;
