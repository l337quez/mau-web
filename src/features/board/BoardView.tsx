import { useState } from 'react';
import { 
  DndContext, 
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type {
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { BoardColumn } from './BoardColumn';
import { TaskCard } from './TaskCard';
import { LayoutDashboard, Table, List, Calendar } from 'lucide-react';

export type Task = {
  id: string;
  title: string;
  tags: { label: string; color: string }[];
  dueDate?: string;
  assignee?: { initials: string; bgColor: string };
  columnId: string;
};

export type Column = {
  id: string;
  title: string;
};

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

const initialTasks: Task[] = [
  {
    id: 't1',
    title: 'Design landing page',
    tags: [{ label: 'Design', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' }],
    dueDate: '24 Jun',
    assignee: { initials: 'JS', bgColor: 'bg-blue-200 text-blue-700' },
    columnId: 'todo',
  },
  {
    id: 't2',
    title: 'Design product layout',
    tags: [{ label: 'Design', color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' }],
    dueDate: '26 Jun',
    assignee: { initials: 'AM', bgColor: 'bg-green-200 text-green-700' },
    columnId: 'todo',
  },
  {
    id: 't3',
    title: 'Implement user profiles',
    tags: [{ label: 'Dev', color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' }],
    dueDate: '28 Jun',
    assignee: { initials: 'JS', bgColor: 'bg-blue-200 text-blue-700' },
    columnId: 'inprogress',
  },
  {
    id: 't4',
    title: 'Add comment feature',
    tags: [{ label: 'Dev', color: 'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-400' }],
    dueDate: '30 Jun',
    assignee: { initials: 'JS', bgColor: 'bg-blue-200 text-blue-700' },
    columnId: 'review',
  },
  {
    id: 't5',
    title: 'Add comment feature feedback',
    tags: [{ label: 'Feedback', color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' }],
    dueDate: '02 Jul',
    assignee: { initials: 'AL', bgColor: 'bg-yellow-200 text-yellow-700' },
    columnId: 'done',
  },
];

export const BoardView = () => {
  const [columns] = useState<Column[]>(initialColumns);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';
    const isOverAColumn = over.data.current?.type === 'Column';

    if (!isActiveATask) return;

    // Dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          const updatedTasks = [...tasks];
          updatedTasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(updatedTasks, activeIndex, overIndex);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // Dropping a Task over a Column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const updatedTasks = [...tasks];
        updatedTasks[activeIndex].columnId = overId as string;
        return arrayMove(updatedTasks, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = (_event: DragEndEvent) => {
    setActiveId(null);
  };

  const activeTask = activeId ? tasks.find((task) => task.id === activeId) : null;

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border pb-4 mb-6">
        <button className="flex items-center gap-2 text-orange-500 font-medium border-b-2 border-orange-500 pb-4 -mb-[17px]">
          <LayoutDashboard className="w-4 h-4" />
          Board
        </button>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium pb-4 -mb-[17px] transition-colors">
          <Table className="w-4 h-4" />
          Table
        </button>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium pb-4 -mb-[17px] transition-colors">
          <List className="w-4 h-4" />
          List
        </button>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium pb-4 -mb-[17px] transition-colors">
          <Calendar className="w-4 h-4" />
          Calendar
        </button>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full items-start">
            <SortableContext items={columns.map((col) => col.id)} strategy={horizontalListSortingStrategy}>
              {columns.map((col) => (
                <BoardColumn
                  key={col.id}
                  column={col}
                  tasks={tasks.filter((t) => t.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>

          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};
