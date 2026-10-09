/* Амфодент — прототип 3 «Оливковый». Общая логика: шапка, подвал, корзина, поиск, меню. */
(function(){
var A=window.AMF, $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var KEY='amf_p3_cart', FKEY='amf_p3_fav', CKEY='amf_p3_cmp';
A.advantages.forEach(function(a){if(a[0]==='years')a[1]='33 года на рынке';});

/* ---------- иконки: сплошные «гравированные» силуэты (заливка), стрелки — линией ---------- */
var I={
 search:'<path fill-rule="evenodd" d="M10.5 3a7.5 7.5 0 0 1 6 12l4.3 4.3-1.5 1.5-4.3-4.3A7.5 7.5 0 1 1 10.5 3Zm0 2.2a5.3 5.3 0 1 0 0 10.6 5.3 5.3 0 0 0 0-10.6Z"/>',
 phone:'<path d="M6.6 2.5 9.4 2l1.6 4.6-2.1 1.6a12 12 0 0 0 6.9 6.9l1.6-2.1 4.6 1.6-.5 2.8a2.4 2.4 0 0 1-2.4 2.1C10.4 19.5 4.5 13.6 4.5 4.9a2.4 2.4 0 0 1 2.1-2.4Z"/>',
 user:'<path d="M12 3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9ZM3.5 21c0-4.4 3.8-7.5 8.5-7.5s8.5 3.1 8.5 7.5Z"/>',
 heart:'<path d="M12 21 3.6 12.6A5.2 5.2 0 0 1 11 5.2l1 1 1-1a5.2 5.2 0 0 1 7.4 7.4Z"/>',
 cart:'<path d="M2 3.5h3.2l.6 2.5H22l-2.6 9.3a2 2 0 0 1-1.9 1.4H8.4a2 2 0 0 1-1.9-1.5L4 5.5H2ZM9 18.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5Zm8.5 0a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5Z"/>',
 scales:'<path d="M11 3h2v2.2l5.5 1.3-.1 1L21.5 14a3.5 3.5 0 0 1-7 0l2.7-6.1-4.2-1V19h4v2H7v-2h4V6.9l-4.2 1L9.5 14a3.5 3.5 0 0 1-7 0l3.1-6.5-.1-1L11 5.2ZM4.6 14h2.8L6 10.6Zm12 0h2.8L18 10.6Z"/>',
 menu:'<path class="s" d="M4 6h16M4 12h16M4 18h10"/>',
 chevD:'<path class="s" d="m6 9 6 6 6-6"/>', chevR:'<path class="s" d="m9 6 6 6-6 6"/>', chevL:'<path class="s" d="m15 6-6 6 6 6"/>',
 arrow:'<path class="s" d="M4 12h15M13.5 6.5 19 12l-5.5 5.5"/>',
 x:'<path class="s" d="M6 6l12 12M18 6 6 18"/>',
 plus:'<path class="s" d="M12 5v14M5 12h14"/>', minus:'<path class="s" d="M5 12h14"/>',
 check:'<path class="s" d="m5 12.5 4.5 4.5L19 7.5"/>',
 list:'<path class="s" d="M9 6h11M9 12h11M9 18h11"/><path d="M3.5 4.5h3v3h-3Zm0 6h3v3h-3Zm0 6h3v3h-3Z"/>',
 sliders:'<path class="s" d="M4 7h16M4 17h16"/><path d="M9 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm6 10a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/>',
 pin:'<path fill-rule="evenodd" d="M12 2a7 7 0 0 1 7 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 0 1 7-7Zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"/>',
 mail:'<path fill-rule="evenodd" d="M2 5h20v14H2Zm2 2v1.8l8 5.4 8-5.4V7l-8 5.5Z"/>',
 truck:'<path d="M2 5h12v10h1V8h4l3 4v5h-1.6a2.6 2.6 0 0 0-5 0H9.6a2.6 2.6 0 0 0-5 0H2ZM7 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm10 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>',
 shield:'<path fill-rule="evenodd" d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5Zm-1.2 13.4L7.6 12.2l1.4-1.4 1.8 1.8 4.2-4.2 1.4 1.4Z"/>',
 gear:'<path fill-rule="evenodd" d="M10.5 2h3l.5 2.6 1.6.7 2.2-1.5 2.1 2.1-1.5 2.2.7 1.6 2.6.5v3l-2.6.5-.7 1.6 1.5 2.2-2.1 2.1-2.2-1.5-1.6.7-.5 2.6h-3l-.5-2.6-1.6-.7-2.2 1.5-2.1-2.1 1.5-2.2-.7-1.6L2 13.5v-3l2.6-.5.7-1.6-1.5-2.2 2.1-2.1 2.2 1.5 1.6-.7ZM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/>',
 medal:'<path fill-rule="evenodd" d="M7 2h10l-3.2 6.6A6.5 6.5 0 1 1 10.2 8.6Zm5 9.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/>',
 key:'<path fill-rule="evenodd" d="M8 9.5a5.75 5.75 0 1 1 0 11.5 5.75 5.75 0 0 1 0-11.5Zm0 3.3a2.45 2.45 0 1 0 0 4.9 2.45 2.45 0 0 0 0-4.9Z"/><path d="m11.2 11.4 8-8L21 5.2l-1.2 1.2 1.6 1.6-1.6 1.6-1.6-1.6-.9.9 1.2 1.2-1.6 1.6-1.2-1.2-2.7 2.7Z"/>',
 grid:'<path d="M4 4h7v7H4Zm9 0h7v7h-7ZM4 13h7v7H4Zm9 0h7v7h-7Z"/>',
 trash:'<path d="M9 3h6l1 2h4v2H4V5h4ZM5.5 8.5h13L17.6 20a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8Z"/>',
 zoom:'<path fill-rule="evenodd" d="M10.5 3a7.5 7.5 0 0 1 6 12l4.3 4.3-1.5 1.5-4.3-4.3A7.5 7.5 0 1 1 10.5 3Zm0 2.2a5.3 5.3 0 1 0 0 10.6 5.3 5.3 0 0 0 0-10.6Z"/><path d="M9.5 7.5h2v2h2v2h-2v2h-2v-2h-2v-2h2Z"/>',
 percent:'<path class="s" d="M19 5 5 19"/><path d="M7 3.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm10 10a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"/>',
 clinic:'<path fill-rule="evenodd" d="M12 2.5 2 9v2h2v10h16V11h2V9Zm-1.2 7h2.4v2.3h2.3v2.4h-2.3V16h-2.4v-2.3H8.5v-2.4h2.3Z"/>',
 clock:'<path fill-rule="evenodd" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm-1 5v6.2l5 3 1-1.6-4-2.4V7Z"/>',
 doc:'<path fill-rule="evenodd" d="M6 2h8l5 5v15H6Zm7 1.5V8h4.5ZM9 12h7v1.6H9Zm0 3.5h7v1.6H9Z"/>',
 headset:'<path d="M12 3a8.5 8.5 0 0 0-8.5 8.5V17A3 3 0 0 0 6.5 20H8v-7.5H5.6v-1a6.4 6.4 0 0 1 12.8 0v1H16V20h1.5a3 3 0 0 0 3-3v-5.5A8.5 8.5 0 0 0 12 3Z"/>',
 card:'<path fill-rule="evenodd" d="M2 5h20v4H2Zm0 6h20v8H2Zm3 4v2h6v-2Z"/>',
 cash:'<path fill-rule="evenodd" d="M2 6h20v12H2Zm10 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>',
 star:'<path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.5l1.3-6.6-4.9-4.6 6.6-.8Z"/>',
 box:'<path d="m12 2 9 4.5-9 4.5-9-4.5Zm-9.5 6.2 8.7 4.4v9.1l-8.7-4.4Zm19 0v9.1l-8.7 4.4v-9.1Z"/>',
 tooth:'<path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4 2 7 .4 2.5 1 6.5 2.5 6.5S9.5 17 12 17s2.5 4 4.5 4 2.1-4 2.5-6.5c.5-3 2-4 2-7C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3Z"/>',
 /* категории */
 chair:'<path d="M4.5 3h3.2l2.1 9h8.2a2 2 0 0 1 2 2v2H8.6a2 2 0 0 1-1.9-1.5ZM9.5 17.5h2V20h5v2H6.5v-2h3Z"/>',
 handpiece:'<path d="M3 19.4 13.6 8.8l2.1 2.1L5.1 21.5A1.5 1.5 0 0 1 3 19.4ZM14.6 7.8l2.6-2.6 3.6.9-.9 3.6-2.6 2.6Z"/>',
 xray:'<path fill-rule="evenodd" d="M3 4h18v12H3Zm2 2v8h14V6ZM10 17.5h4V20h3v1.5H7V20h3Z"/><path d="M10 7.5c-1.3 0-2 1-2 2.1 0 1.5.8 2 1 3.4.1.6.3 1.5.7 1.5s.6-1.5 1.3-1.5 1 1.5 1.3 1.5.6-.9.7-1.5c.2-1.4 1-1.9 1-3.4 0-1.1-.7-2.1-2-2.1-.6 0-.9.3-1.5.3S10.6 7.5 10 7.5Z"/>',
 steril:'<path fill-rule="evenodd" d="M3 5h18v15H3Zm9 3.5a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5ZM5 6.5v1.5h4V6.5Z"/>',
 scalpel:'<path d="M3 21 13 9.5l2.8 2.8L6.4 21.6ZM14.2 8.3l5.6-5.6 2 2-5.6 5.6Z"/>',
 mirror:'<path fill-rule="evenodd" d="M15 2.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 2.3a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Z"/><path d="m9.5 13.1 1.4 1.4L4.4 21 3 19.6Z"/>',
 needle:'<path d="M4 19.6 16 7.6l1.4 1.4-12 12ZM16.8 3.2h4v4l-2 2-4-4Z"/>',
 microscope:'<path d="M9 2h4v2h-.8v6.5h2.3a5.2 5.2 0 0 1 4.4 7.5H20v2H4v-2h9a3.2 3.2 0 0 0 3-3.4h-6.3V10H9V4h-.8V2Z"/><path d="M6 21.5h12V23H6Z"/>',
 wrench:'<path d="M15 2.5a5 5 0 0 0-4.7 6.7l-7.6 7.6a2 2 0 0 0 2.8 2.8l7.6-7.6A5 5 0 0 0 19.8 7l-2.9 2.9-2.8-.8-.8-2.8Z"/>',
 jar:'<path fill-rule="evenodd" d="M7 3h10v3H7Zm-1 4.5h12V19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Zm3 4v5h6v-5Z"/>',
 stool:'<path d="M6 3h12a2 2 0 0 1 0 4H6a2 2 0 0 1 0-4Zm5 5h2v6h4v2h-3l2 5h-2.1L12 17l-1.9 4H8l2-5H7v-2h4Z"/>'
};
I.compare=I.scales; I.award=I.medal;
var CATIC=['chair','tooth','handpiece','xray','steril','scalpel','mirror','needle','microscope','wrench','jar','stool'];
A.catIc=function(i){return CATIC[i]||'grid';};
var VK='<svg class="ico" viewBox="0 0 24 24"><path d="M12.8 17.5C6.9 17.5 3.5 13.4 3.4 6.6h3c.1 5 2.3 7.1 4 7.5V6.6h2.8v4.3c1.7-.2 3.5-2.1 4.1-4.3h2.8c-.5 2.6-2.4 4.5-3.8 5.3 1.4.6 3.6 2.3 4.4 5.6h-3.1c-.7-2.2-2.4-3.9-4.4-4.1v4.1Z"/></svg>';
var TG='<svg class="ico" viewBox="0 0 24 24"><path d="M20.7 4.3 3.4 11c-1.2.5-1.2 1.2-.2 1.5l4.4 1.4 1.7 5.2c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.2-2.1 4.5 3.3c.8.5 1.4.2 1.6-.8l2.9-13.7c.3-1.2-.4-1.7-1.5-1.3ZM8.8 13.6l8.6-5.4c.4-.3.8-.1.5.2l-7.1 6.4-.3 3.3Z"/></svg>';
function ic(n,c){return '<svg class="ico '+(c||'')+'" viewBox="0 0 24 24" aria-hidden="true">'+(I[n]||'')+'</svg>';}
A.ic=ic;

/* ---------- утилиты ---------- */
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function num(p){var n=parseInt(String(p).replace(/[^\d]/g,''),10);return isNaN(n)?0:n;}
function rub(n){return n.toLocaleString('ru-RU').replace(/,/g,' ')+' ₽';}
function href(h){if(!h)return '#';if(/^(https?:|tel:|mailto:|#)/.test(h)||/\.html/.test(h))return h;return A.site+h;}
function store(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k)||'null');localStorage.setItem(k,JSON.stringify(v));}catch(e){return null;}}
A.util={esc:esc,num:num,rub:rub,href:href,$:$,$$:$$};

/* ---------- корзина, избранное, сравнение ---------- */
var cart=store(KEY), fav=store(FKEY)||[], cmp=store(CKEY)||[];
if(!cart){cart={'2829':1,'9925':2};store(KEY,cart);}
A.cart={
  get:function(){return cart;},
  count:function(){var n=0;for(var k in cart)n+=cart[k];return n;},
  add:function(id,q){cart[id]=(cart[id]||0)+(q||1);store(KEY,cart);sync();toast(id,'Добавлено в корзину');},
  set:function(id,q){if(q<=0)delete cart[id];else cart[id]=q;store(KEY,cart);sync();},
  clear:function(){cart={};store(KEY,cart);sync();},
  total:function(){var t=0;for(var k in cart){var p=A.byId[k];if(p)t+=num(p.price)*cart[k];}return t;}
};
A.fav={has:function(id){return fav.indexOf(id)>=0;},toggle:function(id){var i=fav.indexOf(id);if(i>=0)fav.splice(i,1);else fav.push(id);store(FKEY,fav);sync();return i<0;}};
A.cmp={has:function(id){return cmp.indexOf(id)>=0;},toggle:function(id){var i=cmp.indexOf(id);if(i>=0)cmp.splice(i,1);else{if(cmp.length>=4)cmp.shift();cmp.push(id);}store(CKEY,cmp);sync();if(i<0)toast(id,'Добавлено к сравнению');}};
function sync(){
  var n=A.cart.count();
  $$('[data-cart-n]').forEach(function(e){e.textContent=n||'';e.setAttribute('data-n',n);});
  $$('[data-cart-sum]').forEach(function(e){e.textContent=n?rub(A.cart.total()):'пусто';});
  $$('[data-fav-n]').forEach(function(e){e.textContent=fav.length||'';e.setAttribute('data-n',fav.length);});
  $$('[data-cmp-n]').forEach(function(e){e.textContent=cmp.length||'';e.setAttribute('data-n',cmp.length);});
  $$('[data-fav]').forEach(function(b){b.classList.toggle('is-on',A.fav.has(b.getAttribute('data-fav')));});
  $$('[data-cmp]').forEach(function(b){b.classList.toggle('is-on',A.cmp.has(b.getAttribute('data-cmp')));});
  document.dispatchEvent(new Event('amf:cart'));
}
A.sync=sync;

/* ---------- карточка товара: «витринная», без рамки ---------- */
function badgeHtml(m){var c=/Скидка/.test(m)?'lb-sale':/TOP/.test(m)?'lb-top':/Новинка/.test(m)?'lb-new':'lb-soft';var t=/Скидка/.test(m)?m.replace('Скидка ','−').replace(' %','%'):/TOP/.test(m)?'Хит':m;return '<span class="lb '+c+'">'+esc(t)+'</span>';}
function stockCls(s){return /Не доступен|Нет/.test(s)?'is-none':/Доступен для заказа|заказ/i.test(s)?'is-order':'';}
function stockTxt(s){return /Не доступен/.test(s)?'Нет в наличии':/Доступен для заказа/.test(s)?'Под заказ':s;}
function priceHtml(p){if(!num(p.price))return '<div class="price"><span class="ask">Цена по запросу</span></div>';return '<div class="price"><b>'+esc(p.price)+'</b>'+(p.old?'<s>'+esc(p.old)+'</s>':'')+'</div>';}
function purl(p){return 'product.html?id='+encodeURIComponent(p.id);}
A.purl=purl;
A.card=function(p){
  var can=num(p.price)>0&&!/Не доступен/.test(p.stock);
  var by=[p.brand,p.country&&('('+p.country+')')].filter(Boolean).join(' ');
  return '<article class="card">'+
   '<a class="card__img" href="'+purl(p)+'"><span class="card__lbs">'+p.marks.map(badgeHtml).join('')+'</span><img loading="lazy" src="'+esc(p.img)+'" alt="'+esc(p.name)+'"></a>'+
   '<button class="card__fav" data-fav="'+p.id+'" aria-label="В избранное">'+ic('heart')+'</button>'+
   '<a class="card__t" href="'+purl(p)+'">'+esc(p.name)+'</a>'+
   '<div class="card__by">'+esc(by||('Арт. '+p.model))+'</div>'+
   '<div class="card__pr">'+priceHtml(p)+'<span class="stock '+stockCls(p.stock)+'">'+esc(stockTxt(p.stock))+'</span></div>'+
   '<div class="card__act">'+
     (can?'<button class="btn btn-olive btn-sm" data-add="'+p.id+'">'+ic('cart')+'В корзину</button>'
         :'<button class="btn btn-line btn-sm" data-modal="callback">'+ic('phone')+'Узнать цену</button>')+
     '<button class="ibtn" data-cmp="'+p.id+'" aria-label="Сравнить">'+ic('scales')+'</button>'+
   '</div></article>';
};
A.stockCls=stockCls;A.stockTxt=stockTxt;A.priceHtml=priceHtml;A.badgeHtml=badgeHtml;

/* ---------- шапка ---------- */
function logo(white){return '<a class="logo" href="index.html" aria-label="Амфодент — на главную"><img class="logo__em" src="assets/img/emblem.svg" alt=""><span class="logo__txt"><img class="logo__wm" src="assets/img/wordmark'+(white?'-white':'')+'.svg" alt="Амфодент"><span class="logo__tag">Стоматологическое оборудование</span></span></a>';}
function catHref(c){return href(c[2]==='stomatologicheskoe-oborudovanie/'?'catalog.html':c[2]);}
A.catHref=catHref;
function header(active){
  var navItems=[['Стоматологические установки','catalog.html','chair'],['Наконечники','stomatologicheskie-nakonechniki-i-motory/','handpiece'],['Рентгенология','rentgenovskiy-apparat-i-oborudovanie/','xray'],['Стерилизация','sterilizacionnoe-oborudovanie/','steril'],['Мебель','medicinskuyu-mebel-dlya-stomatologicheskih-kabinetov/','stool'],['Инструменты','stomatologicheskie-instrumenty/','wrench']];
  var nav=navItems.map(function(n){return '<a href="'+href(n[1])+'"'+(n[1]===active?' class="is-active"':'')+'>'+ic(n[2])+esc(n[0])+'</a>';}).join('');
  var mega=A.cats.map(function(c,i){return '<a class="mega__item" href="'+catHref(c)+'"><span class="mega__ic">'+ic(CATIC[i])+'</span>'+esc(c[0])+'</a>';}).join('');
  return ''+
  '<div class="util"><div class="wrap util__in"><nav>'+A.topLinks.map(function(l){return '<a href="'+href(l[1])+'">'+esc(l[0])+'</a>';}).join('')+'</nav><span class="util__r">'+ic('pin')+'Санкт-Петербург<span class="util__sep"></span><a href="'+A.phone2Href+'">'+A.phone2+'</a></span></div></div>'+
  '<header class="header"><div class="wrap header__main">'+
    '<button class="ibtn burger" data-drawer="menu" aria-label="Меню">'+ic('menu')+'</button>'+
    logo(false)+
    '<form class="search" action="catalog.html" role="search" autocomplete="off"><div class="search__box">'+ic('search')+'<input class="search__input" name="q" placeholder="Поиск по товарам, брендам, артикулам…" aria-label="Поиск"><button class="search__btn" type="submit">Найти</button></div><div class="search__drop" role="listbox"></div></form>'+
    '<div class="contact"><a class="contact__phone" href="'+A.phoneHref+'">'+A.phone+'</a><button class="contact__cb" data-modal="callback">Заказать звонок</button></div>'+
    '<div class="hacts">'+
      '<a class="hact hide-m" href="'+href('specials/')+'" title="Спецпредложения">'+ic('percent')+'<span>Спецпредложения</span></a>'+
      '<a class="hact hide-m" href="#" data-modal="kp" title="Коммерческое предложение">'+ic('doc')+'<span>Коммерческое<br>предложение</span></a>'+
      '<a class="hact hide-m" href="#" data-modal="fav" title="Избранное">'+ic('heart')+'<span>Избранное</span><i data-fav-n></i></a>'+
      '<a class="hact hact-cart" href="cart.html">'+ic('cart')+'<span>Корзина<small data-cart-sum></small></span><i data-cart-n></i></a>'+
    '</div>'+
  '</div></header>'+
  '<div class="navbar"><div class="wrap navbar__in">'+
    '<button class="catbtn" aria-expanded="false" data-mega>'+ic('menu')+'<span>Каталог товаров</span></button>'+
    '<nav class="navlinks">'+nav+'</nav>'+
    '<a class="nbrands" href="'+href('brands/')+'">Бренды'+ic('arrow')+'</a>'+
    '<div class="mega"><div class="mega__panel"><div class="mega__grid">'+mega+'</div><div class="mega__foot"><span>Более 200 производителей в каталоге</span><a href="'+href('brands/')+'">Все производители '+ic('arrow','ico-sm')+'</a></div></div></div>'+
  '</div></div>';
}
function footer(){
  function col(t,l){return '<div class="fcol"><h4>'+t+'</h4><ul>'+l.map(function(x){return '<li><a href="'+href(x[1])+'">'+esc(x[0])+'</a></li>';}).join('')+'</ul></div>';}
  return '<footer class="footer"><div class="wrap footer__top">'+
   '<div class="fcol fcol-about">'+logo(true)+'<p>Оптовые и розничные поставки стоматологического оборудования и материалов с 1993 года. Товарные предложения на сайте не являются публичной офертой (ст. 437 (2) ГК РФ).</p><div class="socials"><a href="#" aria-label="ВКонтакте">'+VK+'</a><a href="#" aria-label="Telegram">'+TG+'</a></div></div>'+
   col('Каталог',A.footer.catalog.slice(0,7))+col('Покупателям',A.footer.buyers)+col('Компания',A.footer.company)+
   '<div class="fcol"><h4>Контакты</h4>'+
     '<a class="fphone" href="'+A.phoneHref+'">'+A.phone+'</a><span class="fnote">Бесплатно по России</span>'+
     '<a class="fphone" href="'+A.phone2Href+'">'+A.phone2+'</a><span class="fnote">Мобильный</span>'+
     '<a class="fmail" href="mailto:'+A.email+'">'+ic('mail')+A.email+'</a>'+
     '<div class="faddr">'+ic('pin')+esc(A.address)+'</div>'+
   '</div></div>'+
   '<div class="footer__bot"><div class="wrap"><span>© 1993–2026 Амфодент</span><span><a href="'+href('privacy/')+'">Политика конфиденциальности</a><a href="'+href('terms/')+'">Условия соглашения</a></span></div></div></footer>';
}
function chrome(){
  var h=$('[data-header]'),f=$('[data-footer]'),act=(h&&h.getAttribute('data-header'))||'';
  if(h)h.outerHTML=header(act);
  if(f)f.outerHTML=footer();
  document.body.insertAdjacentHTML('beforeend',
   '<div class="toast" role="status" aria-live="polite"></div>'+
   '<div class="proto"><i></i>Прототип 3 · оливковый · <a href="../index.html">все варианты</a></div>'+
   modal('callback','<h3>Заказать звонок</h3><p>Перезвоним в рабочее время и поможем подобрать оборудование.</p><div class="field"><label>Имя</label><input class="input" placeholder="Как к вам обращаться"></div><div class="field"><label>Телефон <i>*</i></label><input class="input" type="tel" placeholder="+7 (___) ___-__-__"></div><button class="btn btn-olive btn-block btn-lg" data-proto>Перезвоните мне</button>')+
   modal('kp','<h3>Коммерческое предложение</h3><p>Опишите задачу — менеджер подготовит предложение с ценами и сроками поставки.</p><div class="field"><label>Организация</label><input class="input" placeholder="Название клиники"></div><div class="field"><label>Email <i>*</i></label><input class="input" type="email" placeholder="you@clinic.ru"></div><div class="field"><label>Что нужно</label><textarea class="input" placeholder="Например: оснащение кабинета, 2 установки"></textarea></div><button class="btn btn-olive btn-block btn-lg" data-proto>Запросить предложение</button>')+
   modal('fav','<h3>Избранное</h3><div data-fav-list></div>')+
   modal('proto','<h3>Это прототип</h3><p>Кнопка показывает, как будет работать сайт. Данные никуда не отправляются.</p><button class="btn btn-olive btn-block" data-close>Понятно</button>')+
   '<div class="drawer" data-drawer-menu><div class="drawer__bg" data-close></div><div class="drawer__panel"><div class="drawer__head">'+logo(false)+'<button class="ibtn" data-close aria-label="Закрыть">'+ic('x')+'</button></div><div class="drawer__list">'+
     A.cats.map(function(c,i){return '<a href="'+catHref(c)+'"><span class="mega__ic">'+ic(CATIC[i])+'</span>'+esc(c[0])+'</a>';}).join('')+
     A.topLinks.map(function(l){return '<a class="drawer__link" href="'+href(l[1])+'">'+esc(l[0])+'</a>';}).join('')+
   '</div><div class="drawer__contacts"><a class="contact__phone" href="'+A.phoneHref+'">'+A.phone+'</a><a href="mailto:'+A.email+'">'+A.email+'</a><button class="btn btn-olive" data-modal="callback">Заказать звонок</button></div></div></div>');
}
function modal(id,body){return '<div class="modal" data-modal-id="'+id+'" role="dialog" aria-modal="true"><div class="modal__box"><button class="ibtn modal__x" data-close aria-label="Закрыть">'+ic('x')+'</button>'+body+'</div></div>';}
A.openModal=function(id){var m=$('[data-modal-id="'+id+'"]');if(!m)return;if(id==='fav')renderFav();m.classList.add('is-open');};
function renderFav(){var box=$('[data-fav-list]');if(!box)return;var items=fav.map(function(id){return A.byId[id];}).filter(Boolean);
  box.innerHTML=items.length?'<div class="mini-items">'+items.map(function(p){return '<a class="mini" href="'+purl(p)+'"><img src="'+esc(p.img)+'" alt=""><span>'+esc(p.name)+'</span><b>'+esc(num(p.price)?p.price:'')+'</b></a>';}).join('')+'</div><a class="btn btn-olive btn-block" href="cart.html">Перейти в корзину</a>':'<p>Нажмите ♡ на карточке товара, чтобы сохранить его здесь.</p>';}

/* ---------- тост ---------- */
var tt;function toast(id,msg){var p=A.byId[id],t=$('.toast');if(!t||!p)return;t.innerHTML='<img src="'+esc(p.img)+'" alt=""><div><b>'+msg+'</b><small>'+esc(p.name)+'</small></div><a class="btn btn-olive btn-sm" href="cart.html">Корзина</a>';t.classList.add('is-on');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('is-on');},3200);}

