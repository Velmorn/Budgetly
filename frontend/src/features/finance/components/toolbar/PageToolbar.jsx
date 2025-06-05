import classes from './PageToolbar.module.scss';
import {useEffect, useRef, useState} from "react";

const PageToolbar = ({ leftContent, rightContent, title, color, startColor }) => {
    const [scrolled, setScrolled] = useState(false);
    const toolbarRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setScrolled(scrollTop > 60);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            ref={toolbarRef}
            className={`${classes.toolbar} ${scrolled ? classes.scrolled : ""}`}
            style={scrolled ? { backgroundColor: color } : {backgroundColor: startColor}}
        >
            <div className={classes.left}>{leftContent}</div>
            <div className={classes.center}>
                {scrolled && <span className={classes.title}>{title}</span>}
            </div>
            <div className={classes.right}>{rightContent}</div>
        </div>
    );
};

export default PageToolbar;