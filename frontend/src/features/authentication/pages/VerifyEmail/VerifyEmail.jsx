import React, {useState} from 'react';
import classes from './VerifyEmail.module.scss';
import AuthInput from "../../components/UI/Input/AuthInput.jsx";
import AuthButton from "../../components/UI/Button/AuthButton.jsx";
import Box from "../../components/UI/Box/Box.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = async (code) => {
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            await axios.put(
                "http://localhost:8080/api/authentication/validate-email-verification-token",
                null,
                {
                    params: {token: code},
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setErrorMessage("");
            navigate("/");
        } catch (e) {
            console.log(e);
            const message = e.response?.data?.message || "Щось пішло не так, будь ласска спробуйте знову";
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    const sendEmailVerificationToken = async () => {
        setErrorMessage("");
        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");

            await axios.get("http://localhost:8080/api/authentication/send-email-verification-token", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setErrorMessage("");
            setMessage("Код надіслано успішно. Будь ласка перевірте вашу електрону скриньку.");
        } catch (e) {
            console.log(e);
            const message = e.response?.data?.message || "Щось пішло не так, будь ласска спробуйте знову.";
            setErrorMessage(message);
        }

        setIsLoading(false);
    };

    return (
        <div className={classes.root}>
            <Box>
                <h1>Підтвердіть електрону адресу</h1>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    const code = e.currentTarget.code.value;
                    await validateEmail(code);
                    setIsLoading(false);
                }}
                >
                    <p>Підтвердіть вашу електрону адресу</p>
                    <AuthInput type="text" label="Верифікаційний код" key="code" name="code"/>
                    {message && <p style={{color: "green"}}>{message}</p>}
                    {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                    <AuthButton type="submit" disabled={isLoading}>Підтвердити електрону адресу</AuthButton>
                    <AuthButton outline type="button" disabled={isLoading} onClick={() => sendEmailVerificationToken()}>
                       Надіслати знову
                    </AuthButton>
                </form>
            </Box>
        </div>
    );
};

export default VerifyEmail;