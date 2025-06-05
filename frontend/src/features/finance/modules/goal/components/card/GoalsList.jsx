import React from 'react';
import classes from "./GoalsList.module.scss"
import GoalCard from "./GoalCard.jsx";

const GoalsList = ({goals}) => {
    return (
        <div className={classes.list}>
            {goals.map((goal, i) => (
                <GoalCard key={i} goal={goal} />
            ))}
        </div>
    );
};

export default GoalsList;