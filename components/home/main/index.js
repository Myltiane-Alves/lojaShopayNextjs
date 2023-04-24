
import styles from "./styles.module.scss";
import Header from "./Header";
import MainSwiper from "./swiper";
import { useSession } from "next-auth/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import Menu from "./Menu";
import Offers from "./offers";
import User from "./User";
export default function Main() {
    const { data: session } = useSession();
    return (
        <div className={styles.main}>
            <Header />
            <Menu />
            <MainSwiper />
            <Offers />
            <User />
        </div>
    )
}