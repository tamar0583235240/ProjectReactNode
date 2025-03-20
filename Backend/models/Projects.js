const mongoose = require('mongoose');

const ProjectsSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: [true,"Name must be complete."] 
    },
    description: {
        type: String,
        required: [true,"Description must be complete."] 
    },
    start_date: {
        type: Date,
        required: [true,"Start date must be complete."] 
    },
    deadline: {
        type: Date,
        required: [true,"Deadline must be complete."] 
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        required: [true,"Status must be complete."] 
    },
    project_manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true,"A project manager must be complete."] 
    },
    organization_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true,"Organization_id must be complete."] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Projects', ProjectsSchema);