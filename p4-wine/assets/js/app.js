/* Амфодент — прототип 4 «Бордовый». Общая логика: шапка, подвал, корзина, поиск, меню. */
(function(){
var A=window.AMF, $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var KEY='amf_p4_cart', FKEY='amf_p4_fav', CKEY='amf_p4_cmp';
A.advantages.forEach(function(a){if(a[0]==='years')a[1]='33 года на рынке';});

/* ---------- иконки: тонкая линия + акцентная точка ---------- */
var I={
 search:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/><circle class="d" cx="11" cy="11" r="1.6"/>',
 phone:'<path d="M7.2 3.5 9.6 3l1.7 4.3-2 1.5a11 11 0 0 0 5.9 5.9l1.5-2 4.3 1.7-.5 2.4a2.2 2.2 0 0 1-2.3 1.7C10.7 18.2 5.8 13.3 5.5 5.8a2.2 2.2 0 0 1 1.7-2.3Z"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.8-3.8 3.8-6 7.5-6s6.7 2.2 7.5 6"/>',
 heart:'<path d="M12 20 4.2 12.3a4.8 4.8 0 0 1 6.8-6.8l1 1 1-1a4.8 4.8 0 0 1 6.8 6.8Z"/><circle class="d" cx="16.5" cy="8.8" r="1.4"/>',
 cart:'<path d="M5 8.5h14l-1.1 10.6a2 2 0 0 1-2 1.9H8.1a2 2 0 0 1-2-1.9Z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/><circle class="d" cx="12" cy="14" r="1.7"/>',
 scales:'<path d="M12 4.5V20M7.5 20h9M5 7.5h14"/><path d="M5 7.5 2.6 13a2.4 2.4 0 0 0 4.8 0ZM19 7.5 16.6 13a2.4 2.4 0 0 0 4.8 0Z"/><circle class="d" cx="12" cy="4" r="1.6"/>',
 menu:'<path d="M4 7h16M4 12h10M4 17h16"/><circle class="d" cx="19" cy="12" r="1.6"/>',
 chevD:'<path d="m6 9 6 6 6-6"/>', chevR:'<path d="m9 6 6 6-6 6"/>', chevL:'<path d="m15 6-6 6 6 6"/>',
 arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 x:'<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
 plus:'<path d="M12 5.5v13M5.5 12h13"/>', minus:'<path d="M5.5 12h13"/>',
 check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 list:'<path d="M9 6h11M9 12h11M9 18h11"/><circle class="d" cx="4.5" cy="6" r="1.4"/><circle class="d" cx="4.5" cy="12" r="1.4"/><circle class="d" cx="4.5" cy="18" r="1.4"/>',
 grid:'<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect class="d" x="13" y="13" width="7" height="7" rx="2"/>',
 sliders:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle class="d" cx="9" cy="17" r="2"/>',
 pin:'<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle class="d" cx="12" cy="9.5" r="2.2"/>',
 mail:'<rect x="3" y="5.5" width="18" height="13" rx="3"/><path d="m4 7.5 8 6 8-6"/>',
 truck:'<path d="M3 6.5h11v9H3ZM14 9.5h3.5l3 3v3H14"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/><circle class="d" cx="7" cy="17.5" r=".9"/>',
 shield:'<path d="M12 3 5 6v5.5c0 4.5 3 8 7 9.5 4-1.5 7-5 7-9.5V6Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
 gear:'<circle cx="12" cy="12" r="3.4"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M5.5 18.5l1.8-1.8M16.7 7.3l1.8-1.8"/><circle class="d" cx="12" cy="12" r="1.3"/>',
 medal:'<circle cx="12" cy="14.5" r="5.5"/><path d="M8.5 3.5h7L13.6 9M8.5 3.5 10.4 9"/><circle class="d" cx="12" cy="14.5" r="2"/>',
 star:'<path d="m12 3.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8Z"/><circle class="d" cx="12" cy="12.4" r="1.4"/>',
 key:'<circle cx="8" cy="15.5" r="4.3"/><path d="m11.2 12.4 8.3-8.3M16.5 5.5 19 8M14.3 7.7l2 2"/><circle class="d" cx="8" cy="15.5" r="1.4"/>',
 trash:'<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l.9 12.2a2 2 0 0 0 2 1.8h5.2a2 2 0 0 0 2-1.8L17.5 7"/>',
 zoom:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5M11 8.5v5M8.5 11h5"/>',
 percent:'<path d="M18 6 6 18"/><circle cx="7.5" cy="7.5" r="2.4"/><circle class="d" cx="16.5" cy="16.5" r="2.4"/>',
 clinic:'<path d="M4 20V9.5l8-5.5 8 5.5V20Z"/><path d="M12 10.5v6M9 13.5h6"/>',
 doc:'<path d="M7 3h7l4 4v14H7Z"/><path d="M14 3v4h4M10 12h5M10 15.5h5"/><circle class="d" cx="10" cy="8" r="1.2"/>',
 card:'<rect x="3" y="5.5" width="18" height="13" rx="3"/><path d="M3 10h18"/><circle class="d" cx="7.5" cy="14.5" r="1.3"/>',
 cash:'<rect x="3" y="6.5" width="18" height="11" rx="3"/><circle cx="12" cy="12" r="2.6"/><circle class="d" cx="6.5" cy="12" r="1"/>',
 box:'<path d="m12 3 8 4v10l-8 4-8-4V7Z"/><path d="m4 7 8 4 8-4M12 11v10"/>',
 kit:'<rect x="3.5" y="7" width="17" height="12.5" rx="3"/><path d="M9 7V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5V7M12 10.5v5.5M9.2 13.2h5.6"/>',
 tooth:'<path d="M7.5 3.5c-2.3 0-3.5 1.8-3.5 4 0 2.7 1.4 3.6 1.8 6.3.4 2.3.8 5.7 2.2 5.7s1.6-3.6 4-3.6 2.6 3.6 4 3.6 1.8-3.4 2.2-5.7c.4-2.7 1.8-3.6 1.8-6.3 0-2.2-1.2-4-3.5-4-1.8 0-2.7.9-4.5.9s-2.7-.9-4.5-.9Z"/>'
};
I.compare=I.scales;
var ADVIC={service:'gear',dealer:'medal',years:'star',key:'key'};
A.advIc=function(k){return ADVIC[k]||'star';};
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
function img(path){return 'https://amfodent.ru/image/cache/'+path;}
A.util={esc:esc,num:num,rub:rub,href:href,img:img,$:$,$$:$$};

/* ---------- корзина, избранное, сравнение ---------- */
var cart=store(KEY), fav=store(FKEY)||[], cmp=store(CKEY)||[];
if(!cart){cart={'2829':1,'9925':2};store(KEY,cart);}
A.cart={
  get:function(){return cart;},
  count:function(){var n=0;for(var k in cart)n+=cart[k];return n;},
  add:function(id,q,silent){cart[id]=(cart[id]||0)+(q||1);store(KEY,cart);sync();if(!silent)toast(id,'Добавлено в корзину');},
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

/* ---------- карточка товара: глянцевая плитка ---------- */
function badgeHtml(m){var c=/Скидка/.test(m)?'lb-sale':/TOP/.test(m)?'lb-top':/Новинка/.test(m)?'lb-new':'lb-soft';var t=/Скидка/.test(m)?m.replace('Скидка ','−').replace(' %','%'):/TOP/.test(m)?'Хит продаж':m;return '<span class="lb '+c+'">'+esc(t)+'</span>';}
function stockCls(s){return /Не доступен|Нет/.test(s)?'is-none':/Доступен для заказа|заказ/i.test(s)?'is-order':'';}
function stockTxt(s){return /Не доступен/.test(s)?'Нет в наличии':/Доступен для заказа/.test(s)?'Под заказ':s;}
function priceHtml(p){if(!num(p.price))return '<div class="price"><span class="ask">Цена по запросу</span></div>';return '<div class="price">'+(p.old?'<s>'+esc(p.old)+'</s>':'')+'<b>'+esc(p.price)+'</b></div>';}
function purl(p){return 'product.html?id='+encodeURIComponent(p.id);}
A.purl=purl;
A.card=function(p){
  var can=num(p.price)>0&&!/Не доступен/.test(p.stock);
  var by=[p.brand,p.country].filter(Boolean).join(' · ');
  return '<article class="card">'+
   '<a class="card__img" href="'+purl(p)+'"><span class="card__lbs">'+p.marks.map(badgeHtml).join('')+'</span><img loading="lazy" src="'+esc(p.img)+'" alt="'+esc(p.name)+'"></a>'+
   '<div class="card__tools"><button class="cbtn" data-fav="'+p.id+'" aria-label="В избранное">'+ic('heart')+'</button><button class="cbtn" data-cmp="'+p.id+'" aria-label="Сравнить">'+ic('scales')+'</button></div>'+
   '<div class="card__b">'+
   '<div class="card__by">'+esc(by||('Арт. '+p.model))+'</div>'+
   '<a class="card__t" href="'+purl(p)+'">'+esc(p.name)+'</a>'+
   '<div class="card__pr">'+priceHtml(p)+'<span class="stock '+stockCls(p.stock)+'">'+esc(stockTxt(p.stock))+'</span></div>'+
   '<div class="card__act">'+
     (can?'<button class="btn btn-wine btn-sm btn-block" data-add="'+p.id+'">'+ic('cart')+'В корзину</button>'
         :'<button class="btn btn-pearl btn-sm btn-block" data-modal="callback">'+ic('phone')+'Узнать цену</button>')+
   '</div></div></article>';
};
A.stockCls=stockCls;A.stockTxt=stockTxt;A.priceHtml=priceHtml;A.badgeHtml=badgeHtml;

/* ---------- шапка: логотип по центру, меню-«таблетки» ---------- */
function logo(white){return '<a class="logo" href="index.html" aria-label="Амфодент — на главную"><img class="logo__em" src="assets/img/emblem.svg" alt=""><span class="logo__txt"><img class="logo__wm" src="assets/img/wordmark'+(white?'-white':'')+'.svg" alt="Амфодент"><span class="logo__tag">Стоматологическое оборудование</span></span></a>';}
function catHref(c){return href(c[2]==='stomatologicheskoe-oborudovanie/'?'catalog.html':c[2]);}
A.catHref=catHref;
function header(active){
  var nav=A.nav.map(function(n){var h=href(n[1]);return '<a href="'+h+'"'+(n[1]===active?' class="is-active"':(/specials/.test(n[1])?' class="is-sale"':''))+'>'+esc(n[0])+'</a>';}).join('');
  var mega=A.cats.map(function(c){return '<a class="mega__item" href="'+catHref(c)+'"><img loading="lazy" src="'+img(c[1])+'" alt="">'+esc(c[0])+'</a>';}).join('');
  return ''+
  '<div class="util"><div class="wrap util__in"><nav>'+A.topLinks.map(function(l){return '<a href="'+href(l[1])+'">'+esc(l[0])+'</a>';}).join('')+'</nav><span class="util__r"><span>'+ic('pin')+'Санкт-Петербург</span><span>Бесплатно по России <b>'+A.phone+'</b></span></span></div></div>'+
  '<header class="header"><div class="wrap header__main">'+
    '<div class="header__l"><form class="search" action="catalog.html" role="search" autocomplete="off"><div class="search__box">'+ic('search')+'<input class="search__input" name="q" placeholder="Поиск: товар, бренд, артикул" aria-label="Поиск"><button class="search__btn" type="submit" aria-label="Найти">'+ic('arrow')+'</button></div><div class="search__drop" role="listbox"></div></form></div>'+
    logo(false)+
    '<div class="header__r">'+
      '<div class="contact"><a class="contact__phone" href="'+A.phone2Href+'">'+A.phone2+'</a><button class="contact__cb" data-modal="callback">Заказать звонок</button></div>'+
      '<a class="cbtn hicon hide-m" href="#" data-modal="kp" title="Коммерческое предложение" aria-label="Коммерческое предложение">'+ic('doc')+'</a>'+
      '<a class="cbtn hicon hide-m" href="#" data-modal="fav" title="Избранное" aria-label="Избранное">'+ic('heart')+'<i data-fav-n></i></a>'+
      '<a class="hcart" href="cart.html" aria-label="Корзина"><span class="hcart__ic">'+ic('cart')+'</span><span>Корзина<b data-cart-sum></b></span><i data-cart-n></i></a>'+
      '<button class="cbtn burger" data-drawer="menu" aria-label="Меню">'+ic('menu')+'</button>'+
    '</div>'+
  '</div></header>'+
  '<div class="navbar"><div class="wrap navbar__in">'+
    '<button class="catbtn" aria-expanded="false" data-mega>'+ic('menu')+'<span>Каталог</span></button>'+
    '<nav class="navlinks">'+nav+'</nav>'+
    '<div class="mega"><div class="mega__panel"><div class="mega__grid">'+mega+'</div><div class="mega__foot"><span>Более 200 производителей в каталоге</span><a class="more" href="'+href('brands/')+'">Все производители '+ic('arrow')+'</a></div></div></div>'+
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
   '<div class="proto"><i></i>Прототип 4 · бордовый · <a href="../index.html">все варианты</a></div>'+
   modal('callback','<h3>Заказать звонок</h3><p>Перезвоним в рабочее время и поможем подобрать оборудование.</p><div class="field"><label>Имя</label><input class="input" placeholder="Как к вам обращаться"></div><div class="field"><label>Телефон <i>*</i></label><input class="input" type="tel" placeholder="+7 (___) ___-__-__"></div><button class="btn btn-wine btn-block btn-lg" data-proto>Перезвоните мне</button>')+
   modal('kp','<h3>Коммерческое предложение</h3><p>Опишите задачу — менеджер подготовит предложение с ценами и сроками поставки.</p><div class="field"><label>Организация</label><input class="input" placeholder="Название клиники"></div><div class="field"><label>Email <i>*</i></label><input class="input" type="email" placeholder="you@clinic.ru"></div><div class="field"><label>Что нужно</label><textarea class="input" placeholder="Например: оснащение кабинета, 2 установки"></textarea></div><button class="btn btn-wine btn-block btn-lg" data-proto>Запросить предложение</button>')+
   modal('fav','<h3>Избранное</h3><div data-fav-list></div>')+
   modal('proto','<h3>Это прототип</h3><p>Кнопка показывает, как будет работать сайт. Данные никуда не отправляются.</p><button class="btn btn-wine btn-block" data-close>Понятно</button>')+
   '<div class="drawer" data-drawer-menu><div class="drawer__bg" data-close></div><div class="drawer__panel"><div class="drawer__head">'+logo(false)+'<button class="cbtn" data-close aria-label="Закрыть">'+ic('x')+'</button></div><div class="drawer__list">'+
     A.cats.map(function(c){return '<a href="'+catHref(c)+'"><img src="'+img(c[1])+'" alt="">'+esc(c[0])+'</a>';}).join('')+
     A.topLinks.map(function(l){return '<a class="drawer__link" href="'+href(l[1])+'">'+esc(l[0])+'</a>';}).join('')+
   '</div><div class="drawer__contacts"><a class="contact__phone" href="'+A.phoneHref+'">'+A.phone+'</a><a href="mailto:'+A.email+'">'+A.email+'</a><button class="btn btn-wine" data-modal="callback">Заказать звонок</button></div></div></div>');
}
function modal(id,body){return '<div class="modal" data-modal-id="'+id+'" role="dialog" aria-modal="true"><div class="modal__box"><button class="cbtn modal__x" data-close aria-label="Закрыть">'+ic('x')+'</button>'+body+'</div></div>';}
A.modal=modal;
A.openModal=function(id){var m=$('[data-modal-id="'+id+'"]');if(!m)return;if(id==='fav')renderFav();m.classList.add('is-open');};
function renderFav(){var box=$('[data-fav-list]');if(!box)return;var items=fav.map(function(id){return A.byId[id];}).filter(Boolean);
  box.innerHTML=items.length?'<div class="mini-items">'+items.map(function(p){return '<a class="mini" href="'+purl(p)+'"><img src="'+esc(p.img)+'" alt=""><span>'+esc(p.name)+'</span><b>'+esc(num(p.price)?p.price:'')+'</b></a>';}).join('')+'</div><a class="btn btn-wine btn-block" href="cart.html">Перейти в корзину</a>':'<p>Нажмите ♡ на карточке товара, чтобы сохранить его здесь.</p>';}

/* ---------- тост ---------- */
var tt;function toast(id,msg){var p=A.byId[id],t=$('.toast');if(!t||!p)return;t.innerHTML='<img src="'+esc(p.img)+'" alt=""><div><b>'+msg+'</b><small>'+esc(p.name)+'</small></div><a class="btn btn-wine btn-sm" href="cart.html">Корзина</a>';t.classList.add('is-on');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('is-on');},3200);}
A.toast=function(msg,sub){var t=$('.toast');if(!t)return;t.innerHTML='<div style="padding-left:12px"><b>'+esc(msg)+'</b><small>'+esc(sub||'')+'</small></div><a class="btn btn-wine btn-sm" href="cart.html">Корзина</a>';t.classList.add('is-on');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('is-on');},3200);};

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

/* ---------- лента: кнопки в заголовке секции ---------- */
A.rail=function(sec){var tr=$('.rail__track',sec),p=$('.rail__btn.prev',sec),n=$('.rail__btn.next',sec);if(!tr)return;
  if(p&&!p.innerHTML)p.innerHTML=ic('chevL');if(n&&!n.innerHTML)n.innerHTML=ic('chevR');
  function upd(){if(!p)return;p.disabled=tr.scrollLeft<8;n.disabled=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-8;}
  function go(d){var c=tr.firstElementChild;var w=c?c.getBoundingClientRect().width+22:300;tr.scrollBy({left:d*w*2,behavior:'smooth'});}
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
var NOPAGE_BTN='btn btn-wine',NOPAGE_BTN2='btn-pearl';
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
