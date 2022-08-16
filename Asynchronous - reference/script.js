'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

////////////render country///////////
const renderCountry = function (data, className = '') {
  const currency =
    data.currencies[JSON.stringify(data.currencies).split(`:`)[0].slice(2, -1)]
      .name;
  const language = data.languages[JSON.stringify(data.languages).slice(2, 5)];
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(2)} Mil people</p>
    <p class="country__row"><span>🗣️</span>${language}</p>
    <p class="country__row"><span>💰</span>${currency}</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
///////////error message////////
const renderError = function (sms) {
  countriesContainer.insertAdjacentHTML('beforeend', sms);
  countriesContainer.style.opacity = 1;
};
/////////////////////////////AJAX CALL/////////////////////
/////////////Classic call///////////////
// const getCountryAndNeighbour = function (country) {
//   ///////AJAX CALL first country
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   // console.log(request);
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     /////////render first country
//     console.log(data);
//     renderCountry(data);
//     /////////get neighbour country
//     const neighbourCountry = data.borders;
//     if (!neighbourCountry) return;
//     //////////////////Call back hell
//     console.log(neighbourCountry);
//     neighbourCountry.forEach(neighbour => {
//       const request = new XMLHttpRequest();
//       request.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//       request.send();
//       request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         renderCountry(data, 'neighbour');
//         console.log(data);
//         //place for call back hell
//       });
//     });
//     /////////////////call back hell
//   });
// };

// getCountryAndNeighbour('Laos');

