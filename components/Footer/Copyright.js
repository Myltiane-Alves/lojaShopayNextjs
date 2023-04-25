import Link from "next/link";
import styles from "./styles.module.scss";
import { IoLocationSharp } from "react-icons/io5";
export default function Copyright({ country }) {
 
  return (
    <div className={styles.footer__copyright}>
      <section>©2023 M&L Loja Todos os direitos Reservados.</section>
      <section>
        <ul>
          {data.map((link, index) => (
            <li key={link.id}>
           
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li>
            <span>
              <IoLocationSharp /> {country.name} 
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
const data = [
  {
    id: 1,
    name: "Centro de Privacidade",
    link: "",
  },
  {
    id: 2,
    name: "Politicas de Privacidade & Cookies",
    link: "",
  },
  {
    id: 3,
    name: "Gerenciar cookies",
    link: "",
  },
  {
    id: 4,
    name: "Termos e Condições",
    link: "",
  },
  {
    id: 5,
    name: "Copyright Noticias",
    link: "",
  },
];
