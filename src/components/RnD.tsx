import type { Ref } from 'react';
import { forwardRef } from 'react';
import { MIN_HEIGHT, MIN_WIDTH } from '../AppWindow';
import { inrange } from '../utils';
import { registerDragEvent } from '../utils/registerDragEvent';

interface RnDProps {
    size: { width: number; height: number };
    position: { x: number; y: number };
    children?: React.ReactNode;
    className?: string;
    windowWidth: number;
    windowHeight: number;
    updateRnDRect: (RnDRect: { x: number; y: number; w: number; h: number }) => void;
}

const RnD = forwardRef((props: RnDProps, ref: Ref<HTMLDivElement>): JSX.Element => {
    const { size, position, children, className, updateRnDRect, windowWidth, windowHeight } = props;
    const { width: w, height: h } = size;
    const { x, y } = position;

    return (
        <div ref={ref} style={{ position: 'fixed', width: w, height: h, left: x, top: y }} className={className}>
            {/* 좌상단 */}
            <div
                className="absolute -top-1 -left-1 h-4 w-4 cursor-nw-resize"
                {...registerDragEvent((deltaX, deltaY) => {
                    updateRnDRect({
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
                    updateRnDRect({
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
                    updateRnDRect({
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
                    updateRnDRect({
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
                    updateRnDRect({
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
                    updateRnDRect({
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
                    updateRnDRect({
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
                    updateRnDRect({
                        x,
                        y,
                        w: inrange(w + deltaX, MIN_WIDTH, windowWidth - x),
                        h,
                    });
                }, true)}
            />
            {children}
        </div>
    );
});

export default RnD;
