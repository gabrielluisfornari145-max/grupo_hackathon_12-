var EMAIL_DA_EQUIPE = "gabrielluisfornari145@gmail.com"

var graficos = {
  frequencia: [
    ["Todos os dias", 40, "#7157c7"],
    ["Algumas vezes na semana", 20, "#4e8df5"],
    ["Uma vez por semana ou menos", 26.7, "#2b7d52"],
    ["Quase nunca, moram muito longe", 13.3, "#4f5f7a"]
  ],
  forma: [
    ["Mensagens ou chamadas pelo WhatsApp", 46.7, "#7157c7"],
    ["Ligações normais de telefone", 20, "#4e8df5"],
    ["Ajuda de vizinhos que olham a casa", 20, "#2b7d52"],
    ["Todo dia junto", 6.7, "#4f5f7a"],
    ["Mora com o idoso", 6.7, "#9cc3fb"]
  ]
}
var destaquesGraficos = {
  frequencia: "60% dos familiares veem o idoso no máximo algumas vezes por semana. O Cuidar+ ajuda a estar presente nos outros dias.",
  forma: "Quase metade acompanha só por mensagens de WhatsApp, sem nenhuma organização de remédios e consultas."
}
var graficoAtual = "frequencia"

function mostrarFatia(nome, valor) {
  document.getElementById("roscaNumero").textContent = String(valor).replace(".", ",") + "%"
  document.getElementById("roscaTexto").textContent = nome
}
function destacarFatia(posicao) {
  var fatias = document.querySelectorAll("#rosca circle.fatia")
  var itensLegenda = document.querySelectorAll("#legenda button")
  for (var i = 0; i < fatias.length; i++) {
    fatias[i].classList.remove("forte")
    itensLegenda[i].classList.remove("forte")
  }
  fatias[posicao].classList.add("forte")
  itensLegenda[posicao].classList.add("forte")
  mostrarFatia(graficos[graficoAtual][posicao][0], graficos[graficoAtual][posicao][1])
}
function desenharGrafico(nomeGrafico) {
  graficoAtual = nomeGrafico
  var dados = graficos[nomeGrafico]
  var rosca = document.getElementById("rosca")
  var legenda = document.getElementById("legenda")
  rosca.innerHTML = ""
  legenda.innerHTML = ""
  var acumulado = 0
  for (var i = 0; i < dados.length; i++) {
    var circulo = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circulo.setAttribute("class", "fatia")
    circulo.setAttribute("cx", "21")
    circulo.setAttribute("cy", "21")
    circulo.setAttribute("r", "15.9155")
    circulo.setAttribute("stroke", dados[i][2])
    circulo.setAttribute("stroke-dasharray", "0 100")
    circulo.setAttribute("stroke-dashoffset", String(25 - acumulado))
    circulo.dataset.tamanho = dados[i][1]
    circulo.dataset.posicao = i
    circulo.addEventListener("mouseenter", function () { destacarFatia(Number(this.dataset.posicao)) })
    circulo.addEventListener("click", function () { destacarFatia(Number(this.dataset.posicao)) })
    rosca.appendChild(circulo)
    acumulado = acumulado + dados[i][1]
    var botaoLegenda = document.createElement("button")
    botaoLegenda.dataset.posicao = i
    botaoLegenda.innerHTML = "<span style='background:" + dados[i][2] + "'></span>" + dados[i][0] + " <b>" + String(dados[i][1]).replace(".", ",") + "%</b>"
    botaoLegenda.addEventListener("click", function () { destacarFatia(Number(this.dataset.posicao)) })
    botaoLegenda.addEventListener("mouseenter", function () { destacarFatia(Number(this.dataset.posicao)) })
    legenda.appendChild(botaoLegenda)
  }
  setTimeout(function () {
    var todas = document.querySelectorAll("#rosca circle.fatia")
    for (var j = 0; j < todas.length; j++) {
      var tamanho = Number(todas[j].dataset.tamanho)
      todas[j].setAttribute("stroke-dasharray", (tamanho - 0.4) + " " + (100 - tamanho + 0.4))
    }
  }, 80)
  destacarFatia(0)
  document.getElementById("destaqueGrafico").textContent = destaquesGraficos[nomeGrafico]
}
var botoesGrafico = document.querySelectorAll(".aba-grafico")
for (var i = 0; i < botoesGrafico.length; i++) {
  botoesGrafico[i].addEventListener("click", function () {
    for (var j = 0; j < botoesGrafico.length; j++) {
      botoesGrafico[j].classList.remove("ativa")
    }
    this.classList.add("ativa")
    desenharGrafico(this.dataset.grafico)
  })
}
desenharGrafico("frequencia")

