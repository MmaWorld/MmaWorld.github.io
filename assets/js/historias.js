/* Histórias bíblicas animadas e narradas (Web Speech API) — funcionam como pequenos vídeos */
(function () {
  'use strict';

  /* cena: [texto, opções]  opções: foco 'x% y%', efeito chuva|brilho|estrelas|confete|ondas,
     clima noite|tempestade, mov balanco|tremer */
  var HISTORIAS = [
    {
      id: 'criacao', desenho: 'criacao', titulo: 'Deus criou o mundo', ref: 'Gênesis 1–2',
      cenas: [
        ['No começo, não havia nada… só Deus! E Deus disse: “Haja luz!” E a luz apareceu, bem brilhante!', { foco: '18% 20%', efeito: 'brilho', bx: '18%', by: '20%' }],
        ['Deus separou as águas, fez o céu azul lá em cima e juntou os mares, para aparecer a terra seca.', { foco: '60% 40%' }],
        ['Na terra, Deus fez crescer plantas, flores coloridas e árvores cheias de frutas gostosas!', { foco: '25% 70%' }],
        ['Deus colocou o sol para brilhar de dia, e a lua e as estrelas para brilhar de noite.', { clima: 'noite', efeito: 'estrelas' }],
        ['Depois, Deus encheu os mares de peixes, o céu de passarinhos e a terra de animais de todo tipo!', { foco: '55% 45%' }],
        ['Por último, Deus criou o homem e a mulher, Adão e Eva, com muito amor. Deus olhou tudo e viu que era muito bom! E no sétimo dia, Deus descansou.', { efeito: 'confete' }]
      ],
      licao: 'Tudo o que existe foi feito por Deus — e você também! Você é muito especial para Ele.'
    },
    {
      id: 'noe', desenho: 'arca', titulo: 'Noé e a grande arca', ref: 'Gênesis 6–9',
      cenas: [
        ['Há muito tempo, as pessoas tinham esquecido de Deus e faziam muitas coisas erradas. Mas um homem chamado Noé amava a Deus e obedecia a Ele.', { foco: '27% 55%' }],
        ['Deus disse a Noé: “Construa uma arca bem grande, de madeira!” E Noé obedeceu, mesmo sem ver nenhuma chuva por perto.', { foco: '50% 65%' }],
        ['Os animais chegaram de dois em dois: girafas, elefantes, leões, passarinhos… Noé e a família também entraram, e Deus fechou a porta.', { foco: '62% 35%' }],
        ['Então começou a chover… e choveu quarenta dias e quarenta noites! A água cobriu tudo, mas a arca flutuava em segurança.', { clima: 'tempestade', efeito: 'chuva', mov: 'balanco' }],
        ['Quando a chuva parou, Noé soltou uma pomba. Ela voltou com uma folhinha de oliveira no bico: a terra estava secando!', { foco: '22% 22%' }],
        ['Todos saíram da arca, e Noé agradeceu a Deus. Então Deus colocou um lindo arco-íris no céu, como sinal da sua promessa.', { efeito: 'brilho', bx: '50%', by: '35%' }]
      ],
      licao: 'Deus sempre cumpre o que promete. Quando obedecemos a Deus, estamos seguros nas mãos dele.'
    },
    {
      id: 'moises', desenho: 'mar', titulo: 'Moisés e o Mar Vermelho', ref: 'Êxodo 14',
      cenas: [
        ['O povo de Deus vivia como escravo no Egito. Então Deus escolheu Moisés para levar o povo para uma terra nova e livre.', { foco: '50% 70%' }],
        ['Eles caminharam até a beira de um mar enorme: o Mar Vermelho. E, lá atrás, o exército do faraó vinha correndo atrás deles!', { mov: 'tremer', efeito: 'ondas' }],
        ['O povo ficou com medo. Mas Moisés disse: “Não tenham medo! Fiquem firmes e vejam o que Deus vai fazer!”', { foco: '50% 62%' }],
        ['Moisés estendeu a mão sobre o mar, e Deus mandou um vento forte a noite toda. O mar se abriu em duas paredes de água, com um caminho seco no meio!', { efeito: 'brilho', bx: '50%', by: '20%' }],
        ['Todo o povo atravessou pelo chão seco! Do outro lado, eles cantaram e agradeceram a Deus pela grande salvação.', { efeito: 'confete' }]
      ],
      licao: 'Quando parece que não tem saída, Deus abre um caminho. Podemos confiar nele!'
    },
    {
      id: 'davi', desenho: 'davi', titulo: 'Davi e o gigante Golias', ref: '1 Samuel 17',
      cenas: [
        ['Davi era um menino pastor. Ele cuidava das ovelhas do seu pai, Jessé, e confiava muito em Deus.', { foco: '22% 75%' }],
        ['Um dia, os filisteus trouxeram um gigante chamado Golias. Ele tinha quase três metros de altura e gritava, desafiando o povo de Deus!', { foco: '74% 45%', mov: 'tremer' }],
        ['Todos os soldados tinham medo. Mas Davi disse: “O Senhor, que me livrou do leão e do urso, vai me livrar desse gigante!”', { foco: '28% 65%' }],
        ['Davi pegou cinco pedrinhas lisas no riacho e a sua funda. Ele não usou espada nem armadura: foi em nome do Senhor.', { foco: '25% 85%' }],
        ['Davi girou a funda e… zuuum! A pedra acertou bem na testa de Golias, e o gigante caiu no chão! Deus deu a vitória ao pequeno Davi.', { efeito: 'confete' }]
      ],
      licao: 'Com Deus ao nosso lado, não precisamos ter medo dos “gigantes” da vida.'
    },
    {
      id: 'daniel', desenho: 'daniel', titulo: 'Daniel na cova dos leões', ref: 'Daniel 6',
      cenas: [
        ['Daniel trabalhava para o rei Dario. Ele era honesto e orava a Deus três vezes por dia, com as janelas abertas.', { foco: '50% 70%' }],
        ['Alguns homens invejosos fizeram o rei assinar uma lei: por trinta dias, ninguém podia orar a nenhum deus, só ao rei! Quem desobedecesse iria para a cova dos leões.', {}],
        ['Mas Daniel continuou orando a Deus, como sempre fazia. Então ele foi jogado na cova dos leões!', { clima: 'noite', foco: '20% 85%' }],
        ['Deus enviou um anjo, que fechou a boca dos leões! Os leões ficaram mansinhos, e Daniel passou a noite em paz.', { efeito: 'brilho', bx: '22%', by: '45%', foco: '22% 55%' }],
        ['De manhã cedinho, o rei correu até a cova: “Daniel, o seu Deus te salvou?” — “Sim, ó rei! Deus mandou o seu anjo!” E Daniel saiu sem nenhum arranhão.', { efeito: 'confete' }]
      ],
      licao: 'Daniel não deixou de orar, mesmo com medo. Deus cuida de quem é fiel a Ele.'
    },
    {
      id: 'jonas', desenho: 'jonas', titulo: 'Jonas e o grande peixe', ref: 'Jonas 1–3',
      cenas: [
        ['Deus pediu a Jonas: “Vá até a grande cidade de Nínive e fale com o povo de lá.” Mas Jonas não quis ir e entrou num barco para o lado contrário!', { foco: '50% 60%' }],
        ['No mar, veio uma tempestade enorme! O barco balançava tanto que parecia que ia quebrar.', { clima: 'tempestade', efeito: 'chuva', mov: 'balanco' }],
        ['Jonas sabia que a tempestade era por causa dele. Os marinheiros o jogaram no mar… e o mar se acalmou.', { efeito: 'ondas' }],
        ['Então Deus mandou um grande peixe, que engoliu Jonas! Dentro do peixe, Jonas ficou três dias e três noites e orou a Deus.', { foco: '68% 66%' }],
        ['Deus ouviu Jonas, e o peixe o colocou na praia. Desta vez Jonas obedeceu, foi a Nínive, e o povo se arrependeu e voltou para Deus!', { foco: '18% 72%', efeito: 'confete' }]
      ],
      licao: 'É melhor obedecer a Deus logo de primeira! E Deus dá uma nova chance a quem se arrepende.'
    },
    {
      id: 'natal', desenho: 'natal', titulo: 'O nascimento de Jesus', ref: 'Lucas 1–2; Mateus 2',
      cenas: [
        ['O anjo Gabriel visitou Maria e contou uma notícia maravilhosa: ela seria a mãe do Filho de Deus, e o nome dele seria Jesus!', { foco: '30% 70%', efeito: 'brilho', bx: '30%', by: '60%' }],
        ['Maria e José viajaram até a cidadezinha de Belém. Mas lá estava tão cheio que não havia lugar para eles na hospedaria.', { clima: 'noite' }],
        ['E ali nasceu o bebê Jesus! Maria o enrolou em panos e o deitou numa manjedoura, onde os animais comiam.', { foco: '50% 76%' }],
        ['Nos campos, anjos apareceram aos pastores: “Hoje nasceu o Salvador!” E os pastores correram para ver o bebê.', { efeito: 'estrelas' }],
        ['Uma estrela especial guiou os magos do Oriente, que adoraram Jesus e trouxeram presentes: ouro, incenso e mirra.', { foco: '50% 14%', efeito: 'brilho', bx: '50%', by: '14%' }]
      ],
      licao: 'Jesus é o maior presente de Deus para o mundo! O Natal é a festa do nascimento de Jesus.'
    },
    {
      id: 'ovelha', desenho: 'pastor', titulo: 'A ovelha perdida', ref: 'Lucas 15:3-7',
      cenas: [
        ['Jesus contou uma história: um pastor tinha cem ovelhas. Ele cuidava de todas com muito carinho.', { foco: '35% 75%' }],
        ['Um dia, ao contar as ovelhas, ele percebeu: “…noventa e sete, noventa e oito, noventa e nove… Está faltando uma!” Uma ovelhinha tinha se perdido.', { foco: '70% 80%' }],
        ['O pastor deixou as noventa e nove em segurança e foi procurar a ovelhinha perdida, por montes e pedras, por todo lado!', { foco: '82% 56%' }],
        ['Até que ele a encontrou! Com muita alegria, colocou a ovelhinha nos ombros e voltou para casa.', { foco: '35% 60%', efeito: 'brilho', bx: '35%', by: '50%' }],
        ['O pastor chamou os amigos: “Alegrem-se comigo! Encontrei a minha ovelha perdida!” Jesus disse que no céu também há festa quando alguém volta para Deus.', { efeito: 'confete' }]
      ],
      licao: 'Jesus é o Bom Pastor. Ele conhece você pelo nome e nunca desiste de você!'
    }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var lista = $('lista-historias'), player = $('player'), arte = $('arte'), efeito = $('efeito'), legenda = $('legenda');
  var hist = null, n = 0, tocando = false, espera = null;
  var fala = 'speechSynthesis' in window ? window.speechSynthesis : null;
  var narrar = Guardar.ler('historias:narrar', true);
  var voz = null;

  function escolherVoz() {
    if (!fala) return;
    var vozes = fala.getVoices();
    voz = vozes.filter(function (v) { return /pt[-_]BR/i.test(v.lang); })[0] ||
      vozes.filter(function (v) { return /^pt/i.test(v.lang); })[0] || null;
  }
  if (fala) { escolherVoz(); fala.onvoiceschanged = escolherVoz; }

  // ---------- lista ----------
  HISTORIAS.forEach(function (h) {
    var a = document.createElement('a');
    a.className = 'miniatura';
    a.href = '#' + h.id;
    a.innerHTML = Desenhos.render(h.desenho, true, h.titulo) + '<strong>▶ ' + h.titulo + '</strong><span>' + h.ref + ' · ' + h.cenas.length + ' cenas</span>';
    lista.appendChild(a);
  });

  // ---------- player ----------
  function abrir(id) {
    var h = HISTORIAS.filter(function (x) { return x.id === id; })[0];
    if (!h) { fechar(); return; }
    hist = h; n = 0;
    $('titulo-historia').textContent = h.titulo;
    $('ref-historia').textContent = '📖 ' + h.ref;
    $('lista-caixa').classList.add('oculto');
    player.classList.remove('oculto');
    document.title = h.titulo + ' — Histórias Bíblicas — Mundo Bíblico Kids';
    $('pontinhos').innerHTML = h.cenas.map(function (c, k) {
      return '<button type="button" aria-label="Cena ' + (k + 1) + '" data-k="' + k + '"></button>';
    }).join('');
    $('final').classList.remove('visivel');
    $('licao').textContent = h.licao;
    $('link-colorir').href = 'colorir.html#' + h.desenho;
    cena();
    window.scrollTo(0, 0);
  }

  function fechar() {
    parar();
    hist = null;
    player.classList.add('oculto');
    $('lista-caixa').classList.remove('oculto');
    document.title = 'Histórias Bíblicas Animadas — Mundo Bíblico Kids';
  }

  function cena() {
    var c = hist.cenas[n], o = c[1];
    clearTimeout(espera);
    arte.className = 'arte';
    arte.innerHTML = Desenhos.render(hist.desenho, true, hist.titulo);
    arte.style.setProperty('--foco', o.foco || '50% 50%');
    void arte.offsetWidth; // reinicia a animação
    arte.classList.add('anim');
    if (o.foco) arte.classList.add('foco');
    if (o.clima) arte.classList.add(o.clima);
    if (o.mov) { arte.classList.remove('anim', 'foco'); arte.classList.add(o.mov); }
    montarEfeito(o);
    legenda.innerHTML = '<span>' + c[0] + '</span>';
    $('pontinhos').querySelectorAll('button').forEach(function (b, k) { b.setAttribute('aria-current', k === n ? 'true' : 'false'); });
    $('btn-ant').disabled = n === 0;
    $('btn-prox').textContent = n === hist.cenas.length - 1 ? 'Fim 🏁' : 'Próxima ▶';
    $('final').classList.remove('visivel');
    if (tocando) falar(c[0]);
  }

  function montarEfeito(o) {
    var h = '', k;
    if (o.efeito === 'chuva') {
      for (k = 0; k < 60; k++) h += '<i class="gota" style="left:' + (Math.random() * 110) + '%;animation-delay:-' + Math.random().toFixed(2) + 's;animation-duration:' + (0.5 + Math.random() * 0.4).toFixed(2) + 's"></i>';
    } else if (o.efeito === 'brilho') {
      h = '<i class="brilho" style="--bx:' + (o.bx || '50%') + ';--by:' + (o.by || '30%') + '"></i>';
    } else if (o.efeito === 'estrelas') {
      for (k = 0; k < 26; k++) h += '<i class="pisca" style="left:' + (Math.random() * 96) + '%;top:' + (Math.random() * 45) + '%;animation-delay:-' + (Math.random() * 1.6).toFixed(2) + 's">✦</i>';
    } else if (o.efeito === 'confete') {
      var em = ['🎉', '⭐', '💛', '✨', '🎈', '💙'];
      for (k = 0; k < 24; k++) h += '<i class="confete" style="left:' + (Math.random() * 95) + '%;animation-delay:' + (Math.random() * 2).toFixed(2) + 's">' + em[k % em.length] + '</i>';
    } else if (o.efeito === 'ondas') {
      h = '<i class="onda"></i>';
    }
    efeito.innerHTML = h;
  }

  function falar(texto) {
    var limpo = texto.replace(/[“”…—]/g, function (c) { return c === '…' ? '...' : c === '—' ? ',' : ''; });
    if (fala && narrar) {
      fala.cancel();
      var u = new SpeechSynthesisUtterance(limpo);
      u.lang = 'pt-BR';
      if (voz) u.voice = voz;
      u.rate = 0.92; u.pitch = 1.1;
      u.onend = function () { if (tocando) espera = setTimeout(avancar, 900); };
      u.onerror = function () { if (tocando) espera = setTimeout(avancar, tempoLeitura(texto)); };
      fala.speak(u);
    } else {
      espera = setTimeout(avancar, tempoLeitura(texto));
    }
  }

  function tempoLeitura(t) { return Math.max(5000, t.length * 70); }

  function avancar() {
    if (!hist) return;
    if (n < hist.cenas.length - 1) { n++; cena(); } else terminar();
  }

  function terminar() {
    parar();
    $('final').classList.add('visivel');
    montarEfeito({ efeito: 'confete' });
    Som.vitoria();
  }

  function assistir() {
    if (tocando) { parar(); return; }
    tocando = true;
    $('btn-play').textContent = '⏸ Pausar';
    if ($('final').classList.contains('visivel')) { n = 0; cena(); } else falar(hist.cenas[n][0]);
  }

  function parar() {
    tocando = false;
    clearTimeout(espera);
    if (fala) fala.cancel();
    $('btn-play').textContent = '▶ Assistir';
  }

  $('btn-play').addEventListener('click', assistir);
  $('btn-prox').addEventListener('click', function () {
    if (n < hist.cenas.length - 1) { n++; cena(); } else terminar();
  });
  $('btn-ant').addEventListener('click', function () { if (n > 0) { n--; cena(); } });
  $('pontinhos').addEventListener('click', function (ev) {
    var b = ev.target.closest('button');
    if (b) { n = +b.getAttribute('data-k'); cena(); }
  });
  $('btn-narrar').addEventListener('click', function () {
    narrar = !narrar;
    Guardar.salvar('historias:narrar', narrar);
    atualizarNarrar();
    if (!narrar && fala) fala.cancel();
    if (tocando) falar(hist.cenas[n][0]);
  });
  function atualizarNarrar() {
    $('btn-narrar').textContent = narrar && fala ? '🔊 Narração ligada' : '🔇 Sem narração';
    if (!fala) $('btn-narrar').disabled = true;
  }
  $('btn-voltar').addEventListener('click', function () {
    history.pushState('', document.title, location.pathname);
    fechar();
  });
  $('btn-repetir').addEventListener('click', function () { n = 0; cena(); assistir(); });

  document.addEventListener('keydown', function (ev) {
    if (!hist || /input|textarea/i.test(ev.target.tagName)) return;
    if (ev.key === 'ArrowRight') $('btn-prox').click();
    if (ev.key === 'ArrowLeft') $('btn-ant').click();
  });

  function rota() {
    var id = location.hash.slice(1);
    if (id) abrir(id); else fechar();
  }
  window.addEventListener('hashchange', rota);
  atualizarNarrar();
  rota();
})();
