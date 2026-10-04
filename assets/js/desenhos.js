/* Biblioteca de desenhos bíblicos em SVG (feitos à mão, livres de direitos autorais).
 * Cada área pintável tem a classe "r" e a cor original em data-c.
 * Linhas de detalhe usam "l" (só contorno) e "k" (preenchimento preto). */
(function (global) {
  'use strict';

  // ---------- primitivas ----------
  function R(tag, attrs, c) {
    return '<' + tag + ' class="r" fill="#fff" data-c="' + c + '" ' + attrs + '/>';
  }
  function P(d, c) { return R('path', 'd="' + d + '"', c); }
  function C(cx, cy, r, c) { return R('circle', 'cx="' + cx + '" cy="' + cy + '" r="' + r + '"', c); }
  function E(cx, cy, rx, ry, c) {
    return R('ellipse', 'cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '"', c);
  }
  function Q(x, y, w, h, c) {
    return R('rect', 'x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"', c);
  }
  function L(d) { return '<path class="l" fill="none" d="' + d + '"/>'; }
  function K(cx, cy, r) { return '<circle class="k" fill="#222" stroke="none" cx="' + cx + '" cy="' + cy + '" r="' + r + '"/>'; }
  function G(x, y, s, inner, flip) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + (flip ? -s : s) + ' ' + s + ')" ' +
      'stroke-width="' + (3 / s).toFixed(2) + '">' + inner + '</g>';
  }

  // contorno ondulado (nuvem, juba, copa de árvore, pétalas)
  function babado(cx, cy, rx, ry, n) {
    var d = '', i, a, x, y, b = Math.max(rx, ry) * Math.sin(Math.PI / n) * 1.15;
    b = b.toFixed(1);
    for (i = 0; i <= n; i++) {
      a = (i / n) * Math.PI * 2;
      x = (cx + rx * Math.cos(a)).toFixed(1);
      y = (cy + ry * Math.sin(a)).toFixed(1);
      d += i === 0 ? 'M' + x + ' ' + y : ' A' + b + ' ' + b + ' 0 0 1 ' + x + ' ' + y;
    }
    return d + ' Z';
  }

  function estrela(cx, cy, R1, r1, n) {
    var d = '', i, a, rad;
    for (i = 0; i < n * 2; i++) {
      a = -Math.PI / 2 + (i * Math.PI) / n;
      rad = i % 2 ? r1 : R1;
      d += (i ? ' L' : 'M') + (cx + rad * Math.cos(a)).toFixed(1) + ' ' + (cy + rad * Math.sin(a)).toFixed(1);
    }
    return d + ' Z';
  }

  // ---------- elementos reutilizáveis ----------
  function ceu(c) { return Q(0, 0, 400, 300, c); }

  function sol(x, y, r) {
    var h = '', i, a;
    for (i = 0; i < 8; i++) {
      a = (i * Math.PI) / 4;
      h += L('M' + (x + (r + 6) * Math.cos(a)).toFixed(1) + ' ' + (y + (r + 6) * Math.sin(a)).toFixed(1) +
        ' L' + (x + (r + 16) * Math.cos(a)).toFixed(1) + ' ' + (y + (r + 16) * Math.sin(a)).toFixed(1));
    }
    return h + C(x, y, r, '#ffd23f');
  }

  function nuvem(x, y, w) { return P(babado(x, y, w, w * 0.45, 12), '#ffffff'); }

  /* Pessoa com os pés na origem, ~95 unidades de altura.
   * o: pele, roupa, faixa, cabelo, manto (lenço na cabeça), mantoLongo, barba,
   *    bracos: baixo | cima | orar | cajado | funda, boca: feliz | bravo, gancho */
  function pessoaCorpo(o) {
    var p = o.pele || '#f1c27d', r = o.roupa || '#74b9ff', h = '', b = o.bracos || 'baixo';
    if (o.mantoLongo) h += P('M-16 -84 Q0 -100 16 -84 L27 -4 L-27 -4 Z', o.mantoLongo);
    if (b === 'cajado') {
      h += Q(22, -112, 5, 110, '#a0522d');
      if (o.gancho) h += L('M24.5 -112 Q24 -128 36 -126 Q45 -122 41 -112');
    }
    h += E(-8, -3, 8, 4, '#7b4a2a') + E(8, -3, 8, 4, '#7b4a2a');
    h += P('M-14 -60 L14 -60 L22 -5 L-22 -5 Z', r);
    if (o.faixa) h += Q(-17, -38, 34, 6, o.faixa);
    if (b === 'baixo') {
      h += P('M-13 -58 L-25 -30 L-17 -27 L-8 -50 Z', r) + C(-21, -26, 5, p);
      h += P('M13 -58 L25 -30 L17 -27 L8 -50 Z', r) + C(21, -26, 5, p);
    } else if (b === 'cima') {
      h += P('M-12 -58 L-28 -86 L-20 -90 L-6 -60 Z', r) + C(-25, -91, 5, p);
      h += P('M12 -58 L28 -86 L20 -90 L6 -60 Z', r) + C(25, -91, 5, p);
    } else if (b === 'orar') {
      h += P('M-13 -57 L-4 -42 L2 -48 L-7 -59 Z', r) + P('M13 -57 L4 -42 L-2 -48 L7 -59 Z', r);
      h += E(0, -52, 4, 8, p);
    } else if (b === 'cajado') {
      h += P('M-13 -58 L-25 -30 L-17 -27 L-8 -50 Z', r) + C(-21, -26, 5, p);
      h += P('M12 -58 L27 -78 L20 -84 L6 -60 Z', r) + C(24.5, -82, 5, p);
    } else if (b === 'funda') {
      h += P('M-13 -58 L-25 -30 L-17 -27 L-8 -50 Z', r) + C(-21, -26, 5, p);
      h += P('M12 -58 L26 -86 L19 -90 L6 -60 Z', r) + C(23, -91, 5, p);
      h += L('M23 -91 Q42 -112 30 -128') + C(30, -131, 4.5, '#b2bec3');
    }
    h += C(0, -74, 14, p);
    if (o.manto) h += P('M-17 -70 Q-18 -94 0 -94 Q18 -94 17 -70 L20 -52 L12 -56 Q13 -84 0 -84 Q-13 -84 -12 -56 L-20 -52 Z', o.manto);
    else if (o.cabelo) h += P('M-14 -74 Q-15 -91 0 -91 Q15 -91 14 -74 Q9 -83 0 -83 Q-9 -83 -14 -74 Z', o.cabelo);
    if (o.barba) h += P('M-11 -71 Q-10 -56 0 -55 Q10 -56 11 -71 Q6 -64 0 -64 Q-6 -64 -11 -71 Z', o.barba);
    h += K(-5, -76, 1.8) + K(5, -76, 1.8);
    if (o.boca === 'bravo') h += L('M-5 -66 Q0 -70 5 -66') + L('M-9 -82 L-3 -79') + L('M9 -82 L3 -79');
    else h += L('M-5 -68 Q0 -64 5 -68');
    return h;
  }
  function pessoa(o) { return G(o.x, o.y, o.s || 1, pessoaCorpo(o), o.flip); }

  function anjo(x, y, s) {
    var h = P('M-8 -62 Q-55 -100 -46 -30 Q-28 -42 -8 -40 Z', '#ffffff') +
      P('M8 -62 Q55 -100 46 -30 Q28 -42 8 -40 Z', '#ffffff') +
      pessoaCorpo({ roupa: '#fffbe6', faixa: '#ffd23f', cabelo: '#f6c445', bracos: 'cima' }) +
      L('M-12 -100 Q0 -106 12 -100 Q0 -94 -12 -100');
    return G(x, y, s, h);
  }

  function ovelha(x, y, s, flip, la) {
    var h = Q(-16, -14, 5, 14, '#636e72') + Q(-6, -14, 5, 14, '#636e72') +
      Q(6, -14, 5, 14, '#636e72') + Q(14, -14, 5, 14, '#636e72') +
      P(babado(0, -26, 26, 15, 12), la || '#ffffff') +
      E(27, -34, 9, 11, '#636e72') + E(20, -42, 6, 3, '#636e72') + K(30, -36, 1.8);
    return G(x, y, s, h, flip);
  }

  function leao(x, y, s, flip) {
    var h = L('M60 -20 Q80 -30 78 -50') + C(78, -53, 5, '#d35400') +
      E(32, -18, 38, 18, '#f5b041') + E(6, -4, 12, 6, '#f5b041') + E(52, -4, 12, 6, '#f5b041') +
      P(babado(0, -40, 34, 34, 14), '#d35400') +
      C(-16, -60, 7, '#f5b041') + C(16, -60, 7, '#f5b041') +
      C(0, -40, 22, '#f5b041') +
      E(-6, -31, 8, 6, '#fff3e0') + E(6, -31, 8, 6, '#fff3e0') +
      P('M-5 -38 L5 -38 L0 -32 Z', '#6d4c41') +
      K(-8, -46, 2.2) + K(8, -46, 2.2) + L('M-4 -27 Q0 -24 4 -27');
    return G(x, y, s, h, flip);
  }

  function peixe(x, y, s, c, flip) {
    var h = P('M-20 0 L-38 -14 L-38 14 Z', c) + P('M-6 -11 Q2 -26 10 -11 Z', c) +
      E(0, 0, 24, 14, c) + L('M-8 -10 Q-2 0 -8 10') + K(12, -3, 2.5) + L('M16 5 Q20 7 22 4');
    return G(x, y, s, h, flip);
  }

  function passaro(x, y, s, c, flip) {
    var h = P('M-14 -2 L-28 -9 L-26 7 Z', c) + E(0, 0, 16, 10, c) + C(14, -8, 8, c) +
      P('M21 -10 L31 -7 L21 -4 Z', '#ff9f43') + P('M-6 -2 Q2 -22 10 -4 Z', c) + K(16, -10, 1.6);
    return G(x, y, s, h, flip);
  }

  function borboleta(x, y, s, c) {
    var h = E(-8, -6, 9, 7, c) + E(8, -6, 9, 7, c) + E(-7, 6, 7, 6, c) + E(7, 6, 7, 6, c) +
      E(0, 0, 2.5, 11, '#2d3436') + L('M-1 -10 Q-4 -18 -7 -19') + L('M1 -10 Q4 -18 7 -19');
    return G(x, y, s, h);
  }

  function flor(x, y, c) {
    return L('M' + x + ' ' + y + ' L' + x + ' ' + (y - 24)) +
      E(x - 6, y - 10, 6, 3, '#26de81') +
      P(babado(x, y - 30, 8, 8, 6), c) + C(x, y - 30, 4, '#ffd23f');
  }

  function arvore(x, y, s) {
    var h = Q(-9, -70, 18, 70, '#8b5a2b') + P(babado(0, -92, 42, 36, 11), '#3fae4a') +
      C(-18, -100, 6, '#e74c3c') + C(16, -84, 6, '#e74c3c') + C(2, -112, 6, '#e74c3c') + C(-10, -78, 6, '#e74c3c');
    return G(x, y, s, h);
  }

  function palmeira(x, y, s) {
    var h = P('M-6 0 Q-2 -40 8 -80 L16 -78 Q6 -40 6 0 Z', '#a0522d') +
      P('M12 -80 Q-15 -95 -38 -70 Q-12 -82 12 -76 Z', '#2ecc71') +
      P('M12 -80 Q40 -98 60 -72 Q36 -84 12 -76 Z', '#2ecc71') +
      P('M12 -80 Q0 -110 -24 -108 Q2 -100 10 -78 Z', '#27ae60') +
      P('M12 -80 Q30 -112 50 -104 Q28 -100 14 -78 Z', '#27ae60') +
      C(6, -76, 5, '#795548') + C(16, -74, 5, '#795548');
    return G(x, y, s, h);
  }

  function ondas(y, amp, ate) {
    var d = 'M0 ' + y, x;
    for (x = 0; x < 400; x += 50) d += ' Q' + (x + 25) + ' ' + (y - amp) + ' ' + (x + 50) + ' ' + y;
    return d + ' L400 ' + (ate || 300) + ' L0 ' + (ate || 300) + ' Z';
  }

  // ---------- desenhos ----------
  var D = {};

  D.criacao = function () {
    return ceu('#aee2ff') + sol(70, 60, 30) + nuvem(265, 55, 42) + nuvem(370, 95, 26) +
      passaro(195, 70, 1, '#ff6b6b') + passaro(150, 100, 0.7, '#54a0ff', true) +
      P('M150 212 L240 108 L330 212 Z', '#a29bfe') + P('M260 212 L335 140 L400 196 L400 212 Z', '#8c7ae6') +
      L('M222 130 L240 108 L258 130 L248 126 L240 134 L232 126 Z') +
      P('M0 200 Q100 178 200 200 T400 196 L400 300 L0 300 Z', '#7bd36b') +
      P('M260 300 Q275 262 325 252 T400 236 L400 276 Q352 278 335 288 T312 300 Z', '#4fa3e0') +
      peixe(355, 262, 0.5, '#ff9f43') +
      arvore(78, 245, 1) + borboleta(140, 145, 1, '#fd79a8') +
      flor(150, 272, '#ff6b9d') + flor(182, 256, '#a55eea') + flor(214, 278, '#ff9f43') +
      ovelha(255, 238, 0.7, true);
  };

  D.arca = function () {
    var h = ceu('#bde7ff') + sol(345, 50, 26);
    [['#ff6b6b', 160, 144], ['#feca57', 144, 128], ['#48dbfb', 128, 112]].forEach(function (b) {
      h += P('M' + (200 - b[1]) + ' 215 A' + b[1] + ' ' + b[1] + ' 0 0 1 ' + (200 + b[1]) + ' 215 L' + (200 + b[2]) +
        ' 215 A' + b[2] + ' ' + b[2] + ' 0 0 0 ' + (200 - b[2]) + ' 215 Z', b[0]);
    });
    h += nuvem(70, 120, 34) + nuvem(330, 120, 30);
    // pomba com raminho
    h += L('M101 62 L116 58') + E(112, 55, 5, 2.5, '#26de81') + E(118, 61, 5, 2.5, '#26de81') +
      passaro(80, 65, 1, '#ffffff');
    // girafa
    h += Q(238, 92, 13, 60, '#f6c445') + E(250, 90, 14, 9, '#f6c445') +
      L('M244 82 L242 72') + L('M252 81 L252 71') + K(254, 88, 1.8) +
      C(244, 108, 3, '#c0792b') + C(246, 122, 3, '#c0792b');
    h += Q(130, 150, 140, 52, '#deb887') + P('M118 152 L200 112 L282 152 Z', '#c0392b') +
      Q(186, 164, 28, 22, '#fff3b0') + L('M200 164 L200 186');
    h += pessoa({ x: 106, y: 203, s: 0.55, roupa: '#e17055', faixa: '#6d4c41', cabelo: '#dfe6e9', barba: '#dfe6e9', bracos: 'cima' });
    h += P('M88 200 L312 200 L287 252 L113 252 Z', '#a0522d') + L('M95 214 L305 214') + L('M101 228 L299 228');
    h += P(ondas(232, 14), '#4fa3e0') + L('M40 262 Q55 256 70 262') + L('M300 275 Q315 269 330 275');
    return h;
  };

  D.mar = function () {
    var h = ceu('#ffe7a8') + sol(200, 40, 20);
    h += P('M150 72 L250 72 Q268 160 244 300 L156 300 Q132 160 150 72 Z', '#e8c27a');
    h += pessoa({ x: 182, y: 150, s: 0.42, roupa: '#55efc4', cabelo: '#6d4c41', bracos: 'cima' });
    h += pessoa({ x: 220, y: 142, s: 0.42, roupa: '#fd79a8', manto: '#a29bfe', bracos: 'cima' });
    h += P('M0 60 Q30 40 60 60 Q90 80 120 60 Q140 50 152 70 Q130 160 158 300 L0 300 Z', '#3d8bd4');
    h += P('M400 60 Q370 40 340 60 Q310 80 280 60 Q260 50 248 70 Q270 160 242 300 L400 300 Z', '#3d8bd4');
    h += L('M20 110 Q50 98 80 110 Q105 120 125 108') + L('M15 190 Q45 178 75 190 Q100 200 135 188');
    h += L('M380 110 Q350 98 320 110 Q295 120 275 108') + L('M385 190 Q355 178 325 190 Q300 200 265 188');
    h += peixe(65, 150, 0.6, '#ff9f43') + peixe(335, 235, 0.6, '#f368e0', true) + peixe(90, 245, 0.45, '#feca57');
    h += pessoa({ x: 200, y: 262, s: 1.05, roupa: '#e17055', faixa: '#fdcb6e', manto: '#fdcb6e', barba: '#dfe6e9', bracos: 'cajado' });
    return h;
  };

  D.davi = function () {
    var h = ceu('#aee2ff') + sol(60, 50, 24) + nuvem(200, 50, 36);
    h += P('M0 175 Q100 135 200 175 T400 165 L400 300 L0 300 Z', '#a3d977');
    h += P('M0 240 Q200 225 400 245 L400 300 L0 300 Z', '#7bc96f');
    // Golias
    h += Q(339, 70, 6, 200, '#a0522d') + P('M335 72 L342 44 L349 72 Z', '#bdc3c7');
    h += G(300, 272, 2, pessoaCorpo({ roupa: '#95a5a6', faixa: '#c9a227', manto: '#7f8c8d', barba: '#5d4037', boca: 'bravo' }));
    h += C(258, 205, 26, '#c9a227') + C(258, 205, 10, '#e67e22');
    // Davi
    h += ovelha(45, 285, 0.75);
    h += pessoa({ x: 115, y: 272, s: 0.9, roupa: '#55efc4', faixa: '#8b5a2b', cabelo: '#6d4c41', bracos: 'funda' });
    h += E(60, 250, 7, 5, '#b2bec3') + E(76, 255, 6, 4, '#b2bec3') + E(150, 262, 7, 5, '#b2bec3');
    return h;
  };

  D.daniel = function () {
    var h = Q(0, 0, 400, 300, '#8d6e63');
    h += P('M0 0 L150 0 Q120 60 60 70 Q20 80 0 120 Z', '#6d4c41') + P('M400 0 L250 0 Q280 60 340 70 Q380 80 400 120 Z', '#6d4c41');
    h += P('M160 0 L240 0 L232 34 L168 34 Z', '#fff3b0') + P('M168 34 L232 34 L300 300 L100 300 Z', '#fff7cc');
    h += P('M0 240 Q200 218 400 240 L400 300 L0 300 Z', '#a1887f');
    h += E(40, 238, 30, 14, '#795548') + E(370, 236, 26, 12, '#795548');
    h += anjo(85, 172, 0.62);
    h += leao(70, 280, 0.95) + leao(330, 280, 0.95, true);
    h += pessoa({ x: 200, y: 268, s: 1, roupa: '#6c5ce7', faixa: '#fdcb6e', cabelo: '#3e2723', bracos: 'orar' });
    return h;
  };

  D.jonas = function () {
    var h = ceu('#aee2ff') + sol(70, 50, 24) + nuvem(250, 45, 36);
    h += P(ondas(150, 10), '#3d8bd4');
    h += L('M300 120 Q296 100 285 92') + L('M300 120 Q304 100 315 92') + L('M300 120 L300 96');
    h += P('M352 196 L398 152 L392 236 Z', '#74b9ff') + E(275, 200, 95, 55, '#74b9ff') +
      P('M185 214 Q275 272 362 214 Q275 244 185 214 Z', '#dfe6e9') +
      P('M260 150 Q275 130 290 150 Z', '#74b9ff') +
      C(215, 182, 9, '#ffffff') + K(217, 182, 4.5) + L('M182 210 Q200 220 222 212');
    h += P('M0 228 Q60 208 120 236 Q145 262 132 300 L0 300 Z', '#f6d58e');
    h += palmeira(30, 250, 0.9);
    h += pessoa({ x: 80, y: 262, s: 0.72, roupa: '#fd79a8', faixa: '#6d4c41', cabelo: '#4e342e', barba: '#4e342e', bracos: 'cima' });
    h += L('M150 270 Q165 264 180 270') + L('M340 285 Q355 279 370 285');
    return h;
  };

  D.natal = function () {
    var h = ceu('#2c3e66');
    h += P(estrela(200, 40, 24, 10, 5), '#ffd23f') + L('M200 8 L200 0') + L('M170 40 L160 40') + L('M230 40 L240 40');
    h += P(estrela(60, 40, 8, 3.5, 5), '#ffeaa7') + P(estrela(330, 30, 7, 3, 5), '#ffeaa7') + P(estrela(370, 80, 6, 2.5, 5), '#ffeaa7');
    h += P('M0 250 Q200 236 400 250 L400 300 L0 300 Z', '#6ab04c');
    h += Q(72, 122, 256, 138, '#c49a6c') + L('M72 160 L328 160') + L('M72 200 L328 200');
    h += Q(66, 120, 14, 142, '#8b5a2b') + Q(320, 120, 14, 142, '#8b5a2b');
    h += P('M46 128 L200 62 L354 128 L334 138 L200 82 L66 138 Z', '#8b5a2b');
    h += P('M80 262 Q200 248 320 262 L320 270 L80 270 Z', '#f9ca24');
    h += ovelha(312, 268, 0.55, true);
    h += pessoa({ x: 120, y: 266, s: 0.9, roupa: '#ffffff', mantoLongo: '#4a90e2', manto: '#4a90e2', pele: '#e0ac69', bracos: 'orar' });
    h += pessoa({ x: 282, y: 266, s: 0.95, roupa: '#8d6e63', faixa: '#fdcb6e', cabelo: '#5d4037', barba: '#5d4037', pele: '#e0ac69', bracos: 'cajado', flip: true });
    h += L('M170 262 L180 236') + L('M230 262 L220 236');
    h += P('M160 232 Q170 214 180 228 Q190 212 200 228 Q210 212 220 228 Q230 214 240 232 Z', '#f9ca24');
    h += P('M158 230 L242 230 L232 252 L168 252 Z', '#a0522d');
    h += E(205, 224, 26, 10, '#ffffff') + C(180, 220, 9, '#e0ac69') + L('M176 219 Q178 221 180 219') + L('M181 219 Q183 221 185 219');
    h += L('M168 208 Q180 202 192 208');
    return h;
  };

  D.pastor = function () {
    var h = ceu('#aee2ff') + sol(340, 50, 26) + nuvem(120, 50, 36);
    h += P('M0 190 Q120 140 240 180 T400 160 L400 300 L0 300 Z', '#7bd36b');
    h += P('M0 230 Q160 205 400 235 L400 300 L0 300 Z', '#59b74a');
    h += E(330, 168, 22, 8, '#b2bec3') + ovelha(330, 170, 0.38);
    h += flor(18, 290, '#ff6b9d') + flor(385, 292, '#feca57') + flor(195, 290, '#a55eea');
    h += pessoa({ x: 140, y: 268, s: 1.1, roupa: '#ffffff', faixa: '#c0392b', mantoLongo: '#c0392b', cabelo: '#5d4037', barba: '#5d4037', pele: '#e0ac69', bracos: 'cajado', gancho: true });
    h += ovelha(250, 275, 1) + ovelha(310, 250, 0.75) + ovelha(70, 280, 0.65, true);
    return h;
  };

  var LISTA = [
    { id: 'criacao', titulo: 'A Criação do Mundo', ref: 'Gênesis 1–2' },
    { id: 'arca', titulo: 'A Arca de Noé', ref: 'Gênesis 6–9' },
    { id: 'mar', titulo: 'Moisés e o Mar Vermelho', ref: 'Êxodo 14' },
    { id: 'davi', titulo: 'Davi e Golias', ref: '1 Samuel 17' },
    { id: 'daniel', titulo: 'Daniel na Cova dos Leões', ref: 'Daniel 6' },
    { id: 'jonas', titulo: 'Jonas e o Grande Peixe', ref: 'Jonas 1–3' },
    { id: 'natal', titulo: 'O Nascimento de Jesus', ref: 'Lucas 2' },
    { id: 'pastor', titulo: 'O Bom Pastor', ref: 'Lucas 15; João 10' }
  ];

  function render(id, colorido, titulo) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="desenho" role="img" ' +
      'aria-label="' + (titulo || id) + '" stroke="#222" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' +
      D[id]() + '</svg>';
    if (colorido) svg = svg.replace(/fill="#fff" data-c="([^"]+)"/g, 'fill="$1" data-c="$1"');
    return svg;
  }

  global.Desenhos = { lista: LISTA, render: render, info: function (id) {
    for (var i = 0; i < LISTA.length; i++) if (LISTA[i].id === id) return LISTA[i];
    return null;
  } };
})(window);
