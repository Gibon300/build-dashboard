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
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  if (selectedProjectId === null) {
    return (
      <section className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Работы и этапы</h1>
          <p className="mt-1 text-sm text-gray-600">
            Сначала выберите проект, затем вы сможете посмотреть список работ и подзадач по нему.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className="flex flex-col items-start rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm hover:border-blue-400 hover:shadow-md transition"
            >
              <div className="text-sm font-semibold text-gray-900">{project.name}</div>
              <div className="mt-1 text-xs text-gray-500 break-words">{project.address}</div>
              <div className="mt-2 text-xs text-gray-500">Статус: {project.status}</div>
              <div className="mt-1 text-xs text-gray-500">План: {project.plannedCost.toLocaleString('ru-RU')} ?</div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  const currentProject = projects.find((p) => p.id === selectedProjectId);

  const filteredItems = useMemo(
    () => estimateItems.filter((item) => item.projectId === selectedProjectId),
    [estimateItems, selectedProjectId]
  );

  const filteredTasks = useMemo(
    () => workTasks.filter((task) => task.projectId === selectedProjectId),
    [selectedProjectId, workTasks]
  );

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
          <h2 className="text-xl font-semibold text-gray-800">Работы и этапы — {currentProject?.name}</h2>
          <p className="text-sm text-gray-500">Категории работ и связанные подзадачи по выбранному проекту.</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button className="text-blue-600 hover:text-blue-700" onClick={() => setSelectedProjectId(null)}>
            Все проекты
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {groupedByCategory.map((group) => (
          <div key={group.category} className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">{group.category}</h3>

            {group.items.map((item) => (
              <div key={item.id} className="mb-3 border-t border-gray-100 pt-2">
                <div className="flex justify-between text-sm">
                  <div className="font-medium break-words">{item.workName}</div>
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
