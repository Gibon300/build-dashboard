import { Project } from '../types';

interface Props {
  projects: Project[];
}

const formatCurrency = (value: number) => value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

function ProjectsOverview({ projects }: Props) {
  const totalPlanned = projects.reduce((acc, p) => acc + p.plannedCost, 0);
  const totalActual = projects.reduce((acc, p) => acc + p.actualCost, 0);
  const overrunPercent = totalPlanned === 0 ? 0 : ((totalActual - totalPlanned) / totalPlanned) * 100;
  const overrunColor = overrunPercent > 0 ? 'text-red-600' : 'text-green-600';

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-6 border-b border-gray-200 pb-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Обзор проектов</h2>
          <p className="text-sm text-gray-500">Сводка по планам и факту</p>
        </div>
        <button
          onClick={() => alert('В демо-версии функция недоступна, данные предзаполнены')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          Создать проект
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-500">Плановая стоимость</p>
          <p className="text-2xl font-semibold text-gray-800">{formatCurrency(totalPlanned)}</p>
        </div>
        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-500">Фактическая стоимость</p>
          <p className="text-2xl font-semibold text-gray-800">{formatCurrency(totalActual)}</p>
        </div>
        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-500">Перерасход</p>
          <p className={`text-2xl font-semibold ${overrunColor}`}>
            {overrunPercent.toFixed(1)}%
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProjectsOverview;
