import styles from "../../styles/product.module.scss";
import db from "@/utils/db";
import Product from "../../models/Product";
import Category from "../../models/Category";
import SubCategory from "../../models/SubCategory";
import User from "../../models/User";
import Head from "next/head";
import Header from "@/components/Header";
import { useState } from "react";
import MainSwiper from "@/components/productPage/mainSwiper";

export default function product({ product, related }) {
    const [activeImg, setActiveImg] = useState("");
    const country = {
        name: "Brasil",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
    };
    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <Header country={country} />
            <div className={styles.product}>
                <div className={styles.product__container}>
                    <div className={styles.path}>
                        Home / {product.category.name}
                        {product.subCategories.map((sub) => ( 
                            <span> / {sub.name}</span>
                        ))}
                    </div>
                    <div className={styles.product__main}>
                            <MainSwiper
                                images={product.images}
                                activeImg={activeImg}
                            />
                            {/* <Infos product={product} setActiveImg={setActiveImg} /> */}
                    </div>

                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { query } = context;
    const slug = query.slug;
    const style = query.style;
    const size = query.size || 0;

    db.connectDb();

    let product = await Product.findOne({ slug })
    
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory })
    .populate({ path: "reviews.reviewBy", model: User })
    .lean();
    let subProduct = product.subProducts[style];
    let prices = subProduct.sizes
        .map((s) => {
            return s.prices;
        })
        .sort((a, b) => {
            return a - b;
        });
    let newProduct = {
        ...product,
        style, 
        images: subProduct.images,
        sizes: subProduct.sizes,
        discount: subProduct.discount,
        sku: subProduct.sku,
        colors: product.subProducts.map((p) => {
            return p.colors;
        }),
        priceRange: 
            prices.lenght > 1 
                ? `From ${prices[0]} to ${prices[prices.lenght - 1]}R$`
                : "",
            price:
                subProduct.discount > 0
                    ? (subProduct.sizes[size].price -
                        subProduct.sizes[size].price / subProduct.discount
                    ).toFixed(2)
                    :   subProduct.sizes[size].price,
            priceBefore: subProduct.sizes[size].price,
            quantity: subProduct.sizes[size].qty,
    }
    db.disconnectDb();
    return {
        props: {
            product: JSON.parse(JSON.stringify(newProduct)),
        },
    }
}