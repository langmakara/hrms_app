// នេះជាប្លង់មេសម្រាប់ Frontend ប្រើប្រាស់
export interface EmployeeDto {
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

// ប្រើ Omit ដើម្បីដក id ចេញសម្រាប់ពេលបង្កើតថ្មី
export type CreateEmployeeDto = Omit<EmployeeDto, 'id'>;

// ប្រើ Partial ដើម្បីឱ្យគ្រប់ fields ទៅជា optional សម្រាប់ពេល update
export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;