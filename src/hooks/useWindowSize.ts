import { useEffect, useState } from 'react';

export const useWindowSize = (): { width: number; height: number } => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleWindowResize = (): void => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        // TODO::: ResizeObserver와 필요한 부분 구분해서 사용하기
        // resize event: 오직 window 객체에서만 발생, 브라우저 윈도우 크리 리사이즈 시, 연속적으로 발생
        window.addEventListener('resize', handleWindowResize);

        return (): void => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return windowSize;
};
