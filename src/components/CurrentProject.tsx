import { Project } from '../types';

interface Props {
  project: Project;
}

const formatCurrency = (value: number) =>
  value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

function CurrentProject({ project }: Props) {
  const diff = project.actualCost - project.plannedCost;
  const diffPercent = project.plannedCost === 0 ? 0 : (diff / project.plannedCost) * 100;
  const diffColor = diff > 0 ? 'text-red-600' : 'text-green-600';

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
        <div>
          <p className="text-sm text-gray-500">Текущий проект</p>
          <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
        </div>
        <div className="space-x-3">
          <button
            onClick={() => alert('В демо-версии функция недоступна, данные предзаполнены')}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-50"
          >
            Редактировать проект
          </button>
          <button
            onClick={() => alert('В демо-версии функция недоступна, данные предзаполнены')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            Добавить отчёт
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded p-3">
              <p className="text-xs text-gray-500">План</p>
              <p className="text-lg font-semibold text-gray-800">{formatCurrency(project.plannedCost)}</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="text-xs text-gray-500">Факт</p>
              <p className="text-lg font-semibold text-gray-800">{formatCurrency(project.actualCost)}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded p-3">
            <p className="text-xs text-gray-500">Разница</p>
            <p className={`text-lg font-semibold ${diffColor}`}>
              {formatCurrency(diff)} ({diffPercent.toFixed(1)}%)
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Использование бюджета</span>
                <span>{project.budgetUsagePercent}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-blue-600 rounded-full"
                  style={{ width: `${project.budgetUsagePercent}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Прогресс по времени</span>
                <span>{project.timeProgressPercent}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-green-600 rounded-full"
                  style={{ width: `${project.timeProgressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-500 text-xs">Клиент</p>
              <p className="font-semibold">{project.clientName}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Адрес</p>
              <p className="font-semibold">{project.address}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Дата начала</p>
              <p className="font-semibold">{project.startDate}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Плановая сдача</p>
              <p className="font-semibold">{project.plannedEndDate}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Описание</p>
            <p className="leading-relaxed">{project.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CurrentProject;