/* ---------- поиск ---------- */
function initSearch(){
  var f=$('.search');if(!f)return;var inp=$('.search__input',f),drop=$('.search__drop',f),list=Object.keys(A.byId).map(function(k){return A.byId[k];}),cur=-1;
  var q0=new URLSearchParams(location.search).get('q');if(q0)inp.value=q0;
  function render(){var q=inp.value.trim().toLowerCase();if(q.length<2){f.classList.remove('is-open');return;}
    var words=q.split(/\s+/),r=list.filter(function(p){var s=(p.name+' '+p.model+' '+p.brand).toLowerCase();return words.every(function(w){return s.indexOf(w)>=0;});}).slice(0,6);
    drop.innerHTML=(r.length?r.map(function(p){return '<a class="sugg" role="option" href="'+purl(p)+'"><img src="'+esc(p.img)+'" alt=""><span><b>'+esc(p.name)+'</b><small>'+esc(p.model)+'</small></span><span class="sugg__price">'+(num(p.price)?esc(p.price):'')+'</span></a>';}).join(''):'<div class="sugg-empty">Ничего не нашлось. Попробуйте другое слово или артикул.</div>')+'<a class="sugg-all" href="catalog.html?q='+encodeURIComponent(inp.value)+'">Все результаты '+ic('arrow','ico-sm')+'</a>';
    f.classList.add('is-open');cur=-1;}
  inp.addEventListener('input',render);inp.addEventListener('focus',render);
  inp.addEventListener('keydown',function(e){var it=$$('.sugg',drop);if(!it.length)return;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();cur=(cur+(e.key==='ArrowDown'?1:-1)+it.length)%it.length;it.forEach(function(x,i){x.classList.toggle('is-active',i===cur);});}else if(e.key==='Enter'&&cur>=0){e.preventDefault();location.href=it[cur].href;}else if(e.key==='Escape')f.classList.remove('is-open');});
  document.addEventListener('click',function(e){if(!f.contains(e.target))f.classList.remove('is-open');});
}

