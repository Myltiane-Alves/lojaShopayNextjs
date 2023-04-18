import Link from "next/link";
import styles from "./styles.module.scss";
import { signOut, signIn } from "next-auth/react";
export default function UserMenu({ session }) {
  return (
    <div className={styles.menu}>
      <h4>Bem-vindo ao ML Shop !</h4>
        {session ? (
          <div className={styles.flex}>
            <img src="" alt="" className={styles.menu__img} />
            <div className={styles.col}>
              <span>Bem vindo de volta</span>
              <h3>Nome</h3>
              <span onClick={() => signOut()}>Sair</span>
            </div>
          </div>

        ) : ( 

          <div className={styles.flex}>
            <button className={styles.btn_primary}>Cadastro</button>
            <button className={styles.btn_outlined} onClick={() => signIn()}>
              Login
            </button>
          </div>
        )}
        <ul>
          <li>
            <Link href="/profile">Conta</Link>
          </li>
          <li>
            <Link href="/profile/orders">Meus Pedidos</Link>
          </li>
          <li>
            <Link href="/profile/messages">Central de mensagens</Link>
          </li>
          <li>
            <Link href="/profile/address">Endereço</Link>
          </li>
          <li>
            <Link href="/profile/whishlist">Lista de Desejos</Link>
          </li>
        </ul>
    </div>
  );
}
