import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import IssueCard from './IssueCard';
import { Issue } from '../interfaces/issue';

interface DraggableIssueCardProps {
  issue: Issue;
}

const DraggableIssueCard: React.FC<DraggableIssueCardProps> = ({ issue }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: issue.id,
    data: { status: issue.status },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    marginBottom: '8px', // Adds space between cards
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <IssueCard issue={issue} />
    </div>
  );
};

export default DraggableIssueCard;
