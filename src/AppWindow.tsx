import { useRef, useState } from 'react';
import AppWindowHeader from './AppWindowHeader';
import RnD from './components/RnD';
import { useWindowSize } from './hooks/useWindowSize';

export const MIN_WIDTH = 500;
export const MIN_HEIGHT = 400;

const AppWindow = (): JSX.Element | null => {
    const appWindowRef = useRef<HTMLDivElement>(null);
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const [{ x, y, w, h }, setAppRect] = useState({ x: 100, y: 100, w: MIN_WIDTH, h: MIN_HEIGHT });

    const [isClosed, setIsClosed] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClose = (): void => {
        setIsClosed(true);
    };

    const handleMinimize = (): void => {
        if (isMaximized) {
            return;
        }
        setIsAnimating(true);
        setTimeout(() => {
            setIsMinimized(true);
            setIsAnimating(false);
        }, 500);
    };

    const handleMaximize = (): void => {
        setIsMaximized(!isMaximized);
    };

    if (isClosed) {
        return null;
    }

    return (
        <>
            {!isMinimized && (
                <RnD
                    ref={appWindowRef}
                    size={{
                        width: isMaximized ? windowWidth : w,
                        height: isMaximized ? windowHeight : h,
                    }}
                    position={{
                        x: isMaximized ? 0 : x,
                        y: isMaximized ? 0 : y,
                    }}
                    minWidth={MIN_WIDTH}
                    minHeight={MIN_HEIGHT}
                    windowWidth={windowWidth}
                    windowHeight={windowHeight}
                    updateRnDRect={setAppRect}
                    className={`flex flex-col border border-gray-300 rounded-lg overflow-hidden shadow-lg shadow-black/30 ${isAnimating ? 'minimize-animation' : ''}`}
                >
                    <AppWindowHeader
                        isMaximized={isMaximized}
                        appRect={{ x, y, w, h }}
                        onSetAppRect={setAppRect}
                        onClose={handleClose}
                        onMinimize={handleMinimize}
                        onMaximize={handleMaximize}
                    />
                    <div className="main-content flex-grow bg-white p-4">
                        <p>This is the window content.</p>
                    </div>
                </RnD>
            )}
        </>
    );
};

export default AppWindow;
