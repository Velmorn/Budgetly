import React, {useState} from 'react';
import AuthInput from "../../components/UI/Input/AuthInput.jsx";
import Box from "../../components/UI/Box/Box.jsx";
import AuthButton from "../../components/UI/Button/AuthButton.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Separator from "../../components/UI/Separator/Separator.jsx";
import classes from "./Login.module.scss";
import {useAuthentication} from "../../context/AuthenticationContextProvider.jsx";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const  {login} = useAuthentication()
    const navigate = useNavigate();
    const location = useLocation();

    const doLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        try {
            await login(email, password);
            const destination = location.state?.from || "/";
            navigate(destination);
        }catch(error) {
            if(error instanceof Error) {
                setErrorMessage(error.message);
            }else {
                setErrorMessage("An unknown error occurred.");
            }
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Box>
                <h1>Вхід</h1>
                <form onSubmit={doLogin}>
                    <AuthInput label="Електрона адреса" type="email" id="email"></AuthInput>
                    <AuthInput
                        label="Пароль"
                        type="password"
                        id="password">
                    </AuthInput>
                    {errorMessage && <p className={classes.error}>{errorMessage}</p>}
                    <AuthButton type="submit" disabled={isLoading}>
                        {isLoading ? "..." : "Вхід"}
                    </AuthButton>
                    <Link to="/authentication/request-password-reset">Забули пароль?</Link>
                </form>
                <Separator>Або</Separator>
                <div className={classes.register}>
                    Не маєте акаунту? <Link to="/authentication/sign-up">Реєстрація</Link>
                </div>
            </Box>
        </div>
    );
};

export default Login;