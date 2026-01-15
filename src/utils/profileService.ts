import api from './axios';
import { UserFormData } from '../components/Forms/userForm';

// Get current user ID from localStorage
const getCurrentUserId = (): string | null => {
    try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            return user.id || user.employeeId || null;
        }
    } catch (error) {
        console.error('Error getting user ID from localStorage:', error);
    }
    return null;
};

// Fetch current user's profile using employee endpoint
export const fetchCurrentUserProfile = async (): Promise<UserFormData> => {
    try {
        const userId = getCurrentUserId();
        if (!userId) {
            throw new Error('User ID not found. Please log in again.');
        }

        const response = await api.get(`/employees/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// Update current user's profile using employee endpoint
export const updateUserProfile = async (profileData: UserFormData): Promise<UserFormData> => {
    try {
        const userId = getCurrentUserId();
        if (!userId) {
            throw new Error('User ID not found. Please log in again.');
        }

        const response = await api.put(`/employees/${userId}`, profileData);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};
