import Link from "next/link";
import styles from "./styles.module.scss";

export default function Links() {
    return (
        <div className={styles.footer__links}>
            {links.map((link, i) => (
                <ul>
                    {i === 0 ? (
                        <img src="../../../logo.png" alt="" />
                    ) : (
                        <b>{link.heading}</b>
                    )}
                    {link.links.map((link) => (
                        <li>
                            <Link href={link.link}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    )
}

const links = [
    {
        heading: "M&L Loja",
        links: [
            {
                name: "Sobre",
                link: "",
            },
            {
                name: "Contato",
                link: "",
            },
            {
                name: "Responsabilidade social",
                link: "",
            },
            {
                name: "",
                link: "",
            },
        ],
    },
    {
        heading: "AJUDA E SUPORTE ",
        links: [
            {
                name: "Informação de Envio",
                link: "",
            },
            {
                name: "Devoluções",
                link: "",
            },
            {
                name: "Como pedir",
                link: "",
            },
            {
                name: "Como rastrear",
                link: "",
            },
            {
                name: "Guia de tamanho",
                link: "",
            },
        ],
    },
    {
        heading: "Atendimento ao Cliente",
        links: [
            {
                name: "Atendimento ao Cliente",
                link: "",
            },
            {
                name: "Termos e Condições",
                link: "",
            },
            {
                name: "Consumidores (Transações)",
                link: "",
            },
            {
                name: "Responda à nossa pesquisa de feedback",
                link: "",
            },
        ],
    },
];