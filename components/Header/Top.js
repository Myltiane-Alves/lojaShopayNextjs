import styles from './styles.module.scss';
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from 'next/link';
import { useState } from 'react';
import UserMenu from './UserMenu';
import { useSession } from 'next-auth/react'

export default function Top({ country }) {
    const { data: session } = useSession();
    // console.log(session)
    const [visible, setVisible] = useState(false);
    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li className={styles.li}>
                        {/* <img src="/imagens/brasil.png" alt="bandeira do brasil" /> */}
                        <img src={country?.flag} alt="bandeira do brasil" />
                        <span>{country?.name} / Real</span>
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
                    <li
                        className={styles.li}
                        onMouseOver={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        {session ? (
                            <li className={styles.li}>
                                <div className={styles.flex}>
                                    {/* <img src="/imagens/userAvatar.png" alt="avatar do usuário" /> */}
                                    <img src={session?.user?.image} alt="avatar do usuário" />
                                    <span>{session.user.name}</span>
                                    <RiArrowDropDownFill />
                                </div>
                            </li>
                        ) : (
                            <li className={styles.li}>
                                <div className={styles.flex}>
                                    <RiAccountPinCircleLine />
                                    <span>Conta</span>
                                    <RiArrowDropDownFill />
                                </div>
                            </li>
                        )}


                        {visible && <UserMenu session={session} />}
                    </li>
                </ul>

            </div>
        </div>
    )

}