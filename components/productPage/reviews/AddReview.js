import styles from "./styles.module.scss";
import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaLastfmSquare } from "react-icons/fa";

export default function AddReview({ product, setReviews }) {
    return (
        <div className={styles.reviews__add}>
            <div className={styles.reviews__add_wrap}>
                <div className={styles.flex} style={{ gap: "10px" }}>

                </div>
            </div>
        </div>
    )
}