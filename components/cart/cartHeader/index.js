import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { compareArrays } from "../../../utils/arrays_utils";
export default function CartHeader({ cartItems, selected, setSelected }) {
    const [active, setActive] = useState();
    return (
        <div className={`${styles.cart__header} ${styles.card}`}>
          <h1>Resumo do item({cartItems.length})</h1>
          <div className={styles.flex} onClick={() => handleSelect()}>
            <div
              className={`${styles.checkbox} ${active ? styles.active : ""}`}
            ></div>
            <span>Selecione todos os itens</span>
          </div>
        </div>
      );
}