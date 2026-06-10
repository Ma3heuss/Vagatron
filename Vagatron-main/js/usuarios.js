let usuarios = [];

function adicionarUsuario(){

    let matricula = document.getElementById("matricula").value;
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let cargo = document.getElementById("cargo").value;

    if(
        matricula == "" ||
        nome == "" ||
        email == "" ||
        cargo == ""
    ){
        alert("Preencha todos os campos!");
        return;
    }

    usuarios.push({
        matricula,
        nome,
        email,
        cargo
    });

    atualizarTabela();

    document.getElementById("matricula").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cargo").value = "";
}

function atualizarTabela(){

    let tabela = document.getElementById("tabelaUsuarios");

    tabela.innerHTML = "";

    for(let i = 0; i < usuarios.length; i++){

        tabela.innerHTML += `
        <tr>
            <td>${usuarios[i].matricula}</td>
            <td>${usuarios[i].nome}</td>
            <td>${usuarios[i].email}</td>
            <td>${usuarios[i].cargo}</td>
            <td>
                <button class="excluir" onclick="excluirUsuario(${i})">
                    Excluir
                </button>
            </td>
        </tr>
        `;
    }
}

function excluirUsuario(indice){

    usuarios.splice(indice,1);

    atualizarTabela();
}