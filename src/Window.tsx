import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from './hooks/useWindowSize';

interface WindowHeaderProps {
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
}

const WindowHeader = (props: WindowHeaderProps): JSX.Element => {
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

const Window = (): JSX.Element | null => {
    const windowRef = useRef<HTMLDivElement>(null);
    const [isClosed, setIsClosed] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const { height: windowHeight } = useWindowSize();
    const [dragging, setDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<{ left: number; top: number }>({ left: 100, top: 100 });
    const initialWindowPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleDragStart = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        if (windowRef.current && !isMaximized) {
            const windowRect = windowRef.current.getBoundingClientRect();
            initialWindowPositionRef.current = { x: e.clientX - windowRect.left, y: e.clientY - windowRect.top };
        }
        setDragging(true);
    };

    useEffect(() => {
        const handleDrag = (e: MouseEvent): void => {
            if (dragging) {
                const newLeft = e.clientX - initialWindowPositionRef.current.x;
                const newTop = e.clientY - initialWindowPositionRef.current.y;

                const boundedTop = Math.max(0, Math.min(newTop, windowHeight - 20));
                setPosition({ left: newLeft, top: boundedTop });
            }
        };
        const handleDragEnd = (): void => {
            setDragging(false);
        };

        if (dragging) {
            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', handleDragEnd);
        } else {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragEnd);
        }

        return (): void => {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragEnd);
        };
    }, [dragging, windowHeight]);

    const handleClose = (): void => setIsClosed(true);
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
                    ref={windowRef}
                    className={`flex flex-col ${isMaximized ? 'w-full h-full' : 'w-96 h-64'} border border-gray-300 rounded-lg overflow-hidden shadow-lg ${isAnimating ? 'minimize-animation' : ''}`}
                    onMouseDown={handleDragStart}
                    style={{
                        position: 'fixed',
                        left: isMaximized ? 0 : position.left,
                        top: isMaximized ? 0 : position.top,
                    }}
                >
                    <WindowHeader onClose={handleClose} onMinimize={handleMinimize} onMaximize={handleMaximize} />
                    <div className="flex-grow bg-white p-4">
                        <p>This is the window content.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Window;
