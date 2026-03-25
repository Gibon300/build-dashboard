import { EstimateItem, Project } from '../types';

interface EstimatesPageProps {
  projects: Project[];
  estimates: EstimateItem[];
}

const formatCurrency = (value: number) =>
  value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

function EstimatesPage({ projects, estimates }: EstimatesPageProps) {
  const rows = projects.map((project) => {
    const items = estimates.filter((e) => e.projectId === project.id);
    const sum = items.reduce((acc, item) => acc + item.total, 0);
    return {
      id: project.id,
      name: project.name,
      itemsCount: items.length,
      total: sum
    };
  });

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <div className="mb-4 border-b border-gray-200 pb-2">
        <h2 className="text-xl font-semibold text-gray-800">Сметы</h2>
        <p className="text-sm text-gray-500">Демо-режим: откройте смету на вкладке Дашборд</p>
      </div>
      <div className="overflow-hidden border border-gray-100 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-600">
            <tr>
              <th className="px-3 py-2 text-left">Проект</th>
              <th className="px-3 py-2 text-right">Кол-во позиций</th>
              <th className="px-3 py-2 text-right">Сумма сметы, ?</th>
              <th className="px-3 py-2 text-left">Статус</th>
              <th className="px-3 py-2 text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-3 py-2 text-gray-800">{row.name}</td>
                <td className="px-3 py-2 text-right text-gray-700">{row.itemsCount}</td>
                <td className="px-3 py-2 text-right text-gray-800">{formatCurrency(row.total)}</td>
                <td className="px-3 py-2 text-gray-700">Черновик</td>
                <td className="px-3 py-2 text-right">
                  <button
                    onClick={() => alert('Смету можно посмотреть во вкладке Дашборд, это демо-версия')}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Открыть смету
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default EstimatesPage;
