import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Photo, PlanFactItem } from '../types';

interface Props {
  planFactItems: PlanFactItem[];
  photos: Photo[];
}

const formatCurrency = (value: number) =>
  value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

function PlanVsFact({ planFactItems, photos }: Props) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [notes, setNotes] = useState('');

  const totals = useMemo(() => {
    const planned = planFactItems.reduce((acc, item) => acc + item.plannedCost, 0);
    const actual = planFactItems.reduce((acc, item) => acc + item.actualCost, 0);
    const diff = actual - planned;
    const diffPercent = planned === 0 ? 0 : (diff / planned) * 100;
    return { planned, actual, diff, diffPercent };
  }, [planFactItems]);

  const diffColor = totals.diff > 0 ? 'text-red-600' : 'text-green-600';

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">План vs Факт</p>
          <h3 className="text-xl font-semibold text-gray-800">Финансовая аналитика</h3>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-xs text-gray-500">План по смете</p>
          <p className="text-lg font-semibold text-gray-800">{formatCurrency(totals.planned)}</p>
        </div>
        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-xs text-gray-500">Факт</p>
          <p className="text-lg font-semibold text-gray-800">{formatCurrency(totals.actual)}</p>
        </div>
        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-xs text-gray-500">Разница, ?</p>
          <p className={`text-lg font-semibold ${diffColor}`}>{formatCurrency(totals.diff)}</p>
        </div>
        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-xs text-gray-500">Разница, %</p>
          <p className={`text-lg font-semibold ${diffColor}`}>{totals.diffPercent.toFixed(1)}%</p>
        </div>
      </div>

      <div className="mt-6 h-72 bg-gray-50 rounded-lg p-4 border border-gray-100">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={planFactItems} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="plannedCost" name="План" fill="#2563eb" radius={[4, 4, 0, 0]} />
            <Bar dataKey="actualCost" name="Факт" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden border border-gray-100 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-600">
              <tr>
                <th className="px-3 py-2 text-left">Категория</th>
                <th className="px-3 py-2 text-right">План</th>
                <th className="px-3 py-2 text-right">Факт</th>
                <th className="px-3 py-2 text-right">Разница</th>
                <th className="px-3 py-2 text-right">%</th>
              </tr>
            </thead>
            <tbody>
              {planFactItems.map((item) => {
                const diff = item.actualCost - item.plannedCost;
                const percent = item.plannedCost === 0 ? 0 : (diff / item.plannedCost) * 100;
                const rowColor = diff > 0 ? 'text-red-600' : 'text-green-600';
                return (
                  <tr key={item.id} className="border-t border-gray-100">
                    <td className="px-3 py-2 text-gray-700">{item.category}</td>
                    <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(item.plannedCost)}</td>
                    <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(item.actualCost)}</td>
                    <td className={`px-3 py-2 text-right font-semibold ${rowColor}`}>{formatCurrency(diff)}</td>
                    <td className={`px-3 py-2 text-right font-semibold ${rowColor}`}>{percent.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-2">Галерея фото</p>
            <div className="flex flex-wrap gap-3">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="w-28 h-20 overflow-hidden rounded-md border border-gray-200 hover:ring-2 hover:ring-blue-300"
                >
                  <img src={photo.url} alt={`Фото ${photo.id}`} className="w-full h-full object-cover" />
                </button>
              ))}
              {photos.length === 0 && <p className="text-sm text-gray-500">Фото пока нет</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Заметки прораба</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Кратко фиксируйте ход работ"
            />
            <button
              onClick={() => alert('Сохранено (заглушка)')}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-gray-800">Фото #{selectedPhoto.id}</p>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                Закрыть
              </button>
            </div>
            <img src={selectedPhoto.url} alt="Просмотр фото" className="w-full object-contain max-h-[70vh]" />
          </div>
        </div>
      )}
    </section>
  );
}

export default PlanVsFact;
