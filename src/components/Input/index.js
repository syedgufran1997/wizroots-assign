import React from "react";
import styles from "./input.module.css";

function InputField(props) {
  const { value, onChange } = props;
  return (
    <div className={styles.inputMainWrapper}>
      <div className={styles.imgWrap}>
        <img src="/search-icon.svg" alt="searchicon" />
      </div>
      <input
        type="text"
        placeholder="Search for keywords, author"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
