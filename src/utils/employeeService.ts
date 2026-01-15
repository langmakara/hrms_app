import api from './axios';

// Interface for Employee data
export interface Employee {
    id: string;
    name: string;
    gender: string;
    dob: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    dateHire: string;
    department: string;
    position: string;
    emergencyContact: string;
    managerId: string;
    profileImage: any;
}

// Fetch all employees
export const fetchEmployees = async (): Promise<Employee[]> => {
    try {
        const response = await api.get('/employees');
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

// Create a new employee
export const createEmployee = async (employeeData: Employee): Promise<Employee> => {
    try {
        const response = await api.post('/employees', employeeData);
        return response.data;
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error;
    }
};

// Update an existing employee
export const updateEmployee = async (id: string, employeeData: Employee): Promise<Employee> => {
    try {
        const response = await api.put(`/employees/${id}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

// Delete an employee
export const deleteEmployee = async (id: string): Promise<void> => {
    try {
        await api.delete(`/employees/${id}`);
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};
