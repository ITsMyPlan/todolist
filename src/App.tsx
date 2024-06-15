import { useEffect, useState } from 'react';
import AppWindow from './components/AppWindow';
import Memo from './pages/Memo';
import TodoList from './pages/TodoList';
import { safeLocalStorage } from './utils/storage';
import ApplicationManager from './window/ApplicationManager';

const App = (): JSX.Element => {
    const [applicationManager] = useState(() => {
        const manager = new ApplicationManager();
        manager.addApplication('memo', <Memo />);
        manager.addApplication('todolist', <TodoList />);
        return manager;
    });
    const [applications, setApplications] = useState(applicationManager.getApplications());

    const handleZIndex = (id: number): void => {
        applicationManager.setZIndexToFront(id);
        setApplications(applicationManager.getApplications().slice());
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
            {applications.map((app) => (
                <AppWindow key={app.id} app={app} onZIndex={() => handleZIndex(app.id)} />
            ))}
        </div>
    );
};

export default App;
