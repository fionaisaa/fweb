

export interface User{
    
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    role: 'user'| 'admin';
}