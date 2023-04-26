import styles from "./styles.module.scss";
import { IoArrowDown } from "react-icons/io5";
import { useState } from "react";
export default function Select({ property, text, data, handleChange }) {
    const [visible, setVisible] = useState(false);
    return (
        <div className={styles.select}>
            {text}
            <div
                className={styles.select__header}
                onMouseOver={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                style={{
                    background: `${text == "Style" && property.color && `${property.color}`
                        }`,
                }}
            >
                <span
                    className={`${styles.flex} ${styles.select__header_wrap}`}
                    style={{ padding: "0 5px" }}
                >
                    {text == "Tamanho" ? (
                        property || `Selecione ${text}`
                    ) : text == "Style" && property.image ? (
                        <img src={property.image} alt="" />
                    ) : text == "Como isso se encaixa" && property ? (
                        property
                    ) : !property && text == "Como isso se encaixa" ? (
                        "Como isso se encaixa"
                    ) : (
                        "Select Style"
                    )}
                    <IoArrowDown />
                </span>
                {visible && (
                    <ul
                        className={styles.select__header_menu}
                        onMouseOver={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        {data.map((item, i) => {
                            if (text == "Tamanho") {
                                return (
                                    <li key={i} onClick={() => handleChange(item.size)}>
                                        <span>{item.size}</span>
                                    </li>
                                )
                            }
                            if (text == "Style") {
                                return (
                                  <li
                                    key={i}
                                    onClick={() => handleChange(item)}
                                    style={{ backgroundColor: `${item.color}` }}
                                  >
                                    <span>
                                      <img src={item.image} alt="" />
                                    </span>
                                  </li>
                                );
                            }
                            if (text == "Como isso se encaixa") {
                                return (
                                  <li key={i} onClick={() => handleChange(item)}>
                                    <span>{item}</span>
                                  </li>
                                );
                            }
                        })}
                    </ul>
                )}
            </div>

        </div>
    )
}