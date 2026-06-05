const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if(email === "" || senha === ""){
        alert("Preencha todos os campos");
        return;
    }

    localStorage.setItem("token", "usuario_logado");

    window.location.href = "dashboard.html";

});