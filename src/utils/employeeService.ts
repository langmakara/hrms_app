
import api from './api';
import { EmployeeDto, CreateEmployeeDto, UpdateEmployeeDto } from '../dtos/employee';

export const fetchEmployees = async (): Promise<EmployeeDto[]> => {
    try {
        const response = await api.get<any>('/employees');
        // Handle various possible response shapes from the API.
        const res = response.data;
        if (Array.isArray(res)) return res;
        if (Array.isArray(res?.data)) return res.data;
        if (Array.isArray(res?.employees)) return res.employees;
        if (Array.isArray(res?.result)) return res.result;

        // If the API wrapped data under nested objects (e.g., { data: { employees: [...] }})
        if (Array.isArray(res?.data?.employees)) return res.data.employees;

        // No array found — log the response so we can debug missing employees
        console.debug('[employeeService] fetchEmployees unexpected response shape', { responseData: res });
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
                    const response = await api.post<EmployeeDto>('/employees', form);
                    return ((response.data as any).data ?? response.data) as EmployeeDto;
                }
            } catch (innerErr) {
                console.warn('Failed to send FormData, falling back to JSON payload', innerErr);
            }
        }

    console.debug('[employeeService] sending JSON payload to /employees', payload);
    const response = await api.post<EmployeeDto>('/employees', payload);
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
        const response = await api.put<EmployeeDto>(`/employees/${id}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

export const deleteEmployee = async (id: string): Promise<void> => {
    try {
        await api.delete(`/employees/${id}`);
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};