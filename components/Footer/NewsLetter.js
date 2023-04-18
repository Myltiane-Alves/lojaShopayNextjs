import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";

export default function NewsLetter() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const subscribe = async () => {
        setSuccess("");
        setError("");
        try {
            setLoading(true);
            const { data } = await axios.post("", { email });
            setSuccess(data.message);
            setLoading(false);
            setEmail("")
        } catch(error) {
            setSuccess("")
            setLoading(false)
            setError(error.response.data.message);
        }
    }

    <div className={styles.footer__newsletter}>
      <h3>ASSINE A NOSSA NEWSLETTER</h3>
      <div className={styles.footer__flex}>
            <input 
                className={styles.btn_primary}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button 
                className={styles.btn_primary} 
                disabled={loading === true}
                style={{ cursor: `${loading ? "not-allowed" : ""}`}}
                onClick={subscribe}
            >
                Inscreva-Se
            </button>
      </div>
      {loading && <div className="">loading...</div>}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <p>
        Ao clicar no botão INSCREVA-SE, você concorda em{" "}
        <Link href="">nossa Política de Privacidade e Cookies</Link>
      </p>
    </div>
}