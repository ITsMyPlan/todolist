import { useEffect, useState } from 'react';
import { safeLocalStorage } from '../utils/storage';
import ApplicationManager from '../utils/window/ApplicationManager';
import Blog from './app/Blog';
import TodoList from './app/TodoList';
import AppWindow from './appWindow/AppWindow';

const Desktop = (): JSX.Element => {
    const [applicationManager] = useState(() => {
        const manager = new ApplicationManager();
        manager.addApplication('blog', <Blog />, {
            height: 500,
            left: 70,
            top: 70,
            minWidth: 500,
        });
        manager.addApplication('todolist', <TodoList />, {
            width: 800,
            height: 650,
            left: 350,
            top: 100,
            minWidth: 640,
            minHeight: 640,
        });
        return manager;
    });
    const [applications, setApplications] = useState(applicationManager.getApplications());

    const handleZIndex = (id: number): void => {
        applicationManager.setZIndexToFront(id);
        setApplications(applicationManager.getApplications().slice());
    };

    const isDarkTheme = (): boolean => {
        const theme = safeLocalStorage.getItem('theme');
        return theme === 'dark';
    };

    const [dark, setDark] = useState(isDarkTheme());

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
            <button onClick={darkSetButton}>{dark ? 'Light Mode' : 'Dark Mode'}</button>
            {applications.map((app) => (
                <AppWindow key={app.id} app={app} onZIndex={() => handleZIndex(app.id)} />
            ))}
        </div>
    );
};

export default Desktop;
