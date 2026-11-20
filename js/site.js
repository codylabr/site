// Menu do celular
const botaoMenu = document.querySelector(".botao-menu");
const navegacao = document.querySelector(".navegacao");
if (botaoMenu && navegacao) {
  botaoMenu.addEventListener("click", () => {
    const aberto = navegacao.classList.toggle("aberta");
    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.textContent = aberto ? "Fechar" : "Menu";
  });
}

// Escala de exemplo (aparece onde existir #grade)
const grade = document.getElementById("grade");
if (grade) {
  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const equipe = [
    { nome: "Ana", folga: [1] },
    { nome: "Bruno", folga: [3] },
    { nome: "Carla", folga: [6] },
    { nome: "Diego", folga: [0] },
    { nome: "Elisa", folga: [4] }
  ];
  grade.insertAdjacentHTML("beforeend", "<span></span>" + dias.map(d => `<span class="dia">${d}</span>`).join(""));
  let ordem = 0;
  equipe.forEach(p => {
    let linha = `<span class="nome">${p.nome}</span>`;
    dias.forEach((d, i) => {
      linha += p.folga.includes(i)
        ? `<span class="celula folga" style="--o:${ordem++}" title="${p.nome}: folga ${d}">F</span>`
        : `<span class="celula" aria-hidden="true">T</span>`;
    });
    grade.insertAdjacentHTML("beforeend", linha);
  });
}

// Formulário: já marca o assunto quando o link vem com ?assunto=
const assunto = new URLSearchParams(location.search).get("assunto");
const campoAssunto = document.querySelector('select[name="assunto"]');
if (assunto && campoAssunto) {
  const opcao = [...campoAssunto.options].find(o => o.value === assunto);
  if (opcao) campoAssunto.value = assunto;
}

// Ano atual no rodapé
document.querySelectorAll(".ano").forEach(el => (el.textContent = new Date().getFullYear()));
