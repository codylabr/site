// Página de preços: recalcula os planos e a implantação conforme o número de funcionários.
// Os valores por funcionário ficam no próprio HTML (data-por-funcionario), fáceis de trocar.
//
// Regras de apresentação:
// - Totais sem centavos (R$ 360); o "R$" pequeno ao lado do número.
// - Parcelas e preço por funcionário com centavos (precisam bater com o total).
// - Cartão e Pix lado a lado: o cartão é o valor cheio parcelado; o Pix mostra quanto economiza.
(() => {
  const ANUAL_CARTAO = 0.10;   // anual no cartão (até 12x): 10% menos que 12 meses do mensal
  const ANUAL_PIX = 0.15;      // anual à vista no Pix: 15% menos
  const PARCELAS_ANUAL = 12;
  const PIX_IMPLANTACAO = 0.10;
  const PARCELAS_IMPLANTACAO = 3;

  const campo = document.getElementById("funcionarios");
  const saida = document.getElementById("funcionarios-valor");
  if (!campo) return;

  const inteiro = v => Math.round(v).toLocaleString("pt-BR");
  const reais = v => "R$ " + inteiro(v);
  const centavos = v => "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const grande = v => '<span class="moeda">R$</span>' + inteiro(v);

  /** Duas caixinhas: cartão (valor cheio parcelado) e Pix (à vista, com a economia). */
  function opcoes(cartao, parcelas, pix) {
    const parcela = Math.round(cartao / parcelas * 100) / 100;
    return '<span class="opcoes-pagamento">'
      + '<span class="opcao"><small>Cartão</small><b>' + reais(cartao) + '</b>'
      + parcelas + "x de " + centavos(parcela) + " sem juros</span>"
      + '<span class="opcao opcao-pix"><small>Pix à vista</small><b>' + reais(pix) + '</b>'
      + "Economize " + reais(cartao - pix) + "</span>"
      + "</span>";
  }

  function atualizar() {
    const func = Number(campo.value);
    const anual = document.querySelector('input[name="periodo"]:checked').value === "anual";
    const textoFunc = func + " funcionários";
    saida.textContent = textoFunc;
    document.querySelectorAll("[data-func-texto]").forEach(el => (el.textContent = textoFunc));

    document.querySelectorAll(".plano").forEach(plano => {
      const porFunc = Number(plano.dataset.porFuncionario);
      const piso = Number(plano.dataset.minimo || 0); // valor mínimo do plano por mês
      const minimo = porFunc * func < piso;
      const mensal = Math.max(porFunc * func, piso);
      const normal = plano.querySelector("[data-normal-texto]");
      if (normal) normal.innerHTML = 'Preço normal: <s>' + centavos(Number(plano.dataset.normal)) + '</s> por funcionário';
      const preco = plano.querySelector("[data-preco]");
      const pagamento = plano.querySelector("[data-pagamento]");
      if (!anual) {
        preco.innerHTML = grande(mensal);
        pagamento.innerHTML = (minimo
          ? "Valor mínimo do plano, para equipes de até " + Math.floor(piso / porFunc) + " funcionários"
          : centavos(porFunc) + " por funcionário, preço de fundador")
          + '<span class="plano-forma">Todo mês no Pix, no boleto ou no cartão</span>';
      } else {
        const cartao = mensal * 12 * (1 - ANUAL_CARTAO);
        const pix = mensal * 12 * (1 - ANUAL_PIX);
        preco.innerHTML = grande(cartao / 12);
        pagamento.innerHTML = "Plano de 12 meses:" + opcoes(cartao, PARCELAS_ANUAL, pix);
      }
    });

    document.querySelectorAll("#implantacao [data-por-funcionario]").forEach(item => {
      const total = Number(item.dataset.porFuncionario) * func + Number(item.dataset.fixo);
      item.querySelector("[data-impl]").innerHTML =
        opcoes(total, PARCELAS_IMPLANTACAO, total * (1 - PIX_IMPLANTACAO));
    });
  }

  campo.addEventListener("input", atualizar);
  document.querySelectorAll('input[name="periodo"]').forEach(r => r.addEventListener("change", atualizar));
  atualizar();
})();
