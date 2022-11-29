import { Dispatch, SetStateAction } from 'react';
import './Square.scss';

type Props = {
    isScrolling: boolean;
    name: string;
    setIsScrolling: Dispatch<SetStateAction<boolean>>;
};

function Square({ isScrolling, name, setIsScrolling }: Props) {
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
