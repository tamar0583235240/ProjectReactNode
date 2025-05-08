import { z } from 'zod';

export const SchemaAddProject = z.object({
  project_name: z.string().min(2, 'Name must contain at least 2 characters.').max(100, 'Project name cannot exceed 100 characters.'),
    
  description: z.string().min(2, 'Description must contain at least 2 characters.').max(1000, 'Description cannot exceed 1000 characters.'),
    
  start_date: z.date({required_error: 'Start date is required',invalid_type_error: 'Start date must be a valid date',}),
  
  deadline: z.date({required_error: 'Deadline is required',invalid_type_error: 'Deadline must be a valid date',}).refine(date => date > new Date(), {message: 'Deadline must be in the future',}),
  
  status: z.string().min(1, 'Status is required'),
    
  project_manager_id: z.string().min(1, 'Project manager is required'),
    
  organization_id: z.string().min(1, 'Organization is required'),
    
  team_members: z.array(z.object({
      id: z.string().optional(),
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email address'),
    })
  ).optional(),
});

export type ProjectData = z.infer<typeof SchemaAddProject>;

export const SchemateamMember = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name cannot exceed 100 characters'),
    
  email: z
    .string()
    .email('Invalid email address')
    .max(100, 'Email cannot exceed 100 characters'),
});

export type TeamMemberData = z.infer<typeof SchemateamMember>;