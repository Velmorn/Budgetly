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
    const [errorMessage, setErrorMessage] = useState("");

    const sendPasswordResetToken = async (email) => {

    }
    return (
        <div className={classes.root}>
            <Box>
                <h1>Відновлення паролю</h1>
                {!emailSent ? (
                    <form action="">
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
                    <form action="">
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