import React from "react";
import {MdDelete} from "react-icons/md";
import classes from "./DeleteModal.module.scss";

const DeleteModal = ({ title, objectName, message, onCancel, onDelete }) => {
    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.icon}>
                    <MdDelete size={40} color="black" />
                </div>
                <h2 className={classes.title}>{title}</h2>
                <h3 className={classes.objectName}>{objectName}</h3>
                <p className={classes.message}>{message}</p>
                <div className={classes.buttons}>
                    <button className={classes.cancel} onClick={onCancel}>Відмінити</button>
                    <button className={classes.delete} onClick={onDelete}>Видалити</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;