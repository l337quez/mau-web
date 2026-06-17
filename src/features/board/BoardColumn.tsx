import { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { MoreHorizontal } from 'lucide-react';
import type { Column, Task } from './BoardView';
import { TaskCard } from './TaskCard';

type Props = {
  column: Column;
  tasks: Task[];
};

export const BoardColumn = ({ column, tasks }: Props) => {
  const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col bg-slate-100 dark:bg-slate-800/50 min-w-[280px] w-[280px] rounded-xl p-3 h-full overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="font-semibold text-foreground text-sm flex items-center gap-2">
          {column.title}
        </h2>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 pb-2 flex flex-col gap-3">
        <button className="w-full py-2 border-2 border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-orange-500 hover:text-orange-500 transition-colors">
          Add Task
        </button>

        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
