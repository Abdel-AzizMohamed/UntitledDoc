import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import styles from "./pagination.module.css";

function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  hasNext,
  HasPrevious,
  pagCount = 3,
}) {
  const [pagItems, setPagItems] = useState([]);

  function generate_paginate() {
    const pageDifference = Math.round((pagCount - 1) / 2);
    const minPage = Math.max(1, currentPage - pageDifference);
    const maxPage = Math.min(totalPages, currentPage + pageDifference);

    setPagItems(() => []);

    for (let i = minPage; i <= maxPage; i++) {
      setPagItems((p) => [...p, i]);
    }
  }

  useEffect(() => {
    generate_paginate();
  }, [currentPage]);

  return (
    <ul className={styles.paginate}>
      <li
        className={styles["pag-item"]}
        onClick={() => setCurrentPage(() => 1)}
      >
        <FontAwesomeIcon icon={"caret-left"} />
        <FontAwesomeIcon icon={"caret-left"} />
      </li>
      <li
        className={styles["pag-item"]}
        onClick={() => setCurrentPage((p) => (HasPrevious ? p - 1 : p))}
      >
        <FontAwesomeIcon icon={"caret-left"} />
      </li>
      {pagItems.map((item, index) => {
        return (
          <li
            className={`${styles["pag-item"]} ${
              item === currentPage ? styles.active : ""
            }`}
            key={index}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </li>
        );
      })}
      <li
        className={styles["pag-item"]}
        onClick={() => setCurrentPage((p) => (hasNext ? p + 1 : p))}
      >
        <FontAwesomeIcon icon={"caret-right"} />
      </li>
      <li
        className={styles["pag-item"]}
        onClick={() => setCurrentPage(() => totalPages)}
      >
        <FontAwesomeIcon icon={"caret-right"} />
        <FontAwesomeIcon icon={"caret-right"} />
      </li>
    </ul>
  );
}

export default Pagination;
