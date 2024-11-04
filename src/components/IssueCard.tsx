import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Issue } from '../interfaces/issue';

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{issue.title}</Typography>
        <Typography variant="body2" color="textSecondary">{issue.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
