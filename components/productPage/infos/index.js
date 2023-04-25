import styles from "./styles.module.scss";
import Rating from "@mui/material/Rating";
import react, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { TbPlus, TbMinus } from "react-icons/tb";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";



export default function Infos({ product, setActiveImg }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const [size, setSize] = useState(router.query.size);
    const [qty, setQty] = useState(1);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { cart } = useSelector((state) => ({ ...state }));

    useEffect(() => {

    }, [])

    return (
        <div className={styles.infos}>

        </div>
    )
}