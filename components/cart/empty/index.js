import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
export default function Empty() {
  const { data: session } = useSession();
  return (
    <div className={styles.empty}>
      <img src="../../../imagens/empty.png" alt="" />
      <h1>carrinho esta vazio</h1>
      {!session && (
        <button onClick={() => signIn()} className={styles.empty__btn}>
          ENTRAR / CADASTRE-SE
        </button>
      )}
      <Link href="/browse">
        
          <button className={`${styles.empty__btn} ${styles.empty__btn_v2}`}>
            COMPRE AGORA
          </button>
        
      </Link>
    </div>
  );
}
