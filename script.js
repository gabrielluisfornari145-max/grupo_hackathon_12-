var botaoTomei = document.getElementById("botao-tomei");
var botaoInteresse = document.getElementById("botao-interesse");
var mensagem = document.getElementById("mensagem");

botaoTomei.addEventListener("click", function () {
  if (botaoTomei.classList.contains("confirmado")) {
    botaoTomei.classList.remove("confirmado");
    botaoTomei.textContent = "TOMEI O REMÉDIO";
  } else {
    botaoTomei.classList.add("confirmado");
    botaoTomei.textContent = "✔ REMÉDIO CONFIRMADO";
  }
});

botaoInteresse.addEventListener("click", function () {
  mensagem.textContent = "Obrigado pelo interesse! O Cuidar+ vai cuidar da sua família. 💜";
  botaoInteresse.textContent = "Interesse registrado ✔";
});
