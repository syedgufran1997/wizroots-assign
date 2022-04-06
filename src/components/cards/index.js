import React from "react";
import styles from "./card.module.css";

const NewsCard = (props) => {
  const { title, author, dateTime, description, src } = props;

  return (
    <div className={styles.cardMainWrapper}>
      <div className={styles.imgWrap}>
        <img src={src} alt="img" />
      </div>

      <div className={styles.contentWrap}>
        <h5>{title}</h5>

        <div className={styles.authorWrap}>
          <p>{author} </p>
          <p> {dateTime} </p>
        </div>

        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
