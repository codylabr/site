// Página de preços: recalcula os planos e a implantação conforme o número de funcionários.
// Os valores por funcionário ficam no próprio HTML (data-por-funcionario), fáceis de trocar.
(() => {
  const DESCONTO_ANUAL = 0.15;   // plano anual: 15% menos
  const DESCONTO_PIX_ANUAL = 0.05; // anual pago à vista no Pix: mais 5%
  const DESCONTO_PIX_IMPLANTACAO = 0.10;
  const PARCELAS_IMPLANTACAO = 3;

  const campo = document.getElementById("funcionarios");
  const saida = document.getElementById("funcionarios-valor");
  if (!campo) return;

  const reais = v => "R$ " + Math.round(v).toLocaleString("pt-BR");
  const centavos = v => "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function atualizar() {
    const func = Number(campo.value);
    const anual = document.querySelector('input[name="periodo"]:checked').value === "anual";
    const textoFunc = func + " funcionários";
    saida.textContent = textoFunc;
    document.querySelectorAll("[data-func-texto]").forEach(el => (el.textContent = textoFunc));

    document.querySelectorAll(".plano").forEach(plano => {
      const porFunc = Number(plano.dataset.porFuncionario);
      const mensal = porFunc * func;
      const preco = plano.querySelector("[data-preco]");
      const pagamento = plano.querySelector("[data-pagamento]");
      if (!anual) {
        preco.textContent = reais(mensal);
        pagamento.textContent = centavos(porFunc) + " por funcionário, cobrado todo mês";
      } else {
        // Regra de apresentação: o valor cheio parcelado sem juros vem primeiro; o Pix aparece como desconto.
        const ano = mensal * 12 * (1 - DESCONTO_ANUAL);
        preco.textContent = reais(ano / 12);
        pagamento.textContent = reais(ano) + " no ano, em até 12x sem juros no cartão. À vista no Pix: "
          + reais(ano * (1 - DESCONTO_PIX_ANUAL)) + ".";
      }
    });

    document.querySelectorAll("#implantacao [data-por-funcionario]").forEach(item => {
      const total = Number(item.dataset.porFuncionario) * func + Number(item.dataset.fixo);
      item.querySelector("[data-impl]").innerHTML =
        "<b>" + reais(total) + "</b> em até " + PARCELAS_IMPLANTACAO + "x sem juros"
        + "<small>ou " + reais(total * (1 - DESCONTO_PIX_IMPLANTACAO)) + " à vista no Pix</small>";
    });
  }

  campo.addEventListener("input", atualizar);
  document.querySelectorAll('input[name="periodo"]').forEach(r => r.addEventListener("change", atualizar));
  atualizar();
})();
