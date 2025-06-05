import { MdCalculate } from 'react-icons/md';
import classes from './ToolbarButton.module.scss';

const AdjustBalanceButton = ({ onClick }) => {
    return (
        <button className={classes.button} onClick={onClick}>
            <MdCalculate size={20} color="black" />
        </button>
    );
};

export default AdjustBalanceButton;