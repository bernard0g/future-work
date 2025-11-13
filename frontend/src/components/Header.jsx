export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Future.WORK
            <span className="text-sky-600 dark:text-sky-400"> - Rede Profissional</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
            Conectando talentos, competências e oportunidades no novo mundo do trabalho.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Temas:
          </span>
          <button
            type="button"
            onClick={onToggleTheme}
            className="text-xs px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-sky-500"
          >
            {theme === "dark" ? "Modo claro" : "Modo escuro"}
          </button>
        </div>
      </div>
    </header>
  );
}
