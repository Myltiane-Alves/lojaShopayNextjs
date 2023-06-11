import styles from "../styles/cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../components/cart/header";
import Empty from "@/components/cart/empty";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import CartHeader from "@/components/cart/cartHeader";
import Product from "@/components/cart/product";
import ProductsSwiper from "@/components/productsSwiper";
import { women_swiper } from "@/data/home";
export default function cart() {
    const Router = useRouter();
    const { data: session } = useSession();
    const [selected, setSelected] = useState([]);
    const { cart } = useSelector((state) => ({ ...state }))
    const [shippingFee, setShippingFee] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    return (
        <>
            <Header />
            <div className={styles.cart}>
                {cart.length > 1 ? (
                    <div className={styles.cart__container}>
                        <CartHeader
                            cartItems={cart.cartItems}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <div className={styles.cart__products}>
                            {cart.cartItems.map((product) => (
                                <Product
                                    product={product}
                                    key={product._uid}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <Empty />
                )}
                <ProductsSwiper products={women_swiper} />
            </div>
        </>
    )
}