var botoesAbas = document.querySelectorAll(".aba")
for (var i = 0; i < botoesAbas.length; i++) {
  botoesAbas[i].addEventListener("click", function () {
    var todosPaineis = document.querySelectorAll(".painel")
    for (var j = 0; j < botoesAbas.length; j++) {
      botoesAbas[j].classList.remove("ativa")
      todosPaineis[j].classList.remove("ativo")
    }
    this.classList.add("ativa")
    document.getElementById(this.dataset.painel).classList.add("ativo")
  })
}

var listaIdoso = document.getElementById("listaIdoso")
var avisoFamilia = document.getElementById("avisoFamilia")
var contadorPendentes = 0

function adicionarLembrete() {
  var titulo = document.getElementById("tituloLembrete").value.trim()
  var hora = document.getElementById("horaLembrete").value
  var tipo = document.getElementById("tipoLembrete").value
  if (titulo === "") {
    avisoFamilia.textContent = "Escreva o nome do lembrete primeiro."
    return
  }
  var item = document.createElement("li")
  item.innerHTML = "<b>" + tipo + "</b><br>" + titulo.replace(/</g, "&lt;") + " às " + hora + "<br>"
  var botaoFeito = document.createElement("button")
  botaoFeito.textContent = "✔ JÁ FIZ"
  botaoFeito.addEventListener("click", function () {
    item.classList.add("feito")
    botaoFeito.remove()
    item.innerHTML += "<br>Feito!"
    contadorPendentes = contadorPendentes - 1
    if (contadorPendentes === 0) {
      avisoFamilia.textContent = "Tudo bem por aqui. Nenhum lembrete atrasado."
    } else {
      avisoFamilia.textContent = "✔ " + titulo + " foi confirmado! Faltam " + contadorPendentes + "."
    }
  })
  item.appendChild(botaoFeito)
  listaIdoso.appendChild(item)
  contadorPendentes = contadorPendentes + 1
  avisoFamilia.textContent = "Lembrete enviado! Aguardando confirmação (" + contadorPendentes + ")."
  document.getElementById("tituloLembrete").value = ""
}
document.getElementById("botaoAdicionar").addEventListener("click", adicionarLembrete)

document.getElementById("tamanhoTexto").addEventListener("input", function () {
  document.getElementById("celularIdoso").style.fontSize = this.value + "px"
})

var cartoesPlanos = document.querySelectorAll(".plano")
var precoEscolhido = 24.9
var nomeEscolhido = "Padrão"

function atualizarTotal() {
  var meses = document.getElementById("meses").value
  var total = (precoEscolhido * meses).toFixed(2).replace(".", ",")
  document.getElementById("mesesTexto").textContent = meses
  document.getElementById("nomePlano").textContent = nomeEscolhido
  document.getElementById("totalPlano").textContent = "R$ " + total
}
for (var i = 0; i < cartoesPlanos.length; i++) {
  cartoesPlanos[i].addEventListener("click", function () {
    for (var j = 0; j < cartoesPlanos.length; j++) {
      cartoesPlanos[j].classList.remove("escolhido")
    }
    this.classList.add("escolhido")
    precoEscolhido = Number(this.dataset.preco)
    nomeEscolhido = this.dataset.nome
    atualizarTotal()
  })
}
document.getElementById("meses").addEventListener("input", atualizarTotal)
document.getElementById("botaoPlano").addEventListener("click", function () {
  document.getElementById("planoContato").value = nomeEscolhido
})
atualizarTotal()

document.getElementById("formulario").addEventListener("submit", function (evento) {
  evento.preventDefault()
  var perfil = document.querySelector("input[name=perfil]:checked").value
  var nome = document.getElementById("nome").value
  var email = document.getElementById("emailContato").value
  var plano = document.getElementById("planoContato").value
  var mensagem = document.getElementById("mensagem").value
  var resposta = document.getElementById("resposta")
  resposta.textContent = "Enviando..."
  fetch("https://formsubmit.co/ajax/" + EMAIL_DA_EQUIPE, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      _subject: "Interesse no Cuidar+ - " + perfil,
      Nome: nome,
      Email: email,
      Perfil: perfil,
      Plano: plano,
      Mensagem: mensagem
    })
  }).then(function (resultado) {
    if (!resultado.ok) {
      throw new Error("falhou")
    }
    resposta.textContent = "Obrigado, " + nome + "! Recebemos seu interesse e vamos responder em breve."
    document.getElementById("formulario").reset()
  }).catch(function () {
    var assunto = "Interesse no Cuidar+ - " + perfil
    var corpo = "Nome: " + nome + "\nE-mail: " + email + "\nPerfil: " + perfil + "\nPlano: " + plano + "\n\n" + mensagem
    window.location.href = "mailto:" + EMAIL_DA_EQUIPE + "?subject=" + encodeURIComponent(assunto) + "&body=" + encodeURIComponent(corpo)
    resposta.textContent = "Abrimos seu aplicativo de e-mail com a mensagem pronta. Basta enviar."
  })
})

