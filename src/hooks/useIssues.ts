import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getIssues, createIssue, updateIssueStatus, deleteIssue } from '../services/issuesApi';
import { Issue, IssueFormValues, Status } from '../interfaces/issue';

const useIssues = () => {
  const queryClient = useQueryClient();

  const { data: issues = [], isLoading, isError } = useQuery<Issue[], Error>({
    queryKey: ['issues'],
    queryFn: getIssues,
  });

  const addIssueMutation = useMutation<Issue, Error, IssueFormValues>({
    mutationFn: createIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  const updateIssueMutation = useMutation<Issue, Error, { id: string; status: Status }>({
    mutationFn: ({ id, status }) => updateIssueStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  const deleteIssueMutation = useMutation<void, Error, string>({
    mutationFn: deleteIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });

  return {
    issues,
    isLoading,
    isError,
    addIssue: (issueData: IssueFormValues) => addIssueMutation.mutate(issueData),
    updateIssue: (id: string, status: Status) => updateIssueMutation.mutate({ id, status }),
    removeIssue: (id: string) => deleteIssueMutation.mutate(id),
  };
};

export default useIssues;
