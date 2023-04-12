import Ad from './Ad';
import styles from './styles.module.scss';

export default function Header({ country }) {
    return (
        <header className={styles.header}>
            <Ad />
        </header>
    )

}