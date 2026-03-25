import { Dispatch, SetStateAction } from 'react';
import { Project } from '../types';

interface Props {
  projects: Project[];
  selectedProjectId: number;
  setSelectedProjectId: Dispatch<SetStateAction<number>>;
}

const formatCurrency = (value: number) =>
  value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

function ActiveProjects({ projects, selectedProjectId, setSelectedProjectId }: Props) {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Активные и новые проекты</h3>
          <p className="text-sm text-gray-500">Клик по карточке — переключение проекта</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const isActive = project.id === selectedProjectId;
          return (
            <button
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className={`text-left border rounded-lg p-4 transition shadow-sm hover:shadow-md bg-white ${
                isActive
                  ? 'border-blue-300 ring-2 ring-blue-200 bg-blue-50 border-l-4 border-l-blue-500'
                  : 'border-gray-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{project.status}</p>
                  <h4 className="text-base font-semibold text-gray-800">{project.name}</h4>
                  <p className="text-sm text-gray-500">{project.address}</p>
                </div>
                <div className="text-sm text-gray-500">ID: {project.id}</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded p-2">
                  <p className="text-gray-500">План</p>
                  <p className="font-semibold text-gray-800">{formatCurrency(project.plannedCost)}</p>
                </div>
                <div className="bg-gray-50 rounded p-2">
                  <p className="text-gray-500">Факт</p>
                  <p className="font-semibold text-gray-800">{formatCurrency(project.actualCost)}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default ActiveProjects;
