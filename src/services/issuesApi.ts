import axios from 'axios';
import { Issue, IssueFormValues, Status } from '../interfaces/issue';

const API_URL = 'http://localhost:5000/api/issues';

export const getIssues = (): Promise<Issue[]> => {
  return axios.get(API_URL).then(response => response.data.data);
};

export const createIssue = (issue: IssueFormValues): Promise<Issue> => {
  return axios.post(API_URL, issue).then(response => response.data.data);
};

export const updateIssueStatus = (id: string, status: Status): Promise<Issue> => {
  return axios.patch(`${API_URL}/${id}`, { status }).then(response => response.data.data);
};

export const deleteIssue = (id: string): Promise<void> => {
  return axios.delete(`${API_URL}/${id}`).then(() => {});
};
