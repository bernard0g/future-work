import { useState } from "react";

export default function ProfessionalModal({
  profissional,
  onClose,
  onRecommend,
  onSendMessage
}) {
  const [mensagem, setMensagem] = useState("");
  const [remetente, setRemetente] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!mensagem.trim()) return;
    onSendMessage({
      profissional_id: profissional.id,
      remetente: remetente || "Anônimo",
      conteudo: mensagem
    });
    setMensagem("");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {profissional.nome}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {profissional.cargo} · {profissional.localizacao}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 text-sm"
          >
            Fechar
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <section>
            <h3 className="text-sm font-semibold mb-1 text-slate-900 dark:text-slate-100">
              Resumo
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {profissional.resumo}
            </p>
          </section>

          <section className="mt-2">
            <h3 className="text-sm font-semibold mb-1 text-slate-900 dark:text-slate-100">
              Links profissionais
            </h3>

            <div className="flex gap-3">
              {profissional.github && (
                <a
                  href={profissional.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-sky-600 dark:text-sky-400 underline"
                >
                  GitHub
                </a>
              )}

              {profissional.linkedin && (
                <a
                  href={profissional.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-sky-600 dark:text-sky-400 underline"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-1 text-slate-900 dark:text-slate-100">
                Habilidades técnicas
              </h3>
              <div className="flex flex-wrap gap-1">
                {profissional.habilidadesTecnicas.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-sky-700 dark:text-sky-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1 text-slate-900 dark:text-slate-100">
                Soft skills
              </h3>
              <div className="flex flex-wrap gap-1">
                {profissional.softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-emerald-700 dark:text-emerald-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-1 text-slate-900 dark:text-slate-100">
                Experiências
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {profissional.experiencias.map((exp, index) => (
                  <li key={`${exp.empresa}-${index}`}>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {exp.empresa}
                    </p>
                    <p>
                      {exp.cargo} · {exp.inicio} — {exp.fim}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {exp.descricao}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1 text-slate-900 dark:text-slate-100">
                Formação
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {profissional.formacao.map((f, index) => (
                  <li key={`${f.curso}-${index}`}>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {f.curso}
                    </p>
                    <p>{f.instituicao}</p>
                    <p className="text-slate-600 dark:text-slate-400">
                      Concluído em {f.ano}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-1 text-slate-900 dark:text-slate-100">
                Projetos
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {profissional.projetos.map((p, index) => (
                  <li key={`${p.titulo}-${index}`}>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {p.titulo}
                    </p>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-700 dark:text-sky-400 text-[11px] break-all"
                    >
                      {p.link}
                    </a>
                    <p className="text-slate-600 dark:text-slate-400">
                      {p.descricao}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1 text-slate-900 dark:text-slate-100">
                Idiomas e interesses
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-1">
                Idiomas:{" "}
                {profissional.idiomas
                  .map((i) => `${i.idioma} (${i.nivel})`)
                  .join(" · ")}
              </p>
              <div className="flex flex-wrap gap-1">
                {profissional.areaInteresses.map((topic) => (
                  <span
                    key={topic}
                    className="text-[11px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-violet-700 dark:text-violet-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="flex flex-wrap gap-3 pt-2 border-t border-slate-200 dark:border-slate-800 mt-2">
            <button
              type="button"
              onClick={onRecommend}
              className="px-3 py-2 bg-sky-600 hover:bg-sky-500 rounded-md text-xs font-semibold text-white"
            >
              Recomendar profissional
            </button>
          </section>

          <section className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-2">
            <h3 className="text-sm font-semibold mb-2 text-slate-900 dark:text-slate-100">
              Enviar mensagem
            </h3>
            <form onSubmit={handleSubmit} className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Seu nome (opcional)"
                value={remetente}
                onChange={(e) => setRemetente(e.target.value)}
                className="w-full rounded-md bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-sky-500"
              />
              <textarea
                placeholder="Escreva uma mensagem curta para este profissional..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full rounded-md bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-sky-500 min-h-[80px]"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-md text-xs font-semibold text-white"
              >
                Enviar mensagem
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
