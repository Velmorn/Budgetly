import React, {useState} from 'react';
import classes from "./ResetPassword.module.scss"
import Box from "../../components/UI/Box/Box.jsx";
import AuthInput from "../../components/UI/Input/AuthInput.jsx";
import AuthButton from "../../components/UI/Button/AuthButton.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const sendPasswordResetToken = async (email) => {
        try {
            await axios.put("http://localhost:8080/api/authentication/send-password-reset-token",
                null,
                {
                    params: {
                        email
                    }
                }
            );
            setErrorMessage("");
            setEmailSent(true);
            return;
        } catch (error) {
            console.log(error);
            setErrorMessage("Щось пішло не так, будь ласка спробуйте знову.");
        } finally {
            setIsLoading(false);
        }

    }

    const resetPassword = async (email, token, newPassword) => {
        try {
            await axios.put("http://localhost:8080/api/authentication/reset-password",
                null,
                {
                    params: {
                        newPassword,
                        token,
                        email,
                    }
                });
            setErrorMessage("");
            navigate("/login");
        } catch (error) {
            console.log(error);
            setErrorMessage("Щось пішло не так, будь ласка спробуйте знову.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={classes.root}>
            <Box>
                <h1>Відновлення паролю</h1>
                {!emailSent ? (
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        setIsLoading(true);
                        const email = e.currentTarget.email.value;
                        await sendPasswordResetToken(email);
                        setEmail(email);
                        setIsLoading(false);
                    }}>
                        <p>
                            Введіть адресу електроної пошти, щоб відновити пароль
                        </p>
                        <AuthInput
                            name="email"
                            type="email"
                            label="Електрона адреса"
                        />
                        <p style={{color: "red"}}>{errorMessage}</p>
                        <AuthButton type="submit">Далі</AuthButton>
                        <AuthButton
                            type="button"
                            outline
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Назад
                        </AuthButton>
                    </form>
                ) : (
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setIsLoading(true);
                            const code = e.currentTarget.code.value;
                            const password = e.currentTarget.password.value;
                            await resetPassword(email, code, password);
                            setIsLoading(false);
                        }}
                    >
                        <p>Введіть верифікаційний код, який ми відправили ван на електрону скриньку, та новий пароль</p>
                        <AuthInput type="text" label="Верифікаційний код" key="code" name="code"/>
                        <AuthInput
                            label="Новий пароль"
                            name="password"
                            key="password"
                            type="password"
                            id="password"/>
                        <p style={{color: "red"}}>{errorMessage}</p>
                        <AuthButton type="submit">
                            Змінити пароль
                        </AuthButton>
                        <AuthButton
                            outline
                            type="button"
                            onClick={() => {
                                setErrorMessage("");
                                setEmailSent(false);
                            }}
                        >
                            Назад
                        </AuthButton>
                    </form>
                )}
            </Box>
        </div>
    );
};

export default ResetPassword;