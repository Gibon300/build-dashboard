import { EstimateItem, Photo, PlanFactItem, Project, EstimateTask } from './types';

export const projects: Project[] = [
  {
    id: 1,
    name: 'Ремонт квартиры — Невский 24',
    address: 'г. Санкт-Петербург, Невский пр., 24',
    status: 'В работе',
    plannedCost: 2546000,
    actualCost: 2410000,
    budgetUsagePercent: 82,
    timeProgressPercent: 65,
    clientName: 'Алексей Смирнов',
    startDate: '2026-02-01',
    plannedEndDate: '2026-06-15',
    description: 'Комплексный ремонт 3?комнатной квартиры в сталинке. Фокус на шумоизоляции и скрытых коммуникациях.'
  },
  {
    id: 2,
    name: 'Офис open space — Восстания 10',
    address: 'г. Санкт-Петербург, ул. Восстания, 10',
    status: 'План',
    plannedCost: 3160000,
    actualCost: 0,
    budgetUsagePercent: 15,
    timeProgressPercent: 10,
    clientName: 'ООО “Диджитал Про”',
    startDate: '2026-03-10',
    plannedEndDate: '2026-08-30',
    description: 'Создание офиса на 60 рабочих мест, фокус на акустике и инженерии.'
  },
  {
    id: 3,
    name: 'Частный дом — Лахта',
    address: 'Ленинградская обл., Лахта, участок 15',
    status: 'Завершен',
    plannedCost: 4820000,
    actualCost: 4985000,
    budgetUsagePercent: 100,
    timeProgressPercent: 100,
    clientName: 'Ирина и Павел Кузнецовы',
    startDate: '2025-08-15',
    plannedEndDate: '2026-01-20',
    description: 'Двухэтажный дом с панорамным остеклением и тёплым контуром. Проект закрыт.'
  }
];

const tasks: EstimateTask[] = [
  { id: 101, estimateItemId: 1, name: 'Снос стены', stage: 'Этап 1', plannedQuantity: 10, plannedCost: 20000, done: false },
  { id: 102, estimateItemId: 1, name: 'Уборка мусора', stage: 'Этап 2', plannedQuantity: 1, plannedCost: 10000, done: false },
  { id: 103, estimateItemId: 2, name: 'Подготовка поверхности', stage: 'Этап 1', plannedQuantity: 30, plannedCost: 15000, done: false },
  { id: 104, estimateItemId: 2, name: 'Нанесение штукатурки', stage: 'Этап 2', plannedQuantity: 70, plannedCost: 50000, done: false },
  { id: 105, estimateItemId: 3, name: 'Разводка по комнатам', stage: 'Этап 1', plannedQuantity: 20, plannedCost: 19000, done: false },
  { id: 106, estimateItemId: 8, name: 'Сбор мусора', stage: 'Этап 2', plannedQuantity: 1, plannedCost: 15000, done: false },
  { id: 107, estimateItemId: 9, name: 'Трассы под интернет', stage: 'Этап 1', plannedQuantity: 40, plannedCost: 25000, done: false },
  { id: 108, estimateItemId: 15, name: 'Прокладка кабеля', stage: 'Этап 1', plannedCost: 90000, done: true, actualCost: 92000 },
  { id: 109, estimateItemId: 15, name: 'Подключение щита', stage: 'Этап 2', plannedCost: 120000, done: true, actualCost: 118000 },
  { id: 110, estimateItemId: 16, name: 'Монтаж подсистемы', stage: 'Этап 1', plannedCost: 250000, done: true, actualCost: 255000 },
  { id: 111, estimateItemId: 16, name: 'Отделка фасада', stage: 'Этап 2', plannedCost: 326000, done: false },
];

