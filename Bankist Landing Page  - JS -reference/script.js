'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i <button btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////scroll to section 1 (Learn More btn)///////////////////
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
});

/////////////////////navigation scroll to section//////////////////////
// BAD SOLUTION !!!
// document.querySelectorAll('.nav__link').forEach(function (el, i) {
//   el.addEventListener('click', function (e) {
// e.preventDefault();
// const id = this.getAttribute('href');
// const section = document.querySelector(id);
// section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});
/////////////////////TAB////////////////////

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.btn');
  if (!clicked) return; //guard clause
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );
  tabsContent[clicked.dataset.tab - 1].classList.add(
    'operations__content--active'
  );
});

/////////////////////MENU FADE ANIMATION////////////////////////
const fade = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(sib => {
      if (sib !== e.target) {
        sib.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', fade.bind(0.5));
nav.addEventListener('mouseout', fade.bind(1));

////////////////////sticky navigation//////////////////

// BAD SOLUTION !!!
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else if (window.scrollY <= initialCoords.top) {
//     nav.classList.remove('sticky');
//   }
// });

///sticky navigation: intersection observer API
//observer call back function :
////////////testing//////////
// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
//   section1.style.backgroundColor = 'blue';
// };
// //observer option
// const obsOption = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallBack, obsOption);
// observer.observe(section1);
/////////////////BETTER SOLUTION FOR STICKY NAVBAR ////////////////////
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////REVEALING SECTION ON SCROLL //////////////////
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.3,
});

allSection.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

/////////////LAZY LOADING IMAGE//////////////
const imgTarget = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  ///replacesrc with data-src
  entry.target.src = entry.target.dataset.src;
  ////////////BAD SOLUTION//////////////////
  // entry.target.classList.remove('lazy-img');
  ///////////BETTER SOLUTION/////////////
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTarget.forEach(function (img) {
  imgObserver.observe(img);
});

/////////////////SLIDEER/////////////////

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const sliderBtn = document.querySelectorAll('.slider__btn');
  let currentSlide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const initial = function () {
    createDots();
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };
  initial();

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };
  /////button/////
  sliderBtn.forEach(btn =>
    btn.addEventListener('click', function (e) {
      if (e.target.classList.contains('slider__btn--right')) {
        nextSlide();
      } else if (e.target.classList.contains('slider__btn--left')) {
        prevSlide();
      }
    })
  );
  /////key//////
  document.addEventListener('keydown', function (e) {
    //////2 way///////
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  /////////////////DOTS FUNCTION/////////////

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  });
};
slider();
