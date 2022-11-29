import Square from '@/components/Square';
import { useState, MouseEvent, createRef, useEffect } from 'react';
import './App.scss';

function App() {
    const [isScrolling, setIsScrolling] = useState<boolean>(true);
    const [startX, setStartX] = useState<number>(0);
    const [scrollLeft, setScrollLeft] = useState<number>(0);

    const Arr = Array.from(Array(100).keys());
    const sliderRef = createRef<HTMLDivElement>();

    useEffect(() => {
        if (!sliderRef.current) return;
        if (!isScrolling) {
            sliderRef.current.removeEventListener<any>(
                'mousemove',
                scrollHandler,
            );
        }
    }, [isScrolling, sliderRef.current]);

    function scrollHandler(e?: MouseEvent) {
        if (!isScrolling || !e) return;
        e.preventDefault();
        if (!sliderRef.current) return;
        const slider = sliderRef.current;
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
        console.log('moving:' + walk);
    }

    function mouseDownHandler(e: MouseEvent) {
        setIsScrolling(true);
        if (!sliderRef.current) return;
        const slider = sliderRef.current;
        setStartX(e.pageX - slider.offsetLeft);
        setScrollLeft(slider.scrollLeft);
    }

    return (
        <div className="app">
            <h1>Scroll / click concept</h1>
            <div
                className="cards"
                ref={sliderRef}
                onMouseMove={scrollHandler}
                onMouseUp={() => setIsScrolling(false)}
                onMouseLeave={() => setIsScrolling(false)}
                onMouseDown={mouseDownHandler}
            >
                {Arr.map((num, i) => (
                    <Square
                        name={num.toString()}
                        isScrolling={isScrolling}
                        key={i}
                        setIsScrolling={setIsScrolling}
                    ></Square>
                ))}
            </div>
        </div>
    );
}

export default App;
