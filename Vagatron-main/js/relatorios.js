document.addEventListener("DOMContentLoaded", () => {

    const movimentacoes = [
        {
            tipo: "Entrada",
            placa: "ABC1D23",
            veiculo: "Toyota Corolla",
            dataHora: "23/05/2025 08:42:15",
            entrada: "23/05/2025 08:42:15",
            saida: "-",
            permanencia: "-",
            status: "Em andamento"
        },
        {
            tipo: "Entrada",
            placa: "XYZ9A87",
            veiculo: "Honda HR-V",
            dataHora: "23/05/2025 08:35:02",
            entrada: "23/05/2025 08:35:02",
            saida: "23/05/2025 10:20:15",
            permanencia: "01h 45m",
            status: "Finalizado"
        },
        {
            tipo: "Saída",
            placa: "DEF4G56",
            veiculo: "Volkswagen Gol",
            dataHora: "23/05/2025 08:20:30",
            entrada: "23/05/2025 06:35:10",
            saida: "23/05/2025 08:20:30",
            permanencia: "01h 45m",
            status: "Finalizado"
        },
        {
            tipo: "Entrada",
            placa: "QWE2B34",
            veiculo: "Fiat Argo",
            dataHora: "23/05/2025 08:15:10",
            entrada: "23/05/2025 08:15:10",
            saida: "-",
            permanencia: "-",
            status: "Em andamento"
        },
        {
            tipo: "Saída",
            placa: "RTY5E67",
            veiculo: "Yamaha Fazer 250",
            dataHora: "23/05/2025 08:05:45",
            entrada: "23/05/2025 05:55:20",
            saida: "23/05/2025 08:05:45",
            permanencia: "02h 10m",
            status: "Finalizado"
        }
    ];

    const tabela = document.getElementById("tabelaRelatorios");

    function renderizarTabela(lista) {

        tabela.innerHTML = "";

        lista.forEach(item => {

            tabela.innerHTML += `
                <tr>
                    <td>${item.tipo}</td>
                    <td>${item.placa}</td>
                    <td>${item.veiculo}</td>
                    <td>${item.dataHora}</td>
                    <td>${item.entrada}</td>
                    <td>${item.saida}</td>
                    <td>${item.permanencia}</td>
                    <td>${item.status}</td>
                </tr>
            `;
        });

        atualizarCards(lista);
    }

    function atualizarCards(lista) {

        const entradas =
            lista.filter(i => i.tipo === "Entrada").length;

        const saidas =
            lista.filter(i => i.tipo === "Saída").length;

        const unicos =
            new Set(lista.map(i => i.placa)).size;

        let minutosTotais = 0;

        lista.forEach(item => {

            if (item.permanencia !== "-") {

                const match =
                    item.permanencia.match(/(\d+)h\s*(\d+)m/);

                if (match) {

                    minutosTotais +=
                        parseInt(match[1]) * 60 +
                        parseInt(match[2]);
                }
            }
        });

        const horas =
            Math.floor(minutosTotais / 60);

        const minutos =
            minutosTotais % 60;

        document.getElementById("totalEntradas").textContent =
            entradas;

        document.getElementById("totalSaidas").textContent =
            saidas;

        document.getElementById("veiculosUnicos").textContent =
            unicos;

        document.getElementById("tempoTotal").textContent =
            `${horas}h ${String(minutos).padStart(2, "0")}m`;
    }

    renderizarTabela(movimentacoes);

    // FILTROS

    document
        .getElementById("btnFiltrar")
        .addEventListener("click", () => {

            const placa =
                document
                    .getElementById("placa")
                    .value
                    .toLowerCase();

            const status =
                document
                    .getElementById("status")
                    .value;

            const resultado =
                movimentacoes.filter(item => {

                    const filtroPlaca =
                        item.placa
                            .toLowerCase()
                            .includes(placa);

                    const filtroStatus =
                        status === "" ||
                        item.status === status;

                    return (
                        filtroPlaca &&
                        filtroStatus
                    );
                });

            renderizarTabela(resultado);
        });

    // LIMPAR

    document
        .getElementById("btnLimpar")
        .addEventListener("click", () => {

            document.getElementById("placa").value = "";
            document.getElementById("status").value = "";
            document.getElementById("dataInicial").value = "";
            document.getElementById("dataFinal").value = "";

            renderizarTabela(movimentacoes);
        });

    // EXPORTAR CSV

    const btnExportar =
        document.querySelector(".btn-exportar");

    if (btnExportar) {

        btnExportar.addEventListener("click", () => {

            let csv =
                "Tipo,Placa,Veiculo,DataHora,Entrada,Saida,Permanencia,Status\n";

            movimentacoes.forEach(item => {

                csv +=
                    `${item.tipo},` +
                    `${item.placa},` +
                    `${item.veiculo},` +
                    `${item.dataHora},` +
                    `${item.entrada},` +
                    `${item.saida},` +
                    `${item.permanencia},` +
                    `${item.status}\n`;
            });

            const blob =
                new Blob([csv], {
                    type: "text/csv;charset=utf-8;"
                });

            const link =
                document.createElement("a");

            link.href =
                URL.createObjectURL(blob);

            link.download =
                "relatorio.csv";

            link.click();
        });
    }

});