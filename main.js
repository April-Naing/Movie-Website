
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTA2NGQ3NzE2NmFhZjIxZDgwOTFjYWM0NTA3ZGI1ZCIsInN1YiI6IjY1NGEwMDgxMzkxYjljMDExZDJmZTgxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ahOgoxSzH_80U8PgfGPurpBPECIa7jx22u9q4s4vt9A'
  }
};

// const API_KEY = 'ba064d77166aaf21d8091cac4507db5d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const TV_API_URL = BASE_URL + '/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const search_URL = BASE_URL + '/search/multi?query=';

const months = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];


let output = '';

trending();
popular();
topRated();

function trending() {
  fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
    .then(response => response.json())
    .then(response => {
      const data = response.results;
      console.log(data);
      let trendingCarousel = document.getElementById('trendingCarouselCard');
      let card = '';
      for (let i = 0; i < data.length; i++) {
        if (data[i].media_type === "movie") {
          let fullDate = new Date(data[i].release_date)
          let month = months[fullDate.getMonth()];
          let date = fullDate.getDate();
          let year = fullDate.getFullYear();
          card += `
        <div class="carousel-item">
          <div class="card carousel-card" >
            <div class="img-wrapper">
              <a href="detail.html?${data[i].id}?movie"><img class="rounded" src="${'https://image.tmdb.org/t/p/w500/' + data[i].poster_path}"  alt="..."></a>
            </div>
            <div class="card-body">
              <h6 class="card-title">${data[i].original_title}</h6>
              <span class="">${month} ${date},${year}</span>
            </div>
          </div>
        </div>`

          trendingCarousel.innerHTML = card;
        } else if (data[i].media_type === "tv") {
          let fullDate = new Date(data[i].first_air_date)
          let month = months[fullDate.getMonth()];
          let date = fullDate.getDate();
          let year = fullDate.getFullYear();
          card += `
        <div class="carousel-item">
          <div class="card carousel-card" >
            <div class="img-wrapper">
              <a href="detail.html?${data[i].id}?tv"><img class="rounded" src="${'https://image.tmdb.org/t/p/w500/' + data[i].poster_path}"  alt="..."></a>
            </div>
            <div class="card-body">
              <h6 class="card-title">${data[i].original_name}</h6>
              <span class="">${month} ${date},${year}</span>
            </div>
          </div>
        </div>`

          trendingCarousel.innerHTML = card;
        }
      }

      $.queryCarousel();

    })
    .catch(err => console.error(err));
}

function popular() {
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
      const data = response.results;
      console.log(data)
      let popularCarousel = document.getElementById('popularCarouselCard');
      let card = '';

      for (let i = 0; i < data.length; i++) {
        let fullDate = new Date(data[i].release_date)
        let month = months[fullDate.getMonth()];
        let date = fullDate.getDate();
        let year = fullDate.getFullYear();
        card += `
        <div class="carousel-item">
          <div class="card carousel-card" >
            <div class="img-wrapper">
              <a href="detail.html?${data[i].id}?movie"><img class="rounded" src="${'https://image.tmdb.org/t/p/w500/' + data[i].poster_path}"  alt="..."></a>
            </div>
            <div class="card-body">
              <h6 class="card-title">${data[i].original_title}</h6>
              <span>${month} ${date},${year}</span>
            </div>
          </div>
        </div>`

        popularCarousel.innerHTML = card;
      }
      $.queryCarousel();
    })
    .catch(err => console.error(err));
}

