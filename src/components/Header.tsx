import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, SupportModal } from './icons';

function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <>
      <header className="w-full bg-gray-900 text-gray-100 px-6 py-4 flex items-center justify-between shadow relative z-20">
        <div className="font-semibold text-lg">Build &amp; Estimate</div>
        <div className="flex items-center gap-6 text-sm">
          <button
            onClick={() => alert('В демо-версии уведомления выключены')}
            className="relative text-sm text-gray-100 hover:text-white flex items-center gap-1"
          >
            <span>Уведомления</span>
            <span className="ml-1 inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-[10px] px-1.5 py-0.5">
              0
            </span>
          </button>

          <button
            onClick={() => setIsSupportOpen(true)}
            className="text-sm text-gray-100 hover:text-white"
          >
            Поддержка
          </button>

          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 text-sm text-gray-100 hover:text-white"
            >
              <span>Иван Петров</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg border border-gray-100 z-50">
                <button
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => alert('Страница профиля появится позже')}
                >
                  Профиль (скоро)
                </button>
                <button
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => alert('В демо-версии выход не нужен')}
                >
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {isSupportOpen && <SupportModal onClose={() => setIsSupportOpen(false)} />}
    </>
  );
}

export default Header;
