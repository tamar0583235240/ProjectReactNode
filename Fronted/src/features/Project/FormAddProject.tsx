// import React, { useState } from 'react';
// import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { ProjectData, SchemaAddProject } from '../../schemas/SchemaAddProject';
// import '../style/FormAddProject.css';

// const FormAddProject: React.FC = () => {
//   const { register, handleSubmit, control, formState: { errors }, reset } = useForm<ProjectData>({
//     mode: 'onSubmit',
//     resolver: zodResolver(SchemaAddProject),
//   });

//   const { fields, append, remove, update } = useFieldArray({
//     control,
//     name: 'employees',
//   });

//   const [newEmployee, setNewEmployee] = useState({ username: '', password: '' });
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   const onSubmit: SubmitHandler<ProjectData> = (data) => {
//     console.log(data);
//     alert('The form was sent successfully!');
//   };

//   const handleAddEmployee = () => {
//     append(newEmployee);
//     setNewEmployee({ username: '', password: '' });
//   };

//   const handleEditEmployee = (index: number, employee: { username: string; password: string }) => {
//     setEditingIndex(index);
//     setNewEmployee(employee);
//   };

//   const handleUpdateEmployee = (index: number) => {
//     update(index, newEmployee);
//     setEditingIndex(null);
//     setNewEmployee({ username: '', password: '' });
//   };

//   return (
//     <div>
//       <form className="form" onSubmit={handleSubmit(onSubmit)}>
//       <p className="title">Add a project</p>
//       <p className="message">Fill in the details to add a new project.</p>

//         <label>
//           <input className="input" type="text" {...register('nameProject')} required />
//           <span>project name</span>
//           {errors.nameProject && <p className="error-message">{errors.nameProject.message}</p>}
//         </label>

//         <label>
//           <input className="input" type="text" {...register('description')} />
//           <span>description</span>
//           {errors.description && <p className="error-message">{errors.description.message}</p>}
//         </label>

//         <label>
//           <input className="input" type="date" {...register('dateStart')} required />
//           <span>start date</span>
//           {errors.dateStart && <p className="error-message">{errors.dateStart.message}</p>}
//         </label>

//         <label>
//           <input className="input" type="number" {...register('countDayToDeadLine')} required />
//           <span>A few days to go</span>
//           {errors.countDayToDeadLine && <p className="error-message">{errors.countDayToDeadLine.message}</p>}
//         </label>

//         <div>
//           <label>employees:</label>
//           <div className="employees-container">
//             {fields.map((field, index) => (
//               <div key={field.id} className="employee-item">
//                 {editingIndex === index ? (
//                   <div className="employee-input">
//                     <label>
//                       user name:
//                       <input
//                         type="text"
//                         value={newEmployee.username}
//                         onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
//                         className="input"
//                       />
//                     </label>
//                     <label>
//                     password:
//                       <input
//                         type="password"
//                         value={newEmployee.password}
//                         onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
//                         className="input"
//                       />
//                     </label>
//                     <div className="employee-actions">
//                       <button type="button" onClick={() => handleUpdateEmployee(index)}>save</button>
//                       <button type="button" onClick={() => setEditingIndex(null)}>cancel</button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="employee-details">
//                     <label>
//                     user name: {field.username}
//                     </label>
//                     <label>
//                     password:{field.password}
//                     </label>
//                     <div className="employee-actions">
//                       <button type="button" onClick={() => remove(index)}>הסר</button>
//                       <button type="button" onClick={() => handleEditEmployee(index, field)}>ערוך</button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//             <div className="new-employee-input">
//               <label>
//               user name: 
//                 <input
//                   type="text"
//                   value={newEmployee.username}
//                   onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
//                   className="input"
//                 />
//               </label>
//               <label>
//               password:
//                 <input
//                   type="password"
//                   value={newEmployee.password}
//                   onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
//                   className="input"
//                 />
//               </label>
//               <button type="button" onClick={handleAddEmployee} className="add-employee-button">
//                add employee
//               </button>
//             </div>
//           </div>
//         </div>

//         <button className="submit" type="submit">
//           add project
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FormAddProject;


import { Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { ProjectData, SchemaAddProject, SchemateamMember, TeamMemberData } from '../../schemas/SchemaAddProject';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const statuses = [
  { _id: '1', name: 'Not Started' },
  { _id: '2', name: 'In Progress' },
  { _id: '3', name: 'Completed' },
  { _id: '4', name: 'On Hold' },
];

const managers = [
  { _id: '1', name: 'Manager 1' },
  { _id: '2', name: 'Manager 2' },
];

const organizations = [
  { _id: '1', name: 'Organization 1' },
  { _id: '2', name: 'Organization 2' },
];

const FormAddProject: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<(TeamMemberData & { id: string })[]>([]);
  const [openTeamMemberDialog, setOpenTeamMemberDialog] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMemberData | null>(null);
  const [editingTeamMemberId, setEditingTeamMemberId] = useState<string | null>(null);

  // const [addProject, { isLoading: isAddingProject }] = useAddProjectMutation();
  // const [addTeamMember] = useAddTeamMemberMutation();

  const { control, handleSubmit, formState: { errors }, reset, } = useForm<ProjectData>({
    resolver: zodResolver(SchemaAddProject),
    defaultValues: {
      project_name: '',
      description: '',
      start_date: new Date(),
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default deadline: one week from now
      status: '',
      project_manager_id: '',
      organization_id: '',
    },
  });

  const { control: teamMemberControl, handleSubmit: handleTeamMemberSubmit, formState: { errors: teamMemberErrors }, reset: resetTeamMemberForm, }
    = useForm<TeamMemberData>({ resolver: zodResolver(SchemateamMember), defaultValues: { name: '', email: '', }, });

  // Handle opening the dialog for adding a new team member
  const handleOpenAddTeamMember = () => {
    setCurrentTeamMember(null);
    setEditingTeamMemberId(null);
    resetTeamMemberForm();
    setOpenTeamMemberDialog(true);
  };

  // Handle opening the dialog for editing an existing team member
  const handleEditTeamMember = (member: TeamMemberData & { id: string }) => {
    setCurrentTeamMember(member);
    setEditingTeamMemberId(member.id);
    resetTeamMemberForm({
      name: member.name,
      email: member.email,
    });
    setOpenTeamMemberDialog(true);
  };

  // Handle closing the team member dialog
  const handleCloseTeamMemberDialog = () => {
    setOpenTeamMemberDialog(false);
    setCurrentTeamMember(null);
    setEditingTeamMemberId(null);
  };

  // Handle saving a team member (add or update)
  const onTeamMemberSubmit = (data: TeamMemberData) => {
    if (editingTeamMemberId) {
      // Update existing team member
      setTeamMembers(prevMembers =>
        prevMembers.map(member =>
          member.id === editingTeamMemberId
            ? { ...data, id: member.id }
            : member
        )
      );
    } else {
      // Add new team member
      const newTeamMember = {
        ...data,
        id: Math.random().toString(36).substring(2, 11), // Generate a random ID (replace with proper ID generation)
      };
      setTeamMembers(prevMembers => [...prevMembers, newTeamMember]);

      // Send email notification (will be implemented through the backend)
      // addTeamMember({
      //   projectId: '', // This will be set after project creation
      //   ...data
      // });
    }

    handleCloseTeamMemberDialog();
  };

  // Handle removing a team member
  const handleRemoveTeamMember = (id: string) => {
    setTeamMembers(prevMembers => prevMembers.filter(member => member.id !== id));
  };

  // Handle form submission
  const onSubmit = async (data: ProjectData) => {
    // try {
    //   // Add the project to the database
    //   const response = await addProject({
    //     ...data,
    //     team_members: teamMembers, // Send team members with the project
    //   }).unwrap();

    //   console.log('Project added successfully:', response);

    //   // Reset the form and team members list
    //   reset();
    //   setTeamMembers([]);

    //   // Show success message (implement according to your UI requirements)
    //   alert('Project added successfully!');
    // } catch (error) {
    //   console.error('Failed to add project:', error);
    //   // Show error message
    //   alert('Failed to add project. Please try again.');
    // }
    alert('The form was sent successfully!');
    console.log(data);
  }

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
            Add New Project
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={3}>
              {/* Project Name */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="project_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Project Name"
                      fullWidth
                      required
                      error={!!errors.project_name}
                      helperText={errors.project_name?.message}
                    />
                  )}
                />
              </Grid>

              {/* Status */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Status"
                      fullWidth
                      required
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status._id} value={status._id}>
                          {status.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Start Date */}
              <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="start_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Start Date"
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            error: !!errors.start_date,
                            helperText: errors.start_date?.message,
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              {/* Deadline */}
              <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="deadline"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Deadline"
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            error: !!errors.deadline,
                            helperText: errors.deadline?.message,
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              {/* Project Manager */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="project_manager_id"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Project Manager"
                      fullWidth
                      required
                      error={!!errors.project_manager_id}
                      helperText={errors.project_manager_id?.message}
                    >
                      {managers.map((manager) => (
                        <MenuItem key={manager._id} value={manager._id}>
                          {manager.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Organization */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="organization_id"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Organization"
                      fullWidth
                      required
                      error={!!errors.organization_id}
                      helperText={errors.organization_id?.message}
                    >
                      {organizations.map((org) => (
                        <MenuItem key={org._id} value={org._id}>
                          {org.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
                      required
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* Team Members Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Team Members
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1">
                      {teamMembers.length > 0
                        ? `${teamMembers.length} Team Member${teamMembers.length !== 1 ? 's' : ''}`
                        : 'No team members added'}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<PersonAddIcon />}
                      onClick={handleOpenAddTeamMember}
                    >
                      Add Team Member
                    </Button>
                  </Box>
                </Grid>

                {teamMembers.length > 0 && (
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardContent sx={{ p: 0 }}>
                        <List dense>
                          {teamMembers.map((member, index) => (
                            <React.Fragment key={member.id}>
                              {index > 0 && <Divider />}
                              <ListItem>
                                <ListItemText
                                  primary={member.name}
                                  secondary={member.email}
                                />
                                <ListItemSecondaryAction>
                                  <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    onClick={() => handleEditTeamMember(member)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleRemoveTeamMember(member.id)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            </React.Fragment>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Box>

            {/* Submit Button */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                disabled={isAddingProject}
              >
                {isAddingProject ? 'Saving...' : 'Save Project'}
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Team Member Dialog */}
        <Dialog open={openTeamMemberDialog} onClose={handleCloseTeamMemberDialog}>
          <DialogTitle>
            {editingTeamMemberId ? 'Edit Team Member' : 'Add Team Member'}
          </DialogTitle>
          <Box component="form" onSubmit={handleTeamMemberSubmit(onTeamMemberSubmit)} noValidate>
            <DialogContent>
              <DialogContentText>
                {editingTeamMemberId
                  ? 'Edit the team member information below.'
                  : 'Enter the team member information. An invitation email will be sent to this person.'}
              </DialogContentText>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                {/* Team Member Name */}
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={teamMemberControl}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        fullWidth
                        required
                        error={!!teamMemberErrors.name}
                        helperText={teamMemberErrors.name?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Team Member Email */}
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={teamMemberControl}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        error={!!teamMemberErrors.email}
                        helperText={teamMemberErrors.email?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseTeamMemberDialog}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Container>
    </div>
  )
}

export default FormAddProject
