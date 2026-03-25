import ActiveProjects from '../components/ActiveProjects';
import CurrentProject from '../components/CurrentProject';
import EstimateEditor from '../components/EstimateEditor';
import PlanVsFact from '../components/PlanVsFact';
import ProjectsOverview from '../components/ProjectsOverview';
import { EstimateItem, Photo, PlanFactItem, Project } from '../types';
import { Dispatch, SetStateAction } from 'react';

interface DashboardPageProps {
  projects: Project[];
  estimateItems: EstimateItem[];
  planFactItems: PlanFactItem[];
  photos: Photo[];
  selectedProjectId: number;
  setSelectedProjectId: Dispatch<SetStateAction<number>>;
  currentProject: Project;
}

function DashboardPage({
  projects,
  estimateItems,
  planFactItems,
  photos,
  selectedProjectId,
  setSelectedProjectId,
  currentProject
}: DashboardPageProps) {
  return (
    <div className="space-y-8">
      <ProjectsOverview projects={projects} />
      <ActiveProjects
        projects={projects}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
      />
      <div>
        <div className="text-sm text-gray-500 mb-1">Текущий проект</div>
        <CurrentProject project={currentProject} />
      </div>
      <EstimateEditor project={currentProject} estimateItems={estimateItems} />
      <PlanVsFact planFactItems={planFactItems} photos={photos} />
    </div>
  );
}

export default DashboardPage;
