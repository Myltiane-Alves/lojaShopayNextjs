import { useState } from "react";
import styles from "./styles.module.scss";
import TableSelect from "./TableSelect";
export default function TableHeader({ reviews, allSizes, colors }) {
  const [rating, setRating] = useState();
  const [size, setSize] = useState();
  const [style, setStyle] = useState();
  const [order, setOrder] = useState();
  return (
    <div className={styles.table__header}>
      <TableSelect
        property={rating}
        text="Avaliação"
        data={ratings.filter((x) => x.value !== rating)}
        handleChange={setRating}
      />
      <TableSelect
        property={size}
        text="Tamahho"
        data={allSizes.filter((x) => x.size !== size)}
        handleChange={setSize}
      />
      <TableSelect
        property={style}
        text="Style"
        data={colors.filter((x) => x !== style)}
        handleChange={setStyle}
      />
      <TableSelect
        property={order}
        text="Order"
        data={orderOptions.filter((x) => x.value !== order)}
        handleChange={setOrder}
      />
    </div>
  );
}
const ratings = [
  {
    text: "Todos",
    value: "",
  },
  {
    text: "5 star",
    value: 5,
  },
  {
    text: "4 star",
    value: 4,
  },
  {
    text: "2 star",
    value: 2,
  },
  {
    text: "2 star",
    value: 2,
  },
  {
    text: "1 star",
    value: 1,
  },
];
const orderOptions = [
  {
    text: "Recomendado",
    value: "Recomendado",
  },
  {
    text: "Mais recente para o mais antigo",
    value: "Mais recente para o mais antigo",
  },
  {
    text: "Do mais antigo ao mais recente-",
    value: "Do mais antigo ao mais recente-",
  },
];