function topRated(){
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    const data = response.results;
    console.log(data)
    let topRatedCarousel = document.getElementById('topRatedCarouselCard');
    let card = '';

    for (let i = 0; i < data.length; i++) {
      let fullDate = new Date(data[i].release_date)
      let month = months[fullDate.getMonth()];
      let date = fullDate.getDate();
      let year = fullDate.getFullYear();
      card += `
      <div class="carousel-item">
        <div class="card carousel-card" >
          <div class="img-wrapper">
            <a href="detail.html?${data[i].id}?movie"><img class="rounded" src="${'https://image.tmdb.org/t/p/w500/' + data[i].poster_path}"  alt="..."></a>
          </div>
          <div class="card-body">
            <h6 class="card-title">${data[i].original_title}</h6>
            <span>${month} ${date},${year}</span>
          </div>
        </div>
      </div>`

      topRatedCarousel.innerHTML = card;
    }
    $.queryCarousel();
  })
  .catch(err => console.error(err));
}
//toggle
var btn = document.getElementById('btn')

function leftClick() {
  console.log('left')
  btn.style.left = '0'
  btn.style.width = '110px'

  trending();
}

function rightClick() {
  btn.style.left = '110px'
  btn.style.width = '150px'

  fetch('https://api.themoviedb.org/3/trending/all/week?language=en-US', options)
    .then(response => response.json())
    .then(response => {
      const data = response.results;
      let trendingCarousel = document.getElementById('trendingCarouselCard');
      let card = '';
      for (let i = 0; i < data.length; i++) {
        let fullDate = new Date(data[i].release_date)
      let month = months[fullDate.getMonth()];
      let date = fullDate.getDate();
      let year = fullDate.getFullYear();
        if (data[i].media_type === "movie") {
          card += `
        <div class="carousel-item">
          <div class="card carousel-card" >
            <div class="img-wrapper">
              <a href="detail.html?${data[i].id}?movie"><img class="rounded" src="${'https://image.tmdb.org/t/p/w500/' + data[i].poster_path}"  alt="..."></a>
            </div>
            <div class="card-body">
              <h6 class="card-title">${data[i].original_title}</h6>
              <span>${month} ${date},${year}</span>
            </div>
          </div>
        </div>`

          trendingCarousel.innerHTML = card;
        } else if (data[i].media_type === "tv") {
          let fullDate = new Date(data[i].first_air_date)
          let month = months[fullDate.getMonth()];
          let date = fullDate.getDate();
          let year = fullDate.getFullYear();
          card += `
        <div class="carousel-item">
          <div class="card carousel-card" >
            <div class="img-wrapper">
              <a href="detail.html?${data[i].id}?tv"><img class="rounded" src="${'https://image.tmdb.org/t/p/w500/' + data[i].poster_path}"  alt="..."></a>
            </div>
            <div class="card-body">
              <h6 class="card-title">${data[i].original_name}</h6>
              <span>${month} ${date},${year}</span>
            </div>
          </div>
        </div>`

          trendingCarousel.innerHTML = card;
        }
      }

      $.queryCarousel();

    })
    .catch(err => console.error(err));
}

function popularMovie() {
  popularBtn.style.left = '0';

  popular();
}

function popularTv() {
  popularBtn.style.left = '90px'

  fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
      const data = response.results;
      console.log(data)
      let popularCarousel = document.getElementById('popularCarouselCard');
      let card = '';

      for (let i = 0; i < data.length; i++) {
        let fullDate = new Date(data[i].first_air_date)
          let month = months[fullDate.getMonth()];
          let date = fullDate.getDate();
          let year = fullDate.getFullYear();
        card += `
        <div class="carousel-item">
          <div class="card carousel-card" >
            <div class="img-wrapper">
              <a href="detail.html?${data[i].id}?tv"><img class="rounded" src="${'https://image.tmdb.org/t/p/w500/' + data[i].poster_path}"  alt="..."></a>
            </div>
            <div class="card-body">
              <h6 class="card-title">${data[i].name}</h6>
              <span>${month} ${date},${year}</span>
            </div>
          </div>
        </div>`

        popularCarousel.innerHTML = card;
      }

      $.queryCarousel();
    })
    .catch(err => console.error(err));
}

function topRatedMovie(){
  topRatedBtn.style.left = '0';

  topRated();
}

