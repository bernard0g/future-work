import { useEffect, useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import ProfessionalCard from "./components/ProfessionalCard";
import ProfessionalModal from "./components/ProfessionalModal";
import profissionaisBase from "./data/profissionais.json";

function App() {
  const [filters, setFilters] = useState({
    busca: "",
    area: "",
    cidade: "",
    tecnologia: ""
  });
  const [professionals, setProfessionals] = useState([]);
  const [selected, setSelected] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const loadRecomendacoesLocal = () => {
    const data = localStorage.getItem("recomendacoes");
    return data ? JSON.parse(data) : {};
  };

  const saveRecomendacoesLocal = (mapa) => {
    localStorage.setItem("recomendacoes", JSON.stringify(mapa));
  };

  const aplicarFiltros = () => {
    let resultado = [...profissionaisBase];

    const mapaRecs = loadRecomendacoesLocal();

    resultado = resultado.map((p) => ({
      ...p,
      recomendacoes: mapaRecs[p.id] || p.recomendacoes || 0
    }));

    if (filters.busca.trim()) {
      const termo = filters.busca.trim().toLowerCase();
      resultado = resultado.filter((p) => {
        return (
          p.nome.toLowerCase().includes(termo) ||
          p.cargo.toLowerCase().includes(termo) ||
          p.resumo.toLowerCase().includes(termo)
        );
      });
    }

    if (filters.area.trim()) {
      const termo = filters.area.trim().toLowerCase();
      resultado = resultado.filter((p) =>
        p.area.toLowerCase().includes(termo)
      );
    }

    if (filters.cidade.trim()) {
      const termo = filters.cidade.trim().toLowerCase();
      resultado = resultado.filter((p) =>
        p.localizacao.toLowerCase().includes(termo)
      );
    }

    if (filters.tecnologia.trim()) {
      const termo = filters.tecnologia.trim().toLowerCase();
      resultado = resultado.filter((p) =>
        p.habilidadesTecnicas.some((skill) =>
          skill.toLowerCase().includes(termo)
        )
      );
    }

    setProfessionals(resultado);
  };

  useEffect(() => {
    aplicarFiltros();
  }, []);

  const handleFiltersChange = (nextFilters) => {
    setFilters(nextFilters);
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();
    aplicarFiltros();
  };

  const handleRecommend = () => {
  if (!selected) return;

  const mapaRecs = loadRecomendacoesLocal();

  const novoValor = (mapaRecs[selected.id] || 0) + 1;
  mapaRecs[selected.id] = novoValor;

  saveRecomendacoesLocal(mapaRecs);

  const updated = { ...selected, recomendacoes: novoValor };
  setSelected(updated);

  setProfessionals((prev) =>
    prev.map((p) => (p.id === updated.id ? updated : p))
  );

  alert("Recomendado!");
};

  const handleSendMessage = (payload) => {
    console.log("Mensagem simulada:", payload);
    alert("Mensagem registrada localmente (simulação).");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 space-y-4">
        <form onSubmit={handleApplyFilters}>
          <Filters filters={filters} onChange={handleFiltersChange} />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-3 py-2 text-xs font-semibold rounded-md bg-sky-600 hover:bg-sky-500 text-white"
            >
              Aplicar filtros
            </button>
          </div>
        </form>

        {professionals.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Nenhum profissional encontrado com os filtros atuais.
          </p>
        ) : (
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {professionals.map((profissional) => (
              <ProfessionalCard
                key={profissional.id}
                profissional={profissional}
                onClick={() => setSelected(profissional)}
              />
            ))}
          </section>
        )}
      </main>

      {selected && (
        <ProfessionalModal
          profissional={selected}
          onClose={() => setSelected(null)}
          onRecommend={handleRecommend}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}

export default App;
