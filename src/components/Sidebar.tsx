import { TabKey } from '../types';

interface SidebarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const menu: { label: string; key: TabKey }[] = [
  { label: 'Дашборд', key: 'dashboard' },
  { label: 'Проекты', key: 'projects' },
  { label: 'Сметы', key: 'estimates' },
  { label: 'Аналитика', key: 'analytics' },
  { label: 'Материалы', key: 'materials' }
];

function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 text-sm font-semibold text-gray-700">Навигация</div>
      <nav className="space-y-1 px-2 pb-6">
        {menu.map((item) => {
          const isActive = item.key === activeTab;
          return (
            <div
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`cursor-pointer px-4 py-2 rounded-md text-sm transition ${
                isActive
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
