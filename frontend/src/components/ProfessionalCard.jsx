export default function ProfessionalCard({ profissional, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-sky-500/70 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl p-4 flex flex-col gap-3 transition"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-sm font-semibold text-slate-800 dark:text-slate-100">
          {profissional.nome
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h2 className="font-semibold group-hover:text-sky-600 dark:group-hover:text-sky-400 text-slate-900 dark:text-slate-100">
            {profissional.nome}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {profissional.cargo}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {profissional.localizacao}
          </p>
          
        </div>
        <div className="flex gap-3 mt-1">
          {profissional.github && (
          <a href={profissional.github} target="_blank" rel="noreferrer" className="text-[11px] text-sky-600 dark:text-sky-400 underline" onClick={(e) => e.stopPropagation()}> GitHub </a> )}

          {profissional.linkedin && (
          <a href={profissional.linkedin} target="_blank" rel="noreferrer" className="text-[11px] text-sky-600 dark:text-sky-400 underline" onClick={(e) => e.stopPropagation()}> LinkedIn </a> )}
        </div>
        
      </div>
      <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2">
        {profissional.resumo}
      </p>
      <div className="flex flex-wrap gap-1">
        {profissional.habilidadesTecnicas.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="text-[10px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sky-700 dark:text-sky-300"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400">
        <span>{profissional.area}</span>
        <span>{profissional.recomendacoes} recomendações</span>
      </div>
    </button>
  );
}
