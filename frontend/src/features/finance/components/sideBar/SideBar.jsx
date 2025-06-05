import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./SideBar.module.scss";
import { FaHouse, FaMoneyBills, FaChartPie  } from "react-icons/fa6";
import { PiPiggyBankFill } from "react-icons/pi";
import { IoMdWallet, IoIosSettings  } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { ImExit } from "react-icons/im";
import {useAuthentication} from "../../../authentication/context/AuthenticationContextProvider.jsx";


const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const {user, logout} = useAuthentication();

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const getFormattedTime = () => time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const getDayOfWeek = () => time.toLocaleDateString(undefined, { weekday: 'long' });
    const getFullDate = () => time.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });

    const menuItems = [
        { label: "Головна", icon: <FaHouse size={20} />, path: "/home" },
        { label: "Транзакції", icon: <FaMoneyBills size={20} />, path: "/transactions" },
        { label: "Бюджети", icon: <FaChartPie size={20} />, path: "/budgets" },
        { label: "Цілі", icon: <PiPiggyBankFill size={20} />, path: "/goals" },
        { label: "Рахунки", icon: <IoMdWallet size={20} />, path: "/bills" },
        { label: "Категорії", icon: <MdCategory size={20} />, path: "/categories" },
        { label: "Нлаштування", icon: <IoIosSettings size={20} />, path: `/user-setting/${user.id}`},


    ];

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <button className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "❮" : "❯"}
            </button>

            {isOpen && (
                <div className={styles.header}>
                    <div className={styles.time}>{getFormattedTime()}</div>
                    <div className={styles.day}>{getDayOfWeek()}</div>
                    <div className={styles.date}>{getFullDate()}</div>
                </div>
            )}

            <div className={styles.spacer}></div>


            <nav className={styles.nav}>
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        className={`${styles.navButton} ${!isOpen ? styles.iconOnly : ""}`}
                        onClick={() => navigate(item.path)}
                    >
                        {item.icon}
                        {isOpen && item.label}
                    </button>
                ))}
                <button  className={`${styles.navButton} ${!isOpen ? styles.iconOnly : ""}`} onClick={logout}>
                    {<ImExit size={20} />} {isOpen && "Вихід"}
                </button>
            </nav>
        </div>
    );
};
export default SideBar;
