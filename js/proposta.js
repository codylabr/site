// Proposta de exemplo: mostra como o cliente vai ver a proposta.
// Nesta versão nada é enviado: aprovar e pedir ajuste só mudam a tela.
// Na versão de verdade, quem responde é o sistema (Administração > Propostas) e você é avisado por e-mail.
(() => {
  // Número do WhatsApp do Codyla, só números, com 55 e DDD. Ex.: "5521999999999".
  // Enquanto estiver vazio, os botões levam para a página de contato.
  const WHATSAPP = "";
  const EMPRESA = "Transportes Rio Norte";

  if (WHATSAPP) {
    const texto = encodeURIComponent("Olá, Flavio! Tenho uma dúvida sobre a proposta da " + EMPRESA + ".");
    document.querySelectorAll("[data-whatsapp]").forEach(link => {
      link.href = "https://wa.me/" + WHATSAPP + "?text=" + texto;
      link.target = "_blank";
      link.rel = "noopener";
    });
  }

  // Validade: 15 dias a partir de hoje (no exemplo)
  const validade = new Date();
  validade.setDate(validade.getDate() + 15);
  document.querySelectorAll("[data-validade]").forEach(el => (el.textContent = validade.toLocaleDateString("pt-BR")));

  const acoes = document.querySelector("[data-acoes]");
  const botaoAjustes = document.querySelector("[data-ajustes]");
  const form = document.getElementById("form-ajustes");
  const aviso = document.querySelector("[data-aviso]");
  const aprovada = document.querySelector("[data-aprovada]");

  botaoAjustes.addEventListener("click", () => {
    const abrir = form.hidden;
    form.hidden = !abrir;
    botaoAjustes.setAttribute("aria-expanded", abrir);
    if (abrir) form.ajuste.focus();
  });

  form.addEventListener("submit", evento => {
    evento.preventDefault();
    form.hidden = true;
    form.reset();
    botaoAjustes.setAttribute("aria-expanded", "false");
    aviso.textContent = "Pedido enviado. O Flavio responde com a proposta ajustada em até 1 dia útil.";
    aviso.hidden = false;
  });

  document.querySelector("[data-aprovar]").addEventListener("click", () => {
    acoes.hidden = true;
    form.hidden = true;
    aviso.hidden = true;
    aprovada.hidden = false;
    aprovada.focus();
    aprovada.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
