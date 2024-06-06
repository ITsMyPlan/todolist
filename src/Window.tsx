import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from './hooks/useWindowSize';

const WindowHeader = (): JSX.Element => {
    return (
        <div className="flex items-center justify-between bg-gray-200 bg-opacity-70 p-2">
            <div className="flex space-x-2">
                <button className="w-3 h-3 bg-red-500 rounded-full"></button>
                <button className="w-3 h-3 bg-yellow-500 rounded-full"></button>
                <button className="w-3 h-3 bg-green-500 rounded-full"></button>
            </div>
            <div className="text-center flex-1">
                <span className="text-sm text-gray-700">Apple Window</span>
            </div>
            <div className="w-12"></div>
        </div>
    );
};

const Window = (): JSX.Element => {
    const windowRef = useRef<HTMLDivElement>(null);
    const { height: windowHeight } = useWindowSize();
    const [dragging, setDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<{ left: number; top: number }>({ left: 100, top: 100 });
    const initialWindowPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleDragStart = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (windowRef.current) {
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

                // 화면 밖을 벗어나지 않도록 지정
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

    return (
        <div
            ref={windowRef}
            className="flex flex-col w-full h-full max-w-[640px] max-h-[640px] border border-gray-300 rounded-lg overflow-hidden shadow-lg"
            onMouseDown={handleDragStart}
            style={{ position: 'fixed', left: position.left, top: position.top }}
        >
            <WindowHeader />
            <div className="flex-grow bg-white p-4">
                <p>Window content goes here...</p>
            </div>
        </div>
    );
};

export default Window;
