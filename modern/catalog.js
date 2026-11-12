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
const caption = document.getElementById('mCap');
const imageLink = document.getElementById('mOriginal');
const photoCount = document.getElementById('mCount');
const closeButton = document.getElementById('mClose');
const modelField = document.getElementById('models');
const priceForm = document.getElementById('priceForm');

const captions = {
  general: 'Общий вид',
  head_front: 'Головка спереди',
  head_back: 'Головка сзади',
  socket: 'Посадочное гнездо',
  connection: 'Подключение',
  coupling_ports: 'Порты переходника',
  coupling_side: 'Переходник сбоку',
  coupling_front: 'Переходник спереди',
  coupling_open: 'Посадочная часть переходника',
  marking: 'Маркировка',
  marking_original: 'Маркировка',
  kit: 'Комплект поставки'
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
  galleryImage.alt = activeModel + ' — ' + photo.caption.toLowerCase();
  galleryImage.dataset.softEdges = photo.softEdges;
  galleryImage.dataset.crop = photo.crop;
  imageLink.hidden = Boolean(photo.crop);
  if (photo.crop) {
    imageLink.removeAttribute('href');
  } else {
    imageLink.href = photo.url;
  }
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
    caption: captions[file.slice(3, -4)] || 'Детали модели',
    softEdges: set.softEdges?.[file] || '',
    crop: set.crop?.[file] || ''
  }));

  document.getElementById('mType').textContent = card.dataset.type;
  document.getElementById('mSku').textContent = activeModel;
  document.getElementById('mSpec').textContent = card.dataset.spec + '. Подключение: ' + card.dataset.cpl + '.';
  document.getElementById('mAnalog').textContent = card.dataset.analog;
  document.getElementById('mPrice').textContent = card.dataset.price;
  thumbnailList.replaceChildren();

  for (const [index, photo] of photos.entries()) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'm-th';
    button.setAttribute('aria-label', 'Фото ' + (index + 1) + ': ' + photo.caption);
    const image = document.createElement('img');
    image.src = photo.url;
    image.alt = '';
    image.dataset.crop = photo.crop;
    button.append(image);
    button.addEventListener('click', () => showPhoto(index));
    thumbnailList.append(button);
  }
  showPhoto(set.files.indexOf(set.cover));
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
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
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
  if (!organization || !models) {
    document.getElementById('mailStatus').textContent = 'Укажите организацию и интересующие модели.';
    (organization ? modelField : priceForm.elements.organization).focus();
    return;
  }
  const subject = encodeURIComponent('Запрос цен и наличия MODERN');
  const message = [
    'Здравствуйте! Подскажите цены и наличие наконечников MODERN.',
    'Организация: ' + organization,
    city && 'Город: ' + city,
    'Модели и количество:\n' + models
  ].filter(Boolean).join('\r\n\r\n');
  document.getElementById('mailStatus').textContent =
    'Если черновик не открылся, напишите напрямую на zakaz@amfodent.ru.';
  window.location.href = 'mailto:zakaz@amfodent.ru?subject=' + subject + '&body=' + encodeURIComponent(message);
});
