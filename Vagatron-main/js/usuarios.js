let usuarios = [];

function adicionarUsuario(){

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let cargo = document.getElementById("cargo").value;

    usuarios.push({
        nome,
        email,
        cargo
    });

    atualizarTabela();
}

function atualizarTabela(){

    let tabela = document.getElementById("tabelaUsuarios");

    tabela.innerHTML = "";

    for(let i = 0; i < usuarios.length; i++){

        tabela.innerHTML += `
        <tr>
            <td>${usuarios[i].nome}</td>
            <td>${usuarios[i].email}</td>
            <td>${usuarios[i].cargo}</td>
            <td>
                <button onclick="excluirUsuario(${i})">
                    Excluir
                </button>
            </td>
        </tr>
        `;
    }
}

function excluirUsuario(i){

    usuarios.splice(i,1);

    atualizarTabela();
}