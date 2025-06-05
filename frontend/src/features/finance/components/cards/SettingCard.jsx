import React from 'react';
import classes from './SettingCard.module.scss';

const SettingCard = ({ icon: Icon, title, description, rightContent }) => {
    return (
        <div className={classes.card}>
            <div className={classes.left}>
                <Icon className={classes.icon} />
                <div className={classes.text}>
                    <div className={classes.title}>{title}</div>
                    <div className={classes.description}>{description}</div>
                </div>
            </div>
            <div className={classes.right}>
                {rightContent}
            </div>
        </div>
    );
};

export default SettingCard;