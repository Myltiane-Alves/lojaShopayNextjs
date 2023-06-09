import styles from "./styles.module.scss";
import { Rating } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AddReview from "./AddReview";
import Table from "./Table";

export default function Reviews({ product }) {
    const { data: session } = useSession();
    const [rating, setRating] = useState("");
    const [reviews, setReviews] = useState(product.reviews);
    console.log(product.reviews)
    return (
        <div className={styles.reviews}>
            <div className={styles.reviews__container}>
                <h1>Avaliações de Clientes ({product.reviews.length})</h1>
                <div className={styles.reviews__stats}>
                    <div className={styles.reviews__stats_overview}>
                        <span>Classificação média</span>
                        <div className={styles.reviews__stats_overview_rating}>
                            <Rating
                                name="half-rating-read"
                                defaultValue={product.rating}
                                precision={0.5}
                                readOnly
                                style={{ color: "#FACF19" }}
                            />
                            {product.rating == 0 ? "Nenhuma revisão ainda. " : product.rating}
                        </div>
                    </div>
                    <div className={styles.reviews__stats_reviews}>
                        {product.ratings.map((rating, i) => (
                            <div className={styles.reviews__stats_reviews_review}>
                                <Rating
                                    name="half-rating-read"
                                    defaultValue={5 - i}
                                    readOnly
                                    style={{ color: "#FACF19" }}
                                />
                                <div className={styles.bar}>
                                    <div
                                        className={styles.bar__inner}
                                        style={{ width: `${rating.percentage}%` }}
                                    ></div>
                                </div>
                                <span>{rating.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                {session ? (
                    <AddReview product={product} setReviews={setReviews} />
                ) : (
                    <button onClick={() => signIn()} className={styles.login_btn}>
                        Faça login para adicionar avaliação
                    </button>
                )}
                <Table
                    reviews={reviews}
                    allSizes={product.allSizes}
                    colors={product.colors}
                />
            </div>
        </div >
    )
}