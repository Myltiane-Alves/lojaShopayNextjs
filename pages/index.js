import styles from '../styles/Home.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import db from '../utils/db'
import { useSession } from 'next-auth/react'
import Main from '../components/home/main';
import FlashDeals from '@/components/home/flashDeals'
import Category from '@/components/home/category'
import { women_accessories, women_dresses, women_shoes } from '@/data/home'
import { useMediaQuery } from "react-responsive";
export default function Home({ country }) {
  const { data: session } = useSession()
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
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
          <div className={styles.products}>
            
          </div>
        </div>
      </div>
      <Footer country={country} />

    </>
  )
}

export async function getServerSideProps() {
  db.connectDb()
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
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      }
    }
  }
}