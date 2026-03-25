function Header() {
  return (
    <header className="w-full bg-gray-900 text-gray-100 px-6 py-4 flex items-center justify-between shadow">
      <div className="font-semibold text-lg">Build &amp; Estimate</div>
      <div className="flex items-center gap-6 text-sm">
        <span className="cursor-default">Уведомления</span>
        <span className="cursor-default">Поддержка</span>
        <span className="cursor-default">Иван Петров</span>
      </div>
    </header>
  );
}

export default Header;
