import { registerDragEvent } from '../utils/registerDragEvent';

const CloseIcon = (): JSX.Element => (
    <svg
        className="w-2.5 h-2.5 text-black opacity-50 hidden group-hover:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const MinimizeIcon = (): JSX.Element => (
    <svg
        className="w-2.5 h-2.5 text-black opacity-50 hidden group-hover:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
    </svg>
);

const MaximizeIcon = (): JSX.Element => (
    <svg
        className="w-2.5 h-2.5 text-black opacity-50 hidden group-hover:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
    </svg>
);

interface AppWindowHeaderProps {
    appName: string;
    isMaximized: boolean;
    appRect: { x: number; y: number; w: number; h: number };
    onSetAppRect: (DOMRect: { x: number; y: number; w: number; h: number }) => void;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
}

const AppWindowHeader = (props: AppWindowHeaderProps): JSX.Element => {
    const { appName, isMaximized, appRect, onSetAppRect, onClose, onMinimize, onMaximize } = props;

    return (
        <div
            className="flex items-center justify-between bg-gray-200 bg-opacity-70 p-2"
            onDoubleClick={onMaximize}
            {...registerDragEvent((deltaX, deltaY) => {
                onSetAppRect({
                    x: appRect.x + deltaX,
                    y: Math.max(0, appRect.y + deltaY),
                    w: appRect.w,
                    h: appRect.h,
                });
            })}
        >
            <div className="flex space-x-2">
                <button
                    className={`relative w-3 h-3 rounded-full bg-red-500 group flex items-center justify-center`}
                    onClick={onClose}
                >
                    <CloseIcon />
                </button>
                <button
                    className={`relative w-3 h-3 rounded-full ${isMaximized ? 'bg-gray-500' : 'bg-yellow-500'} group flex items-center justify-center`}
                    onClick={onMinimize}
                    onDoubleClick={(e) => e.stopPropagation()}
                >
                    {!isMaximized && <MinimizeIcon />}
                </button>
                <button
                    className={`relative w-3 h-3 rounded-full bg-green-500 group flex items-center justify-center`}
                    onClick={onMaximize}
                >
                    <MaximizeIcon />
                </button>
            </div>
            <div className="text-center flex-1">
                <span className="text-sm text-gray-700">{appName}</span>
            </div>
            <div className="w-12"></div>
        </div>
    );
};

export default AppWindowHeader;
