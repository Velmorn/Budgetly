import { IoIosArrowDown, IoIosArrowUp  } from "react-icons/io";
import classes from './TransactionTypeToggle.module.scss';

const TransactionTypeToggle = ({ activeType = 'EXPENSE', onChange, color = '#ff4d4f' }) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.toggle}>
                <button
                    onClick={() => onChange('EXPENSE')}
                    className={`${classes.button} ${activeType === 'EXPENSE' ? classes.active : ''}`}
                    style={{ backgroundColor: activeType === 'EXPENSE' ? color : 'white' }}
                >
                    <IoIosArrowDown size={16} color="rgb(239 68 68)" />
                    Витрати
                </button>
                <button
                    onClick={() => onChange('INCOME')}
                    className={`${classes.button} ${activeType === 'INCOME' ? classes.active : ''}`}
                    style={{ backgroundColor: activeType === 'INCOME' ? color : 'white' }}
                >
                    <IoIosArrowUp size={16} color="rgb(34 197 94)" />
                    Доходи
                </button>
            </div>
        </div>
    );
};

export default TransactionTypeToggle;