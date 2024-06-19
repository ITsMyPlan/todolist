import type { ReactNode } from 'react';

export interface AppRect {
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    left?: number;
    top?: number;
}

class Application {
    id: number;
    appName: string;
    zIndex: number;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    left?: number;
    top?: number;
    content: ReactNode | null;

    constructor(id: number, appName: string, zIndex: number, content: ReactNode | null, appRect?: AppRect) {
        this.id = id;
        this.appName = appName;
        this.zIndex = zIndex;
        this.content = content;
        this.width = appRect?.width;
        this.height = appRect?.height;
        this.minWidth = appRect?.minWidth;
        this.minHeight = appRect?.minHeight;
        this.left = appRect?.left;
        this.top = appRect?.top;
    }

    setZIndex(newZIndex: number): void {
        this.zIndex = newZIndex;
    }
}

export default Application;
