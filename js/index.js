const navBtn = document.getElementById('nav-btn');
const headerNav = document.getElementById('header__nav');
const headerMenu = document.getElementById('header__menu-wrap');
const list = document.getElementsByClassName('services__item');
const form = document.getElementById('form');

navBtn.addEventListener('click', () => {
  navBtn.classList.toggle('active');
  headerMenu.classList.toggle('active');
  headerNav.classList.toggle('active');
  document.body.style.overflow = "hidden";
  document.body.style.marginRight = "15px";
  navBtn.style.right = parseInt(getComputedStyle(navBtn).right) + 15 + "px";
});

headerNav.addEventListener('click', (e) => {
  if(e.target.classList.contains('header__nav')) {
    headerMenu.classList.toggle('active');
    headerNav.classList.toggle('active');
    document.body.style.overflow = "";
    document.body.style.marginRight = "";
    navBtn.style.right = "15px";
  }
});

Array.from(list).forEach((item, id) => {
  item.addEventListener('click', () => {
    console.log(id);
  });

  item.addEventListener('blur', () => {
    console.log('blur!');
  });
});

// telegram bot config
// YouTube: https://www.youtube.com/watch?v=RviYQrNdDok&ab_channel=AVISTV

const token = '5320837844:AAHXm0sEfPvsk5GVc9YN_XnWIn-sWI_OrQs';
const chatId = '-1001619463110';
const uriApi = `https://api.telegram.org/bot${token}/sendMessage`;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = `<b>Имя: </b>${e.target.name.value}\n<b>Телефон: ${e.target.phone.value}</b>`

  const Data = new FormData();
  Data.set('text', text);
  Data.set('chat_id', chatId);
  Data.set('parse_mode', 'html');

  fetch(uriApi, { method: 'POST', body: Data })
    .then(res => {
      res.ok && form.reset();
    })
    .catch(console.log)
})