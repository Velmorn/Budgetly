import React from 'react';
import classes from "./IconPickerModal.module.scss";
import {icons} from "../../constants/icons.js"
const IconPickerModal = ({isOpen, onClose, onSelectIcon}) => {
    const iconDirectory = "/images/userIcons";

    const handleSelect = (icon) => {
        onSelectIcon(`${iconDirectory}/${icon}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={classes.overlay} onClick={onClose}>
            <div className={classes.content} onClick={(e) => e.stopPropagation()}>
               <div className={classes.header}>
                   <h2>Оберіть іконку</h2>
                   <button className={classes.closeBtn} onClick={onClose}>X</button>
               </div>

                <div className={classes.grid}>
                    {icons.map((icon, index) => (
                        <img
                            key={index}
                            src={`${iconDirectory}/${icon}`}
                            alt={icon}
                            className={classes.icon}
                            onClick={() => handleSelect(icon)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IconPickerModal;