var observador = new IntersectionObserver(function (entradas) {
  for (var i = 0; i < entradas.length; i++) {
    if (entradas[i].isIntersecting) {
      entradas[i].target.classList.add("visivel")
      var contadores = entradas[i].target.querySelectorAll("[data-alvo]")
      for (var j = 0; j < contadores.length; j++) {
        contar(contadores[j])
      }
    }
  }
})
var blocos = document.querySelectorAll(".revelar")
for (var i = 0; i < blocos.length; i++) {
  observador.observe(blocos[i])
}

function contar(elemento) {
  var alvo = Number(elemento.dataset.alvo)
  var atual = 0
  var relogio = setInterval(function () {
    atual = atual + 1
    elemento.textContent = atual
    if (atual >= alvo) {
      clearInterval(relogio)
    }
  }, 30)
}

var imagensGaleria = document.querySelectorAll(".galeria img")
var fundoAmpliado = document.getElementById("ampliada")
for (var i = 0; i < imagensGaleria.length; i++) {
  imagensGaleria[i].addEventListener("click", function () {
    document.getElementById("imagemAmpliada").src = this.src
    fundoAmpliado.classList.add("aberta")
  })
}
fundoAmpliado.addEventListener("click", function () {
  fundoAmpliado.classList.remove("aberta")
})

var etapasTrilha = document.querySelectorAll("#trilha span")
var conversa = document.getElementById("conversa")
var acoesHistoria = document.getElementById("acoesHistoria")

function marcarTrilha(listaFeitos) {
  for (var i = 0; i < etapasTrilha.length; i++) {
    etapasTrilha[i].classList.remove("feito")
    if (listaFeitos.indexOf(i) !== -1) {
      etapasTrilha[i].classList.add("feito")
    }
  }
}
function adicionarMensagem(texto, quem) {
  var mensagem = document.createElement("div")
  mensagem.className = "msg " + quem
  mensagem.textContent = texto
  conversa.appendChild(mensagem)
  conversa.scrollTop = conversa.scrollHeight
}
function mostrarAcoes(lista) {
  acoesHistoria.innerHTML = ""
  for (var i = 0; i < lista.length; i++) {
    var botao = document.createElement("button")
    botao.className = "botao " + lista[i][2]
    botao.textContent = lista[i][0]
    botao.addEventListener("click", lista[i][1])
    acoesHistoria.appendChild(botao)
  }
}
function comecarHistoria() {
  conversa.innerHTML = ""
  marcarTrilha([])
  adicionarMensagem("Dona Maria mora longe de você e precisa tomar Dipirona às 8h. Vamos cuidar dela?", "sistema")
  mostrarAcoes([["📝 Cadastrar o lembrete", passoCadastrar, ""]])
}
function passoCadastrar() {
  adicionarMensagem("👩 Você cadastrou: Tomar Dipirona às 8h, com alarme no celular dela.", "familia")
  marcarTrilha([0])
  mostrarAcoes([["⏰ Chegou as 8h", passoAvisar, ""]])
}
function passoAvisar() {
  adicionarMensagem("🔔 Cuidar+ avisa Dona Maria: Está na hora de tomar a Dipirona!", "sistema")
  marcarTrilha([0, 1])
  mostrarAcoes([["✅ Ela aperta JÁ FIZ", passoConfirmou, ""], ["😴 Ela não responde", passoSemResposta, "claro"]])
}
function passoConfirmou() {
  adicionarMensagem("👵 Já fiz!", "idoso")
  adicionarMensagem("✅ Confirmação registrada. No seu celular aparece: Tudo bem por aqui.", "sistema")
  marcarTrilha([0, 1, 2, 3])
  mostrarAcoes([["↺ Recomeçar", comecarHistoria, "claro"]])
}
function passoSemResposta() {
  adicionarMensagem("⏳ Passou o tempo e ninguém confirmou.", "sistema")
  adicionarMensagem("🚨 Cuidar+ avisa você: Dona Maria não confirmou. Verifique se está tudo bem!", "alerta")
  marcarTrilha([0, 1, 4])
  mostrarAcoes([["↺ Recomeçar", comecarHistoria, "claro"]])
}
comecarHistoria()

