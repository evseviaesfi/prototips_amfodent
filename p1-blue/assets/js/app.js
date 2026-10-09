/* Амфодент — прототип 1. Общая логика: шапка, подвал, корзина, поиск, меню. */
(function(){
var A=window.AMF, $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var KEY='amf_p1_cart', FKEY='amf_p1_fav';

/* ---------- иконки ---------- */
var I={
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 heart:'<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
 cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2.5 3h2.6l2.5 12.2a1.5 1.5 0 0 0 1.5 1.3h9a1.5 1.5 0 0 0 1.5-1.2L21 7H6"/>',
 compare:'<path d="M6 20V10M12 20V4M18 20v-7"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 chevD:'<path d="m6 9 6 6 6-6"/>', chevR:'<path d="m9 6 6 6-6 6"/>', chevL:'<path d="m15 6-6 6 6 6"/>',
 arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 x:'<path d="M18 6 6 18M6 6l12 12"/>',
 pin:'<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
 truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
 shield:'<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6Z"/><path d="m9 12 2 2 4-4"/>',
 wrench:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L4 16.8V20h3.2l5.3-5.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.5-.5-.5-2.5Z"/>',
 award:'<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
 key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M15 8l2 2"/>',
 grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
 list:'<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
 sliders:'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
 plus:'<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>',
 trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
 zoom:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/>',
 check:'<path d="m5 12 5 5 9-10"/>',
 percent:'<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
 clinic:'<path d="M4 21V7l8-4 8 4v14"/><path d="M10 21v-5h4v5M12 8v4M10 10h4"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 doc:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
 headset:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M20 20c0 1-2 2-5 2"/>',
 box:'<path d="m3 7 9-4 9 4v10l-9 4-9-4z"/><path d="m3 7 9 4 9-4M12 11v10"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
 card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
 cash:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
 star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z"/>',
 tooth:'<path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4 2 7 .4 2.5 1 6.5 2.5 6.5S9.5 17 12 17s2.5 4 4.5 4 2.1-4 2.5-6.5c.5-3 2-4 2-7C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3Z"/>'
};
var VK='<svg class="ico" viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><path d="M12.8 17.5C6.9 17.5 3.5 13.4 3.4 6.6h3c.1 5 2.3 7.1 4 7.5V6.6h2.8v4.3c1.7-.2 3.5-2.1 4.1-4.3h2.8c-.5 2.6-2.4 4.5-3.8 5.3 1.4.6 3.6 2.3 4.4 5.6h-3.1c-.7-2.2-2.4-3.9-4.4-4.1v4.1Z"/></svg>';
var TG='<svg class="ico" viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><path d="M20.7 4.3 3.4 11c-1.2.5-1.2 1.2-.2 1.5l4.4 1.4 1.7 5.2c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.2-2.1 4.5 3.3c.8.5 1.4.2 1.6-.8l2.9-13.7c.3-1.2-.4-1.7-1.5-1.3ZM8.8 13.6l8.6-5.4c.4-.3.8-.1.5.2l-7.1 6.4-.3 3.3Z"/></svg>';
function ic(n,c){return '<svg class="ico '+(c||'')+'" viewBox="0 0 24 24" aria-hidden="true">'+(I[n]||'')+'</svg>';}
A.ic=ic;

/* ---------- утилиты ---------- */
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function num(p){var n=parseInt(String(p).replace(/[^\d]/g,''),10);return isNaN(n)?0:n;}
function rub(n){return n.toLocaleString('ru-RU').replace(/,/g,' ')+' ₽';}
function href(h){if(!h)return '#';if(/^(https?:|tel:|mailto:|#)/.test(h)||/\.html/.test(h))return h;return A.site+h;}
function store(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k)||'null');localStorage.setItem(k,JSON.stringify(v));}catch(e){return null;}}
A.util={esc:esc,num:num,rub:rub,href:href,$:$,$$:$$};

/* ---------- корзина и избранное ---------- */
var cart=store(KEY), fav=store(FKEY)||[];
if(!cart){cart={'2829':1,'9925':2};store(KEY,cart);}  /* демо-наполнение при первом заходе */
A.cart={
  get:function(){return cart;},
  count:function(){var n=0;for(var k in cart)n+=cart[k];return n;},
  add:function(id,q){cart[id]=(cart[id]||0)+(q||1);store(KEY,cart);sync();toast(id);},
  set:function(id,q){if(q<=0)delete cart[id];else cart[id]=q;store(KEY,cart);sync();},
  clear:function(){cart={};store(KEY,cart);sync();},
  total:function(){var t=0;for(var k in cart){var p=A.byId[k];if(p)t+=num(p.price)*cart[k];}return t;}
};
A.fav={has:function(id){return fav.indexOf(id)>=0;},toggle:function(id){var i=fav.indexOf(id);if(i>=0)fav.splice(i,1);else fav.push(id);store(FKEY,fav);sync();return i<0;}};
function sync(){
  $$('[data-cart-n]').forEach(function(e){var n=A.cart.count();e.textContent=n||'';e.setAttribute('data-n',n);});
  $$('[data-fav-n]').forEach(function(e){e.textContent=fav.length||'';e.setAttribute('data-n',fav.length);});
  $$('[data-fav]').forEach(function(b){b.classList.toggle('is-on',A.fav.has(b.getAttribute('data-fav')));});
  document.dispatchEvent(new Event('amf:cart'));
}
A.sync=sync;

/* ---------- карточка товара ---------- */
function badgeHtml(m){var c=/Скидка/.test(m)?'badge-sale':/TOP/.test(m)?'badge-top':/Новинка/.test(m)?'badge-new':'badge-soft';return '<span class="badge '+c+'">'+esc(m.replace(' %','%'))+'</span>';}
function stockCls(s){return /Не доступен|Нет/.test(s)?'is-none':/Доступен для заказа|заказ/i.test(s)?'is-order':'';}
function stockTxt(s){return /Не доступен/.test(s)?'Нет в наличии':/Доступен для заказа/.test(s)?'Под заказ':s;}
function priceHtml(p){if(!num(p.price))return '<div class="price"><span class="ask">Цена по запросу</span></div>';return '<div class="price"><b>'+esc(p.price)+'</b>'+(p.old?'<s>'+esc(p.old)+'</s>':'')+'</div>';}
function purl(p){return p.href&&p.href.indexOf('product.html')===0?p.href:'product.html?id='+encodeURIComponent(p.id);}
A.purl=purl;
A.card=function(p){
  var meta=[p.model,p.brand,p.country].filter(Boolean).join(' · ');
  var can=num(p.price)>0&&!/Не доступен/.test(p.stock);
  return '<article class="card">'+
   '<div class="card__badges">'+p.marks.map(badgeHtml).join('')+'</div>'+
   '<button class="icon-btn card__fav" data-fav="'+p.id+'" aria-label="В избранное">'+ic('heart')+'</button>'+
   '<a class="card__img" href="'+purl(p)+'"><img loading="lazy" src="'+esc(p.img)+'" alt="'+esc(p.name)+'"></a>'+
   '<a class="card__t" href="'+purl(p)+'">'+esc(p.name)+'</a>'+
   '<div class="card__meta">'+esc(meta)+'</div>'+
   '<div class="card__bottom">'+priceHtml(p)+
     '<div class="card__row"><span class="stock '+stockCls(p.stock)+'">'+esc(stockTxt(p.stock))+'</span></div>'+
     (can?'<button class="btn btn-accent btn-block" data-add="'+p.id+'">'+ic('cart')+'<span class="lbl">В корзину</span></button>'
         :'<button class="btn btn-outline btn-block" data-modal="callback">'+ic('phone')+'<span class="lbl">Запросить цену</span></button>')+
   '</div></article>';
};
A.stockCls=stockCls;A.stockTxt=stockTxt;A.priceHtml=priceHtml;A.badgeHtml=badgeHtml;

/* ---------- шапка ---------- */
function logo(white){return '<a class="logo" href="index.html" aria-label="Амфодент — на главную"><img class="logo__em" src="assets/img/emblem.svg" alt=""><span class="logo__txt"><img class="logo__wm" src="assets/img/wordmark'+(white?'-white':'')+'.svg" alt="Амфодент"><span class="logo__tag">Стоматологическое оборудование</span></span></a>';}
function header(active){
  var nav=A.nav.map(function(n){return '<a href="'+href(n[1])+'"'+(n[1]===active?' class="is-active"':'')+'>'+esc(n[0])+'</a>';}).join('');
  var mega=A.cats.map(function(c){return '<a class="mega__item" href="'+href(c[2]==='stomatologicheskoe-oborudovanie/'?'catalog.html':c[2])+'"><img src="https://amfodent.ru/image/cache/'+c[1]+'" alt="">'+esc(c[0])+'</a>';}).join('');
  return ''+
  '<div class="topline"><div class="wrap"><a class="topline__addr" href="'+href('contact-us')+'">'+ic('pin')+esc(A.address)+'</a><nav class="topline__links">'+A.topLinks.map(function(l){return '<a href="'+href(l[1])+'">'+esc(l[0])+'</a>';}).join('')+'</nav></div></div>'+
  '<header class="header"><div class="wrap header__main">'+
    '<button class="icon-btn burger" data-drawer="menu" aria-label="Меню">'+ic('menu')+'</button>'+
    logo(false)+
    '<form class="search" action="catalog.html" role="search" autocomplete="off"><div class="search__box">'+ic('search')+'<input class="search__input" name="q" placeholder="Поиск по товарам, брендам, артикулам…" aria-label="Поиск"><button class="search__btn" type="submit">'+ic('search')+'<span>Найти</span></button></div><div class="search__drop" role="listbox"></div></form>'+
    '<div class="contact"><span class="contact__ico">'+ic('phone')+'</span><span class="contact__txt"><a class="contact__phone" href="'+A.phoneHref+'">'+A.phone+'</a><br><button class="contact__cb" data-modal="callback">Заказать звонок</button></span></div>'+
    '<div class="hactions">'+
      '<a class="hact hide-m" href="#" data-modal="login">'+ic('user')+'<span class="hact__l">Войти</span></a>'+
      '<a class="hact hide-m" href="#" data-modal="fav">'+ic('heart')+'<span class="hact__l">Избранное</span><span class="hact__n" data-fav-n></span></a>'+
      '<a class="hact" href="cart.html">'+ic('cart')+'<span class="hact__l">Корзина</span><span class="hact__n" data-cart-n></span></a>'+
    '</div>'+
  '</div></header>'+
  '<div class="navbar"><div class="wrap" style="position:relative">'+
    '<button class="catbtn" aria-expanded="false" data-mega>'+ic('menu')+'Каталог товаров'+ic('chevD','chev ico-sm')+'</button>'+
    '<nav class="navlinks">'+nav+'</nav>'+
    '<div class="navpills"><a class="pill pill-ghost" href="'+href('contact-us')+'">'+ic('clinic')+'Кабинет под ключ</a><a class="pill pill-accent" href="'+href('specials/')+'">Акции'+ic('percent')+'</a></div>'+
    '<div class="mega"><div class="mega__panel">'+mega+'<div class="mega__foot"><span>Более 200 производителей в каталоге</span><a class="link-arrow" href="'+href('brands/')+'">Все производители'+ic('arrow')+'</a></div></div></div>'+
  '</div></div>';
}
function footer(){
  function col(t,l){return '<div><h4>'+t+'</h4><ul>'+l.map(function(x){return '<li><a href="'+href(x[1])+'">'+esc(x[0])+'</a></li>';}).join('')+'</ul></div>';}
  return '<footer class="footer"><div class="wrap footer__top">'+
   '<div>'+logo(true)+'<p class="footer__about">Оптовые и розничные поставки стоматологического оборудования и материалов с 1993 года. Товарные предложения на сайте не являются публичной офертой (ст. 437 (2) ГК РФ).</p><div class="socials"><a href="#" aria-label="ВКонтакте">'+VK+'</a><a href="#" aria-label="Telegram">'+TG+'</a></div></div>'+
   col('Каталог',A.footer.catalog.slice(0,7))+col('Покупателям',A.footer.buyers)+col('Компания',A.footer.company)+
   '<div><h4>Контакты</h4>'+
     '<div class="fcontact">'+ic('phone')+'<div><b><a href="'+A.phoneHref+'">'+A.phone+'</a></b>Бесплатно по России</div></div>'+
     '<div class="fcontact">'+ic('phone')+'<div><b><a href="'+A.phone2Href+'">'+A.phone2+'</a></b>Мобильный</div></div>'+
     '<div class="fcontact">'+ic('mail')+'<div><b><a href="mailto:'+A.email+'">'+A.email+'</a></b>Заказы и вопросы</div></div>'+
     '<div class="fcontact">'+ic('pin')+'<div>'+esc(A.address)+'</div></div>'+
   '</div></div>'+
   '<div class="footer__bot"><div class="wrap"><span>© 1993–2026 Амфодент. Стоматологическое оборудование.</span><span><a href="'+href('privacy/')+'">Политика конфиденциальности</a> · <a href="'+href('terms/')+'">Условия соглашения</a></span></div></div></footer>';
}
function chrome(){
  var h=$('[data-header]'),f=$('[data-footer]'),act=(h&&h.getAttribute('data-header'))||'';
  if(h)h.outerHTML=header(act);
  if(f)f.outerHTML=footer();
  document.body.insertAdjacentHTML('beforeend',
   '<div class="toast" role="status" aria-live="polite"></div>'+
   '<div class="proto"><i></i>Прототип 1 · синий · <a href="../index.html">все варианты</a></div>'+
   modal('callback','<h3>Заказать звонок</h3><p>Перезвоним в рабочее время и поможем подобрать оборудование.</p><div class="field"><label>Имя</label><input class="input" placeholder="Как к вам обращаться"></div><div class="field"><label>Телефон <i>*</i></label><input class="input" type="tel" placeholder="+7 (___) ___-__-__"></div><button class="btn btn-primary btn-block btn-lg" data-proto>Перезвоните мне</button>')+
   modal('login','<h3>Вход в личный кабинет</h3><p>История заказов, избранное и персональные цены для клиник.</p><div class="field"><label>Email</label><input class="input" type="email" placeholder="you@clinic.ru"></div><div class="field"><label>Пароль</label><input class="input" type="password"></div><button class="btn btn-primary btn-block btn-lg" data-proto>Войти</button>')+
   modal('fav','<h3>Избранное</h3><div data-fav-list></div>')+
   modal('proto','<h3>Это прототип</h3><p>Кнопка показывает, как будет работать сайт. Данные никуда не отправляются.</p><button class="btn btn-primary btn-block" data-close>Понятно</button>')+
   '<div class="drawer" data-drawer-menu><div class="drawer__bg" data-close></div><div class="drawer__panel"><div class="drawer__head">'+logo(false)+'<button class="icon-btn" data-close aria-label="Закрыть">'+ic('x')+'</button></div><div class="drawer__list">'+
     A.cats.map(function(c){return '<a href="'+href(c[2]==='stomatologicheskoe-oborudovanie/'?'catalog.html':c[2])+'"><img src="https://amfodent.ru/image/cache/'+c[1]+'" alt="">'+esc(c[0])+'</a>';}).join('')+
     A.topLinks.map(function(l){return '<a href="'+href(l[1])+'">'+esc(l[0])+'</a>';}).join('')+
   '</div><div class="drawer__contacts"><a class="contact__phone" href="'+A.phoneHref+'">'+A.phone+'</a><a href="mailto:'+A.email+'">'+A.email+'</a><button class="btn btn-primary" data-modal="callback">Заказать звонок</button></div></div></div>');
}
function modal(id,body){return '<div class="modal" data-modal-id="'+id+'" role="dialog" aria-modal="true"><div class="modal__box"><button class="icon-btn modal__x" data-close aria-label="Закрыть">'+ic('x')+'</button>'+body+'</div></div>';}
A.openModal=function(id){var m=$('[data-modal-id="'+id+'"]');if(!m)return;if(id==='fav')renderFav();m.classList.add('is-open');};
function renderFav(){var box=$('[data-fav-list]');if(!box)return;var items=fav.map(function(id){return A.byId[id];}).filter(Boolean);
  box.innerHTML=items.length?'<div class="mini-items">'+items.map(function(p){return '<a class="mini" href="'+purl(p)+'"><img src="'+esc(p.img)+'" alt=""><span>'+esc(p.name)+'</span><b>'+esc(num(p.price)?p.price:'')+'</b></a>';}).join('')+'</div><a class="btn btn-primary btn-block" href="cart.html">Перейти в корзину</a>':'<p>Нажмите ♡ на карточке товара, чтобы сохранить его здесь.</p>';}

/* ---------- тост ---------- */
var tt;function toast(id){var p=A.byId[id],t=$('.toast');if(!t||!p)return;t.innerHTML='<img src="'+esc(p.img)+'" alt=""><div><b>Добавлено в корзину</b><small>'+esc(p.name)+'</small></div><a class="btn btn-white btn-sm" href="cart.html">В корзину</a>';t.classList.add('is-on');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('is-on');},3200);}

