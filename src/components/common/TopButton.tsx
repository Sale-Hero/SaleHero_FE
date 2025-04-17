import style from "../../assets/scss/button/topbutton.module.scss"
import {useCallback, useEffect, useState} from "react";
import {throttle} from 'lodash';


export function TopButton() {

    const [scrollY, setScrollY] = useState(window.scrollY);
    const onClickTopButton = useCallback(() => {
        window.scrollBy({
            left: 0,
            top: -window.scrollY,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        const defaultScrollListener = throttle(() => {
            setScrollY(scrollY);
            setScrollY(window.scrollY);
        }, 20);

        window.addEventListener("scroll", defaultScrollListener);
        return () => {
            window.removeEventListener("scroll", defaultScrollListener);
        };
    }, [scrollY]);
    // console.log(window.scrollY)

    return(
        <>
            <div className={`${style.topButtonWrapper} ${scrollY > 0 ? style.show : ''}`}>
                <div className={style.topButtonImg}
                onClick={onClickTopButton}/>
            </div>
        </>
    )
}