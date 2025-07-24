import {db} from '../config/db';

export const getGoals = (userId: number): Promise<any[]> => {
    return new Promise ((resolve, reject) => {
        db.query(
            "SELECT * FROM goals WHERE owner_id = ?",
            [userId],
            (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results);
            }

        )
    })
}

export const getHGoalById = (id: number, userId: number): Promise<object> => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM goals WHERE id = ? AND owner_id = ?",
            [id, userId],
            (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        )
    })
}

export const createGoal = ( title: string, description: string = "",  userId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO goals ( title, description, owner_id) VALUES (?, ?, ?)",
            [ title, description, userId],
            (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results);
            }
        )
    })
}

export const createGoalMembers = (goalId: number, userId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO goal_members (goal_id, user_id) VALUES (?, ?)",
            [goalId, userId],
            (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results);
            }
        )
    })
}   

export const updateGoal = (id: number, title: string, description: string, userId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE goals SET title = ?, description = ? WHERE id = ? AND owner_id = ?",
            [title, description, id, userId],
            (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results);
            }
        )
    })
}

export const deleteGoal = (id: number, userId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM goals WHERE id = ? AND owner_id = ?",
            [id, userId],
            (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results);
            }
        )
    })
}

