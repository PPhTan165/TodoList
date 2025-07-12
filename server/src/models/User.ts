export interface User { 
    id: number;
    email: string;
    password: string; // Consider using a more secure type for passwords
    createdAt?: Date; // Optional field for creation timestamp
    updatedAt?: Date; // Optional field for update timestamp
}