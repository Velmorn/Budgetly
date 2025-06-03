import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Box from "../../components/UI/Box/Box.jsx";
import AuthInput from "../../components/UI/Input/AuthInput.jsx";
import AuthButton from "../../components/UI/Button/AuthButton.jsx";
import Separator from "../../components/UI/Separator/Separator.jsx";
import classes from './Signup.module.scss'
import {useAuthentication} from "../../context/AuthenticationContextProvider.jsx";

const Signup = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {signup} = useAuthentication();
    const navigate = useNavigate();

    const doSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        try{
            await signup(email, password);
            navigate("/");
        } catch(error){
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }else {
                setErrorMessage("An unknown error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Box>
                <h1>Реєстрація</h1>
                <form onSubmit={doSignup}>
                    <AuthInput type="email" id="email" label="Елекрона адреса"/>
                    <AuthInput type="password" id="password" label="Пароль"/>
                    {errorMessage && <p className={classes.error}>{errorMessage}</p>}
                    <AuthButton type="submit" disabled={isLoading}>Зареєструватись</AuthButton>
                </form>
                <Separator>Або</Separator>
                <div className={classes.register}>
                    Вже маєте акаунт? <Link to="/authentication/login">Вхід</Link>
                </div>
            </Box>
        </div>
    );
};

export default Signup;