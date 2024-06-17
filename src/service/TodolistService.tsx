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
    public static readonly getAllTasks = async (): Promise<Task[]> => {
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

    public static readonly updateTask = async (id: number, updates: Partial<Task>): Promise<Task | null> => {
        try {
            const { data, error } = await supabaseClient.from('task').update(updates).eq('id', id).select('*').single();

            if (error) {
                throw error;
            }

            return data;
        } catch (error: any) {
            console.error('Error updating task:', error.message);
            return null;
        }
    };

    public static readonly deleteTask = async (id: number): Promise<boolean> => {
        try {
            const { error } = await supabaseClient.from('task').delete().eq('id', id);

            if (error) {
                throw error;
            }

            return true;
        } catch (error: any) {
            console.error('Error deleting task:', error.message);
            return false;
        }
    };
}

export default TodolistService;
