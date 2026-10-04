/* Comportamentos comuns a todas as páginas */
(function () {
  'use strict';

  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      btn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
  }

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Versículo do dia (muda a cada dia)
  var VERSICULOS = [
    ['Deixem vir a mim as crianças, não as impeçam.', 'Marcos 10:14'],
    ['O Senhor é o meu pastor; nada me faltará.', 'Salmos 23:1'],
    ['Porque Deus amou o mundo de tal maneira que deu o seu Filho único.', 'João 3:16'],
    ['Tudo posso naquele que me fortalece.', 'Filipenses 4:13'],
    ['Filhos, obedeçam a seus pais no Senhor, pois isso é justo.', 'Efésios 6:1'],
    ['Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.', 'Salmos 119:105'],
    ['Sejam bondosos e compassivos uns para com os outros.', 'Efésios 4:32'],
    ['Não tema, pois eu estou com você.', 'Isaías 41:10'],
    ['Deus é amor.', '1 João 4:8'],
    ['Alegrem-se sempre no Senhor.', 'Filipenses 4:4'],
    ['Eu sou a luz do mundo.', 'João 8:12'],
    ['Amem-se uns aos outros como eu os amei.', 'João 15:12']
  ];
  var alvo = document.getElementById('versiculo');
  if (alvo) {
    var dia = Math.floor(Date.now() / 86400000);
    var v = VERSICULOS[dia % VERSICULOS.length];
    alvo.innerHTML = '<blockquote>“' + v[0] + '”</blockquote><cite>' + v[1] + '</cite>';
  }

  // Miniaturas coloridas da home
  document.querySelectorAll('[data-desenho]').forEach(function (el) {
    if (window.Desenhos) el.innerHTML = Desenhos.render(el.getAttribute('data-desenho'), true);
  });
})();

/* Armazenamento local seguro (pode falhar em modo privado) */
window.Guardar = {
  ler: function (k, padrao) {
    try { var v = localStorage.getItem(k); return v === null ? padrao : JSON.parse(v); } catch (e) { return padrao; }
  },
  salvar: function (k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sem armazenamento */ }
  },
  apagar: function (k) {
    try { localStorage.removeItem(k); } catch (e) { /* sem armazenamento */ }
  }
};

/* Sons curtinhos com Web Audio (sem arquivos) */
window.Som = (function () {
  var ctx = null;
  var ligado = window.Guardar.ler('som', true);
  function tocar(notas) {
    if (!ligado) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      var t = ctx.currentTime;
      notas.forEach(function (n, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.value = n;
        g.gain.setValueAtTime(0.0001, t + i * 0.12);
        g.gain.exponentialRampToValueAtTime(0.25, t + i * 0.12 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.12 + 0.25);
        o.connect(g); g.connect(ctx.destination);
        o.start(t + i * 0.12); o.stop(t + i * 0.12 + 0.3);
      });
    } catch (e) { /* sem áudio */ }
  }
  return {
    certo: function () { tocar([523, 659, 784]); },
    errado: function () { tocar([330, 247]); },
    vitoria: function () { tocar([523, 659, 784, 1047]); },
    pop: function () { tocar([880]); },
    ligado: function () { return ligado; },
    alternar: function () { ligado = !ligado; window.Guardar.salvar('som', ligado); return ligado; }
  };
})();
