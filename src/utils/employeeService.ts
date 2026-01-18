
import { apiClient } from '@/lib/api-client';
import { EmployeeDto, CreateEmployeeDto, UpdateEmployeeDto } from '../dtos/employee';

export const fetchEmployees = async (): Promise<EmployeeDto[]> => {
    try {
        // Use same-origin Next.js proxy endpoint to avoid CORS from the browser
        const resp = await fetch('/api/employees', { method: 'GET', credentials: 'same-origin' });
        const data = await resp.json();
        // Normalize several possible shapes
        if (Array.isArray(data)) return data as EmployeeDto[];
        if (Array.isArray(data?.data)) return data.data as EmployeeDto[];
        if (Array.isArray(data?.employees)) return data.employees as EmployeeDto[];
        if (Array.isArray(data?.result)) return data.result as EmployeeDto[];
        if (Array.isArray(data?.data?.employees)) return data.data.employees as EmployeeDto[];
        console.debug('[employeeService] fetchEmployees unexpected response shape', { responseData: data });
        return [];
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

const cleanObject = (obj: Record<string, any>) => {
    const out: Record<string, any> = {};
    Object.keys(obj).forEach((k) => {
        const v = obj[k];
        // keep boolean and numeric falsy values, drop null/undefined/empty-string
        if (v === 0 || v === false) {
            out[k] = v;
        } else if (v !== undefined && v !== null && !(typeof v === 'string' && v.trim() === '')) {
            out[k] = v;
        }
    });
    return out;
};

export const createEmployee = async (employeeData: CreateEmployeeDto): Promise<EmployeeDto> => {
    try {
        // Sanitize payload: remove empty strings / undefined so backend gets a clean object
        const payload = cleanObject(employeeData as Record<string, any>);

        // If profileImage looks like a data URL (base64), consider sending as FormData
        if (typeof payload.profileImage === 'string' && payload.profileImage.startsWith('data:')) {
            // Try to convert data URL to Blob and send multipart/form-data
            try {
                const matches = payload.profileImage.match(/^data:(.+);base64,(.+)$/);
                if (matches) {
                    const mime = matches[1];
                    const bstr = atob(matches[2]);
                    let n = bstr.length;
                    const u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    const blob = new Blob([u8arr], { type: mime });
                    const form = new FormData();
                    // append all other fields
                    Object.keys(payload).forEach((k) => {
                        if (k === 'profileImage') return;
                        form.append(k, payload[k]);
                    });
                    form.append('profileImage', blob, 'profile.png');

                    // DO NOT set Content-Type for FormData manually; let browser set the boundary
                    console.debug('[employeeService] sending multipart FormData payload', { form });
                    const response = await apiClient.post<EmployeeDto>('/employees', form);
                    return ((response.data as any).data ?? response.data) as EmployeeDto;
                }
            } catch (innerErr) {
                console.warn('Failed to send FormData, falling back to JSON payload', innerErr);
            }
        }

        console.debug('[employeeService] sending JSON payload to /employees', payload);
        const response = await apiClient.post<EmployeeDto>('/employees', payload);
        // prefer API data.wrapper if exists
        return ((response.data as any).data ?? response.data) as EmployeeDto;
    } catch (error: any) {
        // improved error logging to help debug 400 responses
        try {
            console.error('[employeeService] Error creating employee:', {
                status: error?.response?.status,
                statusText: error?.response?.statusText,
                responseData: error?.response?.data,
                responseHeaders: error?.response?.headers,
                requestData: error?.config?.data,
                message: error?.message,
            });
        } catch (logErr) {
            console.error('Error creating employee (fallback):', error);
        }

        // rethrow the original axios error so upstream can inspect response
        throw error;
    }
};

export const updateEmployee = async (id: string, employeeData: UpdateEmployeeDto): Promise<EmployeeDto> => {
    try {
        const response = await apiClient.put<EmployeeDto>(`/employees/${id}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

export const deleteEmployee = async (id: string): Promise<void> => {
    try {
        await apiClient.delete(`/employees/${id}`);
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};