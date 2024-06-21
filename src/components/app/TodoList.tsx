import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { Task } from '../../service/TodolistService';
import TodolistService, { TASK_STATUS } from '../../service/TodolistService';
import MoreOptionsIcon from '../icon/MoreOptionsIcon';

const TodoList = (): JSX.Element => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [isOpenAddTask, setIsOpenAddTask] = useState(false);

    useEffect(() => {
        const fetchTasks = async (): Promise<void> => {
            try {
                const fetchedTasks = await TodolistService.getAllTasks();
                setTasks(fetchedTasks);
            } finally {
                setLoading(false);
            }
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

        // TODO::: 내용이 없을 때도 생성되는 중 / 예외처리를 위해 코드를 개선하자 ..
        if (taskTitle.length === 0 || taskDescription.length === 0) {
            return;
        }

        const createdTask = await TodolistService.createTask(newTask);
        if (createdTask) {
            setTasks((prevTasks) => [...prevTasks, createdTask]);
            setTaskTitle('');
            setTaskDescription('');
            setIsOpenAddTask(false);
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

    // const handleDeleteTask = async (id: number): Promise<void> => {
    //     const isDeleted = await TodolistService.deleteTask(id);
    //     if (isDeleted) {
    //         setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    //     }
    // };

    // const handleMoveTask = async (id: number, newStatus: TASK_STATUS): Promise<void> => {
    //     const updatedTask = await TodolistService.updateTask(id, { status: newStatus });
    //     if (updatedTask) {
    //         setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? updatedTask : task)));
    //     }
    // };

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
            setter(event.target.value);
        };

    return (
        <>
            <div className="p-3 text-gray-500">To Do list</div>
            <div className="p-4 pt-2">
                <div className="text-2xl font-bold mb-4">To Do List</div>

                <div className="flex gap-4">
                    {Object.values(TASK_STATUS).map((status) => {
                        const tasksByStatus = tasks.filter((task) => task.status === status);

                        return (
                            <div key={status} className="todo flex-1 select-none">
                                <div className="flex-1">
                                    <div
                                        className={`flex items-center justify-between text-lg font-semibold mb-2 border-b-4 ${status === TASK_STATUS.TODO ? 'border-red-500' : status === TASK_STATUS.INPROGRESS ? 'border-blue-500' : 'border-green-500'} pb-2`}
                                    >
                                        <div>
                                            {status === TASK_STATUS.TODO && 'To Do'}
                                            {status === TASK_STATUS.INPROGRESS && 'In Progress'}
                                            {status === TASK_STATUS.DONE && 'Done'}
                                        </div>
                                        <div className="text-sm text-gray-500">{tasksByStatus.length}</div>
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    {loading ? (
                                        Array.from({ length: 3 }).map((_, index) => <SkeletonTask key={index} />)
                                    ) : (
                                        <>
                                            {tasks
                                                .filter((task) => task.status === status)
                                                .map((task) => (
                                                    <div
                                                        key={task.id}
                                                        className="rounded-lg bg-white p-4 shadow border border-gray-200"
                                                    >
                                                        <div className="flex mb-1 items-center justify-between">
                                                            <input
                                                                type="text"
                                                                value={task.title}
                                                                disabled={task.status === TASK_STATUS.DONE}
                                                                onChange={(e) =>
                                                                    handleUpdateTask(
                                                                        task.id!,
                                                                        e.target.value,
                                                                        task.description,
                                                                    )
                                                                }
                                                                className={`w-full ${task.status === TASK_STATUS.DONE ? 'line-through' : 'line'} text-sm font-medium text-gray-800`}
                                                            />
                                                            <MoreOptionsIcon onClick={() => alert('구현중입니다!')} />
                                                        </div>

                                                        <textarea
                                                            value={task.description}
                                                            disabled={task.status === TASK_STATUS.DONE}
                                                            onChange={(e) =>
                                                                handleUpdateTask(task.id!, task.title, e.target.value)
                                                            }
                                                            className="w-full text-xs text-gray-500"
                                                        />

                                                        {/* <div className="flex items-center justify-between">
                                                            <select
                                                                value={task.status}
                                                                onChange={(e) =>
                                                                    handleMoveTask(
                                                                        task.id!,
                                                                        e.target.value as TASK_STATUS,
                                                                    )
                                                                }
                                                                className="text-sm p-1 rounded"
                                                            >
                                                                <option value={TASK_STATUS.TODO}>To Do</option>
                                                                <option value={TASK_STATUS.INPROGRESS}>
                                                                    In Progress
                                                                </option>
                                                                <option value={TASK_STATUS.DONE}>Done</option>
                                                            </select>
                                                            <button
                                                                onClick={() => handleDeleteTask(task.id!)}
                                                                className="text-sm text-red-500 hover:text-red-700"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div> */}
                                                    </div>
                                                ))}

                                            {status === TASK_STATUS.TODO && !isOpenAddTask && (
                                                <button
                                                    className="w-full flex justify-center items-center text-gray-500"
                                                    onClick={() => setIsOpenAddTask(true)}
                                                >
                                                    + Add task
                                                </button>
                                            )}

                                            {status === TASK_STATUS.TODO && isOpenAddTask && (
                                                <div className="rounded-lg bg-white p-4 shadow border border-gray-200">
                                                    <input
                                                        type="text"
                                                        value={taskTitle}
                                                        onChange={handleInputChange(setTaskTitle)}
                                                        placeholder="New task title"
                                                        className="w-full mb-2 text-sm font-semibold text-black"
                                                    />
                                                    <textarea
                                                        value={taskDescription}
                                                        onChange={handleInputChange(setTaskDescription)}
                                                        placeholder="New task description"
                                                        className="w-full mb-2 text-xs text-gray-500"
                                                    />
                                                    <div className="flex items-center justify-between">
                                                        <button
                                                            onClick={handleCreateTask}
                                                            className="text-xs text-blue-500 hover:text-blue-700"
                                                        >
                                                            Add Task
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default TodoList;

const SkeletonTask = (): JSX.Element => (
    <div className="rounded-lg bg-gray-200 p-4 shadow border border-gray-200 animate-pulse">
        <div className="w-3/4 h-6 mb-2 bg-gray-300 rounded"></div>
        <div className="w-full h-4 bg-gray-300 rounded"></div>
        <div className="mt-4 flex items-center justify-between">
            <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
        </div>
    </div>
);
