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
import Share from "./share";
import Accordian from "./Accordian";
import SimillarSwiper from "./SimillarSwiper";
import { addToCart, updateCart } from "@/store/cartSlice";
import { hideDialog, showDialog } from "../../../store/DialogSlice";
// import { signIn, useSession } from "next-auth/react";


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
        dispatch(hideDialog)
    }, [])
    useEffect(() => {
        setSize("")
        setQty(1)
    }, [router.query.size])

    useEffect(() => {
        if(qty > product.quantity) {
            setQty(product.quantity)
        }
    }, [router.query.sizes])
    const addToCartHandler = async () => {
        if(!router.query.size) {
            setError("Selecione o tamanho da peça.")
            return;
        }
        const { data }= await axios.get(
            `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
        );
        if(qty > data.quantity) {
            setError(
                "A quantidade que você escolheu é maior do que em estoque. Experimente e reduza a quantidade"
            );
        } else if (data.quantity < 1) {
            setError("Este produto está fora de estoque.")
            return ;
        } else {
            let _uid = `${data._id}_${product.style}_${router.query.size}`;
            let exist = cart.cartItems.find((p) => p._uid === _uid);
            if(exist) {
                let newCart = cart.cartItems.map((p) => {
                    if (p._uid == exist._uid) {
                      return { ...p, qty: qty };
                    }
                    return p;
                  });
                  dispatch(updateCart(newCart));
            } else {
                dispatch(
                    addToCart({
                        ...data,
                        qty,
                        size: data.size,
                        _uid
                    })
                );
            }
        }
    }
    const handleWishlist = async () => {
        try {
          if (!session) {
            return signIn();
          }
          const { data } = await axios.put("/api/user/wishlist", {
            product_id: product._id,
            style: product.style,
          });
          dispatch(
            showDialog({
              header: "Produto adicionado à lista de desejos com sucesso",
              msgs: [
                {
                  msg: data.message,
                  type: "sucesso",
                },
              ],
            })
          );
        } catch (error) {
          dispatch(
            showDialog({
              header: "Erro na lista de desejos",
              msgs: [
                {
                  msg: error.response.data.message,
                  type: "error",
                },
              ],
            })
          );
        }
    };
    return (
        <div className={styles.infos}>
            <div className={styles.infos__container}>
                <h1 className={styles.infos__name}>{product.name}</h1>
                <h2 className={styles.infos__sku}>{product.sku}</h2>
                <div className={styles.infos__rating}>
                    <Rating
                        name="half-rating-read"
                        defaultValue={product.rating}
                        precision={0.5}
                        readOnly
                        style={{ color: "#FACF19" }}
                    />
                    ({product.numReviews}
                    {product.numReviews == 1 ? " review" : " reviews"})
                </div>
                <div className={styles.infos__price}>
                    {!size ? <h2>{product.priceRange}</h2> : <h1>{product.price}R$</h1>}
                    <p>é aqui</p>
                    {product.discount > 0 ? (
                        <h3>
                            {size && <span>{product.priceBefore}R$</span>}
                            <span>(-{product.discount}%)</span>
                        </h3>
                    ) : (
                        ""
                    )}
                </div>
                <span className={styles.infos__shipping}>
                    {product.shipping
                        ? `+${product.shipping}R$ Taxa de envio`
                        : "Frete grátis"
                    }
                </span>
                <span>
                    {size
                        ? product.quantity
                        : product.sizes.reduce((start, next) => start + next.qty, 0)
                    }{" "}
                    Peças disponíveis.
                </span>
                <div className={styles.infos__sizes}>
                    <h4>Selecione o tamanho : </h4>
                    <div className={styles.infos__sizes_wrap}>
                        {product.sizes.map((size, i) => (
                            <Link
                                href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
                            >
                                <div
                                    className={`${styles.infos__sizes_size} ${i == router.query.size && styles.active_size
                                        }`}
                                    onClick={() => setSize(size.size)}
                                >
                                    {size.size} 
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={styles.infos__colors}>
                    {product.colors &&
                        product.colors.map((color, i) => (
                            <span
                                className={i == router.query.style ? styles.active_color : ""}
                                onMouseOver={() =>
                                    setActiveImg(product.subProducts[i].images[0].url)
                                }
                                onMouseLeave={() => setActiveImg("")}
                            >
                                <Link href={`/product/${product.slug}?style=${i}`}>
                                    <img src={color.image} alt="" />
                             
                                </Link>
                            </span>
                        ))}
                </div>
                <div className={styles.infos__qty}>
                    <button onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
                        <TbMinus />
                    </button>
                    <span>{qty}</span>
                    <button
                        onClick={() => qty < product.quantity && setQty((prev) => prev + 1)}
                    >
                        <TbPlus />
                    </button>
                </div>
                <div className={styles.infos__actions}>
                    <button
                        disabled={product.quantity < 1}
                        style={{ cursor: `${product.quantity < 1 ? "not-allowed" : ""}` }}
                        onClick={() => addToCartHandler()}
                    >
                        <BsHandbagFill />
                        <b>ADICIONAR AO CARRINHO</b>
                    </button>
                    <button onClick={() => handleWishlist()}>
                        <BsHeart />
                        LISTA DE DESEJOS
                    </button>
                </div>
                {error && <span className={styles.error}>{error}</span>}
                {success && <span className={styles.success}>{success}</span>}
                <Share />
                <Accordian details={[product.description, ...product.details]} />
                <SimillarSwiper />
            </div>
        </div>
    )
}