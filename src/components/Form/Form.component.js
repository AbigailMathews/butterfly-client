import React, { useState, useEffect, useCallback } from "react";
import socketIOClient from "socket.io-client";
import styles from "./Form.module.css";

import { supportTexts } from "../../data/supportTexts";

const Form = ({ butterflyAnimation }) => {
  const socket = socketIOClient("https://butterfly-server-api.herokuapp.com/");
  const [newButterfly, setNewButterfly] = useState();

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      const emitObj = {
        color: event.target.value,
      };

      setNewButterfly(emitObj)
    },
    [setNewButterfly]
  );

  useEffect(() => {
    if (newButterfly) {
      console.log("Emit butterfly " + newButterfly.color)
      //On click, emit data to server
      socket.emit("butterfly", newButterfly.color);
    }
  }, ([newButterfly, socket]));

  return (
    <form className={styles.buttons}>
      {supportTexts.map((text) => (
        <div key={text.pathName} id={text.pathName} className={styles.morePadding}>
          <button
            onClick={handleSubmit}
            className={styles[text.pathName]}
            value={text.color}
          ></button>
          <p>{text.msg}</p>
        </div>
      ))}
    </form>
  );
};

export default Form;
