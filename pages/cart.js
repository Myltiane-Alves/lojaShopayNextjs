import styles from "../styles/cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../components/cart/header";
export default function cart() {
    return (
        <>
            <Header />
            <div className={styles.cart}>

            </div>
        </>
    )
}