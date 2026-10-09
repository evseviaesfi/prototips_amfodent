/* Амфодент — прототип 2 «Бирюзовый». Общая логика: шапка, подвал, корзина, поиск, меню. */
(function(){
var A=window.AMF, $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var KEY='amf_p2_cart', FKEY='amf_p2_fav', CKEY='amf_p2_cmp';
A.advantages.forEach(function(a){if(a[0]==='years')a[1]='33 года на рынке';});

/* ---------- иконки: «технические» двухтоновые — заливка-подложка + тонкий контур с прямыми концами ---------- */
var I={
 search:'<path class="f" d="M4 4h10v10H4z"/><path d="M4 4h10v10H4zM14 14l6 6"/>',
 phone:'<path class="f" d="M6 3h4l1 5-3 2c1 2.5 3 4.5 6 6l2-3 5 1v4l-2 2C11 20 4 13 4 5z"/><path d="M6 3h4l1 5-3 2c1 2.5 3 4.5 6 6l2-3 5 1v4l-2 2C11 20 4 13 4 5z"/>',
 user:'<path class="f" d="M8 4h8v8H8z"/><path d="M8 4h8v8H8zM4 21v-3l3-3h10l3 3v3"/>',
 heart:'<path class="f" d="M12 20 3.5 11.5a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0L12 7l2-2a4.6 4.6 0 0 1 6.5 6.5Z"/><path d="M12 20 3.5 11.5a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0L12 7l2-2a4.6 4.6 0 0 1 6.5 6.5Z"/>',
 cart:'<path class="f" d="M6 9h14l-2 8H8z"/><path d="M2 4h3l3 13h10l2-8H6M9 21h.01M17 21h.01"/>',
 scales:'<path class="f" d="M2 14h7l-3.5-7zM15 14h7l-3.5-7z"/><path d="M12 3v18M7 21h10M5.5 7h13M2 14l3.5-7L9 14zM15 14l3.5-7L22 14zM2 14a3.5 3 0 0 0 7 0M15 14a3.5 3 0 0 0 7 0"/>',
 menu:'<path d="M3 6h18M3 12h12M3 18h18"/>',
 chevD:'<path d="m6 9 6 6 6-6"/>', chevR:'<path d="m9 6 6 6-6 6"/>', chevL:'<path d="m15 6-6 6 6 6"/>',
 arrow:'<path d="M3 12h17M14 6l6 6-6 6"/>',
 x:'<path d="M5 5l14 14M19 5 5 19"/>',
 pin:'<path class="f" d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z"/><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12ZM10 8h4v4h-4z"/>',
 mail:'<path class="f" d="M3 5h18v14H3z"/><path d="M3 5h18v14H3zM3 5l9 8 9-8"/>',
 truck:'<path class="f" d="M2 6h12v10H2z"/><path d="M2 6h12v10H2zM14 9h4l4 4v3h-8M6 19a2 2 0 1 0 0-.01M18 19a2 2 0 1 0 0-.01"/>',
 shield:'<path class="f" d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5Z"/><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5ZM8.5 12l2.5 2.5 4.5-5"/>',
 gear:'<path class="f" d="M9 9h6v6H9z"/><path d="M10 2h4l.6 3 2.4 1.4 2.9-1 2 3.5-2.3 2V13l2.3 2-2 3.5-2.9-1-2.4 1.4L14 22h-4l-.6-3L7 17.6l-2.9 1-2-3.5 2.3-2v-2.2L2.1 9l2-3.5 2.9 1L9.4 5ZM9 9h6v6H9z"/>',
 medal:'<path class="f" d="M7 2h10l-3 7h-4z"/><path d="M7 2h10l-3 7h-4zM12 9a6 6 0 1 1 0 12 6 6 0 0 1 0-12ZM12 12.5v5M10 13.5l2-1"/>',
 key:'<path class="f" d="M3 13h8v8H3z"/><path d="M3 13h8v8H3zM11 13l9-9M16 8l3 3M18 6l2 2"/>',
 grid:'<path class="f" d="M4 4h7v7H4z"/><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
 list:'<path d="M9 6h12M9 12h12M9 18h12M3 5h2v2H3zM3 11h2v2H3zM3 17h2v2H3z"/>',
 sliders:'<path class="f" d="M14 4h4v4h-4zM6 10h4v4H6zM14 16h4v4h-4z"/><path d="M3 6h11M18 6h3M3 12h3M10 12h11M3 18h11M18 18h3M14 4h4v4h-4zM6 10h4v4H6zM14 16h4v4h-4z"/>',
 plus:'<path d="M12 4v16M4 12h16"/>', minus:'<path d="M4 12h16"/>',
 trash:'<path class="f" d="M6 7h12l-1 14H7z"/><path d="M3 7h18M6 7l1 14h10l1-14M9 7V3h6v4M10 11v6M14 11v6"/>',
 zoom:'<path class="f" d="M4 4h10v10H4z"/><path d="M4 4h10v10H4zM14 14l6 6M9 6.5v5M6.5 9h5"/>',
 check:'<path d="m4 12 5 5L20 6"/>',
 percent:'<path d="M19 5 5 19M5 5h4v4H5zM15 15h4v4h-4z"/>',
 clinic:'<path class="f" d="M4 9h16v12H4z"/><path d="M2 10 12 3l10 7M4 9v12h16V9M10 21v-5h4v5M12 9v4M10 11h4"/>',
 clock:'<path class="f" d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z"/><path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18ZM12 7v5l4 2"/>',
 doc:'<path class="f" d="M5 2h9l5 5v15H5z"/><path d="M5 2h9l5 5v15H5zM14 2v5h5M8 12h8M8 16h8"/>',
 headset:'<path class="f" d="M3 13h4v7H3zM17 13h4v7h-4z"/><path d="M3 13a9 9 0 0 1 18 0M3 13h4v7H3zM17 13h4v7h-4zM21 20c0 1.5-3 2-6 2"/>',
 box:'<path class="f" d="M3 7l9 4v11l-9-4z"/><path d="m3 7 9-4 9 4v11l-9 4-9-4zM3 7l9 4 9-4M12 11v11"/>',
 card:'<path class="f" d="M2 5h20v5H2z"/><path d="M2 5h20v14H2zM2 10h20M6 15h5"/>',
 cash:'<path class="f" d="M9 9h6v6H9z"/><path d="M2 6h20v12H2zM9 9h6v6H9zM5 9v.01M19 15v.01"/>',
 tooth:'<path class="f" d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4 2 7 .4 2.5 1 6.5 2.5 6.5S9.5 17 12 17s2.5 4 4.5 4 2.1-4 2.5-6.5c.5-3 2-4 2-7C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3Z"/><path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4 2 7 .4 2.5 1 6.5 2.5 6.5S9.5 17 12 17s2.5 4 4.5 4 2.1-4 2.5-6.5c.5-3 2-4 2-7C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3Z"/>',
 bolt:'<path class="f" d="M13 2 4 14h7l-1 8 9-12h-7z"/><path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
 info:'<path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18ZM12 11v6M12 7v1"/>'
};
var VK='<svg class="ico" viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><path d="M12.8 17.5C6.9 17.5 3.5 13.4 3.4 6.6h3c.1 5 2.3 7.1 4 7.5V6.6h2.8v4.3c1.7-.2 3.5-2.1 4.1-4.3h2.8c-.5 2.6-2.4 4.5-3.8 5.3 1.4.6 3.6 2.3 4.4 5.6h-3.1c-.7-2.2-2.4-3.9-4.4-4.1v4.1Z"/></svg>';
var TG='<svg class="ico" viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><path d="M20.7 4.3 3.4 11c-1.2.5-1.2 1.2-.2 1.5l4.4 1.4 1.7 5.2c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.2-2.1 4.5 3.3c.8.5 1.4.2 1.6-.8l2.9-13.7c.3-1.2-.4-1.7-1.5-1.3ZM8.8 13.6l8.6-5.4c.4-.3.8-.1.5.2l-7.1 6.4-.3 3.3Z"/></svg>';
I.compare=I.scales; I.wrench=I.gear; I.award=I.medal;
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
A.cmp={list:function(){return cmp;},has:function(id){return cmp.indexOf(id)>=0;},toggle:function(id){var i=cmp.indexOf(id);if(i>=0)cmp.splice(i,1);else{if(cmp.length>=4)cmp.shift();cmp.push(id);}store(CKEY,cmp);sync();if(i<0)toast(id,'Добавлено к сравнению');}};
function sync(){
  $$('[data-cart-n]').forEach(function(e){var n=A.cart.count();e.textContent=n||'';e.setAttribute('data-n',n);});
  $$('[data-fav-n]').forEach(function(e){e.textContent=fav.length||'';e.setAttribute('data-n',fav.length);});
  $$('[data-cmp-n]').forEach(function(e){e.textContent=cmp.length||'';e.setAttribute('data-n',cmp.length);});
  $$('[data-fav]').forEach(function(b){b.classList.toggle('is-on',A.fav.has(b.getAttribute('data-fav')));});
  $$('[data-cmp]').forEach(function(b){b.classList.toggle('is-on',A.cmp.has(b.getAttribute('data-cmp')));});
  document.dispatchEvent(new Event('amf:cart'));
}
A.sync=sync;

/* ---------- карточка товара: компактная, квадратная кнопка корзины ---------- */
function badgeHtml(m){var c=/Скидка/.test(m)?'tag-sale':/TOP/.test(m)?'tag-top':/Новинка/.test(m)?'tag-new':'tag-soft';return '<span class="tag '+c+'">'+esc(m.replace('Скидка ','−').replace(' %','%'))+'</span>';}
function stockCls(s){return /Не доступен|Нет/.test(s)?'is-none':/Доступен для заказа|заказ/i.test(s)?'is-order':'';}
function stockTxt(s){return /Не доступен/.test(s)?'Нет в наличии':/Доступен для заказа/.test(s)?'Под заказ':s;}
function priceHtml(p){if(!num(p.price))return '<div class="price"><span class="ask">Цена по запросу</span></div>';return '<div class="price">'+(p.old?'<s>'+esc(p.old)+'</s>':'')+'<b>'+esc(p.price)+'</b></div>';}
function purl(p){return 'product.html?id='+encodeURIComponent(p.id);}
A.purl=purl;
A.card=function(p){
  var can=num(p.price)>0&&!/Не доступен/.test(p.stock);
  var by=[p.brand,p.country].filter(Boolean).join(' · ');
  return '<article class="card">'+
   '<div class="card__tags">'+p.marks.map(badgeHtml).join('')+'</div>'+
   '<div class="card__tools"><button class="tool" data-fav="'+p.id+'" aria-label="В избранное">'+ic('heart')+'</button><button class="tool" data-cmp="'+p.id+'" aria-label="Сравнить">'+ic('scales')+'</button></div>'+
   '<a class="card__img" href="'+purl(p)+'"><img loading="lazy" src="'+esc(p.img)+'" alt="'+esc(p.name)+'"></a>'+
   '<div class="card__by">'+esc(by)+'</div>'+
   '<a class="card__t" href="'+purl(p)+'">'+esc(p.name)+'</a>'+
   '<div class="card__st"><span class="stock '+stockCls(p.stock)+'">'+esc(stockTxt(p.stock))+'</span><span class="card__sku">'+esc(p.model)+'</span></div>'+
   '<div class="card__bottom">'+priceHtml(p)+
     (can?'<button class="sq sq-teal" data-add="'+p.id+'" aria-label="В корзину">'+ic('cart')+'</button>'
         :'<button class="sq sq-line" data-modal="callback" aria-label="Запросить цену">'+ic('phone')+'</button>')+
   '</div></article>';
};
A.stockCls=stockCls;A.stockTxt=stockTxt;A.priceHtml=priceHtml;A.badgeHtml=badgeHtml;

/* ---------- шапка ---------- */
function logo(white){return '<a class="logo" href="index.html" aria-label="Амфодент — на главную"><img class="logo__em" src="assets/img/emblem.svg" alt=""><span class="logo__txt"><img class="logo__wm" src="assets/img/wordmark'+(white?'-white':'')+'.svg" alt="Амфодент"><span class="logo__tag">Стоматологическое оборудование</span></span></a>';}
function catHref(c){return href(c[2]==='stomatologicheskoe-oborudovanie/'?'catalog.html':c[2]);}
function header(active){
  var nav=A.nav.slice(0,5).map(function(n){return '<a href="'+href(n[1])+'"'+(n[1]===active?' class="is-active"':'')+'>'+esc(n[0])+'</a>';}).join('')+'<a href="'+href('specials/')+'" class="nav-sale">Акции</a>';
  var mega=A.cats.map(function(c,i){return '<a class="mega__item" href="'+catHref(c)+'"><span class="mega__n">'+(i<9?'0':'')+(i+1)+'</span><img src="https://amfodent.ru/image/cache/'+c[1]+'" alt="">'+esc(c[0])+ic('chevR','ico-sm')+'</a>';}).join('');
  return ''+
  '<header class="header"><div class="wrap header__main">'+
    '<button class="hbtn burger" data-drawer="menu" aria-label="Меню">'+ic('menu')+'</button>'+
    logo(true)+
    '<span class="h-since">С 1993 года<br>Санкт-Петербург</span>'+
    '<form class="search" action="catalog.html" role="search" autocomplete="off"><div class="search__box">'+ic('search')+'<input class="search__input" name="q" placeholder="Поиск по товарам, брендам, артикулам" aria-label="Поиск"><button class="search__btn" type="submit" aria-label="Найти">'+ic('arrow')+'</button></div><div class="search__drop" role="listbox"></div></form>'+
    '<div class="contact"><a class="contact__phone" href="'+A.phoneHref+'">'+A.phone+'</a><button class="contact__cb" data-modal="callback">Заказать звонок</button></div>'+
    '<div class="hacts">'+
      '<a class="hact hide-m" href="#" data-modal="login">'+ic('user')+'<span>Войти</span></a>'+
      '<a class="hact hide-m" href="'+href('compare-products/')+'">'+ic('scales')+'<span>Сравнение</span><i data-cmp-n></i></a>'+
      '<a class="hact hide-m" href="#" data-modal="fav">'+ic('heart')+'<span>Избранное</span><i data-fav-n></i></a>'+
      '<a class="hact" href="cart.html">'+ic('cart')+'<span>Корзина</span><i data-cart-n></i></a>'+
    '</div>'+
  '</div></header>'+
  '<div class="navbar"><div class="wrap navbar__in">'+
    '<button class="catbtn" aria-expanded="false" data-mega>'+ic('grid')+'<span>Каталог товаров</span></button>'+
    '<nav class="navlinks">'+nav+'</nav>'+
    '<div class="nserv"><a href="'+href('delivery/')+'">'+ic('truck')+'<span>Доставка<br>по России</span></a><a href="'+href('garantiya-i-sposoby-vozvrata-tovara/')+'">'+ic('shield')+'<span>Гарантия<br>и сервис</span></a><a href="'+href('contact-us')+'">'+ic('clinic')+'<span>Кабинет<br>под ключ</span></a></div>'+
    '<div class="mega"><div class="mega__panel"><div class="mega__grid">'+mega+'</div><div class="mega__foot"><span>Более 200 производителей в каталоге</span><a href="'+href('brands/')+'">Все производители '+ic('arrow','ico-sm')+'</a></div></div></div>'+
  '</div></div>';
}
function footer(){
  function col(t,l){return '<div class="fcol"><h4>'+t+'</h4><ul>'+l.map(function(x){return '<li><a href="'+href(x[1])+'">'+esc(x[0])+'</a></li>';}).join('')+'</ul></div>';}
  return '<footer class="footer">'+
   '<div class="wrap footer__cta"><div><b>Нужна помощь с выбором?</b><span>Подберём оборудование под ваш кабинет и рассчитаем доставку.</span></div><a class="fphone" href="'+A.phoneHref+'">'+A.phone+'</a><button class="btn btn-teal" data-modal="callback">'+ic('headset')+'Заказать звонок</button></div>'+
   '<div class="wrap footer__top">'+
   '<div class="fcol fcol-about">'+logo(false)+'<p>Оптовые и розничные поставки стоматологического оборудования и материалов с 1993 года. Товарные предложения на сайте не являются публичной офертой (ст. 437 (2) ГК РФ).</p><div class="socials"><a href="#" aria-label="ВКонтакте">'+VK+'</a><a href="#" aria-label="Telegram">'+TG+'</a></div></div>'+
   col('Каталог',A.footer.catalog.slice(0,7))+col('Покупателям',A.footer.buyers)+col('Компания',A.footer.company)+
   '<div class="fcol"><h4>Контакты</h4>'+
     '<a class="fct" href="'+A.phoneHref+'">'+ic('phone')+'<span><b>'+A.phone+'</b>Бесплатно по России</span></a>'+
     '<a class="fct" href="'+A.phone2Href+'">'+ic('phone')+'<span><b>'+A.phone2+'</b>Мобильный</span></a>'+
     '<a class="fct" href="mailto:'+A.email+'">'+ic('mail')+'<span><b>'+A.email+'</b>Заказы и вопросы</span></a>'+
     '<div class="fct">'+ic('pin')+'<span>'+esc(A.address)+'</span></div>'+
   '</div></div>'+
   '<div class="footer__bot"><div class="wrap"><span>© 1993–2026 Амфодент</span><span><a href="'+href('privacy/')+'">Политика конфиденциальности</a><a href="'+href('terms/')+'">Условия соглашения</a></span></div></div></footer>';
}
function chrome(){
  var h=$('[data-header]'),f=$('[data-footer]'),act=(h&&h.getAttribute('data-header'))||'';
  if(h)h.outerHTML=header(act);
  if(f)f.outerHTML=footer();
  document.body.insertAdjacentHTML('beforeend',
   '<div class="toast" role="status" aria-live="polite"></div>'+
   '<div class="proto"><i></i>Прототип 2 · бирюзовый · <a href="../index.html">все варианты</a></div>'+
   modal('callback','<h3>Заказать звонок</h3><p>Перезвоним в рабочее время и поможем подобрать оборудование.</p><div class="field"><label>Имя</label><input class="input" placeholder="Как к вам обращаться"></div><div class="field"><label>Телефон <i>*</i></label><input class="input" type="tel" placeholder="+7 (___) ___-__-__"></div><button class="btn btn-teal btn-block btn-lg" data-proto>Перезвоните мне</button>')+
   modal('login','<h3>Вход в личный кабинет</h3><p>История заказов, избранное и персональные цены для клиник.</p><div class="field"><label>Email</label><input class="input" type="email" placeholder="you@clinic.ru"></div><div class="field"><label>Пароль</label><input class="input" type="password"></div><button class="btn btn-teal btn-block btn-lg" data-proto>Войти</button>')+
   modal('fav','<h3>Избранное</h3><div data-fav-list></div>')+
   modal('proto','<h3>Это прототип</h3><p>Кнопка показывает, как будет работать сайт. Данные никуда не отправляются.</p><button class="btn btn-teal btn-block" data-close>Понятно</button>')+
   '<div class="drawer" data-drawer-menu><div class="drawer__bg" data-close></div><div class="drawer__panel"><div class="drawer__head">'+logo(true)+'<button class="hbtn" data-close aria-label="Закрыть">'+ic('x')+'</button></div><div class="drawer__list">'+
     A.cats.map(function(c){return '<a href="'+catHref(c)+'"><img src="https://amfodent.ru/image/cache/'+c[1]+'" alt="">'+esc(c[0])+'</a>';}).join('')+
     A.topLinks.map(function(l){return '<a class="drawer__link" href="'+href(l[1])+'">'+esc(l[0])+'</a>';}).join('')+
   '</div><div class="drawer__contacts"><a class="contact__phone" href="'+A.phoneHref+'">'+A.phone+'</a><a href="mailto:'+A.email+'">'+A.email+'</a><button class="btn btn-teal" data-modal="callback">Заказать звонок</button></div></div></div>');
}
function modal(id,body){return '<div class="modal" data-modal-id="'+id+'" role="dialog" aria-modal="true"><div class="modal__box"><button class="hbtn modal__x" data-close aria-label="Закрыть">'+ic('x')+'</button>'+body+'</div></div>';}
A.openModal=function(id){var m=$('[data-modal-id="'+id+'"]');if(!m)return;if(id==='fav')renderFav();m.classList.add('is-open');};
function renderFav(){var box=$('[data-fav-list]');if(!box)return;var items=fav.map(function(id){return A.byId[id];}).filter(Boolean);
  box.innerHTML=items.length?'<div class="mini-items">'+items.map(function(p){return '<a class="mini" href="'+purl(p)+'"><img src="'+esc(p.img)+'" alt=""><span>'+esc(p.name)+'</span><b>'+esc(num(p.price)?p.price:'')+'</b></a>';}).join('')+'</div><a class="btn btn-teal btn-block" href="cart.html">Перейти в корзину</a>':'<p>Нажмите ♡ на карточке товара, чтобы сохранить его здесь.</p>';}

/* ---------- тост ---------- */
var tt;function toast(id,msg){var p=A.byId[id],t=$('.toast');if(!t||!p)return;t.innerHTML='<img src="'+esc(p.img)+'" alt=""><div><b>'+msg+'</b><small>'+esc(p.name)+'</small></div><a class="btn btn-teal btn-sm" href="cart.html">Корзина</a>';t.classList.add('is-on');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('is-on');},3200);}

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
  function go(d){var c=tr.firstElementChild;var w=c?c.getBoundingClientRect().width+14:300;tr.scrollBy({left:d*w*2,behavior:'smooth'});}
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
var NOPAGE_BTN='btn btn-teal',NOPAGE_BTN2='btn-line';
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
