import { useEffect, useState } from 'react';
import AppWindow from './AppWindow';
import { safeLocalStorage } from './utils/storage';

const App = (): JSX.Element => {
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

    /**
     * TODO:
     * 선택한 AppWindow가 가장 최상단에 위치하도록
     * 하나의 AppWindow만 Maximize 가능하도록
     */
    return (
        <div className="bg-light dark:bg-dark bg-cover h-screen w-screen">
            <button onClick={darkSetButton}>{dark ? 'Dark Mode' : 'Light Mode'}</button>
            <AppWindow>
                <p>Window 1</p>
            </AppWindow>
            <AppWindow>
                <p>Window 2</p>
            </AppWindow>
        </div>
    );
};

export default App;