export const estimateItems: EstimateItem[] = [
  // Project 1
  {
    id: 1,
    projectId: 1,
    category: 'Демонтаж',
    workName: 'Снос перегородок',
    unit: 'м?',
    quantity: 25,
    unitPrice: 900,
    total: 22500,
    tasks: tasks.filter((t) => t.estimateItemId === 1)
  },
  {
    id: 2,
    projectId: 1,
    category: 'Черновые работы',
    workName: 'Стяжка пола',
    unit: 'м?',
    quantity: 70,
    unitPrice: 1200,
    total: 84000,
    tasks: tasks.filter((t) => t.estimateItemId === 2)
  },
  { id: 3, projectId: 1, category: 'Электрика', workName: 'Разводка по комнатам', unit: 'точка', quantity: 45, unitPrice: 950, total: 42750, tasks: tasks.filter((t) => t.estimateItemId === 3) },
  { id: 4, projectId: 1, category: 'Отделка', workName: 'Покраска стен', unit: 'м?', quantity: 180, unitPrice: 650, total: 117000 },
  { id: 5, projectId: 1, category: 'Отделка', workName: 'Укладка паркета', unit: 'м?', quantity: 70, unitPrice: 1850, total: 129500 },
  { id: 6, projectId: 1, category: 'Черновые работы', workName: 'Шумоизоляция', unit: 'м?', quantity: 60, unitPrice: 1100, total: 66000 },

  // Project 2
  { id: 7, projectId: 2, category: 'Демонтаж', workName: 'Демонтаж потолков', unit: 'м?', quantity: 120, unitPrice: 400, total: 48000 },
  { id: 8, projectId: 2, category: 'Черновые работы', workName: 'Подготовка стен под стекло', unit: 'м?', quantity: 200, unitPrice: 1050, total: 210000, tasks: tasks.filter((t) => t.estimateItemId === 8) },
  { id: 9, projectId: 2, category: 'Электрика', workName: 'Слаботочка и Wi?Fi', unit: 'точка', quantity: 90, unitPrice: 1150, total: 103500, tasks: tasks.filter((t) => t.estimateItemId === 9) },
  { id: 10, projectId: 2, category: 'Отделка', workName: 'Шумоизоляция потолка', unit: 'м?', quantity: 180, unitPrice: 1250, total: 225000 },
  { id: 11, projectId: 2, category: 'Отделка', workName: 'Покрытие пола ПВХ', unit: 'м?', quantity: 240, unitPrice: 950, total: 228000 },
  { id: 12, projectId: 2, category: 'Электрика', workName: 'Щитовая и автоматы', unit: 'компл.', quantity: 1, unitPrice: 185000, total: 185000 },

  // Project 3
  { id: 13, projectId: 3, category: 'Демонтаж', workName: 'Расчистка участка', unit: 'м?', quantity: 350, unitPrice: 180, total: 63000 },
  { id: 14, projectId: 3, category: 'Черновые работы', workName: 'Фундамент монолит', unit: 'м?', quantity: 60, unitPrice: 9500, total: 570000 },
  { id: 15, projectId: 3, category: 'Электрика', workName: 'Щит и ввод', unit: 'компл.', quantity: 1, unitPrice: 210000, total: 210000, tasks: tasks.filter((t) => t.estimateItemId === 15) },
  { id: 16, projectId: 3, category: 'Отделка', workName: 'Фасадные панели', unit: 'м?', quantity: 180, unitPrice: 3200, total: 576000, tasks: tasks.filter((t) => t.estimateItemId === 16) },
  { id: 17, projectId: 3, category: 'Отделка', workName: 'Лестница деревянная', unit: 'шт', quantity: 1, unitPrice: 185000, total: 185000 },
  { id: 18, projectId: 3, category: 'Черновые работы', workName: 'Кровля металлочерепица', unit: 'м?', quantity: 210, unitPrice: 2100, total: 441000 }
];

export const planFactItems: PlanFactItem[] = [
  // Project 1
  { id: 1, projectId: 1, category: 'Демонтаж', plannedCost: 95000, actualCost: 88000 },
  { id: 2, projectId: 1, category: 'Черновые работы', plannedCost: 410000, actualCost: 398000 },
  { id: 3, projectId: 1, category: 'Электрика', plannedCost: 210000, actualCost: 205000 },
  { id: 4, projectId: 1, category: 'Отделка', plannedCost: 520000, actualCost: 548000 },

  // Project 2
  { id: 5, projectId: 2, category: 'Демонтаж', plannedCost: 120000, actualCost: 0 },
  { id: 6, projectId: 2, category: 'Черновые работы', plannedCost: 620000, actualCost: 0 },
  { id: 7, projectId: 2, category: 'Электрика', plannedCost: 380000, actualCost: 0 },
  { id: 8, projectId: 2, category: 'Отделка', plannedCost: 650000, actualCost: 0 },

  // Project 3
  { id: 9, projectId: 3, category: 'Демонтаж', plannedCost: 120000, actualCost: 132000 },
  { id: 10, projectId: 3, category: 'Черновые работы', plannedCost: 1950000, actualCost: 2015000 },
  { id: 11, projectId: 3, category: 'Электрика', plannedCost: 280000, actualCost: 310000 },
  { id: 12, projectId: 3, category: 'Отделка', plannedCost: 980000, actualCost: 1025000 }
];

export const photos: Photo[] = [
  { id: 1, projectId: 1, url: 'https://picsum.photos/seed/p1/400/260' },
  { id: 2, projectId: 1, url: 'https://picsum.photos/seed/p2/400/260' },
  { id: 3, projectId: 1, url: 'https://picsum.photos/seed/p3/400/260' },
  { id: 4, projectId: 2, url: 'https://picsum.photos/seed/p4/400/260' },
  { id: 5, projectId: 2, url: 'https://picsum.photos/seed/p5/400/260' },
  { id: 6, projectId: 3, url: 'https://picsum.photos/seed/p6/400/260' },
  { id: 7, projectId: 3, url: 'https://picsum.photos/seed/p7/400/260' }
];