/* ---------- поиск ---------- */
function initSearch(){
  var f=$('.search');if(!f)return;var inp=$('.search__input',f),drop=$('.search__drop',f),list=Object.keys(A.byId).map(function(k){return A.byId[k];}),cur=-1;
  var q0=new URLSearchParams(location.search).get('q');if(q0)inp.value=q0;
  function render(){var q=inp.value.trim().toLowerCase();if(q.length<2){f.classList.remove('is-open');return;}
    var words=q.split(/\s+/),r=list.filter(function(p){var s=(p.name+' '+p.model+' '+p.brand).toLowerCase();return words.every(function(w){return s.indexOf(w)>=0;});}).slice(0,6);
    drop.innerHTML=(r.length?r.map(function(p,i){return '<a class="sugg" role="option" href="'+purl(p)+'"><img src="'+esc(p.img)+'" alt=""><span><b>'+esc(p.name)+'</b><small>'+esc(p.model)+'</small></span><span class="sugg__price">'+(num(p.price)?esc(p.price):'')+'</span></a>';}).join(''):'<div class="sugg-empty">Ничего не нашлось. Попробуйте другое слово или артикул.</div>')+'<a class="sugg-all" href="catalog.html?q='+encodeURIComponent(inp.value)+'">Все результаты</a>';
    f.classList.add('is-open');cur=-1;}
  inp.addEventListener('input',render);inp.addEventListener('focus',render);
  inp.addEventListener('keydown',function(e){var it=$$('.sugg',drop);if(!it.length)return;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();cur=(cur+(e.key==='ArrowDown'?1:-1)+it.length)%it.length;it.forEach(function(x,i){x.classList.toggle('is-active',i===cur);});}else if(e.key==='Enter'&&cur>=0){e.preventDefault();location.href=it[cur].href;}else if(e.key==='Escape')f.classList.remove('is-open');});
  document.addEventListener('click',function(e){if(!f.contains(e.target))f.classList.remove('is-open');});
}

