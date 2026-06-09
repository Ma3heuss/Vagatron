const tabela = document.getElementById("tabelaVeiculos");

const pesquisa = document.getElementById("pesquisa");
const filtroStatus = document.getElementById("status");
const filtroTipo = document.getElementById("tipo");

const modal = document.getElementById("modal");

const btnCadastrar = document.querySelector(".btn-cadastrar");
btnCadastrar.addEventListener("click", () => {

    editando = null;

    document.getElementById("veiculo").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("proprietario").value = "";

    modal.style.display = "flex";
});

const btnSalvar = document.getElementById("salvarVeiculo");
const btnFechar = document.getElementById("fecharModal");
btnFechar.addEventListener("click", () => {

    modal.style.display = "none";
});


let editando = null;

let veiculos = [
    {
        veiculo:"Toyota Corolla",
        placa:"ABC1D23",
        proprietario:"João da Silva",
        tipo:"Carro",
        status:"Estacionado"
    },
    {
        veiculo:"Honda HR-V",
        placa:"XYZ9A87",
        proprietario:"Maria Oliveira",
        tipo:"Carro",
        status:"Fora"
    },
    {
        veiculo:"Yamaha Fazer 250",
        placa:"RTY5E67",
        proprietario:"Lucas Ferreira",
        tipo:"Moto",
        status:"Estacionado"
    }
];

function renderizar(){

    tabela.innerHTML = "";

    const busca = pesquisa.value.toLowerCase();
    const status = filtroStatus.value;
    const tipo = filtroTipo.value;

    const filtrados = veiculos.filter(v => {

        const correspondeBusca =
            v.veiculo.toLowerCase().includes(busca) ||
            v.placa.toLowerCase().includes(busca) ||
            v.proprietario.toLowerCase().includes(busca);

        const correspondeStatus =
            status === "" ||
            v.status === status;

        const correspondeTipo =
            tipo === "" ||
            v.tipo === tipo;

        return (
            correspondeBusca &&
            correspondeStatus &&
            correspondeTipo
        );
    });

    filtrados.forEach((v,index)=>{

        tabela.innerHTML += `
        <tr>

            <td>${v.veiculo}</td>
            <td>${v.placa}</td>
            <td>${v.proprietario}</td>
            <td>${v.tipo}</td>

            <td>
                <span class="status ${
                    v.status === "Estacionado"
                    ? "verde"
                    : "vermelho"
                }">
                    ${v.status}
                </span>
            </td>

            <td>

                <button onclick="editar(${index})">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button onclick="deletar(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </td>

        </tr>
        `;
    });
}

btnCadastrar.addEventListener("click",()=>{

    editando = null;

    document.getElementById("veiculo").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("proprietario").value = "";

    modal.style.display = "flex";
});

btnFechar.addEventListener("click",()=>{

    modal.style.display = "none";
});

btnSalvar.addEventListener("click",()=>{

    const novo = {

        veiculo:
        document.getElementById("veiculo").value,

        placa:
        document.getElementById("placa").value,

        proprietario:
        document.getElementById("proprietario").value,

        tipo:
        document.getElementById("tipoModal").value,

        status:
        document.getElementById("statusModal").value
    };

    if(editando !== null){

        veiculos[editando] = novo;

    }else{

        veiculos.push(novo);
    }

    modal.style.display = "none";

    renderizar();
});

function deletar(index){

    if(confirm("Deseja excluir este veículo?")){

        veiculos.splice(index,1);

        renderizar();
    }
}

function editar(index){

    editando = index;

    const v = veiculos[index];

    document.getElementById("veiculo").value = v.veiculo;
    document.getElementById("placa").value = v.placa;
    document.getElementById("proprietario").value = v.proprietario;
    document.getElementById("tipoModal").value = v.tipo;
    document.getElementById("statusModal").value = v.status;

    modal.style.display = "flex";
}

pesquisa.addEventListener("input",renderizar);
filtroStatus.addEventListener("change",renderizar);
filtroTipo.addEventListener("change",renderizar);

renderizar();