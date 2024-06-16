import { supabaseClient } from '../client';

// eslint-disable-next-line react-refresh/only-export-components
export enum TASK_STATUS {
    TODO = 'todo',
    INPROGRESS = 'in_progress',
    DONE = 'done',
}

export interface Task {
    id: number;
    title?: string;
    description?: string;
    user_id: number;
    status: TASK_STATUS;
}

class TodolistService {
    public static readonly getTasks = async (): Promise<Task[]> => {
        const { data, error } = await supabaseClient.from('task').select('*');

        if (error) {
            console.error('Error fetching tasks:', error.message);
            return [];
        }

        return data || [];
    };

    public static readonly createTask = async (task: Omit<Task, 'id'>): Promise<Task | null> => {
        try {
            const { data, error } = await supabaseClient.from('task').insert([task]).select('*').single();

            if (error) {
                throw error;
            }

            return data;
        } catch (error: any) {
            console.error('Error creating task:', error.message);
            return null;
        }
    };
}

export default TodolistService;
