import { MdCompareArrows } from 'react-icons/md';
import classes from './ToolbarButton.module.scss';

const TransferButton = ({ onClick }) => {
    return (
        <button className={classes.button} onClick={onClick} title="Переказ коштів">
            <MdCompareArrows size={20} color="black" />
        </button>
    );
};

export default TransferButton;