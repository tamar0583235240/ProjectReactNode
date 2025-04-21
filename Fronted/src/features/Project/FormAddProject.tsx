import React, { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectData, SchemaAddProject } from '../../schemas/SchemaAddProject';
import '../style/FormAddProject.css';

const FormAddProject: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<ProjectData>({
    mode: 'onSubmit',
    resolver: zodResolver(SchemaAddProject),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'employees',
  });

  const [newEmployee, setNewEmployee] = useState({ username: '', password: '' });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const onSubmit: SubmitHandler<ProjectData> = (data) => {
    console.log(data);
    alert('The form was sent successfully!');
  };

  const handleAddEmployee = () => {
    append(newEmployee);
    setNewEmployee({ username: '', password: '' });
  };

  const handleEditEmployee = (index: number, employee: { username: string; password: string }) => {
    setEditingIndex(index);
    setNewEmployee(employee);
  };

  const handleUpdateEmployee = (index: number) => {
    update(index, newEmployee);
    setEditingIndex(null);
    setNewEmployee({ username: '', password: '' });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <p className="title">Add a project</p>
      <p className="message">Fill in the details to add a new project.</p>

        <label>
          <input className="input" type="text" {...register('nameProject')} required />
          <span>project name</span>
          {errors.nameProject && <p className="error-message">{errors.nameProject.message}</p>}
        </label>

        <label>
          <input className="input" type="text" {...register('description')} />
          <span>description</span>
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </label>

        <label>
          <input className="input" type="date" {...register('dateStart')} required />
          <span>start date</span>
          {errors.dateStart && <p className="error-message">{errors.dateStart.message}</p>}
        </label>

        <label>
          <input className="input" type="number" {...register('countDayToDeadLine')} required />
          <span>A few days to go</span>
          {errors.countDayToDeadLine && <p className="error-message">{errors.countDayToDeadLine.message}</p>}
        </label>

        <div>
          <label>employees:</label>
          <div className="employees-container">
            {fields.map((field, index) => (
              <div key={field.id} className="employee-item">
                {editingIndex === index ? (
                  <div className="employee-input">
                    <label>
                      user name:
                      <input
                        type="text"
                        value={newEmployee.username}
                        onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                        className="input"
                      />
                    </label>
                    <label>
                    password:
                      <input
                        type="password"
                        value={newEmployee.password}
                        onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                        className="input"
                      />
                    </label>
                    <div className="employee-actions">
                      <button type="button" onClick={() => handleUpdateEmployee(index)}>save</button>
                      <button type="button" onClick={() => setEditingIndex(null)}>cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="employee-details">
                    <label>
                    user name: {field.username}
                    </label>
                    <label>
                    password:{field.password}
                    </label>
                    <div className="employee-actions">
                      <button type="button" onClick={() => remove(index)}>הסר</button>
                      <button type="button" onClick={() => handleEditEmployee(index, field)}>ערוך</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="new-employee-input">
              <label>
              user name: 
                <input
                  type="text"
                  value={newEmployee.username}
                  onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                  className="input"
                />
              </label>
              <label>
              password:
                <input
                  type="password"
                  value={newEmployee.password}
                  onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                  className="input"
                />
              </label>
              <button type="button" onClick={handleAddEmployee} className="add-employee-button">
               add employee
              </button>
            </div>
          </div>
        </div>

        <button className="submit" type="submit">
          add project
        </button>
      </form>
    </div>
  );
};

export default FormAddProject;