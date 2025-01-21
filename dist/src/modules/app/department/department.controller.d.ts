import { DepartmentService } from '@modules/core/department/department.service';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    findForDropdown(): Promise<{
        message: string;
        error: number;
        data: {
            id: number;
            name: string;
        }[] | undefined;
    }>;
}
