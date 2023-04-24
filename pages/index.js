import styles from '../styles/Home.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import db from '../utils/db'
import { useSession } from 'next-auth/react'
import Main from '../components/home/main';

export default function Home({ country }) {
  const {data: session} = useSession()
  // console.log(session)
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <div className={styles.home__category}>
            
          </div>
          <div className={styles.products}>

          </div>
        </div>
      </div>
      <Footer  country={country} />
   
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