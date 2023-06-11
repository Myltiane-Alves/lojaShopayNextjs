import styles from '../styles/Home.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import db from '../utils/db'
import { useSession } from 'next-auth/react'
import Main from '../components/home/main';
import FlashDeals from '@/components/home/flashDeals'
import Category from '@/components/home/category'
import { women_accessories, women_dresses, women_shoes, women_swiper } from '@/data/home'
import { useMediaQuery } from "react-responsive";
import ProductsSwiper from '@/components/productsSwiper'
import Product from '@/models/Product'
import ProductCard from '@/components/productsCard'
export default function Home({ country, products }) {
  const { data: session } = useSession()
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  console.log(products)
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Vestidos"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Sapatos"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="Sapatos"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="Acessórios"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductsSwiper products={women_swiper} />
          <div className={styles.products}>
            {products.map((product) => (
              
              <ProductCard product={product} key={product._id} />
              ))}
              <div>aqui é product card </div>
          </div>
        </div>
      </div>
      <Footer country={country} />

    </>
  )
}

export async function getServerSideProps() {
  db.connectDb()
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  let data = await axios
    .get("https://api.ipregistry.co/?key=xq0wqbo2qp2nu3qh")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      country: {
        name: "Brasil",
        flag: "https://cdn-icons-png.flaticon.com/512/3909/3909370.png",
        flag: "",
      }
    }
  }
}