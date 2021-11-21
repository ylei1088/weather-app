import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./Form.module.css";

const Form = ({ submitSearch }) => {
  const [city, setCity] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!city || city === "") return;
    submitSearch(city);
  };

  return (
    <form className={`${styles.box}`} onSubmit={onSubmit}>
      <input
        aria-label="city"
        type="text"
        className={`${styles.input} form-control`}
        placeholder="Enter City"
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button type="submit" className={styles.button} onClick={onSubmit}>
        SEARCH
      </button>
    </form>
  );
};

Form.propTypes = {
  submitSearch: PropTypes.func.isRequired,
};

export default Form;
