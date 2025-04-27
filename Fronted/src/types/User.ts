import mongoose, { Document } from 'mongoose';

export interface User extends Document {
    
    user_name: string
    password: string
    email: string
    role: string; 
    manager_id: string | null; 
    organization_id: mongoose.Types.ObjectId;
}