import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import classes from "./CustomAlert.module.scss";

const CustomAlert = ({
                         type = "success",
                         title,
                         message,
                         duration = 3000,
                         onClose
                     }) => {
    const [visible, setVisible] = useState(true);
    const isSuccess = type === "success";
    const iconColor = isSuccess ? "#38b000" : "#d00000";
    const Icon = isSuccess ? CheckCircle : XCircle;

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className={`${classes.alert} ${isSuccess ? classes.success : classes.error}`}>
            <div className={classes.icon}>
                <Icon size={24} color={iconColor} />
            </div>
            <div className={classes.content}>
                <div className={classes.title}>{title}</div>
                <div className={classes.message}>{message}</div>
            </div>
        </div>
    );
};

export default CustomAlert;