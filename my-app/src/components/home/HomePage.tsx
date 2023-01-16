import classNames from "classnames";
import { useFormik } from "formik";
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
    page: searchParams.get("page") || 1,
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

  const pagination = buttons.map((page) => {
    if (current_page <= 5) {
      if (page == 8 && count_page != page) {
        return (
          <li key={page} className="page-item">
            <Link
              className={classNames("page-link", {
                active: page === current_page,
              })}
              onClick={() => {
                setSearch({ ...search, page: page });
              }}
              to={"?" + qs.stringify(filterNonNull({ ...search, page: page }))}
            >
              ...
            </Link>
          </li>
        );
      }
      if (page <= 7 || page == count_page) {
        return (
          <li key={page} className="page-item">
            <Link
              className={classNames("page-link", {
                active: page === current_page,
              })}
              onClick={() => {
                setSearch({ ...search, page: page });
              }}
              to={"?" + qs.stringify(filterNonNull({ ...search, page: page }))}
            >
              {page}
            </Link>
          </li>
        );
      }
    }
    else if(current_page>5)
    {
      if(page==1)
      {
        return (
          <li key={page} className="page-item">
            <Link
              className={classNames("page-link", {
                active: page === current_page,
              })}
              onClick={() => {
                setSearch({ ...search, page: page });
              }}
              to={"?" + qs.stringify(filterNonNull({ ...search, page: page }))}
            >
              {page}
            </Link>
          </li>
        );
      }
      const range = count_page-current_page; //10 - 6 = 4, 10-7=3
      if(range<=4) {

        const dot = current_page - (7 - range);
        if (page == dot) {
          return (
            <li key={page} className="page-item">
              <Link
                className={classNames("page-link", {
                  active: page === current_page,
                })}
                onClick={() => {
                  setSearch({ ...search, page: page });
                }}
                to={
                  "?" + qs.stringify(filterNonNull({ ...search, page: page }))
                }
              >
                ...
              </Link>
            </li>
          );
        } 
        else if (current_page >= count_page-5 && page>dot) {
          return (
            <li key={page} className="page-item">
              <Link
                className={classNames("page-link", {
                  active: page === current_page,
                })}
                onClick={() => {
                  setSearch({ ...search, page: page });
                }}
                to={
                  "?" + qs.stringify(filterNonNull({ ...search, page: page }))
                }
              >
                {page}
              </Link>
            </li>
          );
        }
        
      }
    }
  });

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

        <nav>
          <ul className="pagination">{pagination}</ul>
        </nav>
      </div>
    </>
  );
};
export default HomePage;
