export type Status = 'Open' | 'In Progress' | 'Resolved';
export type Priority = 'Low' | 'Medium' | 'High';

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdDate: string;
  updatedDate: string;
}

export interface IssueFormValues {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
}