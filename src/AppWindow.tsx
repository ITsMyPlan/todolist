import { useRef, useState } from 'react';
import { useWindowSize } from './hooks/useWindowSize';
import { registerDragEvent } from './utils/registerDragEvent';

interface AppWindowHeaderProps {
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
}

const AppWindowHeader = (props: AppWindowHeaderProps): JSX.Element => {
    const { onClose, onMinimize, onMaximize } = props;

    return (
        <div className="flex items-center justify-between bg-gray-200 bg-opacity-70 p-2">
            <div className="flex space-x-2">
                <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-700" onClick={onClose}></button>
                <button className="w-3 h-3 bg-yellow-500 rounded-full" onClick={onMinimize}></button>
                <button className="w-3 h-3 bg-green-500 rounded-full" onClick={onMaximize}></button>
            </div>
            <div className="text-center flex-1">
                <span className="text-sm text-gray-700">Apple Window</span>
            </div>
            <div className="w-12"></div>
        </div>
    );
};

const AppWindow = (): JSX.Element | null => {
    const appWindowRef = useRef<HTMLDivElement>(null);
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const [{ x, y, w, h }, setConfig] = useState({ x: 100, y: 100, w: 96 * 4, h: 64 * 4 });

    const [isClosed, setIsClosed] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClose = (): void => {
        setIsClosed(true);
    };

    const handleMinimize = (): void => {
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
                <div
                    ref={appWindowRef}
                    className={`flex flex-col border border-gray-300 rounded-lg overflow-hidden shadow-lg ${isAnimating ? 'minimize-animation' : ''}`}
                    style={{
                        position: 'fixed',
                        width: isMaximized ? windowWidth : w,
                        height: isMaximized ? windowHeight : h,
                        left: isMaximized ? 0 : x,
                        top: isMaximized ? 0 : y,
                    }}
                    {...registerDragEvent((deltaX, deltaY) => {
                        setConfig({
                            x: x + deltaX,
                            y: Math.max(0, y + deltaY),
                            w,
                            h,
                        });
                    })}
                >
                    <AppWindowHeader onClose={handleClose} onMinimize={handleMinimize} onMaximize={handleMaximize} />
                    <div className="flex-grow bg-white p-4">
                        <p>This is the window content.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default AppWindow;
