import { useMemo, useState } from 'react';
import { EstimateItem, Project, WorkTask } from '../types';

interface TasksPageProps {
  projects: Project[];
  estimateItems: EstimateItem[];
  workTasks: WorkTask[];
}

const formatCurrency = (value: number) =>
  value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

const statusLabel = (status: WorkTask['status']) => {
  if (status === 'done') return 'Готово';
  if (status === 'in_progress') return 'В работе';
  return 'Не начато';
};

const statusColor = (status: WorkTask['status']) => {
  if (status === 'done') return 'text-green-600';
  if (status === 'in_progress') return 'text-blue-600';
  return 'text-gray-500';
};

function TasksPage({ projects, estimateItems, workTasks }: TasksPageProps) {
  const [projectFilter, setProjectFilter] = useState<'all' | number>('all');

  const filteredItems = useMemo(() => {
    if (projectFilter === 'all') return estimateItems;
    return estimateItems.filter((item) => item.projectId === projectFilter);
  }, [estimateItems, projectFilter]);

  const filteredTasks = useMemo(() => {
    if (projectFilter === 'all') return workTasks;
    return workTasks.filter((task) => task.projectId === projectFilter);
  }, [projectFilter, workTasks]);

  const tasksByItem = useMemo(() => {
    const map: Record<number, WorkTask[]> = {};
    filteredTasks.forEach((task) => {
      if (!map[task.estimateItemId]) map[task.estimateItemId] = [];
      map[task.estimateItemId].push(task);
    });
    return map;
  }, [filteredTasks]);

  const groupedByCategory = useMemo(() => {
    const map = new Map<string, EstimateItem[]>();
    filteredItems.forEach((item) => {
      const arr = map.get(item.category) || [];
      arr.push(item);
      map.set(item.category, arr);
    });
    return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
  }, [filteredItems]);

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 border-b border-gray-200 pb-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Работы и этапы</h2>
          <p className="text-sm text-gray-500">Категории работ и связанные подзадачи</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label className="text-gray-600">Проект</label>
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Все проекты</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {groupedByCategory.map((group) => (
          <div key={group.category} className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">{group.category}</h3>

            {group.items.map((item) => (
              <div key={item.id} className="mb-3 border-t border-gray-100 pt-2">
                <div className="flex justify-between text-sm">
                  <div className="font-medium break-words">
                    {item.workName}
                    {projectFilter === 'all' && (
                      <span className="ml-2 text-xs text-gray-500">(
                        {projects.find((p) => p.id === item.projectId)?.name})
                      </span>
                    )}
                  </div>
                  <div className="text-gray-500 text-xs">План: {formatCurrency(item.total)}</div>
                </div>

                {tasksByItem[item.id] && (
                  <div className="mt-1 space-y-1">
                    {tasksByItem[item.id].map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between rounded-md bg-gray-50 px-2 py-1 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={task.status === 'done'}
                            onChange={() => alert('Изменение статусов будет реализовано позже')}
                          />
                          <span>{task.name}</span>
                          {task.stage && (
                            <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                              {task.stage}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={statusColor(task.status)}>{statusLabel(task.status)}</span>
                          {task.plannedCost !== undefined && (
                            <span className="text-gray-500">План: {formatCurrency(task.plannedCost)}</span>
                          )}
                          {task.actualCost !== undefined && (
                            <span className="text-gray-500">Факт: {formatCurrency(task.actualCost)}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        {groupedByCategory.length === 0 && (
          <p className="text-sm text-gray-500">Нет работ для выбранного проекта.</p>
        )}
      </div>
    </section>
  );
}

export default TasksPage;
