import React, { useRef, useState } from 'react';
import { COLORS } from '../../../constants/colors.js';
import ColorCircle from './ColorCircle.jsx';
import styles from './ColorCarousel.module.scss';

const ColorCarousel = ({ selectedColor, onColorSelect }) => {
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 1;
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    return (
        <div
            ref={carouselRef}
            className={styles.carousel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            {COLORS.map((color) => (
                <ColorCircle
                    key={color}
                    color={color}
                    selected={selectedColor === color}
                    onClick={() => onColorSelect(color)}
                />
            ))}
        </div>
    );
};

export default ColorCarousel;