var listaDeDuvidas = [
  ["Idoso", "O idoso precisa saber mexer no celular?", "Não. A tela é simples, com letras grandes, e basta um toque em “Já fiz” para confirmar."],
  ["Idoso", "Dá para aumentar o tamanho das letras?", "Sim. A tela do idoso tem ajuste de tamanho do texto, para ficar do jeito mais fácil de ler."],
  ["Idoso", "Como o idoso é avisado na hora do remédio?", "Por alarme, que toca continuamente e aumenta o volume por um tempo, ou por uma notificação simples."],
  ["Família", "E se ele esquecer de confirmar?", "O aplicativo avisa o familiar para que ele verifique se está tudo bem."],
  ["Família", "Posso colocar minha voz ou uma foto no lembrete?", "Sim. O familiar pode anexar uma foto ou gravar uma mensagem de voz, que o idoso ouve ao receber o lembrete."],
  ["Família", "Como conecto meu celular ao do idoso?", "O idoso tem um código de conexão na tela dele. Você usa esse código para acompanhar a rotina."],
  ["Família", "Que tipos de lembrete posso criar?", "Remédio, consulta, atividade, refeição e outros compromissos."],
  ["Planos", "Quanto custa o Cuidar+?", "Os planos são Padrão por R$ 24,90, Família por R$ 39,90 e Premium por R$ 59,90, todos por mês. Use o simulador na seção de planos."],
  ["Planos", "Preciso instalar alguma coisa?", "O Cuidar+ é um aplicativo para celular."]
]
var categoriaEscolhida = "Todas"
var listaDuvidasElemento = document.getElementById("listaDuvidas")

function montarDuvidas() {
  var texto = document.getElementById("buscaDuvida").value.toLowerCase()
  listaDuvidasElemento.innerHTML = ""
  var quantidade = 0
  for (var i = 0; i < listaDeDuvidas.length; i++) {
    var item = listaDeDuvidas[i]
    var combinaCategoria = categoriaEscolhida === "Todas" || categoriaEscolhida === item[0]
    var combinaTexto = (item[1] + " " + item[2]).toLowerCase().indexOf(texto) !== -1
    if (combinaCategoria && combinaTexto) {
      quantidade = quantidade + 1
      criarDuvida(item)
    }
  }
  document.getElementById("semResultado").style.display = quantidade === 0 ? "block" : "none"
}
function criarDuvida(item) {
  var caixa = document.createElement("div")
  caixa.className = "duvida"
  var pergunta = document.createElement("button")
  pergunta.className = "pergunta"
  pergunta.innerHTML = "<span class='etiqueta'>" + item[0] + "</span>" + item[1] + "<i>+</i>"
  var resposta = document.createElement("div")
  resposta.className = "resposta"
  resposta.innerHTML = "<p>" + item[2] + "</p><div class='voto'>Isso ajudou? <button>👍</button><button>👎</button></div>"
  var botoesVoto = resposta.querySelectorAll(".voto button")
  for (var j = 0; j < botoesVoto.length; j++) {
    botoesVoto[j].addEventListener("click", function () {
      this.parentNode.textContent = "Obrigado pelo retorno! 💜"
    })
  }
  pergunta.addEventListener("click", function () {
    var jaAberta = caixa.classList.contains("aberta")
    var todasCaixas = document.querySelectorAll(".duvida")
    for (var k = 0; k < todasCaixas.length; k++) {
      todasCaixas[k].classList.remove("aberta")
      todasCaixas[k].querySelector(".resposta").style.maxHeight = "0"
    }
    if (!jaAberta) {
      caixa.classList.add("aberta")
      resposta.style.maxHeight = resposta.scrollHeight + "px"
    }
  })
  caixa.appendChild(pergunta)
  caixa.appendChild(resposta)
  listaDuvidasElemento.appendChild(caixa)
}
var chipsDuvida = document.querySelectorAll("#chipsDuvida button")
for (var i = 0; i < chipsDuvida.length; i++) {
  chipsDuvida[i].addEventListener("click", function () {
    for (var j = 0; j < chipsDuvida.length; j++) {
      chipsDuvida[j].classList.remove("ativa")
    }
    this.classList.add("ativa")
    categoriaEscolhida = this.textContent
    montarDuvidas()
  })
}
document.getElementById("buscaDuvida").addEventListener("input", montarDuvidas)
montarDuvidas()
