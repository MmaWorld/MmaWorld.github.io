/* Quiz bíblico valendo pontos — 1 ou 2 jogadores */
(function () {
  'use strict';

  // [pergunta, resposta certa, [erradas], referência, curiosidade]
  var BANCO = {
    facil: [
      ['Quem construiu uma arca bem grande para salvar sua família e os animais?', 'Noé', ['Moisés', 'Davi', 'Pedro'], 'Gênesis 6:13-22'],
      ['Em quantos dias Deus criou o mundo, antes de descansar no sétimo dia?', '6 dias', ['3 dias', '10 dias', '40 dias'], 'Gênesis 1:31–2:2'],
      ['Qual era o nome do primeiro homem que Deus criou?', 'Adão', ['Abel', 'Abraão', 'Noé'], 'Gênesis 2:7, 19-20'],
      ['Qual era o nome da primeira mulher?', 'Eva', ['Sara', 'Maria', 'Rute'], 'Gênesis 3:20'],
      ['Que animal enganou Eva no jardim do Éden?', 'A serpente', ['O leão', 'O lobo', 'O corvo'], 'Gênesis 3:1-6'],
      ['Que sinal Deus colocou no céu depois do dilúvio?', 'Um arco-íris', ['Uma estrela', 'Um cometa', 'Uma nuvem dourada'], 'Gênesis 9:13'],
      ['Quem enfrentou o gigante Golias?', 'Davi', ['Saul', 'Sansão', 'Jônatas'], '1 Samuel 17:48-50'],
      ['Com o que Davi derrubou o gigante Golias?', 'Uma funda e uma pedra', ['Uma espada', 'Uma lança', 'Um arco e flecha'], '1 Samuel 17:49'],
      ['Em que cidade Jesus nasceu?', 'Belém', ['Nazaré', 'Jerusalém', 'Roma'], 'Mateus 2:1'],
      ['Qual era o nome da mãe de Jesus?', 'Maria', ['Marta', 'Isabel', 'Ana'], 'Lucas 1:30-31'],
      ['Onde o bebê Jesus foi deitado quando nasceu?', 'Numa manjedoura', ['Num berço de ouro', 'Num barco', 'Numa cama de rei'], 'Lucas 2:7'],
      ['Quem foi engolido por um grande peixe?', 'Jonas', ['Pedro', 'Elias', 'Paulo'], 'Jonas 1:17'],
      ['Quem foi jogado na cova dos leões?', 'Daniel', ['José', 'Moisés', 'Samuel'], 'Daniel 6:16'],
      ['Quem levantou o cajado quando Deus abriu o mar?', 'Moisés', ['Abraão', 'Josué', 'Noé'], 'Êxodo 14:16, 21'],
      ['Quantos apóstolos Jesus escolheu?', '12', ['7', '10', '40'], 'Marcos 3:14'],
      ['O que guiou os magos até o menino Jesus?', 'Uma estrela', ['Um anjo de fogo', 'Uma pomba', 'Um mapa'], 'Mateus 2:9-10']
    ],
    medio: [
      ['Quantos dias e quantas noites choveu no dilúvio?', '40 dias e 40 noites', ['7 dias e 7 noites', '12 dias e 12 noites', '100 dias e 100 noites'], 'Gênesis 7:12'],
      ['Que ave voltou para a arca com uma folha de oliveira no bico?', 'Uma pomba', ['Um corvo', 'Uma águia', 'Um pardal'], 'Gênesis 8:11'],
      ['Quantos dias Jonas ficou dentro do grande peixe?', '3 dias e 3 noites', ['1 dia', '7 dias', '40 dias'], 'Jonas 1:17'],
      ['Para qual cidade Deus mandou Jonas pregar?', 'Nínive', ['Babilônia', 'Jericó', 'Belém'], 'Jonas 1:2'],
      ['Quantas pedras lisas Davi pegou no riacho?', '5', ['1', '3', '12'], '1 Samuel 17:40'],
      ['O que Davi fazia antes de enfrentar Golias?', 'Cuidava das ovelhas', ['Era soldado do rei', 'Era pescador', 'Era carpinteiro'], '1 Samuel 17:34-35'],
      ['Quem fechou a boca dos leões para proteger Daniel?', 'Um anjo enviado por Deus', ['O rei Dario', 'Os amigos de Daniel', 'Um domador'], 'Daniel 6:22'],
      ['Qual foi o primeiro milagre de Jesus, num casamento em Caná?', 'Transformou água em vinho', ['Multiplicou pães', 'Andou sobre as águas', 'Acalmou a tempestade'], 'João 2:1-11'],
      ['Quantos pães e peixes tinha o menino que ajudou Jesus a alimentar a multidão?', '5 pães e 2 peixes', ['2 pães e 5 peixes', '7 pães e 3 peixes', '12 pães e 1 peixe'], 'João 6:9'],
      ['Na história da ovelha perdida, quantas ovelhas o pastor tinha?', '100', ['10', '50', '99'], 'Lucas 15:4'],
      ['Quem era o irmão de Moisés que falava por ele?', 'Arão', ['Josué', 'Calebe', 'Levi'], 'Êxodo 4:14-16'],
      ['Quais presentes os magos deram ao menino Jesus?', 'Ouro, incenso e mirra', ['Prata, pão e vinho', 'Ovelhas e camelos', 'Roupas e sandálias'], 'Mateus 2:11'],
      ['Quem subiu numa árvore para conseguir ver Jesus passar?', 'Zaqueu', ['Pedro', 'Nicodemos', 'Lázaro'], 'Lucas 19:1-4'],
      ['Que discípulo andou sobre as águas em direção a Jesus?', 'Pedro', ['João', 'Tomé', 'André'], 'Mateus 14:28-29'],
      ['Em que cidade Jesus cresceu?', 'Nazaré', ['Belém', 'Cafarnaum', 'Jericó'], 'Lucas 2:39-40'],
      ['Que comida Deus mandou do céu para o povo no deserto?', 'Maná', ['Uvas', 'Peixe assado', 'Mel'], 'Êxodo 16:14-15']
    ],
    dificil: [
      ['Quantos anos Noé tinha quando começou o dilúvio?', '600 anos', ['100 anos', '300 anos', '969 anos'], 'Gênesis 7:6'],
      ['Quais eram os nomes dos três filhos de Noé?', 'Sem, Cam e Jafé', ['Caim, Abel e Sete', 'Isaque, Jacó e Esaú', 'Rúben, Simeão e Levi'], 'Gênesis 6:10'],
      ['Em quais montes a arca de Noé parou?', 'Montes de Ararate', ['Monte Sinai', 'Monte Carmelo', 'Monte das Oliveiras'], 'Gênesis 8:4'],
      ['Quantas vezes por dia Daniel orava?', '3 vezes', ['1 vez', '5 vezes', '7 vezes'], 'Daniel 6:10'],
      ['Qual rei mandou colocar Daniel na cova dos leões?', 'Dario', ['Nabucodonosor', 'Faraó', 'Herodes'], 'Daniel 6:9, 16'],
      ['Que nome Daniel recebeu na Babilônia?', 'Beltessazar', ['Sadraque', 'Mesaque', 'Abede-Nego'], 'Daniel 1:7'],
      ['De que cidade era o gigante Golias?', 'Gate', ['Jericó', 'Nínive', 'Belém'], '1 Samuel 17:4'],
      ['Qual era o nome do pai de Davi?', 'Jessé', ['Saul', 'Samuel', 'Boaz'], '1 Samuel 17:12'],
      ['O que Deus fez crescer para dar sombra a Jonas?', 'Uma planta (aboboreira)', ['Uma palmeira', 'Uma figueira', 'Uma oliveira'], 'Jonas 4:6'],
      ['Em que monte Moisés recebeu os Dez Mandamentos?', 'Monte Sinai', ['Monte Ararate', 'Monte Sião', 'Monte Carmelo'], 'Êxodo 19:20; 20:1-17'],
      ['Qual é o primeiro livro da Bíblia?', 'Gênesis', ['Êxodo', 'Salmos', 'Mateus'], 'Gênesis 1:1'],
      ['Quem era o pai de João Batista?', 'Zacarias', ['José', 'Simeão', 'Elias'], 'Lucas 1:13'],
      ['Qual imperador mandou fazer o recenseamento na época em que Jesus nasceu?', 'César Augusto', ['Nero', 'Herodes', 'Pilatos'], 'Lucas 2:1'],
      ['Quantos irmãos homens José do Egito tinha?', '11', ['7', '10', '12'], 'Gênesis 35:22-26'],
      ['Que rei do Egito não queria deixar o povo de Deus sair?', 'O faraó', ['O rei Dario', 'O rei Saul', 'César'], 'Êxodo 5:1-2'],
      ['Que profeta subiu ao céu num redemoinho, com um carro de fogo?', 'Elias', ['Eliseu', 'Isaías', 'Jeremias'], '2 Reis 2:11']
    ]
  };
  var NIVEIS = {
    facil: { nome: 'Fácil', pontos: 10, tempo: 25 },
    medio: { nome: 'Médio', pontos: 20, tempo: 22 },
    dificil: { nome: 'Difícil', pontos: 30, tempo: 20 }
  };
  var POR_RODADA = 10;
  var LETRAS = ['A', 'B', 'C', 'D'];

  var $ = function (id) { return document.getElementById(id); };
  var telaInicio = $('tela-inicio'), telaJogo = $('tela-jogo'), telaFim = $('tela-fim');
  var nivel = 'facil', jogadores = [], vez = 0, perguntas = [], i = 0, timer = null, restante = 0, respondida = false;

  function embaralhar(a) {
    a = a.slice();
    for (var j = a.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1)), t = a[j]; a[j] = a[k]; a[k] = t;
    }
    return a;
  }

  // ---------- início ----------
  document.querySelectorAll('.nivel').forEach(function (b) {
    b.addEventListener('click', function () {
      nivel = b.getAttribute('data-nivel');
      document.querySelectorAll('.nivel').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    });
  });

  $('modo-2').addEventListener('change', function () { $('nome-2-caixa').classList.toggle('oculto', !this.checked); });

  function mostrarRecordes() {
    var r = Guardar.ler('quiz:recordes', {});
    $('recordes').textContent = '🏆 Recordes: Fácil ' + (r.facil || 0) + ' · Médio ' + (r.medio || 0) + ' · Difícil ' + (r.dificil || 0);
  }

  $('btn-comecar').addEventListener('click', function () {
    var n1 = $('nome-1').value.trim() || 'Jogador 1';
    jogadores = [{ nome: n1, pontos: 0, acertos: 0 }];
    if ($('modo-2').checked) jogadores.push({ nome: $('nome-2').value.trim() || 'Jogador 2', pontos: 0, acertos: 0 });
    var qtd = jogadores.length === 2 ? POR_RODADA + (POR_RODADA % 2) : POR_RODADA;
    perguntas = embaralhar(BANCO[nivel]).slice(0, qtd);
    i = 0; vez = 0;
    telaInicio.classList.add('oculto'); telaFim.classList.add('oculto'); telaJogo.classList.remove('oculto');
    mostrar();
  });

  // ---------- jogo ----------
  function placar() {
    $('placar').innerHTML = jogadores.map(function (j, n) {
      return '<span class="pill' + (jogadores.length > 1 && n === vez ? ' vez' : '') + '">' +
        (jogadores.length > 1 && n === vez ? '👉 ' : '⭐ ') + esc(j.nome) + ': ' + j.pontos + ' pts</span>';
    }).join('') + '<span class="pill">Pergunta ' + (i + 1) + ' de ' + perguntas.length + '</span>';
  }

  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function mostrar() {
    var q = perguntas[i];
    respondida = false;
    placar();
    $('pergunta').textContent = q[0];
    var ops = embaralhar([q[1]].concat(q[2]));
    $('opcoes').innerHTML = '';
    ops.forEach(function (o, n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'opcao';
      b.innerHTML = '<b>' + LETRAS[n] + '</b><span></span>';
      b.querySelector('span').textContent = o;
      b.addEventListener('click', function (ev) { responder(b, o === q[1], ev); });
      $('opcoes').appendChild(b);
    });
    $('feedback').classList.remove('visivel');
    $('btn-proxima').classList.add('oculto');
    iniciarTempo();
    $('pergunta').focus({ preventScroll: true });
    telaJogo.scrollIntoView({ block: 'start' });
  }

  function iniciarTempo() {
    clearInterval(timer);
    restante = NIVEIS[nivel].tempo;
    var total = restante;
    $('barra-tempo').style.width = '100%';
    $('tempo-txt').textContent = restante + 's';
    timer = setInterval(function () {
      restante -= 0.25;
      $('barra-tempo').style.width = Math.max(0, (restante / total) * 100) + '%';
      $('tempo-txt').textContent = Math.ceil(Math.max(0, restante)) + 's';
      if (restante <= 0) { clearInterval(timer); responder(null, false); }
    }, 250);
  }

  function responder(botao, certo, ev) {
    if (respondida) return;
    respondida = true;
    clearInterval(timer);
    var q = perguntas[i], j = jogadores[vez], ganho = 0;
    $('opcoes').querySelectorAll('.opcao').forEach(function (b) {
      b.disabled = true;
      if (b.querySelector('span').textContent === q[1]) b.classList.add('certa');
    });
    if (certo) {
      var bonus = Math.round((Math.max(0, restante) / NIVEIS[nivel].tempo) * (NIVEIS[nivel].pontos / 2));
      ganho = NIVEIS[nivel].pontos + bonus;
      j.pontos += ganho; j.acertos++;
      Som.certo();
      voar('+' + ganho, ev);
      $('feedback').innerHTML = '<strong>🎉 Muito bem!</strong> Você ganhou ' + NIVEIS[nivel].pontos + ' pontos' +
        (bonus ? ' + ' + bonus + ' de bônus por rapidez' : '') + '.<br><span class="ref">📖 ' + q[3] + '</span>';
    } else {
      if (botao) botao.classList.add('errada');
      Som.errado();
      $('feedback').innerHTML = '<strong>' + (botao ? '😅 Quase!' : '⏰ O tempo acabou!') + '</strong> A resposta certa é: <b>' +
        esc(q[1]) + '</b>.<br><span class="ref">📖 Leia em ' + q[3] + '</span>';
    }
    $('feedback').classList.add('visivel');
    placar();
    var b = $('btn-proxima');
    b.textContent = i + 1 < perguntas.length ? 'Próxima pergunta ➜' : 'Ver resultado 🏁';
    b.classList.remove('oculto');
    b.focus();
  }

  function voar(txt, ev) {
    if (!ev || !ev.clientX) return;
    var s = document.createElement('span');
    s.className = 'pontos-voando';
    s.textContent = txt;
    s.style.left = ev.clientX + 'px';
    s.style.top = ev.clientY - 20 + 'px';
    document.body.appendChild(s);
    setTimeout(function () { s.remove(); }, 1000);
  }

  $('btn-proxima').addEventListener('click', function () {
    i++;
    if (jogadores.length > 1) vez = (vez + 1) % jogadores.length;
    if (i < perguntas.length) mostrar(); else fim();
  });

  $('btn-sair').addEventListener('click', function () {
    clearInterval(timer);
    telaJogo.classList.add('oculto'); telaInicio.classList.remove('oculto');
    mostrarRecordes();
  });

  // ---------- fim ----------
  function estrelas(acertos, total) {
    var p = acertos / total;
    return p >= 0.9 ? 3 : p >= 0.6 ? 2 : p >= 0.3 ? 1 : 0;
  }

  function fim() {
    telaJogo.classList.add('oculto'); telaFim.classList.remove('oculto');
    var recordes = Guardar.ler('quiz:recordes', {}), novo = false;
    var porJogador = perguntas.length / jogadores.length;
    var html = '';
    if (jogadores.length === 1) {
      var j = jogadores[0], e = estrelas(j.acertos, porJogador);
      html += '<div class="estrelas" aria-label="' + e + ' de 3 estrelas">' + '⭐'.repeat(e) + '☆'.repeat(3 - e) + '</div>' +
        '<h2>' + esc(j.nome) + ', você fez ' + j.pontos + ' pontos!</h2>' +
        '<p>Acertou ' + j.acertos + ' de ' + porJogador + ' perguntas no nível ' + NIVEIS[nivel].nome + '.</p>' +
        '<p>' + ['Continue lendo as histórias e tente de novo! 💪', 'Bom trabalho! Você está aprendendo muito! 📖', 'Muito bem! Você conhece bastante a Bíblia! 🌟', 'Incrível! Você é um campeão da Bíblia! 🏆'][e] + '</p>';
    } else {
      var a = jogadores[0], b = jogadores[1];
      var vencedor = a.pontos === b.pontos ? null : a.pontos > b.pontos ? a : b;
      html += '<div class="estrelas">🏆</div><h2>' + (vencedor ? esc(vencedor.nome) + ' venceu!' : 'Empate! Os dois mandaram bem!') + '</h2>' +
        jogadores.map(function (x) { return '<p><b>' + esc(x.nome) + '</b>: ' + x.pontos + ' pontos (' + x.acertos + ' de ' + porJogador + ' acertos)</p>'; }).join('');
    }
    jogadores.forEach(function (x) {
      if (x.pontos > (recordes[nivel] || 0)) { recordes[nivel] = x.pontos; novo = true; }
    });
    Guardar.salvar('quiz:recordes', recordes);
    if (novo) html += '<p><b>🎊 Novo recorde no nível ' + NIVEIS[nivel].nome + '!</b></p>';
    $('resultado').innerHTML = html;
    Som.vitoria();
    mostrarRecordes();
  }

  $('btn-denovo').addEventListener('click', function () { $('btn-comecar').click(); });
  $('btn-menu').addEventListener('click', function () {
    telaFim.classList.add('oculto'); telaInicio.classList.remove('oculto');
  });

  $('btn-som').addEventListener('click', function () {
    var on = Som.alternar();
    this.textContent = on ? '🔊 Som ligado' : '🔇 Som desligado';
  });
  $('btn-som').textContent = Som.ligado() ? '🔊 Som ligado' : '🔇 Som desligado';

  mostrarRecordes();
})();