/* ---------- лента товаров ---------- */
A.rail=function(el){var tr=$('.rail__track',el),p=$('.rail__btn.prev',el),n=$('.rail__btn.next',el);if(!tr)return;
  function upd(){p.disabled=tr.scrollLeft<8;n.disabled=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-8;}
  function go(d){var c=tr.firstElementChild;var w=c?c.getBoundingClientRect().width+16:300;tr.scrollBy({left:d*w*2,behavior:'smooth'});}
  p.onclick=function(){go(-1);};n.onclick=function(){go(1);};tr.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);setTimeout(upd,60);upd();};

/* ---------- события ---------- */
document.addEventListener('click',function(e){
  if(e.target.classList&&e.target.classList.contains('modal')){e.target.classList.remove('is-open');return;}
  var t=e.target.closest('[data-add],[data-fav],[data-modal],[data-close],[data-mega],[data-drawer],[data-proto]');
  if(!t){var mg=$('.mega.is-open');if(mg&&!e.target.closest('.mega')){mg.classList.remove('is-open');$('[data-mega]').setAttribute('aria-expanded','false');}return;}
  if(t.hasAttribute('data-add')){e.preventDefault();var q=1,qi=t.getAttribute('data-qty');if(qi){var el=$(qi);q=Math.max(1,parseInt(el&&el.value,10)||1);}A.cart.add(t.getAttribute('data-add'),q);t.classList.add('is-added');}
  else if(t.hasAttribute('data-fav')){e.preventDefault();A.fav.toggle(t.getAttribute('data-fav'));}
  else if(t.hasAttribute('data-modal')){e.preventDefault();A.openModal(t.getAttribute('data-modal'));}
  else if(t.hasAttribute('data-proto')){e.preventDefault();$$('.modal.is-open').forEach(function(m){m.classList.remove('is-open');});A.openModal('proto');}
  else if(t.hasAttribute('data-close')){var m=t.closest('.modal,.drawer');if(m)m.classList.remove('is-open');}
  else if(t.hasAttribute('data-mega')){var mg2=$('.mega');var o=mg2.classList.toggle('is-open');t.setAttribute('aria-expanded',o);}
  else if(t.hasAttribute('data-drawer')){var d=$('[data-drawer-'+t.getAttribute('data-drawer')+']');if(d)d.classList.add('is-open');}
});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){$$('.modal.is-open,.drawer.is-open,.mega.is-open').forEach(function(m){m.classList.remove('is-open');});}});

function fitNav(){var n=$('.navlinks');if(!n)return;var ls=$$('a',n);ls.forEach(function(a){a.classList.remove('is-hidden');});var r=n.getBoundingClientRect().right;for(var i=ls.length-1;i>=0;i--){if(ls[i].getBoundingClientRect().right>r+1)ls[i].classList.add('is-hidden');}}
A.boot=function(fn){chrome();initSearch();sync();if(fn)fn(A);sync();fitNav();window.addEventListener('resize',fitNav);if(document.fonts)document.fonts.ready.then(fitNav);};
var NOPAGE_BTN='btn btn-primary',NOPAGE_BTN2='btn-outline';
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
