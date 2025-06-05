import React, {useState} from 'react';
import {useAuthentication} from "../../../authentication/context/AuthenticationContextProvider.jsx";
import PageToolbar from "../../components/toolbar/PageToolbar.jsx";
import SettingCard from "../../components/cards/SettingCard.jsx";
import { FaUser, FaPalette, FaLightbulb, FaGlobe } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi";
import { MdHome, MdMore } from "react-icons/md";
import EditButton from "../../components/UI/Button/EditButton.jsx";
import UpdateUserModal from "../../components/modal/UpdateUserModal.jsx";

const SettingPage = () => {
    const {user} = useAuthentication();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <PageToolbar title="Налаштування" color="var(--primary-color)"/>
            <h1 style={{textAlign: "center"}}>Налаштування</h1>

            <h3 style={{textAlign: "center"}}>Користувач</h3>
            <SettingCard
                icon={FaUser}
                title="Ім'я користувача"
                description={user.username}
                rightContent={<EditButton onClick={openModal}/>}
            />
            <SettingCard
                icon={HiCurrencyDollar}
                title="Основна валюта"
                description={user.mainCurrency}
                rightContent={<EditButton onClick={openModal}/>}
            />

            <h3 style={{textAlign: "center"}}>Тема (в розробці)</h3>
            <SettingCard icon={FaPalette} title="Акцентний колір" description="Виберіть кольорову тему для інтерфейсу"/>
            <SettingCard icon={FaLightbulb} title="Режим теми"/>

            <h3 style={{textAlign: "center"}}>Налаштування (в розробці)</h3>
            <SettingCard icon={MdHome} title="Редагувати головну сторінку"/>
            <SettingCard icon={FaGlobe} title="Мова"/>
            <SettingCard icon={MdMore} title="Більше опцій" description="Стиль, операції, рахунки, форматування"/>

            {isModalOpen && <UpdateUserModal onClose={closeModal}/>}
        </div>
    );
};

export default SettingPage;