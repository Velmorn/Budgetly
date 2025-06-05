import React from 'react';
import classes from "./UserData.module.scss";
import {useNavigate} from "react-router-dom";
import {useAuthentication} from "../../context/AuthenticationContextProvider.jsx";
import axios from "axios";
import AuthInput from "../../components/UI/Input/AuthInput.jsx";
import AuthButton from "../../components/UI/Button/AuthButton.jsx";
import Box from "../../components/UI/Box/Box.jsx";
import CurrencyCardList from "../../../finance/components/cards/CurrencyCardList.jsx";

const UserData = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuthentication();
    const [error, setError] = React.useState("");
    const [data, setData] = React.useState({
        username: "",
        mainCurrency: "",
    });

    const handleChange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async () => {
        if (!data.username) {
            setError("Будь ласка введіть ім'я користувача");
            return;
        }
        if (!data.mainCurrency) {
            setError("Будь ласка оберіть вашу основну валюту");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/api/authentication/user/${user?.id}`,
                null,
                {
                    params: {
                        username: data.username,
                        mainCurrency: data.mainCurrency,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setUser(response.data);
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Помилка оновлення даних користувача");
            } else {
                setError("Непередбачувана помилка");
            }
        }
    };

    return (
        <div className={classes.root}>
            <Box>
                <AuthInput
                    onFocus={() => setError("")}
                    required
                    label="Ім'я користувача"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                />
                <label style={{textAlign: "center"}}>Оберіть основну валюту </label>
                <CurrencyCardList
                    selectedCurrency={data.mainCurrency}
                    onSelect={(code) => setData({ ...data, mainCurrency: code })}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <AuthButton onClick={onSubmit}>Підтвердити</AuthButton>
            </Box>
        </div>
    );
};

export default UserData;