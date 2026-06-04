const senha = document.getElementById("senha");
const mostrarSenha = document.getElementById("mostrarSenha");

mostrarSenha.addEventListener("click", () => {
  if (senha.type === "password") {
    senha.type = "text";
    mostrarSenha.textContent = "🙈";
  } else {
    senha.type = "password";
    mostrarSenha.textContent = "👁";
  }
});