function topRatedTv(){
  topRatedBtn.style.left = '90px';

  fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    const data = response.results;
    console.log(data)
    let topRatedCarousel = document.getElementById('topRatedCarouselCard');
    let card = '';

    for (let i = 0; i < data.length; i++) {
      let fullDate = new Date(data[i].first_air_date)
          let month = months[fullDate.getMonth()];
          let date = fullDate.getDate();
          let year = fullDate.getFullYear();
      card += `
      <div class="carousel-item">
        <div class="card carousel-card" >
          <div class="img-wrapper">
            <a href="detail.html?${data[i].id}?tv"><img class="rounded" src="${'https://image.tmdb.org/t/p/w500/' + data[i].poster_path}"  alt="..."></a>
          </div>
          <div class="card-body">
            <h6 class="card-title">${data[i].name}</h6>
            <span>${month} ${date},${year}</span>
          </div>
        </div>
      </div>`

      topRatedCarousel.innerHTML = card;
    }
    $.queryCarousel();
  })
  .catch(err => console.error(err));
}

$.queryCarousel = function () {

  $('.carousel').each(function () {

    var currentCarouselID = '#' + $(this).attr('id')
    var carouselWidth = $(currentCarouselID + ' .carousel-inner')[0].scrollWidth;
    var cardWidth = $(currentCarouselID + ' .carousel-item').width();

    var scrollPosition = 0;
    $(currentCarouselID + ' .carousel-control-next').on('click', function () {
      if (scrollPosition < (carouselWidth - (cardWidth * 6))) {
        scrollPosition = scrollPosition + cardWidth;
        $(currentCarouselID + ' .carousel-inner').animate({ scrollLeft: scrollPosition }, 600)
      }

    })

    $(currentCarouselID + ' .carousel-control-prev').on('click', function () {
      if (scrollPosition > 0) {
        scrollPosition = scrollPosition - cardWidth;
        $(currentCarouselID + ' .carousel-inner').animate({ scrollLeft: scrollPosition }, 600)
      }

    })
  })
};


function getMovies() {
  fetch(API_URL,options)
    .then(response => response.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    })
}

function getTVseries(){
  fetch(TV_API_URL,options)
    .then(response => response.json())
    .then(data => {
      console.log(data.results)
      showMovies(data.results)
    })
}

function showMovies(data) {
  var element = document.getElementById("main");
  element.classList.add('row' , 'row-gap-3' , 'justify-content-evenly')

  let list = '';
  for (let i = 0; i < data.length; i++) {
    if( typeof(data[i].first_air_date) === "undefined"){
      list += `
     
      <div class="card col-3 m-4 shadow-sm" style="width: 18rem;">
      <img src="${data[i].poster_path?IMG_URL + data[i].poster_path:"image/error1.jpg"}" class="rounded pt-2" alt="...">
        <div class="card-body">
          <h4 class="card-title">${data[i].original_title}</h4>
          <a href="detail.html?${data[i].id}?movie" class="btn btn-primary card-foot" >Details</a>
        </div>
     
  </div>
      `
      element.innerHTML = list;
    }else{
      list += `
     
      <div class="card col-3 m-4" style="width: 18rem;">
      <img src="${data[i].poster_path?IMG_URL + data[i].poster_path:"image/error1.jpg"}" class="rounded pt-2" alt="...">
        <div class="card-body">
          <h4 class="card-title">${data[i].name}</h4>
          <a href="detail.html?${data[i].id}?tv" class="btn btn-primary" >Details</a>
        </div>
      
  </div>
      `
      element.innerHTML = list;
    }
    console.log(element)
  }
}

function searchMovies(){
  event.preventDefault();
  let search = document.getElementById('search').value;
  let search2 = document.getElementById('search2').value;
  
  if(search){
    fetch(search_URL + search + '&include_adult=false&language=en-US&page=1',options)
    .then(response => response.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    })
  }else if(search2){
    fetch(search_URL + search2 + '&include_adult=false&language=en-US&page=1',options)
    .then(response => response.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    })
  }
}