/* ---------- лента ---------- */
A.rail=function(el){var tr=$('.rail__track',el),p=$('.rail__btn.prev',el),n=$('.rail__btn.next',el);if(!tr)return;
  if(p&&!p.innerHTML)p.innerHTML=ic('chevL');if(n&&!n.innerHTML)n.innerHTML=ic('chevR');
  function upd(){if(!p)return;p.disabled=tr.scrollLeft<8;n.disabled=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-8;}
  function go(d){var c=tr.firstElementChild;var w=c?c.getBoundingClientRect().width+18:300;tr.scrollBy({left:d*w*2,behavior:'smooth'});}
  if(p){p.onclick=function(){go(-1);};n.onclick=function(){go(1);};}tr.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);setTimeout(upd,60);upd();};

/* ---------- события ---------- */
document.addEventListener('click',function(e){
  if(e.target.classList&&e.target.classList.contains('modal')){e.target.classList.remove('is-open');return;}
  var t=e.target.closest('[data-add],[data-fav],[data-cmp],[data-modal],[data-close],[data-mega],[data-drawer],[data-proto]');
  if(!t){var mg=$('.mega.is-open');if(mg&&!e.target.closest('.mega')){mg.classList.remove('is-open');$('[data-mega]').setAttribute('aria-expanded','false');}return;}
  if(t.hasAttribute('data-add')){e.preventDefault();var q=1,qi=t.getAttribute('data-qty');if(qi){var el=$(qi);q=Math.max(1,parseInt(el&&el.value,10)||1);}A.cart.add(t.getAttribute('data-add'),q);t.classList.add('is-added');}
  else if(t.hasAttribute('data-fav')){e.preventDefault();A.fav.toggle(t.getAttribute('data-fav'));}
  else if(t.hasAttribute('data-cmp')){e.preventDefault();A.cmp.toggle(t.getAttribute('data-cmp'));}
  else if(t.hasAttribute('data-modal')){e.preventDefault();A.openModal(t.getAttribute('data-modal'));}
  else if(t.hasAttribute('data-proto')){e.preventDefault();$$('.modal.is-open').forEach(function(m){m.classList.remove('is-open');});A.openModal('proto');}
  else if(t.hasAttribute('data-close')){var m=t.closest('.modal,.drawer');if(m)m.classList.remove('is-open');}
  else if(t.hasAttribute('data-mega')){var mg2=$('.mega');var o=mg2.classList.toggle('is-open');t.setAttribute('aria-expanded',o);}
  else if(t.hasAttribute('data-drawer')){var d=$('[data-drawer-'+t.getAttribute('data-drawer')+']');if(d)d.classList.add('is-open');}
});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){$$('.modal.is-open,.drawer.is-open,.mega.is-open').forEach(function(m){m.classList.remove('is-open');});}});

