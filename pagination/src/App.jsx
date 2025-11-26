import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  console.log(products);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=80");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selected) => {
    if (selected >= 1 && selected <= products.length / 10 && selected != page)
      setPage(selected);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((pod) => {
            return (
              <span className="products__single" key={pod.id}>
                <img src={pod.thumbnail} alt={pod.title} />
                <span>{pod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                key={i}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={
              page < products.length / 10 ? "" : "pagination__disabled"
            }
            onClick={() => selectPageHandler(page + 1)}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
};

export default App;

//beam convension we used for css class
//we have to provide alt for image it put good impression
//while mapping the elements we should compulsary provide the key
