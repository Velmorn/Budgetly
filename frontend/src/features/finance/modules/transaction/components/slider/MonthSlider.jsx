import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import classes from "./MonthSlider.module.scss";
import { useEffect, useRef } from "react";

const MonthSlider = ({ selectedMonth, selectedYear, onChange }) => {
    const containerRef = useRef(null);
    const months = [
        "січень", "лютий", "березень", "квітень",
        "травень", "червень", "липень", "серпень",
        "вересень", "жовтень", "листопад", "грудень"
    ];

    useEffect(() => {
        const activeButton = containerRef.current?.querySelector(`.${classes.active}`);
        activeButton?.scrollIntoView({ behavior: "smooth", inline: "center" });
    }, [selectedMonth]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.monthSlider}>
                <button
                    className={classes.navButton}
                    onClick={() => onChange(selectedMonth, selectedYear - 1)}
                >
                    <FaChevronLeft />
                </button>

                <div className={classes.monthList} ref={containerRef}>
                    {months.map((name, index) => (
                        <button
                            key={index}
                            className={`${classes.button} ${index === selectedMonth ? classes.active : ""}`}
                            onClick={() => onChange(index, selectedYear)}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                <button
                    className={classes.navButton}
                    onClick={() => onChange(selectedMonth, selectedYear + 1)}
                >
                    <FaChevronRight />
                </button>
            </div>

            <div className={classes.yearLabel}>{selectedYear}</div>
        </div>
    );
};

export default MonthSlider;

