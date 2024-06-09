import { useRef, useState } from 'react';
import AppWindowHeader from './AppWindowHeader';
import { useWindowSize } from './hooks/useWindowSize';
import { inrange } from './utils';
import { registerDragEvent } from './utils/registerDragEvent';

const MIN_WIDTH = 500;
const MIN_HEIGHT = 400;

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
                <div
                    ref={appWindowRef}
                    className={`flex flex-col border border-gray-300 rounded-lg overflow-hidden shadow-lg shadow-black/30 ${isAnimating ? 'minimize-animation' : ''}`}
                    style={{
                        position: 'fixed',
                        width: isMaximized ? windowWidth : w,
                        height: isMaximized ? windowHeight : h,
                        left: isMaximized ? 0 : x,
                        top: isMaximized ? 0 : y,
                    }}
                >
                    {/* 좌상단 */}
                    <div
                        className="absolute -top-1 -left-1 h-4 w-4 cursor-nw-resize"
                        {...registerDragEvent((deltaX, deltaY) => {
                            setAppRect({
                                x: inrange(x + deltaX, 0, x + w - MIN_WIDTH),
                                y: inrange(y + deltaY, 0, y + h - MIN_HEIGHT),
                                w: inrange(w - deltaX, MIN_WIDTH, x + w),
                                h: inrange(h - deltaY, MIN_HEIGHT, y + h),
                            });
                        }, true)}
                    />
                    {/* 우상단 */}
                    <div
                        className="absolute -top-1 -right-1 h-4 w-4 cursor-ne-resize"
                        {...registerDragEvent((deltaX, deltaY) => {
                            setAppRect({
                                x,
                                y: inrange(y + deltaY, 0, y + h - MIN_HEIGHT),
                                w: inrange(w + deltaX, MIN_WIDTH, windowWidth - x),
                                h: inrange(h - deltaY, MIN_HEIGHT, y + h),
                            });
                        }, true)}
                    />
                    {/* 좌하단 */}
                    <div
                        className="absolute -bottom-1 -left-1 h-4 w-4 cursor-sw-resize"
                        {...registerDragEvent((deltaX, deltaY) => {
                            setAppRect({
                                x: inrange(x + deltaX, 0, x + w - MIN_WIDTH),
                                y,
                                w: inrange(w - deltaX, MIN_WIDTH, x + w),
                                h: inrange(h + deltaY, MIN_HEIGHT, windowHeight - y),
                            });
                        }, true)}
                    />
                    {/* 우하단 */}
                    <div
                        className="absolute -bottom-1 -right-1 h-4 w-4 cursor-se-resize"
                        {...registerDragEvent((deltaX, deltaY) => {
                            setAppRect({
                                x,
                                y,
                                w: inrange(w + deltaX, MIN_WIDTH, windowWidth - x),
                                h: inrange(h + deltaY, MIN_HEIGHT, windowHeight - y),
                            });
                        }, true)}
                    />
                    {/* 상 */}
                    <div
                        className="absolute -top-0.5 left-3 right-3 h-2 cursor-n-resize"
                        {...registerDragEvent((_, deltaY) => {
                            setAppRect({
                                x,
                                y: inrange(y + deltaY, 0, y + h - MIN_HEIGHT),
                                w,
                                h: inrange(h - deltaY, MIN_HEIGHT, y + h),
                            });
                        }, true)}
                    />
                    {/* 하 */}
                    <div
                        className="absolute -bottom-0.5 left-3 right-3 h-2 cursor-s-resize"
                        {...registerDragEvent((_, deltaY) => {
                            setAppRect({
                                x,
                                y,
                                w,
                                h: inrange(h + deltaY, MIN_HEIGHT, windowHeight - y),
                            });
                        }, true)}
                    />
                    {/* 좌 */}
                    <div
                        className="absolute bottom-3 top-3 -left-0.5 w-2 cursor-w-resize"
                        {...registerDragEvent((deltaX, _) => {
                            setAppRect({
                                x: inrange(x + deltaX, 0, x + w - MIN_WIDTH),
                                y,
                                w: inrange(w - deltaX, MIN_WIDTH, x + w),
                                h,
                            });
                        }, true)}
                    />
                    {/* 우 */}
                    <div
                        className="absolute bottom-3 top-3 -right-0.5 w-2 cursor-e-resize"
                        {...registerDragEvent((deltaX, _) => {
                            setAppRect({
                                x,
                                y,
                                w: inrange(w + deltaX, MIN_WIDTH, windowWidth - x),
                                h,
                            });
                        }, true)}
                    />
                    <AppWindowHeader
                        isMaximized={isMaximized}
                        appRect={{ x, y, w, h }}
                        onSetAppRect={setAppRect}
                        onClose={handleClose}
                        onMinimize={handleMinimize}
                        onMaximize={handleMaximize}
                    />
                    <div className="flex-grow bg-white p-4">
                        <p>This is the window content.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default AppWindow;
