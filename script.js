document.addEventListener('DOMContentLoaded', () => {
    // --- CALCULADORA DE RENDIMENTO ---
    const inputPatrimonio = document.getElementById('patrimonio');
    const inputTaxa = document.getElementById('taxa');

    const resDiario = document.getElementById('rendimento-diario');
    const resMensal = document.getElementById('rendimento-mensal');
    const resAnual = document.getElementById('rendimento-anual');

    const formatarMoedaUSD = (valor) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(valor);
    };

    function calcularRendimento() {
        const patrimonio = parseFloat(inputPatrimonio.value) || 0;
        const taxaAnual = (parseFloat(inputTaxa.value) || 0) / 100;

        const rendimentoAnual = patrimonio * taxaAnual;
        const rendimentoMensal = rendimentoAnual / 12;
        const rendimentoDiario = rendimentoAnual / 365;

        resAnual.textContent = formatarMoedaUSD(rendimentoAnual);
        resMensal.textContent = formatarMoedaUSD(rendimentoMensal);
        resDiario.textContent = formatarMoedaUSD(rendimentoDiario);
    }

    inputPatrimonio.addEventListener('input', calcularRendimento);
    inputTaxa.addEventListener('input', calcularRendimento);
    
    // Executa o cálculo inicial
    calcularRendimento();


    // --- SIMULAÇÃO DE MERCADO ---
    const btnSimular = document.getElementById('btn-simular');

    const ativos = [
        { idPreco: 'preco-ouro', idVar: 'var-ouro', base: 412500, moeda: 'BRL' },
        { idPreco: 'preco-diamante-azul', idVar: 'var-d-azul', base: 3900000, moeda: 'USD' },
        { idPreco: 'preco-prata', idVar: 'var-prata', base: 5120, moeda: 'BRL' },
        { idPreco: 'preco-diamante-rosa', idVar: 'var-d-rosa', base: 2100000, moeda: 'USD' }
    ];

    function formatarPreco(valor, moeda) {
        const locale = moeda === 'BRL' ? 'pt-BR' : 'en-US';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: moeda,
            maximumFractionDigits: 0
        }).format(valor);
    }

    btnSimular.addEventListener('click', () => {
        ativos.forEach(ativo => {
            // Variação percentual entre -3% e +3%
            const variacaoPercentual = (Math.random() * 6 - 3).toFixed(2);
            const fator = 1 + (variacaoPercentual / 100);
            const novoPreco = ativo.base * fator;

            const elemPreco = document.getElementById(ativo.idPreco);
            const elemVar = document.getElementById(ativo.idVar);

            // Atualiza preço
            elemPreco.textContent = formatarPreco(novoPreco, ativo.moeda);

            // Atualiza indicador de tendência
            const isPositive = variacaoPercentual >= 0;
            elemVar.textContent = `${isPositive ? '+' : ''}${variacaoPercentual}% hoje`;
            elemVar.className = `trend ${isPositive ? 'positive' : 'negative'}`;
        });
    });
});
