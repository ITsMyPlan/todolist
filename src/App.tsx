import { useEffect, useState } from 'react';
import AppWindow from './AppWindow';
import { safeLocalStorage } from './utils/storage';

interface Apps {
    id: number;
    title: string;
    zIndex: number;
}

const App = (): JSX.Element => {
    const initialApps: Apps[] = [
        { id: 1, title: 'App 1', zIndex: 1 },
        { id: 2, title: 'App 2', zIndex: 2 },
        { id: 3, title: 'App 3', zIndex: 3 },
    ];
    const [apps, setApps] = useState(initialApps);
    const [highestZIndex, setHighestZIndex] = useState(initialApps.length);

    const handleZIndex = (id: number): void => {
        // 클릭된 AppWindow의 zIndex를 높임
        setApps((prevApps): Apps[] => {
            const clickedApp = prevApps.find((app) => app.id === id);

            // 클릭한 App이 이미 가장 높은 zIndex를 가지고 있다면 highestZIndex가 변경될 필요 x
            if (clickedApp && clickedApp.zIndex === highestZIndex) {
                return prevApps;
            }

            const newApps = prevApps.map((app) => (app.id === id ? { ...app, zIndex: highestZIndex + 1 } : app));
            // 최고 zIndex 값 업데이트
            setHighestZIndex(highestZIndex + 1);

            return newApps;
        });
    };

    const localStorageChecker = (): boolean => {
        const theme = safeLocalStorage.getItem('theme');
        return theme === 'dark';
    };

    const [dark, setDark] = useState(localStorageChecker());

    const darkSetButton = (): void => {
        setDark((state) => {
            const update = !state;
            if (update) {
                safeLocalStorage.setItem('theme', 'dark');
            } else {
                safeLocalStorage.setItem('theme', 'light');
            }
            return update;
        });
    };

    useEffect(() => {
        const theme = safeLocalStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (theme === 'dark' || (!theme && prefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [dark]);

    return (
        <div className="bg-light dark:bg-dark bg-cover h-screen w-screen">
            <button onClick={darkSetButton}>{dark ? 'Dark Mode' : 'Light Mode'}</button>
            {apps.map((app) => (
                <AppWindow key={app.id} title={app.title} zIndex={app.zIndex} onZindex={() => handleZIndex(app.id)}>
                    <p>{app.title}</p>
                </AppWindow>
            ))}
        </div>
    );
};

export default App;
