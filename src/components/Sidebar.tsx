const menu = [
  { label: 'Дашборд', active: true },
  { label: 'Проекты', active: false },
  { label: 'Сметы', active: false },
  { label: 'Аналитика', active: false },
  { label: 'Материалы', active: false }
];

function Sidebar() {
  const handleClick = (item: (typeof menu)[number]) => {
    if (!item.active) {
      alert('Раздел будет доступен позже');
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 text-sm font-semibold text-gray-700">Навигация</div>
      <nav className="space-y-1 px-2 pb-6">
        {menu.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item)}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              item.active
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
