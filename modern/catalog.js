const filters = [...document.querySelectorAll('.chip')];
const cards = [...document.querySelectorAll('.card')];

if ('IntersectionObserver' in window) {
  const panelObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in-view');
      panelObserver.unobserve(entry.target);
    }
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .c-row, .t-item, .doc, .svc, .kit-fig')
    .forEach(panel => panelObserver.observe(panel));
}

const photoSets = JSON.parse(document.getElementById('photoSets').textContent);
const gallery = document.getElementById('overlay');
const galleryImage = document.getElementById('mImg');
const thumbnailList = document.getElementById('mThumbs');
const photoControls = document.getElementById('mControls');
const caption = document.getElementById('mCap');
const imageLink = document.getElementById('mOriginal');
const photoCount = document.getElementById('mCount');
const closeButton = document.getElementById('mClose');
const modelField = document.getElementById('models');
const priceForm = document.getElementById('priceForm');

const captions = {
  general: 'Наконечник целиком',
  head_front: 'Головка крупным планом',
  head_back: 'Головка крупным планом · вид сзади',
  marking: 'Маркировка на корпусе',
  marking_original: 'Маркировка на корпусе',
  coupling_ports: 'Порты переходника',
  coupling_side: 'Переходник сбоку',
  coupling_front: 'Переходник крупным планом',
  kit: 'Комплект поставки',
  boxed: 'Наконечник в упаковке'
};

let photos = [];
let activePhoto = 0;
let activeModel = '';

for (const filter of filters) {
  filter.addEventListener('click', () => {
    for (const button of filters) {
      button.classList.toggle('on', button === filter);
      button.setAttribute('aria-pressed', String(button === filter));
    }
    const selected = filter.dataset.f;
    let visible = 0;
    for (const card of cards) {
      card.hidden = selected !== 'all' && !card.dataset.tags.split(' ').includes(selected);
      if (!card.hidden) visible++;
    }
    document.getElementById('cnt').textContent = visible + ' / ' + cards.length;
  });
}

function showPhoto(index) {
  activePhoto = (index + photos.length) % photos.length;
  const photo = photos[activePhoto];
  galleryImage.src = photo.url;
  galleryImage.toggleAttribute('data-center-head', photo.centerHead);
  galleryImage.style.setProperty('--head-origin', photo.headOrigin);
  galleryImage.toggleAttribute('data-wide-detail', photo.wideDetail);
  galleryImage.alt = activeModel + ' — ' + photo.caption.toLowerCase();
  imageLink.href = photo.url;
  caption.textContent = photo.caption;
  photoCount.textContent = (activePhoto + 1) + ' / ' + photos.length;
  for (const [position, thumbnail] of [...thumbnailList.children].entries()) {
    const selected = position === activePhoto;
    thumbnail.classList.toggle('on', selected);
    thumbnail.setAttribute('aria-pressed', String(selected));
  }
}

function openCard(card) {
  const set = photoSets[card.dataset.set];
  activeModel = card.querySelector('.sku').textContent;
  photos = set.files.map(file => ({
    url: set.dir + '/' + file,
    centerHead: file === set.centeredHead,
    headOrigin: file === set.centeredHead ? (set.headOrigin || '') : '',
    wideDetail: file === set.wideDetail,
    caption: captions[file.replace(/^(?:(?:smile|photo)-)?\d+_/, '').replace(/\.[^.]+$/, '')] || 'Детали модели'
  }));

  document.getElementById('mType').textContent = card.dataset.type;
  document.getElementById('mSku').textContent = activeModel;
  document.getElementById('mSpec').textContent = card.dataset.spec + (card.dataset.cpl.startsWith('MD-') ? '. Переходник: ' : '. Подключение: ') + card.dataset.cpl + '.';
  document.getElementById('mAnalog').textContent = card.dataset.analog;
  document.querySelector('.m-analog').style.display = card.dataset.analog ? '' : 'none';
  document.getElementById('mPrice').textContent = card.dataset.price;
  thumbnailList.replaceChildren();
  thumbnailList.hidden = photoControls.hidden = photos.length < 2;

  for (const [index, photo] of (photos.length > 1 ? photos : []).entries()) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'm-th';
    button.setAttribute('aria-label', 'Фото ' + (index + 1) + ': ' + photo.caption);
    const image = document.createElement('img');
    image.src = photo.url;
    image.alt = '';
    button.append(image);
    button.addEventListener('click', () => showPhoto(index));
    thumbnailList.append(button);
  }
  showPhoto(0);
  gallery.showModal();
  document.body.classList.add('gallery-open');
  gallery.scrollTop = 0;
  closeButton.focus();
}

for (const card of cards) {
  card.addEventListener('click', () => {
    card.querySelector('.card-open').focus({ preventScroll: true });
    openCard(card);
  });
}
closeButton.addEventListener('click', () => gallery.close());
document.getElementById('mClose2').addEventListener('click', () => gallery.close());
document.getElementById('mPrev').addEventListener('click', () => showPhoto(activePhoto - 1));
document.getElementById('mNext').addEventListener('click', () => showPhoto(activePhoto + 1));
gallery.addEventListener('close', () => document.body.classList.remove('gallery-open'));
gallery.addEventListener('click', event => {
  if (event.target === gallery) gallery.close();
});
gallery.addEventListener('keydown', event => {
  if (photos.length > 1 && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    event.preventDefault();
    showPhoto(activePhoto + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});

document.getElementById('mReq').addEventListener('click', () => {
  if (!modelField.value.split('\n').includes(activeModel)) {
    modelField.value = [modelField.value.trim(), activeModel].filter(Boolean).join('\n');
  }
  gallery.close();
  modelField.focus({ preventScroll: true });
});

const mobileMenu = document.querySelector('.mobile-nav');
for (const link of mobileMenu.querySelectorAll('a')) {
  link.addEventListener('click', () => { mobileMenu.open = false; });
}

priceForm.addEventListener('submit', event => {
  event.preventDefault();
  const organization = priceForm.elements.organization.value.trim();
  const city = priceForm.elements.city.value.trim();
  const models = modelField.value.trim();
  const contact = priceForm.elements.contact.value.trim();
  if (!organization || !contact || !models) {
    document.getElementById('mailStatus').textContent = 'Укажите организацию, телефон или email и интересующие модели.';
    (!organization ? priceForm.elements.organization : !contact ? priceForm.elements.contact : modelField).focus();
    return;
  }
  const subject = encodeURIComponent('Запрос цен и наличия MODERN');
  const message = [
    'Здравствуйте! Подскажите цены и наличие наконечников MODERN.',
    'Организация: ' + organization,
    city && 'Город: ' + city,
    'Контакт: ' + contact,
    'Модели и количество:\n' + models
  ].filter(Boolean).join('\r\n\r\n');
  document.getElementById('mailStatus').textContent =
    'Нажмите «Отправить» в письме. Если оно не открылось, напишите на zakaz@amfodent.ru или позвоните: 8 800 550-45-35.';
  window.location.href = 'mailto:zakaz@amfodent.ru?subject=' + subject + '&body=' + encodeURIComponent(message);
});
