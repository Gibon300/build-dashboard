import { Project } from '../types';

interface ProjectsPageProps {
  projects: Project[];
}

const formatCurrency = (value: number) =>
  value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

function ProjectsPage({ projects }: ProjectsPageProps) {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <div className="mb-4 border-b border-gray-200 pb-2">
        <h2 className="text-xl font-semibold text-gray-800">Все проекты</h2>
        <p className="text-sm text-gray-500">Демо-обзор: переходы пока не реализованы</p>
      </div>
      <div className="overflow-hidden border border-gray-100 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-600">
            <tr>
              <th className="px-3 py-2 text-left">Проект</th>
              <th className="px-3 py-2 text-left">Адрес</th>
              <th className="px-3 py-2 text-left">Статус</th>
              <th className="px-3 py-2 text-right">Смета, ?</th>
              <th className="px-3 py-2 text-right">Факт, ?</th>
              <th className="px-3 py-2 text-right">Перерасход, ?</th>
              <th className="px-3 py-2 text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const diff = project.actualCost - project.plannedCost;
              return (
                <tr key={project.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-800">{project.name}</td>
                  <td className="px-3 py-2 text-gray-700">{project.address}</td>
                  <td className="px-3 py-2 text-gray-700">{project.status}</td>
                  <td className="px-3 py-2 text-right text-gray-800">{formatCurrency(project.plannedCost)}</td>
                  <td className="px-3 py-2 text-right text-gray-800">{formatCurrency(project.actualCost)}</td>
                  <td className={`px-3 py-2 text-right font-semibold ${diff > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(diff)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => alert('В демо-версии переход не реализован, смотрите вкладку Дашборд')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Открыть
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProjectsPage;
