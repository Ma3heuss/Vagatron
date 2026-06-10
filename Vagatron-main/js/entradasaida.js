/* ============================================================
   VAGATRON — Entrada e Saída
   script.js — movimentações, filtros e paginação
   ============================================================ */

"use strict";

/* ---------- Dados ficticios ---------- */
const movimentacoes = [
  { tipo: "Entrada", placa: "ABC1D23", modelo: "Toyota Corolla", imagem: "imagens/carro-prata.png", data: "2026-06-10", hora: "08:12", emAndamento: true, permanenciaMin: null },
  { tipo: "Saída",   placa: "DEF5G78", modelo: "Honda Civic",     imagem: "imagens/carro-pretoos.png",   data: "2026-06-10", hora: "08:45", emAndamento: false, permanenciaMin: 215 },
  { tipo: "Entrada", placa: "GHI9J12", modelo: "Honda CB 500",    imagem: "imagens/moto.png",          data: "2026-06-10", hora: "09:03", emAndamento: true, permanenciaMin: null },
  { tipo: "Saída",   placa: "BCD8E01", modelo: "Renault Duster",  imagem: "imagens/carro-vermelho.png", data: "2026-06-08", hora: "19:10", emAndamento: false, permanenciaMin: 612 },
];

/* ---------- Estado ---------- */
const ITENS_POR_PAGINA = 5;
let paginaAtual = 1;
let registrosFiltrados = [...movimentacoes];

/* ---------- Elementos ---------- */
const tbody = document.getElementById("tabelaMovimentacoes");
const paginacaoEl = document.getElementById("paginacao");
const inputData = document.getElementById("filtroData");
const selectTipo = document.getElementById("filtroTipo");
const inputPesquisa = document.getElementById("pesquisa");
const btnFiltrar = document.getElementById("btnFiltrar");

/* ---------- Helpers ---------- */
function formatarData(iso) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function formatarPermanencia(min) {
  const horas = Math.floor(min / 60);
  const minutos = min % 60;
  if (horas === 0) return `${minutos}min`;
  return `${horas}h ${minutos.toString().padStart(2, "0")}min`;
}

/* ---------- Tabela ---------- */
function renderTabela() {
  tbody.innerHTML = "";

  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const pagina = registrosFiltrados.slice(inicio, inicio + ITENS_POR_PAGINA);

  if (pagina.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6" style="text-align:center;padding:40px;color:#6b7280;">Nenhuma movimentação encontrada.</td></tr>';
    renderPaginacao();
    return;
  }

  pagina.forEach((m) => {
    const tr = document.createElement("tr");

    const ehEntrada = m.tipo === "Entrada";
    const tipoClasse = ehEntrada ? "entrada" : "saida";
    const setaIcone = ehEntrada ? "imagens/seta-e-azul.png" : "imagens/seta-azul.png";

    const permanencia = m.emAndamento
      ? '<span class="badge-andamento">Em andamento</span>'
      : formatarPermanencia(m.permanenciaMin);

    tr.innerHTML = `
      <td>
        <span class="tipo ${tipoClasse}">
          <img src="${setaIcone}" alt="${m.tipo}">
          ${m.tipo}
        </span>
      </td>
      <td><span class="placa">${m.placa}</span></td>
      <td>${m.modelo}</td>
      <td>${formatarData(m.data)} ${m.hora}</td>
      <td><img class="miniatura" src="${m.imagem}" alt="Foto do veículo ${m.modelo}"></td>
      <td>${permanencia}</td>
    `;

    tbody.appendChild(tr);
  });

  renderPaginacao();
}

/* ---------- Paginação ---------- */
function renderPaginacao() {
  const total = registrosFiltrados.length;
  const totalPaginas = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));

  let info = "0 registros";
  if (total > 0) {
    const ini = (paginaAtual - 1) * ITENS_POR_PAGINA + 1;
    const fim = Math.min(paginaAtual * ITENS_POR_PAGINA, total);
    info = `Mostrando ${ini}–${fim} de ${total} registros`;
  }

  paginacaoEl.innerHTML = `
    <span class="paginacao-info">${info}</span>
    <div class="paginacao-botoes" id="paginacaoBotoes"></div>
  `;

  const botoes = document.getElementById("paginacaoBotoes");

  botoes.appendChild(criarBotao("‹", paginaAtual === 1, false, () => { paginaAtual--; renderTabela(); }));

  for (let i = 1; i <= totalPaginas; i++) {
    botoes.appendChild(criarBotao(i, false, i === paginaAtual, () => { paginaAtual = i; renderTabela(); }));
  }

  botoes.appendChild(criarBotao("›", paginaAtual === totalPaginas, false, () => { paginaAtual++; renderTabela(); }));
}

function criarBotao(texto, desabilitado, ativo, onClick) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = texto;
  btn.disabled = desabilitado;
  if (ativo) btn.classList.add("ativo");
  if (!desabilitado) btn.addEventListener("click", onClick);
  return btn;
}

/* ---------- Filtros ---------- */
function aplicarFiltros() {
  const data = inputData.value;
  const tipo = selectTipo.value;
  const placa = inputPesquisa.value.trim().toUpperCase();

  registrosFiltrados = movimentacoes.filter((m) => {
    const okData = !data || m.data === data;
    const okTipo = !tipo || m.tipo === tipo;
    const okPlaca = !placa || m.placa.toUpperCase().includes(placa);
    return okData && okTipo && okPlaca;
  });

  paginaAtual = 1;
  renderTabela();
}

btnFiltrar.addEventListener("click", aplicarFiltros);
inputPesquisa.addEventListener("keyup", (e) => { if (e.key === "Enter") aplicarFiltros(); });
selectTipo.addEventListener("change", aplicarFiltros);
inputData.addEventListener("change", aplicarFiltros);

/* ---------- Init ---------- */
renderTabela();
