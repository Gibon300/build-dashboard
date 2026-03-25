function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

interface SupportModalProps {
  onClose: () => void;
}

function SupportModal({ onClose }: SupportModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Поддержка</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Это демо-версия сервиса управления стройкой и сметами.
          Если вы хотите оставить отзыв или обсудить внедрение под ваш бизнес, напишите:
        </p>
        <ul className="text-sm text-gray-800 space-y-1">
          <li>— Telegram: @build_estimate_demo</li>
          <li>— Email: demo@build-estimate.ru</li>
        </ul>
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

export { ChevronDownIcon, SupportModal };
