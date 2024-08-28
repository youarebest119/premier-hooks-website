import { useState, useEffect } from 'react';

const useMousePositionRelativeToDiv = (ref) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setMousePosition({
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top,
                });
            }
        };

        if (ref.current) {
            ref.current.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [ref]);

    return mousePosition;
};
