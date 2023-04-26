import styles from "./styles.module.scss";
import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaLastfmSquare } from "react-icons/fa";
import Select from "./Select";
import Images from "./Images";

export default function AddReview({ product, setReviews }) {
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState("");
    const [style, setStyle] = useState("");
    const [fit, setFit] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState();
    const [images, setImages] = useState([]);
    let uploaded_images = [];
    const handleSize = (size) => {
        setSize(size);
    }
    return (
        <div className={styles.reviews__add}>
            <div className={styles.reviews__add_wrap}>
                <div className={styles.flex} style={{ gap: "10px" }}>
                 
                    <Select
                        property={size}
                        text="Tamanho"
                        data={product.allSizes.filter((x) => x.size !== size)}
                        handleChange={setSize}
                    />
                    <Select
                        property={style}
                        text="Style"
                        data={product.colors.filter((x) => x !== style)}
                        handleChange={setStyle}
                    />
                    <Select
                        property={fit}
                        text="Como isso se encaixa"
                        data={fits.filter((x) => x !== fit)}
                        handleChange={setFit}
                        />
                    </div>
                    <Images images={images} setImages={setImages} />
                    <textarea
                        name="Avaliação"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Escreva aqui o seu comentário"
                    />
                    <Rating
                        name="half-rating-read"
                        defaultValue={0}
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        precision={0.5}
                        style={{ color: "#facf19", fontSize: "3rem" }}
                    />
                    <button
                        className={`${styles.login_btn} ${loading ? styles.disabled : ""}`}
                        onClick={() => handleSubmit()}
                        disabled={loading}
                    >
                        Enviar {" "}
                        {loading && <ClipLoader loading={loading} color="#fff" />}
                    </button>
            </div>
        </div>
    )
}
let fits = ["Pequeno", "Médio", "Grande"]