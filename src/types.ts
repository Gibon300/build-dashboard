export interface Project {
  id: number;
  name: string;
  address: string;
  status: 'План' | 'В работе' | 'Завершен';
  plannedCost: number;
  actualCost: number;
  budgetUsagePercent: number; // 0–100
  timeProgressPercent: number; // 0–100
  clientName: string;
  startDate: string;
  plannedEndDate: string;
  description: string;
}

export interface EstimateItem {
  id: number;
  projectId: number;
  category: string; // 'Демонтаж', 'Электрика', ...
  workName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
  tasks?: EstimateTask[];
}

export interface PlanFactItem {
  id: number;
  projectId: number;
  category: string;
  plannedCost: number;
  actualCost: number;
}

export interface Photo {
  id: number;
  projectId: number;
  url: string;
}

export type TabKey = 'dashboard' | 'projects' | 'estimates' | 'analytics' | 'materials';

export interface EstimateTask {
  id: number;
  estimateItemId: number;
  name: string;
  description?: string;
  stage?: string;
  plannedQuantity?: number;
  plannedCost?: number;
  actualQuantity?: number;
  actualCost?: number;
  done?: boolean;
}