//////////////More avandce ajax call////////////////
/////////////////Fetch and promise ////////////
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (respond) {
//       return respond.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
/////////////////Refactoring Fetch and promise ////////////

// const getCountryDataAnd3ChainNeigbour = function (country) {
//   /////////////call country /////////
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       respond => {
//         if (!respond.ok)
//            new Error(`Country Not Found (${respond.status})`);
//         return respond.json();
//       }
//       //////when can not load data/////
//       // err => alert(err)
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       ////////call neighbour country 1////////
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(
//       respond => {
//         if (!respond.ok)
//           throw new Error(`Country Not Found (${respond.status})`);
//         return respond.json();
//       }
//       //////when can not load data/////
//       // err => alert(err)
//     )
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//       ////////call neighbour country 2////////
//       const neighbour1 = data[0].borders[0];
//       if (!neighbour1) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour1}`);
//     })
//     .then(
//       respond => {
//         if (!respond.ok)
//           throw new Error(`Country Not Found (${respond.status})`);
//         return respond.json();
//       }
//       //////when can not load data/////
//       // err => alert(err)
//     )
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//       ////////call neighbour country 3////////
//       const neighbour2 = data[0].borders[0];
//       if (!neighbour2) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour2}`);
//     })
//     .then(
//       respond => {
//         if (!respond.ok)
//           throw new Error(`Country Not Found (${respond.status})`);
//         return respond.json();
//       }
//       //////when can not load data/////
//       // err => alert(err)
//     )
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     ///////when can not catch data/////
//     //////set at final chain/////////
//     .catch(err => {
//       console.error(`${err}🙈 🙉 🙊`);
//       renderError(`something when wrong (${err})`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

/////////////////Refactoring Fetch and promise again ////////////
// const getJSON = function (url, error = 'some thing when wrong') {
//   return fetch(url).then(respond => {
//     if (!respond.ok) throw new Error(`${error} (${respond.status})`);
//     return respond.json();
//   });
// };

// const getCountryDataAnd3ChainNeigbour = function (country) {
//   /////////////call country /////////
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country Not Found`)
//     .then(data => {
//       renderCountry(data[0]);
//       ////////call neighbour country 1////////
//       const neighbour1 = data[0].borders[0];
//       console.log(neighbour1);
//       if (!neighbour1) throw new Error(`Neighbour1 Not Found`);
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour1}`,
//         'Neighbour1 Not Found'
//       );
//     })
//     .then(
//       data => {
//         renderCountry(data[0], 'neighbour');
//         ////////call neighbour country 2////////
//         const neighbour2 = data[0].borders[0];
//         if (!neighbour2) return;
//         return getJSON(
//           `https://restcountries.com/v3.1/alpha/${neighbour2}`,
//           'Neighbour2 Not Found'
//         );
//       }
//       //////when can not load data/////
//       // err => alert(err)
//     )
//     .then(
//       data => {
//         renderCountry(data[0], 'neighbour');
//         ////////call neighbour country 3////////
//         const neighbour3 = data[0].borders[0];
//         if (!neighbour3) return;
//         return getJSON(
//           `https://restcountries.com/v3.1/alpha/${neighbour3}`,
//           'Neighbour3 Not Found'
//         );
//       }
//       //////when can not load data/////
//       // err => alert(err)
//     )
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     ///////when can not catch data/////
//     //////set at final chain/////////
//     .catch(err => {
//       console.error(`${err}🙈 🙉 🙊`);
//       renderError(`something when wrong (${err})`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
///////////////////coding challenge//////////////////
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(respond => {
//       if (respond.ok === false)
//         throw new Error(`problem with geoding 🐧 ${respond.status}`);
//       return respond.json();
//     })
//     .then(data => {
//       const country = data.country;

//       return fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(
//           respond => {
//             if (!respond.ok)
//               throw new Error(`Country Not Found (${respond.status})`);
//             return respond.json();
//           }
//           //////when can not load data/////
//           // err => alert(err)
//         )
//         .then(data => {
//           renderCountry(data[0]);
//         });
//     })
//     .catch(err => {
//       console.error(`${err}🙈 🙉 🙊`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {});

// // whereAmI(52.508, 13.381);
// // whereAmI(19.037, 72.873);
// // whereAmI(-33.933, 18.474);

/////////////////BUILD A PROMISE/////////////////////
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening ');
//   setTimeout(function () {
//     if (Math.random() > 0.5) {
//       resolve('you win💰');
//     } else {
//       reject(new Error('you lost your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

///////promisifying settime out//////
// const wait = function (second) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, second * 1000);
//   });
// };
// wait(2)
//   .then(() => {
//     console.log('2 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('4 second passed');
//   });
//////=> escape call back hell

// Promise.resolve('abc').then(res => console.log(res));
// Promise.reject('xyz').catch(err => console.error(err));

////////////////////get current location using promise///////////////////////

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = function () {
//   getPosition()
//     .then(position => {
//       const { latitude: lat, longitude: lng } = position.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })

//     .then(respond => {
//       if (respond.ok === false)
//         throw new Error(`problem with geoding 🐧 ${respond.status}`);
//       return respond.json();
//     })
//     .then(data => {
//       const country = data.country;

//       return fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(
//           respond => {
//             if (!respond.ok)
//               throw new Error(`Country Not Found (${respond.status})`);
//             return respond.json();
//           }
//           //////when can not load data/////
//           // err => alert(err)
//         )
//         .then(data => {
//           renderCountry(data[0]);
//         });
//     })
// .catch(err => {
//   console.error(`${err}🙈 🙉 🙊`);
// })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// whereAmI();
///////////////////////////////////////
// Coding Challenge

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const imageContainer = document.querySelector('.images');
// const wait = function (second) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, second * 1000);
//   });
// };

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.classList.add('image');
//     img.addEventListener('load', () => {
//       resolve(img);
//       imageContainer.append(img);
//     });
//     img.addEventListener('error', () => {
//       reject('wrong url');
//     });
//   });
// };

// let currentImg;

// createImage(`img/img-1.jpg`)
//   .then(img => {
//     currentImg = img;
//     console.log(`wait 2 min`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage(`img/img-2.jpg`);
//   })
//   .then(img => {
//     currentImg = img;
//     console.log(`wait more 2 min`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(`image not found: ${err}`));

/////////////end of coding challenge///////////////

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res)); /////////EXCALLY THE SAME

/////////////more elegant way to fetch promise///////////
////// using async function/////
// const whereAmI = async function () {
//   try {
//     //GEO location
//     const position = await getPosition();
//     const { latitude: lat, longitude: lng } = position.coords;
//     //reverse geocoding
//     const currentGeo = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json`
//     );
//     //manually catching error in fetch
//     if (!currentGeo.ok) throw new Error(`problem getting location data `);
//     const dataGeo = await currentGeo.json();
//     //country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     //manually catching error in fetch
//     if (!res.ok) throw new Error(`problem getting country data `);
//     const data = await res.json();
//     // console.log(dataGeo.country);
//     renderCountry(data[0]);
//     return `you are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(`${err}`);
//     renderError(`some thing went wrong${err.message}`);
//     //reject promise return from asycn function
//     throw err;
//   }
// };

// old way/////////
// console.log('1. will get location');
// whereAmI()
//   .then(city => console.log(`2. ${city}`))
//   .catch(err => console.error(`2. ${err.message}`))
//   .finally(() => {
//     console.log('3. finnishing getting location');
//   });

/////////////////////////////////////

///////////more elegant way to fetch promise///////////
////////using async function/////
// console.log('1. will get location');
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2. ${city}`);
//   } catch (err) {
//     console.error(`2. ${err.message}`);
//   }
//   console.log('3. finnishing getting location');
// })();

//////////////running promise in parallel////////////
//////////////////////promise.all//////////////////////
const getJSON = async function (url, error = 'some thing when wrong') {
  const respond = await fetch(url);
  if (!respond.ok) throw new Error(`${error} (${respond.status})`);
  const data = await respond.json();
  return data;
};

// const get3Country = async function (c1, c2, c3) {
//   try {
//     //LOADING one by one (not parallel)////
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//     /////actually running parallel////
//     const datas = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     datas.forEach(data => console.log(data[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Country('vietnam', 'usa', 'russia');

////////Promise.race////////////////
///////return the fastest promise////////////
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/vietnam`),
//     getJSON(`https://restcountries.com/v3.1/name/laos`),
//     getJSON(`https://restcountries.com/v3.1/name/china`),
//   ]);
//   console.log(res[0]);
// })();
//////////////set timeout for 'request take too long///////
// const timeOut = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request take too long'));
//     }, sec * 1000);
//   });
// };
// Promise.race([getJSON(`https://restcountries.com/v3.1/name/lao`), timeOut(0.5)])
// .then(res => console.log(res[0]))
// .catch(err => console.error(err));

///////////////promise.allSettled////////////////
//////same with promise all but return all respond include reject////
// Promise.allSettled([
//   Promise.resolve('succed'),
//   Promise.reject('ERROR'),
//   Promise.resolve('another succed'),
//   getJSON(`https://restcountries.com/v3.1/name/lao`),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
///////diffrent with Promise.all/////////
/////promise all only return when all promise going to fulfilled//////
// Promise.all([
//   Promise.resolve('succed'),
//   Promise.reject('ERROR'),
//   Promise.resolve('another succed'),
//   getJSON(`https://restcountries.com/v3.1/name/lao`),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

///////promise.any [ES2021]//////////
/////////promise.any return first fullfilled promise//////
/////similar to promise.any///////
// Promise.any([
//   Promise.reject('ERROR'),
//   Promise.resolve('another succed'),
//   Promise.resolve('succed'),
//   getJSON(`https://restcountries.com/v3.1/name/lao`),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const imageContainer = document.querySelector('.images');
const wait = function (second) {
  return new Promise(function (resolve) {
    setTimeout(resolve, second * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.classList.add('image');
    img.addEventListener('load', () => {
      resolve(img);
      imageContainer.append(img);
    });
    img.addEventListener('error', () => {
      reject('wrong url');
    });
  });
};

const loadNPause = async function () {
  try {
    let img = await createImage(`img/img-1.jpg`);
    console.log(`wait 2 Sec`);
    await wait(2);
    img.style.display = 'none';
    img = await createImage(`img/img-2.jpg`);
    console.log('wait 2 more sec');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(`2. ${err.message}`);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    /////////////my version///////////////////
    const imgs = await Promise.allSettled(imgArr.map(img => createImage(img)));
    console.log(imgs);
    imgs.forEach(img => img.value.classList.add('parallel'));
    //////////////teacher version///////////////
    // const imgs = imgArr.map(async img => await createImage(img));
    // const imgEl = await Promise.all(imgs);
    // console.log(imgEl);
    // imgEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(`2. ${err.message}`);
  }
};

loadAll([`img/img-1.jpg`, `img/img-2.jpg`, `img/img-3.jpg`]);
