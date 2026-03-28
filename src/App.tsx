import { useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { estimateItems, photos, planFactItems, projects, workTasks } from './mockData';
import { EstimateItem, Photo, PlanFactItem, Project, TabKey } from './types';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import EstimatesPage from './pages/EstimatesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import MaterialsPage from './pages/MaterialsPage';
import TasksPage from './pages/TasksPage';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<number>(projects[0].id);
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');

  const currentProject = useMemo<Project | undefined>(
    () => projects.find((p) => p.id === selectedProjectId),
    [selectedProjectId]
  );

  const currentEstimateItems = useMemo<EstimateItem[]>(
    () => estimateItems.filter((item) => item.projectId === selectedProjectId),
    [selectedProjectId]
  );

  const currentPlanFactItems = useMemo<PlanFactItem[]>(
    () => planFactItems.filter((item) => item.projectId === selectedProjectId),
    [selectedProjectId]
  );

  const currentPhotos = useMemo<Photo[]>(
    () => photos.filter((p) => p.projectId === selectedProjectId),
    [selectedProjectId]
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          {activeTab === 'dashboard' && currentProject && (
            <DashboardPage
              projects={projects}
              estimateItems={currentEstimateItems}
              planFactItems={currentPlanFactItems}
              photos={currentPhotos}
              selectedProjectId={selectedProjectId}
              setSelectedProjectId={setSelectedProjectId}
              currentProject={currentProject}
            />
          )}
          {activeTab === 'projects' && <ProjectsPage projects={projects} />}
          {activeTab === 'estimates' && (
            <EstimatesPage projects={projects} estimates={estimateItems} />
          )}
          {activeTab === 'tasks' && (
            <TasksPage projects={projects} estimateItems={estimateItems} workTasks={workTasks} />
          )}
          {activeTab === 'analytics' && (
            <AnalyticsPage projects={projects} planFact={planFactItems} />
          )}
          {activeTab === 'materials' && <MaterialsPage />}
        </main>
      </div>
    </div>
  );
}

export default App;
