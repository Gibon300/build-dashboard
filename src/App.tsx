import { useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProjectsOverview from './components/ProjectsOverview';
import ActiveProjects from './components/ActiveProjects';
import CurrentProject from './components/CurrentProject';
import EstimateEditor from './components/EstimateEditor';
import PlanVsFact from './components/PlanVsFact';
import { estimateItems, photos, planFactItems, projects } from './mockData';
import { EstimateItem, Photo, PlanFactItem, Project } from './types';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<number>(projects[0].id);

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
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <ProjectsOverview projects={projects} />
          <ActiveProjects
            projects={projects}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
          />
          {currentProject && (
            <>
              <div className="text-sm text-gray-500 mb-1">Текущий проект</div>
              <CurrentProject project={currentProject} />
            </>
          )}
          {currentProject && (
            <EstimateEditor project={currentProject} estimateItems={currentEstimateItems} />
          )}
          {currentProject && (
            <PlanVsFact planFactItems={currentPlanFactItems} photos={currentPhotos} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
