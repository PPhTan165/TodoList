import {db} from '../config/db';


export const getTasks = (goalId: number): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
        db.query(
            "SELECT * FROM tasks WHERE goal_id = ?",
            [goalId],
            (err: any, results: any) => {
                if (err) return rejects(err);
                resolve(results);
            }
        )
    })
}   


export const getTasksByUser = (goalId: number, userId: number): Promise<any[]> => {
    return new Promise((resolve, rejects) => {
        db.query(
            "SELECT * FROM tasks WHERE goal_id = ? AND assignee_id = ?",
            [goalId , userId],
            (err: any, results: any) => {
                if (err) return rejects(err);
                resolve(results);
            }
        )
    })
}   

export const getTaskById = (id: number, goalId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM tasks WHERE id = ? AND goal_id = ? AND assignee_id = ?",
            [id, goalId],
            (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        )
    })
}


export const createTask = (title: string, goalId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO tasks (title, goal_id) VALUES (?, ?)",
            [title, goalId],
            (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results);
            }
        )
    })
}


export const updateTask = (id: number, title: string, goalId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE tasks SET title = ? WHERE id = ? AND goal_id = ?",
            [title, id, goalId],
            (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results);
            }
        )
    })
}

export const deleteTask = (id: number, goalId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM tasks WHERE id = ? AND goal_id = ?",
            [id, goalId],
            (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results);
            }
        )
    })
}

