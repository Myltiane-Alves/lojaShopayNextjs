import Copyright from './Copyright';
import Links from './Link';
import Payment from './Payment';
import Socials from './Sociais';
import styles from './styles.module.scss';

export default function Footer({ country }) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Links />
                <Socials />
                <Payment />
                <Copyright country={country}/>
            </div>
        </footer>
    )

}