import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from '../styles/signin.module.scss';
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import LoginInput from "@/components/inputs/loginInput";
const initialvalues = {
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
    success: "",
    error: "",
    login_error: "",
};

export default function signin() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(initialvalues);
    const { 
        login_email,
        login_password, 
        name,
        email,
        password,
        conf_password,
        success,
        error,
        login_error,
    } = user;
    const handleChange = (e) => {
        const {name, value } = e.target;
        setUser({...user, [name]: value})
    };

    const loginValidation=Yup.object({
        login_email: Yup.string()
            .email("Invalid email")
            .required("Required"),
        login_password: Yup.string().required("Required"),
    });
    const registerValidation=Yup.object({
        email: Yup.string()
            .email("Invalid email")
            .required("Required"),
        password: Yup.string().required("Required"),
    });

    const signUpHandler = async () => {
        
    }
    const signInHandler = async () => {

    }
    const country = {
        name: "",
        flag: "",
    }
    return (
        <>
            <Header />
            <div className={styles.login}>
                <div className={styles.login__container}>
                    <div className={styles.login__header}>
                        <div className={styles.back__svg}>
                            <BiLeftArrowAlt />
                        </div>
                        <span>
                            Ficaríamos felizes em se juntar a nós ! <Link href="/">ir a Loja</Link>
                        </span>
                    </div>
                    <div className={styles.login__form}>
                        <h1>Sign in</h1>
                        <p>
                            Tenha acesso a um dos melhores serviços de Compras do mundo.
                        </p>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                login_email,
                                login_password,
                            }}
                            validationSchema={loginValidation}
                            onSubmit={() => {
                                // signInHandler();
                            }}
                        >
                            {(form) => (
                                <Form method="post" action="/api/auth/signin/email">
                                    <input
                                        type="hidden"
                                        name="csrfToken"
                                        // defaultValue={csrfToken}
                                    />
                                    <LoginInput
                                        type="text"
                                        name="login_email"
                                        icon="email"
                                        placeholder="Email Address"
                                        onChange={handleChange}
                                    />
                                    <LoginInput
                                        type="password"
                                        name="login_password"
                                        icon="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                    />
                                    {/* <CircledIconBtn type="submit" text="Sign in" /> */}
                                    {login_error && (
                                        <span className={styles.error}>{login_error}</span>
                                    )}
                                    <div className={styles.forgot}>
                                        <Link href="/auth/forgot">Forgot password ?</Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer country="" />
        </>
    )
}