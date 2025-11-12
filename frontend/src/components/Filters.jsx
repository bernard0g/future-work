export default function Filters({ filters, onChange }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({
      ...filters,
      [name]: value
    });
  };

  return (
    <section className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-3 md:items-end">
      <div className="flex-1">
        <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
          Busca geral
        </label>
        <input
          name="busca"
          type="text"
          placeholder="Nome, cargo ou palavra-chave..."
          value={filters.busca}
          onChange={handleChange}
          className="w-full rounded-md bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="flex-1">
        <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
          Área
        </label>
        <input
          name="area"
          type="text"
          placeholder="Desenvolvimento, Design, Dados..."
          value={filters.area}
          onChange={handleChange}
          className="w-full rounded-md bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="flex-1">
        <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
          Cidade
        </label>
        <input
          name="cidade"
          type="text"
          placeholder="São Paulo, Rio de Janeiro..."
          value={filters.cidade}
          onChange={handleChange}
          className="w-full rounded-md bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="flex-1">
        <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
          Tecnologia
        </label>
        <input
          name="tecnologia"
          type="text"
          placeholder="React, Python, Figma..."
          value={filters.tecnologia}
          onChange={handleChange}
          className="w-full rounded-md bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
    </section>
  );
}
