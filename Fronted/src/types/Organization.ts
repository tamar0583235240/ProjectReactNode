import mongoose, { Document } from 'mongoose';

export interface Organization extends Document {
    organization_name: string;
    organization_description: string;
    organization_address: string;
    organization_phone: string;
    manager_id: mongoose.Types.ObjectId | null; 
}