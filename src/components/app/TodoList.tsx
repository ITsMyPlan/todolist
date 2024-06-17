import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { Task } from '../../service/TodolistService';
import TodolistService, { TASK_STATUS } from '../../service/TodolistService';

const TodoList = (): JSX.Element => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');

    useEffect(() => {
        const fetchTasks = async (): Promise<void> => {
            const fetchedTasks = await TodolistService.getAllTasks();
            setTasks(fetchedTasks);
        };

        fetchTasks();
    }, []);

    const handleCreateTask = async (): Promise<void> => {
        const newTask: Omit<Task, 'id'> = {
            title: taskTitle,
            description: taskDescription,
            user_id: 1, // TODO: user별
            status: TASK_STATUS.TODO,
        };

        const createdTask = await TodolistService.createTask(newTask);
        if (createdTask) {
            setTasks((prevTasks) => [...prevTasks, createdTask]);
            setTaskTitle('');
            setTaskDescription('');
        }
    };

    const handleUpdateTask = async (id: number, newTitle?: string, newDescription?: string): Promise<void> => {
        const taskToUpdate = tasks.find((task) => task.id === id);
        if (!taskToUpdate) {
            return;
        }
        const updatedTask = await TodolistService.updateTask(id, {
            title: newTitle ?? taskToUpdate.title,
            description: newDescription ?? taskToUpdate.description,
        });
        if (updatedTask) {
            setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? updatedTask : task)));
        }
    };

    const handleDeleteTask = async (id: number): Promise<void> => {
        const isDeleted = await TodolistService.deleteTask(id);
        if (isDeleted) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        }
    };

    const handleMoveTask = async (id: number, newStatus: TASK_STATUS): Promise<void> => {
        const updatedTask = await TodolistService.updateTask(id, { status: newStatus });
        if (updatedTask) {
            setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? updatedTask : task)));
        }
    };

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
            setter(event.target.value);
        };

    return (
        <>
            <div className="p-3 text-gray-500">To Do list</div>
            <div className="p-4 pt-2">
                <div className="text-2xl font-bold">To Do List</div>

                <div className="mt-4 flex gap-4">
                    {Object.values(TASK_STATUS).map((status) => (
                        <div key={status} className="todo flex-1 select-none">
                            <div className="text-l font-semibold mb-2">
                                {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                            </div>
                            <div className="grid gap-4">
                                {tasks
                                    .filter((task) => task.status === status)
                                    .map((task) => (
                                        <div key={task.id} className="bg-white p-4 rounded-lg shadow">
                                            <input
                                                type="text"
                                                value={task.title}
                                                onChange={(e) =>
                                                    handleUpdateTask(task.id!, e.target.value, task.description)
                                                }
                                                className="w-full mb-2"
                                            />
                                            <textarea
                                                value={task.description}
                                                onChange={(e) => handleUpdateTask(task.id!, task.title, e.target.value)}
                                                className="w-full mb-2"
                                            />
                                            <div className="flex justify-between items-center">
                                                <select
                                                    value={task.status}
                                                    onChange={(e) =>
                                                        handleMoveTask(task.id!, e.target.value as TASK_STATUS)
                                                    }
                                                    className="p-1 rounded"
                                                >
                                                    <option value={TASK_STATUS.TODO}>To Do</option>
                                                    <option value={TASK_STATUS.INPROGRESS}>In Progress</option>
                                                    <option value={TASK_STATUS.DONE}>Done</option>
                                                </select>
                                                <button
                                                    onClick={() => handleDeleteTask(task.id!)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={handleInputChange(setTaskTitle)}
                        placeholder="New task title"
                        className="border p-2 rounded w-full"
                    />
                    <textarea
                        value={taskDescription}
                        onChange={handleInputChange(setTaskDescription)}
                        placeholder="New task description"
                        className="border p-2 rounded w-full mt-2"
                    />
                    <button onClick={handleCreateTask} className="mt-2 bg-blue-500 text-white p-2 rounded">
                        Add Task
                    </button>
                </div>
            </div>
        </>
    );
};

export default TodoList;