function fitNav(){var n=$('.navlinks');if(!n)return;var ls=$$('a',n);ls.forEach(function(a){a.classList.remove('is-hidden');});var r=n.getBoundingClientRect().right;for(var i=ls.length-1;i>=0;i--){if(ls[i].getBoundingClientRect().right>r+1)ls[i].classList.add('is-hidden');}}
A.icons=function(root){$$('[data-ic]',root).forEach(function(e){if(e.className)e.innerHTML=ic(e.getAttribute('data-ic'));else e.outerHTML=ic(e.getAttribute('data-ic'));});};
A.boot=function(fn){chrome();initSearch();sync();if(fn)fn(A);A.icons();sync();fitNav();window.addEventListener('resize',fitNav);if(document.fonts)document.fonts.ready.then(fitNav);};
var NOPAGE_BTN='btn btn-olive',NOPAGE_BTN2='btn-line';
/* ---------- прототип как отдельный сайт: ссылки на amfodent.ru ведут на страницы прототипа ---------- */
var SITE_RE=/^https?:\/\/(www\.)?amfodent\.ru\/?/i, CAT_PATH='stomatologicheskoe-oborudovanie/stomatologicheskie-ustanovki';
var byPath={};Object.keys(A.byId).forEach(function(k){var p=A.byId[k];if(p.href&&SITE_RE.test(p.href))byPath[p.href.replace(SITE_RE,'').replace(/\/$/,'')]=p.id;});
var BRANDQ={'tosi-foshan-kitaj':'TOSI','oborudovanie-ot-stern-weber-italiya':'Stern Weber'};
function localHref(h){
  var path=h.replace(SITE_RE,'').split('#')[0],q=path.split('?'),base=q[0].replace(/\/$/,'');
  if(base===''||base==='index.php')return 'index.html';
  if(byPath[base])return 'product.html?id='+encodeURIComponent(byPath[base]);
  if(base===CAT_PATH&&!q[1])return 'catalog.html';
  if(BRANDQ[base])return 'catalog.html?q='+encodeURIComponent(BRANDQ[base]);
  return null;
}
function linkName(a){var t=(a.getAttribute('title')||a.getAttribute('aria-label')||a.textContent||'').replace(/\s+/g,' ').trim();return t.length>70?t.slice(0,68)+'…':t;}
function localize(root){$$('a[href]',root).forEach(function(a){var h=a.getAttribute('href');if(!SITE_RE.test(h))return;var l=localHref(h);if(l){a.setAttribute('href',l);a.removeAttribute('target');}else{a.setAttribute('data-ext',h);a.setAttribute('href','#');a.removeAttribute('target');}});}
A.localize=localize;
document.addEventListener('click',function(e){
  var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
  var h=a.getAttribute('href');
  if(SITE_RE.test(h)){var l=localHref(h);if(l){e.preventDefault();location.href=l;return;}a.setAttribute('data-ext',h);}
  if(!a.hasAttribute('data-ext'))return;
  e.preventDefault();e.stopPropagation();
  var n=linkName(a),box=$('[data-nopage-name]');if(box)box.textContent=n?'«'+n+'»':'Эта страница';
  A.openModal('nopage');
},true);
var _boot=A.boot;
A.boot=function(fn){
  _boot(fn);
  document.body.insertAdjacentHTML('beforeend',modal('nopage','<h3>В прототипе этой страницы нет</h3><p><b data-nopage-name></b> будет на рабочем сайте. В прототипе собраны главная, каталог «Стоматологические установки» с фильтром, карточки товаров, корзина и оформление заказа.</p><a class="'+NOPAGE_BTN+' btn-block" href="catalog.html">Открыть каталог установок</a><button class="btn '+NOPAGE_BTN2+' btn-block" data-close style="margin-top:8px">Остаться на странице</button>'));
  localize(document);
  new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)localize(n);});});}).observe(document.body,{childList:true,subtree:true});
};
})();
