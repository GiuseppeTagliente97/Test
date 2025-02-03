export interface HeaderData{
    title:string;
    router:string;
}

export interface Project {
    id: number;
    name: string;
}
  
export interface Employee {
    id: number;
    name: string;
}

export interface Table_data {
    project: Project;
    employee: Employee;
    date: string; 
    hours: number;
}
  


