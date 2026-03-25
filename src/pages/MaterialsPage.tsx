interface MaterialCategory {
  name: string;
  items: string[];
}

const materialCategories: MaterialCategory[] = [
  {
    name: 'Демонтаж',
    items: ['Демонтаж стен', 'Вынос мусора']
  },
  {
    name: 'Черновые работы',
    items: ['Штукатурка стен', 'Стяжка пола', 'Гидроизоляция санузла']
  },
  {
    name: 'Электрика',
    items: ['Разводка по комнатам', 'Щит и автоматы', 'Слаботочка и интернет']
  },
  {
    name: 'Отделка',
    items: ['Покраска стен', 'Укладка паркета', 'Потолки ГКЛ']
  }
];

function MaterialsPage() {
  return (
    <section className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="mb-2 border-b border-gray-200 pb-2">
        <h2 className="text-xl font-semibold text-gray-800">Материалы и работы</h2>
        <p className="text-sm text-gray-500">
          В будущем здесь будет база работ и материалов, на которой ИИ будет строить сметы.
        </p>
      </div>
      <div className="space-y-3">
        {materialCategories.map((cat) => (
          <div key={cat.name} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
            <h3 className="text-md font-semibold text-gray-800 mb-2">{cat.name}</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              {cat.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MaterialsPage;
