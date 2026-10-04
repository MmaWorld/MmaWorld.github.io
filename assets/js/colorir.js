/* Página de colorir: galeria + pintura por toque, salvar, imprimir e baixar */
(function () {
  'use strict';

  var CORES = [
    '#ff4d4d', '#ff9f43', '#feca57', '#ffeaa7', '#26de81', '#20bf6b',
    '#2d98da', '#74b9ff', '#a55eea', '#fd79a8', '#8b5a2b', '#d1a679',
    '#f1c27d', '#e0ac69', '#636e72', '#b2bec3', '#2d3436'
  ];
  var BORRACHA = '#ffffff';

  var galeria = document.getElementById('galeria');
  var editor = document.getElementById('editor');
  var quadro = document.getElementById('quadro');
  var paleta = document.getElementById('paleta');
  var corAtualEl = document.getElementById('cor-atual');
  var titulo = document.getElementById('titulo-desenho');
  var refEl = document.getElementById('ref-desenho');
  var modelo = document.getElementById('modelo');

  var atual = null, cor = CORES[0], historico = [];

  function chave(id) { return 'colorir:' + id; }

  function aplicarCores(svg, cores) {
    if (!cores) return;
    svg.querySelectorAll('.r').forEach(function (el, i) {
      if (cores[i]) el.setAttribute('fill', cores[i]);
    });
  }

  function lerCores(svg) {
    return Array.prototype.map.call(svg.querySelectorAll('.r'), function (el) {
      var f = el.getAttribute('fill');
      return f === '#fff' ? null : f;
    });
  }

  // ---------- galeria ----------
  function montarGaleria() {
    galeria.innerHTML = '';
    Desenhos.lista.forEach(function (d) {
      var a = document.createElement('a');
      a.className = 'miniatura';
      a.href = '#' + d.id;
      a.innerHTML = Desenhos.render(d.id, false, d.titulo) + '<strong>' + d.titulo + '</strong><span>' + d.ref + '</span>';
      aplicarCores(a.querySelector('svg'), Guardar.ler(chave(d.id), null));
      galeria.appendChild(a);
    });
  }

  // ---------- paleta ----------
  function montarPaleta() {
    CORES.concat([BORRACHA]).forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cor' + (c === BORRACHA ? ' borracha' : '');
      b.style.background = c;
      b.setAttribute('aria-label', c === BORRACHA ? 'Borracha' : 'Cor ' + c);
      b.setAttribute('aria-pressed', c === cor ? 'true' : 'false');
      if (c === BORRACHA) b.textContent = '🧽';
      b.addEventListener('click', function () { escolher(c); });
      paleta.appendChild(b);
    });
    escolher(cor);
  }

  function escolher(c) {
    cor = c;
    paleta.querySelectorAll('.cor').forEach(function (b, i) {
      var cc = i < CORES.length ? CORES[i] : BORRACHA;
      b.setAttribute('aria-pressed', cc === c ? 'true' : 'false');
    });
    corAtualEl.innerHTML = '<i style="background:' + c + '"></i>' + (c === BORRACHA ? 'Borracha' : 'Cor escolhida');
  }

  // ---------- editor ----------
  function abrir(id) {
    var d = Desenhos.info(id);
    if (!d) { fechar(); return; }
    atual = d;
    historico = [];
    titulo.textContent = d.titulo;
    refEl.textContent = d.ref;
    quadro.innerHTML = Desenhos.render(d.id, false, d.titulo);
    aplicarCores(quadro.querySelector('svg'), Guardar.ler(chave(d.id), null));
    modelo.innerHTML = Desenhos.render(d.id, true, d.titulo + ' (modelo colorido)');
    modelo.classList.remove('visivel');
    document.getElementById('btn-modelo').textContent = '👀 Ver modelo colorido';
    galeria.classList.add('oculto');
    document.getElementById('intro').classList.add('oculto');
    editor.classList.remove('oculto');
    document.title = 'Colorir: ' + d.titulo + ' — Mundo Bíblico Kids';
    window.scrollTo(0, 0);
  }

  function fechar() {
    atual = null;
    editor.classList.add('oculto');
    galeria.classList.remove('oculto');
    document.getElementById('intro').classList.remove('oculto');
    document.title = 'Desenhos Bíblicos para Colorir — Mundo Bíblico Kids';
    montarGaleria();
  }

  function salvar() {
    if (atual) Guardar.salvar(chave(atual.id), lerCores(quadro.querySelector('svg')));
  }

  quadro.addEventListener('click', function (ev) {
    var alvo = ev.target.closest('.r');
    if (!alvo) return;
    var antes = alvo.getAttribute('fill');
    if (antes === cor) return;
    var idx = Array.prototype.indexOf.call(quadro.querySelectorAll('.r'), alvo);
    historico.push([idx, antes]);
    alvo.setAttribute('fill', cor === BORRACHA ? '#fff' : cor);
    Som.pop();
    salvar();
  });

  document.getElementById('btn-desfazer').addEventListener('click', function () {
    var u = historico.pop();
    if (!u) return;
    quadro.querySelectorAll('.r')[u[0]].setAttribute('fill', u[1]);
    salvar();
  });

  document.getElementById('btn-limpar').addEventListener('click', function () {
    if (!confirm('Apagar todas as cores deste desenho?')) return;
    quadro.querySelectorAll('.r').forEach(function (el) { el.setAttribute('fill', '#fff'); });
    historico = [];
    Guardar.apagar(chave(atual.id));
  });

  document.getElementById('btn-modelo').addEventListener('click', function () {
    var v = modelo.classList.toggle('visivel');
    this.textContent = v ? '🙈 Esconder modelo' : '👀 Ver modelo colorido';
  });

  document.getElementById('btn-imprimir').addEventListener('click', function () {
    quadro.classList.add('imprimir-branco');
    window.print();
    setTimeout(function () { quadro.classList.remove('imprimir-branco'); }, 500);
  });

  document.getElementById('btn-baixar').addEventListener('click', function () {
    var svg = quadro.querySelector('svg');
    var xml = new XMLSerializer().serializeToString(svg);
    var img = new Image();
    img.onload = function () {
      var c = document.createElement('canvas');
      c.width = 1600; c.height = 1200;
      var g = c.getContext('2d');
      g.fillStyle = '#fff';
      g.fillRect(0, 0, c.width, c.height);
      g.drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(function (blob) {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'desenho-' + atual.id + '.png';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
      }, 'image/png');
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
  });

  document.getElementById('btn-voltar').addEventListener('click', function () {
    history.pushState('', document.title, location.pathname);
    fechar();
  });

  function rota() {
    var id = location.hash.slice(1);
    if (id) abrir(id); else fechar();
  }
  window.addEventListener('hashchange', rota);

  montarPaleta();
  rota();
})();
