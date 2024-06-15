import type { ReactNode } from 'react';

class Application {
    id: number;
    appName: string;
    zIndex: number;
    content?: ReactNode;

    constructor(id: number, appName: string, zIndex: number, content?: ReactNode) {
        this.id = id;
        this.appName = appName;
        this.zIndex = zIndex;
        this.content = content;
    }

    setZIndex(newZIndex: number): void {
        this.zIndex = newZIndex;
    }
}

export default Application;
