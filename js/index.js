const navBtn = document.getElementById('nav-btn');
const headerNav = document.getElementById('header__nav');
const headerMenu = document.getElementById('header__menu-wrap');
const form = document.getElementById('form');

const formPhoneNumber = document.getElementById('phone-number');

const servicesBtn = document.getElementById('services_btn');
const servicesList = document.getElementById('services__list');
const list = document.getElementsByClassName('services__item');
const menuItems = document.getElementsByClassName('header__menu-item-link');
const servicesBtns = document.getElementsByClassName('services__item-btn');
const servicesDescList = document.getElementsByClassName('services__item-desc');

const toggleMenuActive = () => {
  const isActive = navBtn.classList.contains("active");

  headerMenu.classList.toggle('active');
  headerNav.classList.toggle('active');
  navBtn.classList.toggle('active');

  document.body.style.overflow = isActive ? "" : "hidden";
  // document.body.style.marginRight = isActive ? "" : "15px";
}

navBtn.addEventListener('click', toggleMenuActive);

headerNav.addEventListener('click', (e) => {
  if(e.target.classList.contains('header__nav')) {
    toggleMenuActive();
  }
});

Array.from(menuItems).forEach(i => {
  i.onclick = () => {
    navBtn.classList.contains("active") && toggleMenuActive();
  }
});

Array.from(servicesBtns).forEach((item, idx) => {
  const hideOnClickOutside = element => {
    const isVisible = elem => !!elem 
      && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

    const outsideClickListener = event => {
      if (!element.contains(event.target) && isVisible(element)) {
        servicesDescList[idx].style.opacity = '0';
        item.style.opacity = '1';
        list[idx].style.backgroundColor = '';
      }
    }

    document.addEventListener('click', outsideClickListener)
  }

  item.addEventListener('click', () => {
    servicesDescList[idx].style.opacity = '1';
    item.style.opacity = '0';
    list[idx].style.backgroundColor = 'rgba(122,198,0, 1)';
    hideOnClickOutside(item);
  });
});

servicesBtn.addEventListener('click', () => {
  servicesList.style.height = 'auto';
  servicesBtn.style.display = 'none';
});

// telegram bot config
// YouTube: https://www.youtube.com/watch?v=RviYQrNdDok&ab_channel=AVISTV

const token = '5320837844:AAHXm0sEfPvsk5GVc9YN_XnWIn-sWI_OrQs';
const chatId = '-1001619463110';
const uriApi = `https://api.telegram.org/bot${token}/sendMessage`;


formPhoneNumber.addEventListener('input', (e) => {
  const formattedPhoneNumber = (value) => {
    if(!value) return value;

    const phoneNum = value.replace(/[^\d]/g, '');

    if (phoneNum.length < 3) return phoneNum;
    if (phoneNum.length < 6) {
      return `(${phoneNum.slice(0, 2)}) ${phoneNum.slice(2)}`;
    }
    if (phoneNum.length < 8) {
      return `(${phoneNum.slice(0, 2)}) ${phoneNum.slice(2,5)}-${phoneNum.slice(5, 7)}`;
    }
    return `(${phoneNum.slice(0, 2)}) ${phoneNum.slice(2,5)}-${phoneNum.slice(5, 7)}-${phoneNum.slice(7, 9)}`;
  }

  const formattedFN = formattedPhoneNumber(e.target.value);
  formPhoneNumber.value = formattedFN;
})


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const correctTelNumber = e.target.phone.value
    .split('')
    .filter(Boolean)
    .filter(i => i !== '-' && i !== '(' && i !== ')' && i !== ' ').join('')

  const text = `<b>Имя: </b>${e.target.name.value}\n<b>Телефон: +380${correctTelNumber}</b>`;

  const Data = new FormData();
  Data.set('text', text);
  Data.set('chat_id', chatId);
  Data.set('parse_mode', 'html');

  fetch(uriApi, { method: 'POST', body: Data })
    .then(res => {
      alert('Дякуємо! Наші менеджери звʼяжуться з Вами найближчим часом!')
      res.ok && form.reset();
    })
    .catch(console.log)
});

$(document).on('ready', function() {
  $(".photo-section__list").slick({
    dots: true,
    slidesToShow: 2,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="photo-section__btn photo-section__btn-left icon-left-open-big"></button>',
    nextArrow: '<button type="button" class="photo-section__btn photo-section__btn-right icon-right-open-big"></button>',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  });
})