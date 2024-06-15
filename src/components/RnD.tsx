import type { Ref } from 'react';
import { forwardRef } from 'react';
import { inrange } from '../utils';
import { registerDragEvent } from '../utils/registerDragEvent';

interface RnDProps {
    size: { width: number; height: number };
    position: { x: number; y: number };
    zIndex: number;
    children?: React.ReactNode;
    className?: string;
    minWidth: number;
    minHeight: number;
    windowWidth: number;
    windowHeight: number;
    updateRnDRect: (RnDRect: { x: number; y: number; w: number; h: number }) => void;
    onZIndex: () => void;
}

const RnD = forwardRef((props: RnDProps, ref: Ref<HTMLDivElement>): JSX.Element => {
    const {
        size,
        position,
        zIndex,
        children,
        className,
        minWidth,
        minHeight,
        windowWidth,
        windowHeight,
        updateRnDRect,
        onZIndex,
    } = props;
    const { width: w, height: h } = size;
    const { x, y } = position;

    return (
        <div
            ref={ref}
            style={{ position: 'fixed', width: w, height: h, left: x, top: y, zIndex: zIndex }}
            className={className}
            onMouseDown={onZIndex}
        >
            {/* 좌상단 */}
            <div
                className="absolute -top-1 -left-1 h-4 w-4 cursor-nw-resize"
                {...registerDragEvent((deltaX, deltaY) => {
                    updateRnDRect({
                        x: inrange(x + deltaX, 0, x + w - minWidth),
                        y: inrange(y + deltaY, 0, y + h - minHeight),
                        w: inrange(w - deltaX, minWidth, x + w),
                        h: inrange(h - deltaY, minHeight, y + h),
                    });
                }, true)}
            />
            {/* 우상단 */}
            <div
                className="absolute -top-1 -right-1 h-4 w-4 cursor-ne-resize"
                {...registerDragEvent((deltaX, deltaY) => {
                    updateRnDRect({
                        x,
                        y: inrange(y + deltaY, 0, y + h - minHeight),
                        w: inrange(w + deltaX, minWidth, windowWidth - x),
                        h: inrange(h - deltaY, minHeight, y + h),
                    });
                }, true)}
            />
            {/* 좌하단 */}
            <div
                className="absolute -bottom-1 -left-1 h-4 w-4 cursor-sw-resize"
                {...registerDragEvent((deltaX, deltaY) => {
                    updateRnDRect({
                        x: inrange(x + deltaX, 0, x + w - minWidth),
                        y,
                        w: inrange(w - deltaX, minWidth, x + w),
                        h: inrange(h + deltaY, minHeight, windowHeight - y),
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
                        w: inrange(w + deltaX, minWidth, windowWidth - x),
                        h: inrange(h + deltaY, minHeight, windowHeight - y),
                    });
                }, true)}
            />
            {/* 상 */}
            <div
                className="absolute -top-0.5 left-3 right-3 h-2 cursor-n-resize"
                {...registerDragEvent((_, deltaY) => {
                    updateRnDRect({
                        x,
                        y: inrange(y + deltaY, 0, y + h - minHeight),
                        w,
                        h: inrange(h - deltaY, minHeight, y + h),
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
                        h: inrange(h + deltaY, minHeight, windowHeight - y),
                    });
                }, true)}
            />
            {/* 좌 */}
            <div
                className="absolute bottom-3 top-3 -left-0.5 w-2 cursor-w-resize"
                {...registerDragEvent((deltaX, _) => {
                    updateRnDRect({
                        x: inrange(x + deltaX, 0, x + w - minWidth),
                        y,
                        w: inrange(w - deltaX, minWidth, x + w),
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
                        w: inrange(w + deltaX, minWidth, windowWidth - x),
                        h,
                    });
                }, true)}
            />
            {children}
        </div>
    );
});

export default RnD;
