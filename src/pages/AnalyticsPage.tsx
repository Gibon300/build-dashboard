import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PlanFactItem, Project } from '../types';

interface AnalyticsPageProps {
  projects: Project[];
  planFact: PlanFactItem[];
}

const formatCurrency = (value: number) =>
  value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

const formatMonth = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' });
};

function AnalyticsPage({ projects, planFact }: AnalyticsPageProps) {
  const monthlyData = useMemo(() => {
    const map = new Map<string, { month: string; planned: number; actual: number }>();
    projects.forEach((p) => {
      const month = formatMonth(p.startDate);
      const entry = map.get(month) || { month, planned: 0, actual: 0 };
      entry.planned += p.plannedCost;
      entry.actual += p.actualCost;
      map.set(month, entry);
    });
    return Array.from(map.values());
  }, [projects]);

  const categoryRows = useMemo(() => {
    const map = new Map<string, { category: string; planned: number; actual: number }>();
    planFact.forEach((item) => {
      const entry = map.get(item.category) || { category: item.category, planned: 0, actual: 0 };
      entry.planned += item.plannedCost;
      entry.actual += item.actualCost;
      map.set(item.category, entry);
    });
    return Array.from(map.values());
  }, [planFact]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4 border-b border-gray-200 pb-2">
          <h2 className="text-xl font-semibold text-gray-800">Аналитика (демо, данные тестовые)</h2>
          <p className="text-sm text-gray-500">Быстрый срез по месяцам и перерасходам</p>
        </div>
        <div className="h-72 bg-gray-50 rounded-lg p-4 border border-gray-100">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="planned" name="План" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" name="Факт" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4 border-b border-gray-200 pb-2">
          <h3 className="text-lg font-semibold text-gray-800">Топ категорий по перерасходу</h3>
          <p className="text-sm text-gray-500">Сравнение план/факт по категориям</p>
        </div>
        <div className="overflow-hidden border border-gray-100 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-600">
              <tr>
                <th className="px-3 py-2 text-left">Категория</th>
                <th className="px-3 py-2 text-right">План</th>
                <th className="px-3 py-2 text-right">Факт</th>
                <th className="px-3 py-2 text-right">Перерасход</th>
                <th className="px-3 py-2 text-right">%</th>
              </tr>
            </thead>
            <tbody>
              {categoryRows.map((row) => {
                const diff = row.actual - row.planned;
                const percent = row.planned === 0 ? 0 : (diff / row.planned) * 100;
                const isOver = diff > 0;
                const rowBg = isOver ? 'bg-red-50' : 'bg-green-50';
                const rowColor = isOver ? 'text-red-600' : 'text-green-600';
                return (
                  <tr key={row.category} className={`border-t border-gray-100 ${rowBg}`}>
                    <td className="px-3 py-2 text-gray-800">{row.category}</td>
                    <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(row.planned)}</td>
                    <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(row.actual)}</td>
                    <td className={`px-3 py-2 text-right font-semibold ${rowColor}`}>
                      {formatCurrency(diff)}
                    </td>
                    <td className={`px-3 py-2 text-right font-semibold ${rowColor}`}>
                      {percent.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
