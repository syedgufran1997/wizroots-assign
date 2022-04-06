import React from "react";
import styles from "./button.module.css";

function CategoryButton({ buttonName, onClick }) {
  return (
    <div className={styles.buttonWrap}>
      <button type="button" onClick={onClick}>
        {buttonName}
      </button>
    </div>
  );
}

export default CategoryButton;
