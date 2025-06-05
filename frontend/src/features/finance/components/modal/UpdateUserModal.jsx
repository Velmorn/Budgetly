import {useState} from "react";
import classes from './UpdateUserModal.module.scss';
import {createPortal} from "react-dom";
import axios from "axios";
import {useAuthentication} from "../../../authentication/context/AuthenticationContextProvider.jsx";
import CurrencyCardList from "../cards/CurrencyCardList.jsx";
import {getAuthHeaders} from "../../API/AuthHeaders.js";

const UpdateUserModal = ({onClose}) => {
    const {user, refreshUser} = useAuthentication();
    const [username, setUsername] = useState(user.username);
    const [mainCurrency, setMainCurrency] = useState(user.mainCurrency);

    const token = localStorage.getItem("token");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8080/api/authentication/user/${user.id}`,
                null,
                {
                    params: {
                        username,
                        mainCurrency
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            onClose();
        } catch (err) {
            console.error("Помилка при оновленні користувача", err);
            alert("Не вдалося оновити дані користувача");
        }
    };

    return (
        <div className={classes.backdrop}>
            <div className={classes.modal}>
                <h2>Редагувати дані</h2>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <label>
                        Ім’я:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Основна валюта:
                        <CurrencyCardList
                            selectedCurrency={mainCurrency}
                            onSelect={(code) => setMainCurrency(code)}
                        />
                    </label>
                    <div className={classes.buttons}>
                        <button type="button" onClick={onClose}>
                            Скасувати
                        </button>
                        <button type="submit">Зберегти</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserModal;