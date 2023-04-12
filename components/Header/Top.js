import styles from './styles.module.scss';
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from 'next/link';
import { useState } from 'react';

export default function Top({ country }) {
    const [visible, setVisible] = useState(false);
    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li className={styles.li}>
                        <img src="/images/brasil.png" alt="bandeira do brasil" />
                        <span> / Real</span>
                    </li>
                    <li className={styles.li}>
                        <MdSecurity />
                        <span>Proteção ao comprador</span>
                    </li>
                    <li className={styles.li}>
                        <span>Atendimento ao Cliente</span>
                    </li>
                    <li className={styles.li}>
                        <span>Ajuda</span>
                    </li>
                    <li className={styles.li}>
                        <BsSuitHeart />
                        <Link href="/profile/whishlist">
                            <span>Lista de Desejos</span>
                        </Link>
                    </li>
                    <li  className={styles.li}>
                        {session ? (
                            <li className={styles.li}>
                                <div className={styles.flex}>
                                    <RiAccountPinCircleLine />
                                    <span>Conta</span>
                                    <RiArrowDropDownFill />
                                </div>
                            </li>

                        ) : ( 

                            <li className={styles.li}>
                                <div className={styles.flex}>
                                    <img src="/images/userAvatar.png" alt="avatar do usuário" />
                                    <span>Usuário</span>
                                    <RiArrowDropDownFill />
                                </div>
                            </li>
                        )}
                    </li>
                </ul>

            </div>
        </div>
    )

}