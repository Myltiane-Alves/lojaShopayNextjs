import Link from "next/link";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";
export default function FlashCard({ product }) {
    return (
        <div className={styles.card}>
            <div className={styles.card__img}>
                <Link href={product.link}>
                    <img src={product.image} alt="" />
                </Link>
                <div className={styles.flash}>
                    <MdFlashOn />
                    <span>-{product.discount}%</span>
                </div>
            </div>
            <div className={styles.card__price}>
                <span>R$  {(product.price - product.price / product.discount).toFixed(2)}</span>
                {/* <span>R$  {console.log((product.price - product.discount ))}</span> */}
                <span>R$ {(product.price  - (product.price  / product.discount)).toFixed(2)}</span>
            </div>
            <div className={styles.card__bar}>
                <div className={styles.card__bar_inner} style={{ width: "75%" }}></div>
            </div>
            <div className={styles.card__percentage}>{product.sold}%</div>
        </div>
    )
}