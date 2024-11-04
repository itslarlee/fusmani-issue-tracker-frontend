// src/hooks/useIssues.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getIssues, createIssue, updateIssue, deleteIssue } from '../services/issuesApi';
import { Issue, IssueFormValues } from '../interfaces/issue';

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

  const updateIssueMutation = useMutation<Issue, Error, { id: string; updatedValues: IssueFormValues }>({
    mutationFn: ({ id, updatedValues }) => updateIssue(id, updatedValues),
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
    updateIssue: (id: string, updatedValues: IssueFormValues) => updateIssueMutation.mutate({ id, updatedValues }),
    removeIssue: (id: string) => deleteIssueMutation.mutate(id),
  };
};

export default useIssues;
