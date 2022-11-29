import { createRef, Dispatch, SetStateAction, useEffect } from 'react';
import './Square.scss';

type Props = {
    isScrolling: boolean;
    name: string;
    setIsScrolling: Dispatch<SetStateAction<boolean>>;
};

function Square({ isScrolling, name, setIsScrolling }: Props) {
    const squareRef = createRef<HTMLDivElement>();

    useEffect(() => {
        isScrolling
            ? squareRef.current?.removeEventListener('click', clickHandler)
            : squareRef.current?.addEventListener('click', clickHandler);
        return () => {
            squareRef.current?.removeEventListener('click', clickHandler);
        };
    }, [isScrolling, squareRef.current]);

    function clickHandler() {
        if (isScrolling) return;
        console.log({ target: name });
    }

    function mouseDownHandler() {
        setIsScrolling(v => !v);
    }

    return (
        <div
            className="square"
            onClick={clickHandler}
            onMouseDown={mouseDownHandler}
        >
            {name}
        </div>
    );
}

export default Square;
