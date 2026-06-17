import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock } from 'lucide-react';
import type { Task } from './BoardView';

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-card opacity-30 border-2 border-orange-500 rounded-xl p-4 min-h-[120px] shadow-sm"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-card text-card-foreground border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group relative"
    >
      <h3 className="font-medium text-sm mb-3 leading-tight">{task.title}</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {task.tags.map((tag, idx) => (
          <span
            key={idx}
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${tag.color}`}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>Due date: {task.dueDate || 'N/A'}</span>
        </div>
        
        {task.assignee && (
          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${task.assignee.bgColor}`}>
            {task.assignee.initials}
          </div>
        )}
      </div>
    </div>
  );
};
