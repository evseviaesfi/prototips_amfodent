/* Реальные данные amfodent.ru (выгружены 07.10.2026). Картинки берутся с сайта. */
(function(){
var IMG='https://amfodent.ru/image/cache/';
var SITE='https://amfodent.ru/';
function P(a){return {id:a[0]||a[6],name:a[1],model:a[2],price:a[3],old:a[4]||'',img:a[5].indexOf('http')===0?a[5]:IMG+a[5],href:a[6].indexOf('http')===0?a[6]:SITE+a[6],marks:(a[7]||'').split(';').filter(Boolean),stock:a[8]||'В наличии',brand:a[9]||'',country:a[10]||''};}

window.AMF={
  site:SITE,
  phone:'+7 (800) 550 45 35', phoneHref:'tel:+78005504535',
  phone2:'+7 (921) 090 19 91', phone2Href:'tel:+79210901991',
  email:'zakaz@amfodent.ru',
  address:'Малая Митрофаньевская улица, 5к1, Санкт-Петербург, 196084',
  since:1993,

  topLinks:[['О компании','about_us/'],['Доставка и оплата','delivery/'],['Гарантии','garantiya-i-sposoby-vozvrata-tovara/'],['Блог','shopblog/'],['Контакты','contact-us']],
  nav:[['Стоматологические установки','catalog.html'],['Наконечники','stomatologicheskie-nakonechniki-i-motory/'],['Стерилизация','sterilizacionnoe-oborudovanie/'],['Рентгены','rentgenovskiy-apparat-i-oborudovanie/'],['Мебель','medicinskuyu-mebel-dlya-stomatologicheskih-kabinetov/'],['Производители','brands/'],['Акции','specials/']],

  /* баннеры производителей — без изменений */
  promoTop:[
    {img:IMG+'catalog/banner-glavnay/tri-1/banner_left-550x267.png',href:SITE+'s200-continental-stomatologicheskaya-ustanovka-s-verhney-podachey-instrumentov',tag:'Акция',title:'Установка Stern Weber S200 Continental',tone:'blue'},
    {img:IMG+'catalog/banner-glavnay/tri-1/myray_center-550x267.png',href:SITE+'hyperionx9_pro',tag:'В наличии',title:'Томограф MyRay Hyperion X9 Pro',tone:'navy'},
    {img:IMG+'catalog/banner-glavnay/tri-1/tosi_right-550x267.png',href:SITE+'tosi-foshan-kitaj',tag:'Выгодно',title:'Наконечники TOSI',tone:'coral'}
  ],
  promoMid:[
    {img:IMG+'catalog/banner-glavnay/tri-1/bannerleft-503x163.png',href:SITE+'sterilizacionnoe-oborudovanie/avtoklav-stomatologicheskiy/',title:'Автоклавы'},
    {img:IMG+'catalog/banner-glavnay/tri-1/bannercenter-503x163.png',href:SITE+'instrumenty-dlya-terapevtov-i-endodontov/intraoralnye-videokamery/',title:'Интраоральные камеры'},
    {img:IMG+'catalog/banner-glavnay/tri-1/bannerright-503x163.png',href:SITE+'rentgenovskiy-apparat-i-oborudovanie/',title:'Рентгены и визиографы'}
  ],

  /* герой: реальные товары с главных баннеров */
  hero:[
    {kicker:'Stern Weber · Италия',title:'Стоматологическая установка S280 TRC',text:'Верхняя или нижняя подача инструментов, сенсорная TFT-консоль врача, до пяти инструментов.',price:'1 457 894 ₽',img:IMG+'product-osn/s280-trc-stomatologicheskaia-ustanovka-s-verkhnei-ili-nizhnei-podachei-instrumentov-1000x1000.jpg',href:'product.html'},
    {kicker:'MyRay · Италия',title:'Дентальный томограф Hyperion X9 Pro',text:'С цефалостатом, поле обзора 13×16 (16×18 — опция).',price:'4 314 926 ₽',img:IMG+'product-osn/x9pro-260x260.png',href:SITE+'hyperionx9_pro'},
    {kicker:'TOSI',title:'Турбинные наконечники TOSI со скидкой до 41%',text:'TX-112 фрикционный и стандартный — в наличии на складе.',price:'от 2 355 ₽',img:IMG+'product-osn/3tositx112-260x260.png',href:SITE+'tosi-foshan-kitaj'}
  ],

  /* категории */
  cats:[
    ['Стоматологическое оборудование','catalog/category/stom-oborudovania-220x220.jpg','stomatologicheskoe-oborudovanie/'],
    ['Зуботехническое оборудование','catalog/category/zubotekhnicheskoye-oborudovaniye-220x220.jpg','zubotehnicheskoe-oborudovanie/'],
    ['Наконечники','catalog/category/nakonechniki-220x220.jpg','stomatologicheskie-nakonechniki-i-motory/'],
    ['Рентгены','catalog/category/rentgen-220x220.jpg','rentgenovskiy-apparat-i-oborudovanie/'],
    ['Стерилизация','catalog/category/sterilizacia-220x220.jpg','sterilizacionnoe-oborudovanie/'],
    ['Оборудование для хирургов','catalog/category/xirurgi-220x220.jpg','instrumenty-stomatologa-hirurga-i-ortopeda/'],
    ['Оборудование для терапевтов','catalog/category/oborudovaniye-dlya-terapevtov-220x220.jpg','instrumenty-dlya-terapevtov-i-endodontov/'],
    ['Оборудование для эндодонтов','catalog/category/oborudovaniye-dlya-endodontov-220x220.jpg','oborudovanie-dlya-endodontov/'],
    ['Медицинская оптика','catalog/category/meditsinskaya-optika-220x220.jpg','medicinskaya-optika/'],
    ['Стоматологические инструменты','catalog/category/stomatologicheskiye-instrumenty-220x220.jpg','stomatologicheskie-instrumenty/'],
    ['Зуботехнические материалы','catalog/category/zubotekhnicheskiye-materialy-220x220.jpg','zubotehnicheskie-materialy/'],
    ['Мебель','catalog/category/stomatologicheskaya-mebel-220x220.jpg','medicinskuyu-mebel-dlya-stomatologicheskih-kabinetov/']
  ],
  popularCats:[
    ['Стоматологические установки','catalog/category/dopcategory/ustanovki-193x189.jpg','catalog.html'],
    ['Турбинные наконечники','catalog/category/dopcategory/8tositx162kavo-400x400-218x161.png','stomatologicheskie-nakonechniki-i-motory/stomatologicheskie-turbinnye-nakonechniki/'],
    ['Визиографы','catalog/category/dopcategory/viziograf-183x224.png','rentgenovskiy-apparat-i-oborudovanie/stomatologicheskiy-viziograf/'],
    ['Ортопантомографы','catalog/category/dopcategory/rentgenovskaia-ustanovka-186x205.jpg','rentgenovskiy-apparat-i-oborudovanie/ortopantomographi/'],
    ['Стоматологические микроскопы','catalog/category/dopcategory/mikroskop-123x236.jpg','medicinskaya-optika/mikroskopy-medicinskie/'],
    ['Медицинские компрессоры','catalog/category/dopcategory/kompressor-217x228.jpg','stomatologicheskoe-oborudovanie/kompressory-stomatologicheskie/'],
    ['Автоклавы стоматологические','catalog/category/dopcategory/avtoklav-432x188.jpg','sterilizacionnoe-oborudovanie/avtoklav-stomatologicheskiy/']
  ],

  /* товары */
  sale:[
    ['9939','Моноблок с интраоральной камерой DA-PTC02','DA-PTC02','76 575 ₽','87 600 ₽','product-osn/06-260x260.jpg','monoblok-s-intraoralnoy-kameroy-da-ptc02','Скидка 13 %','В наличии','Dalaude'],
    ['9938','Моноблок с интраоральной камерой DA-PTC01E','DA-PTC01E','78 500 ₽','84 150 ₽','product-osn/03-260x260.jpg','monoblok-s-intraoralnoy-kameroy-da-ptc01e','Скидка 7 %','В наличии','Dalaude'],
    ['9937','Интраоральная камера DA-600','DA-600','40 500 ₽','56 190 ₽','product-osn/_mg_4683-260x260.jpg','intraoralnaya-kamera-da-600','Скидка 28 %;TOP','В наличии','Dalaude'],
    ['9936','Интраоральная камера DA-300','DA-300','38 100 ₽','51 250 ₽','product-osn/300-01-260x260.jpg','intraoralnaya-kamera-da-300','Скидка 26 %;TOP','В наличии','Dalaude'],
    ['9935','Интраоральная камера DA-200','DA-200','27 000 ₽','40 800 ₽','product-osn/09-260x260.jpg','intraoralnaya-kamera-da-200','Скидка 34 %','В наличии','Dalaude'],
    ['9934','Интраоральная камера DA-100','DA-100','26 500 ₽','39 000 ₽','product-osn/da-100_0003-260x260.jpg','intraoralnaya-kamera-da-100','Скидка 32 %','В наличии','Dalaude'],
    ['9925','TOSI TX-112 турбинный наконечник фрикционный без света','TX-112 фр','2 355 ₽','3 990 ₽','product-osn/3tositx112-260x260.png','tosi-tx-112-turbinniy-nakonechnik-friktsionniy-bez-sveta','Скидка 41 %','В наличии','TOSI'],
    ['9924','TOSI TX-112 турбинный наконечник без света','TX-112','3 695 ₽','4 950 ₽','product-osn/2tositx112-260x260.png','tosi-tx-112-turbinniy-nakonechnik-bez-sveta','Скидка 25 %','В наличии','TOSI']
  ].map(P),
  novelty:[
    ['10074','Камера КБ-03-«Я»-ФП «Ультра-Лайт»','51123-AMF','18 000 ₽','','catalog/image_prod_06_2026/image_prod_07_2026/11-200x200.jpg','kamera-kb-03-ya-fp-ultra-layt','Новинка'],
    ['10073','Камера КБ-02-«Я»-ФП «Ультра-Лайт»','15544-AMF','21 500 ₽','','catalog/image_prod_06_2026/image_prod_07_2026/66-200x200.jpg','kamera-kb-02-ya-fp-ultra-layt','Новинка'],
    ['10072','Камера КБ-«Я»-ФП «Ультра-Лайт»','43334-AMF','35 900 ₽','','catalog/image_prod_06_2026/image_prod_07_2026/88-200x200.jpg','kamera-kb-ya-fp-ultra-layt','Новинка'],
    ['10071','Lifedent EGO-FILLER2 фильтр для воды','09880-AMF','43 500 ₽','','catalog/image_prod_06_2026/image_prod_07_2026/77-200x200.webp','lifedent-ego-filler2-filtr-dlya-vody','Новинка'],
    ['10070','Стерилизатор для инструментов «Ферропласт Премиум»-10','34568-AMF','46 000 ₽','','catalog/image_prod_06_2026/image_prod_07_2026/DSC00140_.png-200x200.webp','sterilizator-dlya-instrumentov-ferroplast-premium-10','Новинка'],
    ['10069','Стерилизатор для инструментов «Ферропласт Премиум»-5','70909-AMF','43 700 ₽','','catalog/image_prod_06_2026/image_prod_07_2026/DSC00161_1.png-200x200.webp','sterilizator-dlya-instrumentov-ferroplast-premium-5','Новинка'],
    ['10068','Стерилизатор для инструментов «Ферропласт» - 40','21212-AMF','52 100 ₽','','catalog/image_prod_06_2026/image_prod_07_2026/DSC06356_1.jpg-200x200.webp','sterilizator-dlya-instrumentov-ferroplast-40','Новинка'],
    ['10067','Стерилизатор для инструментов «Ферропласт» - 20','34567-AMF','39 800 ₽','','catalog/image_prod_06_2026/image_prod_07_2026/DSC06329-200x200.jpg','sterilizator-dlya-instrumentov-ferroplast-20','Новинка'],
    ['10064','Ультрафиолетовая камера УФК-2','54322-AMF','28 900 ₽','','catalog/image_prod_06_2026/image_prod_07_2026/UFK_1-200x200.png','ultrafioletovaya-kamera-ufk-2','Новинка'],
    ['10063','Ультрафиолетовая камера УФК-3','20009-AMF','17 500 ₽','','catalog/image_prod_06_2026/image_prod_07_2026/UFK_3_crope-200x200.png','ultrafioletovaya-kamera-ufk-3','Новинка'],
    ['10061','Устройство термосваривающее упаковочное УТС-01','17777-AMF','100 000 ₽','','catalog/image_prod_06_2026/image_prod_07_2026/UTS_01-200x200.jpg','ustroystvo-termosvarivayuscheye-upakovochnoye-uts-01','Новинка'],
    ['10060','Стерилизатор паровой автоматический ГКа-120 ПЗ','51233-AMF','830 000 ₽','','catalog/image_prod_06_2026/image_prod_07_2026/33-200x200.png','sterilizator-parovoy-avtomaticheskiy-gka-120-pz','Новинка']
  ].map(P),

  /* категория «Стоматологические установки» */
  category:{
    title:'Стоматологические установки',
    crumbs:[['Главная','index.html'],['Стоматологическое оборудование','stomatologicheskoe-oborudovanie/']],
    subs:[
      ['Светильники','catalog/category/4-diodnyi-svetilnik-dlia-stomatologicheskoi-ustanovki-foto1-255x320-220x220.jpg','stomatologicheskoe-oborudovanie/stomatologicheskie-ustanovki/svetilniki-dlya-stomatologicheskih-ustanovok/'],
      ['Портативные установки','catalog/category/portativnye-i-mobilnye-stomatologicheskie-ustanovki-220x220.jpg','stomatologicheskoe-oborudovanie/stomatologicheskie-ustanovki/portativnye-i-mobilnye-stomatologicheskie-ustanovki/'],
      ['Матрасы','catalog/category/matrasy-i-podgolovniki-220x220.jpg','stomatologicheskoe-oborudovanie/stomatologicheskie-ustanovki/matrasy-na-stomatologicheskuyu-ustanovku/'],
      ['Запасные части для установок','catalog/category/obivka-podgolovnika-dlia-ustanovok-ay-a-1000-foto1-255x320-220x220.jpg','stomatologicheskoe-oborudovanie/stomatologicheskie-ustanovki/zapasnye-chasti-dlya-stomatologicheskih-ustanovok/'],
      ['Подголовники для установок','catalog/category/ortopedicheskii-podgolovnik-122-s-plotnostiu-50-kg-m3-255x320-220x220.jpg','stomatologicheskoe-oborudovanie/stomatologicheskie-ustanovki/podgolovniki-dlya-stomatologicheskoy-ustanovki/'],
      ['Стоматологические кресла','catalog/category/diplomat-dm20-stomatologicheskoe-kreslo-s-piatiu-programmiruemymi-pozitsiiami-785x1000-220x220.jpg','stomatologicheskoe-oborudovanie/stomatologicheskie-ustanovki/stomatologicheskiye-kresla/']
    ],
    pages:7,
    products:[
      ['2829','S280 TRC - стоматологическая установка с верхней или нижней подачей инструментов','2714-AMF','1 457 894 ₽','','product-osn/s280-trc-stomatologicheskaia-ustanovka-s-verkhnei-ili-nizhnei-podachei-instrumentov-260x260.jpg','product.html','TOP','На складе','Stern Weber','Италия'],
      ['2823','Стоматологическая установка Stern Weber S200 Continental','2708-AMF','935 000 ₽','','product-osn/1SternWeberS200-260x260.png','s200-continental-stomatologicheskaya-ustanovka-s-verhney-podachey-instrumentov','TOP','На складе','Stern Weber','Италия'],
      ['2830','S220 TR International - стоматологическая установка с нижней подачей инструментов','2715-AMF','1 252 430 ₽','','product-osn/s220-tr-international-stomatologicheskaia-ustanovka-s-nizhnei-podachei-instrumentov-260x260.jpg','s220-tr-international-stomatologicheskaya-ustanovka-s-nizhney-podachey-instrumentov','','На складе','Stern Weber','Италия'],
      ['2826','S220 TR Continental - стоматологическая установка с верхней подачей инструментов','2711-AMF','1 235 446 ₽','','product-osn/s220-tr-continental-stomatologicheskaia-ustanovka-s-verkhnei-podachei-instrumentov-260x260.jpg','s220-tr-continental-stomatologicheskaya-ustanovka-s-verhney-podachey-instrumentov','','На складе','Stern Weber','Италия'],
      ['2824','S200 International - стоматологическая установка с нижней подачей инструментов','2709-AMF','1 127 756 ₽','','product-osn/s200-international-stomatologicheskaia-ustanovka-s-nizhnei-podachei-instrumentov-260x260.jpg','s200-international-stomatologicheskaya-ustanovka-s-nizhney-podachey-instrumentov','','На складе','Stern Weber','Италия'],
      ['2832','S380 TRC - стоматологическая установка с верхней или нижней подачей инструментов','2716-AMF','Цена по запросу','','product-osn/s380-260x260.png','s380-trc-stomatologicheskaya-ustanovka-s-verhney-ili-nizhney-podachey-instrumentov','','На складе','Stern Weber','Италия'],
      ['212','S300 International стоматологическая установка с нижней подачей инструментов','8097-AMF','Цена по запросу','','product-osn/stomatologicheskaia-ustanovka-s300-international-260x260.jpg','s300-international-stomatologicheskaya-ustanovka-s-nizhney-podachey-instrumentov','','На складе','Stern Weber','Италия'],
      ['210','S320 TR Continental стоматологическая установка с верхней подачей','8096-AMF','Цена по запросу','','product-osn/stomatologicheskaia-ustanovka-s320-tr-continental-260x260.jpg','s320-tr-stomatologicheskaya-ustanovka-s-verhney-ili-nizhney-podachey-instrumentov','','На складе','Stern Weber','Италия'],
      ['209','S300 Continental стоматологическая установка с верхней подачей','8095-AMF','Цена по запросу','','product-osn/stomatologicheskaia-ustanovka-s300-continental-260x260.jpg','s300-continental-stomatologicheskaya-ustanovka-s-verhney-podachey','','На складе','Stern Weber','Италия'],
      ['2742','WOD550 - стоматологическая установка с нижней подачей инструментов','2742-AMF','420 000 ₽','','product-osn/wod550-stomatologicheskaia-ustanovka-s-nizhnei-podachei-instrumentov-260x260.jpg','wod550-stomatologicheskaya-ustanovka-s-nizhney-podachey-instrumentov','','Доступен для заказа','Woson','Китай'],
      ['2839','IMPULS S300 NEO - стационарная стоматологическая установка с нижней подачей инструментов','2722-AMF','860 000 ₽','','product-osn/impuls-s300-neo-statsionarnaia-stomatologicheskaia-ustanovka-s-nizhnei-podachei-instrumentov-260x260.jpg','impuls-s300-neo-stacionarnaya-stomatologicheskaya-ustanovka-s-nizhney-podachey-instrumentov','','Доступен для заказа','',''],
      ['2838','IMPULS S200 - стационарная стоматологическая установка с нижней подачей инструментов','2721-AMF','698 000 ₽','','product-osn/impuls-s200-statsionarnaia-stomatologicheskaia-ustanovka-s-nizhnei-podachei-instrumentov-260x260.jpg','impuls-s200-stacionarnaya-stomatologicheskaya-ustanovka-s-nizhney-podachey-instrumentov','','Доступен для заказа','',''],
      ['2834','IMPULS S100 - стационарная стоматологическая установка с верхней подачей инструментов','2717-AMF','706 000 ₽','','product-osn/impuls-s100-statsionarnaia-stomatologicheskaia-ustanovka-s-verkhnei-podachei-instrumentov-260x260.jpg','impuls-s100-stacionarnaya-stomatologicheskaya-ustanovka-s-verhney-podachey-instrumentov','','Доступен для заказа','',''],
      ['2819','Siger U200 - стоматологическая установка с нижней подачей инструментов','2704-AMF','490 000 ₽','','product-osn/siger-u200-se-stomatologicheskaia-ustanovka-s-nizhnei-podachei-instrumentov-260x260.jpg','siger-u200-se-stomatologicheskaya-ustanovka-s-nizhney-podachey-instrumentov','','Доступен для заказа','Siger','Китай'],
      ['2796','Стоматологическая установка Pragmatic QL-2028 (DL 920) с нижней/верхней подачей','2682-AMF','170 000 ₽','','product-osn/ql-2028-dl-920-stomatologicheskaia-ustanovka-s-nizhnei-verkhnei-podachei-instrumentov-260x260.jpg','ql-2028-dl-920-stomatologicheskaya-ustanovka-s-nizhney-verhney-podachey-instrumentov','TOP','Доступен для заказа','Pragmatic','Китай'],
      ['2772','AY-A 3600 - стоматологическая установка с нижней подачей инструментов','2657-AMF','425 000 ₽','','product-osn/ay-a-3600-stomatologicheskaia-ustanovka-s-nizhnei-podachei-instrumentov-260x260.jpg','ay-a-3600-stomatologicheskaya-ustanovka-s-nizhney-podachey-instrumentov','','Доступен для заказа','Anya','Китай'],
      ['2771','AY-A 1000 - стоматологическая установка с нижней подачей инструментов','6919-AMF','200 000 ₽','','product-osn/ay-a-1000-stomatologicheskaia-ustanovka-s-nizhnei-podachei-instrumentov-260x260.jpg','ay-a-1000-stomatologicheskaya-ustanovka-s-nizhney-podachey-instrumentov','','Доступен для заказа','Anya','Китай'],
      ['2752','Estetica E30 S/TM Essential Line (светильник EDI) - стоматологическая установка с верхней/нижней подачей инструментов','2639-AMF','1 063 753 ₽','','product-osn/estetica-e30-s-tm-essential-line-svetilnik-edi-stomatologicheskaia-ustanovka-s-verkhnei-nizhnei-podachei-instrumentov-260x260.jpg','estetica-e30-s-tm-essential-line-svetilnik-edi-stomatologicheskaya-ustanovka-s-verhney-nizhney-podachey-instrumentov','','Доступен для заказа','KaVo','Германия'],
      ['2602','Diplomat Adept DA130 - стоматологическая установка с нижней подачей инструментов','2602-AMF','1 209 775 ₽','','product-osn/diplomat-adept-da130-stomatologicheskaia-ustanovka-s-nizhnei-podachei-instrumentov-260x260.jpg','diplomat-adept-da130-stomatologicheskaya-ustanovka-s-nizhney-podachey-instrumentov','','Доступен для заказа','Diplomat Dental','Словакия'],
      ['2676','Azimut 200A MO - стоматологическая установка с верхней подачей инструментов, мягкой обивкой кресла и двумя стульями','2561-AMF','236 000 ₽','','product-osn/azimut-200a-mo-stomatologicheskaia-ustanovka-s-verkhnei-podachei-instrumentov-miagkoi-obivkoi-kresla-i-dvumia-stuliami-260x260.jpg','azimut-200a-mo-stomatologicheskaya-ustanovka-s-verhney-podachey-instrumentov-myagkoy-obivkoy-kresla-i-dvumya-stulyami','','Доступен для заказа','Azimut','Китай'],
      ['2671','Azimut 200A MO - стоматологическая установка с нижней подачей инструментов, мягкой обивкой кресла и двумя стульями','2556-AMF','228 000 ₽','','product-osn/azimut-200a-mo-stomatologicheskaia-ustanovka-s-nizhnei-podachei-instrumentov-miagkoi-obivkoi-kresla-i-dvumia-stuliami-260x260.jpg','azimut-200a-mo-stomatologicheskaya-ustanovka-s-nizhney-podachey-instrumentov-myagkoy-obivkoy-kresla-i-dvumya-stulyami','','Доступен для заказа','Azimut','Китай'],
      ['2664','AJ 15 - стоматологическая установка с нижней /верхней подачей инструментов','2549-AMF','486 000 ₽','','product-osn/aj-15-stomatologicheskaia-ustanovka-s-nizhnei-podachei-isntrumentov-260x260.jpg','aj-15-stomatologicheskaya-ustanovka-s-nizhney-podachey-isntrumentov','','Не доступен для заказа','Ajax','Китай'],
      ['2662','AJ 11 - стоматологическая установка с нижней / верхней подачей инструментов','2547-AMF','368 000 ₽','','product-osn/aj-11-stomatologicheskaia-ustanovka-s-nizhnei-verkhnei-podachei-instrumentov-260x260.jpg','aj-11-stomatologicheskaya-ustanovka-s-nizhney-verhney-podachey-instrumentov','TOP','Не доступен для заказа','Ajax','Китай'],
      ['10023','Lifedent E9-x стоматологическая установка c подкатным модулем','55669-AMF','795 600 ₽','','catalog/image_prod_06_2026/Lifedent%20%20E9-x-260x260.webp','lifedent-e9-x-stomatologicheskaya-ustanovka-c-podkatnym-modulem','','В наличии','Lifedent','']
    ].map(P),
    popular:['Нижняя подача','Верхняя подача','Италия','Германия','Словакия','Россия','Stern Weber','Planmeca','KaVo','Castellini','Diplomat','Siger','Woson','Китай'],
    filters:[
      {name:'Производитель',type:'check',search:true,vals:['A-dec Int.','Ajax','Anthos','Anya','Azimut','Castellini','Chirana','Darta','Diplomat Dental','Dr. Mach','Faro','Fedesa','Fengdan','FONA Dental s.r.o.','Geomed','Gnatus','Hallim Dentech','KaVo','Legrin','Lifedent','Mercury','Novgodent','NYKSY','Olsen','OMS','Planmeca','Premier','Siger','Sirona','Sky Dental','Stern Weber','Stomadent','Swidella','Swident','Takara Belmont','TopperMed','Victor','Woson','Yoboshi','Zevadent','Медкрон','Медтекс']},
      {name:'Страна производителя',type:'check',vals:['Бразилия','Германия','Испания','Италия','Китай','Россия','Словакия','США','Тайвань','Финляндия','Швейцария','Ю. Корея','Япония']},
      {name:'Количество инструментов',type:'chips',vals:['3','4','5','6']},
      {name:'Кресло пациента',type:'check',vals:['Гидравлическое','Электрогидравлическое','Электромеханическое']},
      {name:'Подача инструментов',type:'check',vals:['Верхняя подача','На выбор','Нижняя подача']},
      {name:'Тип гидроблока',type:'check',vals:['Вакуумный','На выбор','Под вакуумную помпу','Эжекторный']},
      {name:'Наличие',type:'check',vals:['Есть в наличии','Нет в наличии']}
    ],
    priceMin:990, priceMax:6932230
  },

  /* карточка товара */
  product:{
    id:'2829',
    name:'S280 TRC - стоматологическая установка с верхней или нижней подачей инструментов',
    model:'2714-AMF', brand:'Stern Weber', price:'1 457 894 ₽', stock:'На складе',
    gallery:[
      'product-osn/s280-trc-stomatologicheskaia-ustanovka-s-verkhnei-ili-nizhnei-podachei-instrumentov',
      'product/fb7cee96ee280ec09327a52bbfa7ba3a','product/ebec2fb096a2f6c33e0103689054b42d','product/e1a52465c92b77fd8441737230f45ebd',
      'product/b4df48d6db45011389da0224a176f15f','product/9617a1bb7f38d3093d771683e967c6fa','product/17179b00e1d15f7e897e19ce2d943a87','product/933a172716384229247dd9d050212a79'
    ].map(function(s){return {big:IMG+s+'-1000x1000.jpg',mid:IMG+s+'-400x400.jpg',th:IMG+s+'-70x70.jpg'};}),
    attrs:[['Страна производителя','Италия'],['Количество инструментов','5'],['Кресло пациента','Электромеханическое'],['Подача инструментов','На выбор'],['Тип гидроблока','Эжекторный']],
    desc:[
      ['Модуль врача',['Столик врача в исполнении континенталь (инструменты возвращаются в стандартное положение при помощи системы пружинных рычагов) или интернациональ (инструменты вертикально вставлены в специальные гнёзда), закреплённый на двух кронштейнах, один из которых шарнирный и самобалансируемый.','Консоль врача оснащена сенсорным TFT-дисплеем, управляющим всеми функциями установки.','Возможно оснащение до пяти инструментов, каждый инструмент обладает защитой от попадания жидкости внутрь установки и автоматической системой подачи воздуха Clip Air.','Поднос со съёмным автоклавируемым ковриком.','Турбины наконечников оснащены скоростным фитингом и фиброоптикой.','Модуль с бесщёточным автоклавируемым микромотором STERN WEBER i-XS4 Led (100–40 000 об/мин, 4 Н·см) с контролем крутящего момента и автореверсом.','Скейлер ультразвуковой со светом SC-A3.']],
      ['TFT-панель управления',['Управление скоростью и мощностью инструментов.','Управление хирургическими функциями микромотора: перистальтический насос, скорость вращения, крутящий момент, подача жидкости, инверсия.','Вызов ассистента.','12 рабочих позиций кресла и 3 ходовых положения.']],
      ['Гидроблок',['Напольное крепление.','Электромеханический привод плевательницы, автоматический поворот.','Встроенный сепаратор с дренажной помпой.','Система дезинфекции шлангов WW и система подачи чистой воды Sana Spray.','Бойлер для подогрева воды, сменные легкодоступные фильтры.']]
    ]
  },

  blog:[
    {title:'Основные хирургические инструменты в стоматологии: виды, назначение и применение',date:'1 августа 2026',text:'Хирургические инструменты в стоматологии — основа безопасного и предсказуемого лечения при удалении зубов, имплантации…',href:SITE+'osnovnyye-khirurgicheskiye-instrumenty-v-stomatologii-vidy-naznacheniye-i-primeneniye/',img:''},
    {title:'Стоматологические наконечники: как выбрать и как ухаживать',date:'22 июля 2025',text:'Стоматологические наконечники — ключевые инструменты любого стоматологического кабинета…',href:SITE+'stomatologicheskiye-nakonechniki-kak-vybrat-i-kak-ukhazhivat/',img:IMG+'catalog/posts/nakonechniki/c4c38f07-328f-411e-bb67-4f49f4be4d9b-685x250.png'},
    {title:'Как открыть стоматологический кабинет с нуля: пошаговый план',date:'14 июля 2025',text:'Открытие стоматологического кабинета считается привлекательным направлением бизнеса…',href:SITE+'kak-otkryt-stomatologicheskiy-kabinet-s-nulya-poshagoviy-plan/',img:''},
    {title:'Какой автоклав выбрать для стоматологического кабинета?',date:'1 июля 2025',text:'Безопасность пациентов и соблюдение санитарно-гигиенических норм — первостепенные задачи любой клиники…',href:SITE+'kakoy-avtoklav-vybrat-dlya-stomatologicheskogo-kabineta/',img:IMG+'catalog/posts/kakoy-avtoklav-vybrat-dlya-stomatologicheskogo-kabineta/cde2a10a-2a55-4f72-887b-df12a1083c10-685x250.png'}
  ],

  /* производители, которые есть в каталоге */
  brands:['Stern Weber','KaVo','Planmeca','Castellini','A-dec Int.','Anthos','Melag','NSK Nakanishi','Dürr Dental','Euronda','Cattani','Sirona','EMS','Carl Zeiss','Bien-Air','J.Morita'],
  brandsAll:200,

  advantages:[
    ['service','Лицензированный сервисный центр','Гарантийное и постгарантийное обслуживание','delivery/'],
    ['dealer','Официальный дилер оборудования','Работаем напрямую с заводами-производителями','about_us/'],
    ['years','33 года на рынке','Компания основана в 1993 году','about_us/'],
    ['key','Стоматологический кабинет под ключ','Подбор, поставка и монтаж оборудования','contact-us']
  ],

  footer:{
    catalog:[['Стоматологические установки','catalog.html'],['Наконечники','stomatologicheskie-nakonechniki-i-motory/'],['Визиографы','rentgenovskiy-apparat-i-oborudovanie/stomatologicheskiy-viziograf/'],['Ортопантомографы','rentgenovskiy-apparat-i-oborudovanie/ortopantomographi/'],['Стерилизация','sterilizacionnoe-oborudovanie/'],['Медицинская оптика','medicinskaya-optika/'],['Эндомоторы','oborudovanie-dlya-endodontov/endomotory-stomatologicheskiy/'],['Физиодиспенсеры','instrumenty-stomatologa-hirurga-i-ortopeda/fiziodispensery-stomatologicheskie/'],['Автоклавы','sterilizacionnoe-oborudovanie/avtoklav-stomatologicheskiy/']],
    buyers:[['Доставка и оплата','delivery/'],['Гарантии','garantiya-i-sposoby-vozvrata-tovara/'],['Акции','specials/'],['Производители','brands/'],['Личный кабинет','my-account/']],
    company:[['О компании','about_us/'],['Блог','shopblog/'],['Контакты','contact-us'],['Карта сайта','sitemap/'],['Условия соглашения','terms/'],['Политика конфиденциальности','privacy/']]
  }
};
/* общий список для поиска и корзины */
var AMF=window.AMF;var all={};[].concat(AMF.sale,AMF.novelty,AMF.category.products).forEach(function(p){all[p.id]=p;});
AMF.byId=all;
})();
