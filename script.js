const respostas = [
  { palavra: "pix", resposta: "⚠️ Cuidado! Golpes pedindo PIX são muito comuns. Desconfie se pedirem transferência imediata." },
  { palavra: "banco", resposta: "🏦 Nenhum banco pede senhas, códigos ou dados pessoais por mensagem. Provável golpe." },
  { palavra: "link", resposta: "🔗 Links desconhecidos podem ser perigosos. Evite clicar e confirme a origem." },
  { palavra: "senha", resposta: "🚫 Nunca informe sua senha a ninguém, nem por telefone nem por mensagem." },
  { palavra: "premio", resposta: "🎁 Desconfie! Prêmios e sorteios que você não participou costumam ser golpes." },
  { palavra: "urgente", resposta: "⚠️ Mensagens com tom de urgência são sinais de golpe. Verifique com calma." },
  { palavra: "whatsapp", resposta: "📱 Golpes no WhatsApp são comuns. Confirme se a pessoa é realmente quem diz ser." },
];

let ultimaResposta = "";

// Gera uma resposta baseada no texto
function verificarMensagem(msg) {
  msg = msg.toLowerCase();
  for (let r of respostas) {
    if (msg.includes(r.palavra)) return r.resposta;
  }
  return "✅ Essa mensagem não parece conter sinais claros de golpe, mas continue atento!";
}

// Fala a resposta em voz alta
function lerTexto(texto) {
  const synth = window.speechSynthesis;
  synth.cancel();

  const utter = new SpeechSynthesisUtterance(texto);
  utter.lang = "pt-BR";
  utter.rate = 1;
  utter.pitch = 1;
  synth.speak(utter);
  ultimaResposta = texto;
}

// Enviar mensagem
document.getElementById("send-btn").addEventListener("click", () => {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");
  const texto = input.value.trim();
  if (texto === "") return;

  const userMsg = document.createElement("div");
  userMsg.classList.add("message", "user");
  userMsg.textContent = texto;
  chatLog.appendChild(userMsg);

  const resposta = verificarMensagem(texto);
  const botMsg = document.createElement("div");
  botMsg.classList.add("message", "bot");
  botMsg.textContent = resposta;
  chatLog.appendChild(botMsg);

  chatLog.scrollTop = chatLog.scrollHeight;
  input.value = "";

  lerTexto(resposta);
});

// Repetir resposta
document.getElementById("repeat-btn").addEventListener("click", () => {
  if (ultimaResposta) lerTexto(ultimaResposta);
});
