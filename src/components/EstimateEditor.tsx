import { useMemo, useState } from 'react';
import { EstimateItem, Project } from '../types';

interface Props {
  project: Project;
  estimateItems: EstimateItem[];
}

const formatCurrency = (value: number) =>
  value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

function EstimateEditor({ project, estimateItems }: Props) {
  const [objectType, setObjectType] = useState('Квартира');
  const [area, setArea] = useState('70');
  const [region, setRegion] = useState('Санкт-Петербург');
  const [finishLevel, setFinishLevel] = useState('Стандарт');
  const [comment, setComment] = useState('');

  const subtotal = useMemo(() => estimateItems.reduce((acc, item) => acc + item.total, 0), [estimateItems]);
  const margin = subtotal * 0.2;
  const clientPrice = subtotal + margin;

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">Смета</p>
          <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
        </div>
        <div className="text-sm text-gray-500">Тип: {objectType}</div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Тип объекта</label>
            <select
              value={objectType}
              onChange={(e) => setObjectType(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Квартира</option>
              <option>Дом</option>
              <option>Коммерция</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Площадь, м?</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Регион</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Санкт-Петербург</option>
              <option>Москва</option>
              <option>Ленинградская область</option>
            </select>
          </div>

          <div>
            <p className="block text-sm text-gray-600 mb-2">Уровень отделки</p>
            <div className="space-y-2">
              {['Эконом', 'Стандарт', 'Премиум'].map((value) => (
                <label key={value} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="finish"
                    value={value}
                    checked={finishLevel === value}
                    onChange={(e) => setFinishLevel(e.target.value)}
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Комментарий</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Особые пожелания клиента"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => alert('Пересчёт позже, сейчас заглушка')}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50"
            >
              Пересчитать
            </button>
            <button
              onClick={() => alert('ИИ пока заглушка, смета уже показана ниже')}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
            >
              Сгенерировать смету с ИИ
            </button>
          </div>
        </div>

        <div className="overflow-hidden border border-gray-100 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-600">
              <tr>
                <th className="px-3 py-2 text-left">Раздел</th>
                <th className="px-3 py-2 text-left">Работа</th>
                <th className="px-3 py-2">Ед.</th>
                <th className="px-3 py-2">Кол-во</th>
                <th className="px-3 py-2">Цена</th>
                <th className="px-3 py-2">Сумма</th>
              </tr>
            </thead>
            <tbody>
              {estimateItems.map((item) => (
                <tr key={item.id} className="border-t border-gray-100">
                  <td className="px-3 py-2 text-gray-700">{item.category}</td>
                  <td className="px-3 py-2 text-gray-700">{item.workName}</td>
                  <td className="px-3 py-2 text-center text-gray-600">{item.unit}</td>
                  <td className="px-3 py-2 text-center text-gray-600">{item.quantity}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(item.unitPrice)}</td>
                  <td className="px-3 py-2 text-right font-semibold text-gray-800">{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-gray-50 border-t border-gray-100 p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Итого</span>
              <span className="font-semibold text-gray-800">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Маржа (20%)</span>
              <span className="font-semibold text-gray-800">{formatCurrency(margin)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-gray-700">Цена для клиента</span>
              <span className="font-bold text-gray-900">{formatCurrency(clientPrice)}</span>
            </div>
            <button
              onClick={() => alert('Экспорт появится позже')}
              className="mt-2 w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-50"
            >
              Экспорт в PDF/Excel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EstimateEditor;
