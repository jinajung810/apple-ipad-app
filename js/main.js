import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

// 장바구니 
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl =basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function(event){
  event.stopPropagation() 
  if(basketEl.classList.contains('show')){
    // hide
    hideBasket()
  } else {
    //show
    showBasket()
  }
})
basketEl.addEventListener('click', function(event){
  event.stopPropagation()
})
window.addEventListener('click', function(){
  hideBasket()
})

function showBasket(){
  basketEl.classList.add('show')
}
function hideBasket(){
  basketEl.classList.remove('show')
}

// 검색
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', function(event){
  event.stopPropagation();
  hideSearch();
})
searchShadowEl.addEventListener('click', hideSearch)

function showSearch(){
  headerEl.classList.add('searching')
  stopScroll()
  headerMenuEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function(el,index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  setTimeout(() => {
    searchInputEl.focus()
  }, 600);
}
function hideSearch(){
  headerEl.classList.remove('searching')
  playScroll()
  headerMenuEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function(el,index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  searchInputEl.value =''; // 검색모드가 종료되면 input에 남아있는 사용자가 입력한 텍스트를 빈문자열로 초기화
}

function playScroll() {
  document.documentElement.classList.remove('fixed')
}
function stopScroll() {
  document.documentElement.classList.add('fixed')
}

// 헤더 메뉴 토클
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function(){
  if (headerEl.classList.contains('menuing')){
    headerEl.classList.remove('menuing')
    playScroll() // 장바구니와 스크롤 나타나게
    searchInputEl.value ='' // 검색모드가 종료되면 input에 남아있는 사용자가 입력한 텍스트를 빈문자열로 초기화 
  } else {
    headerEl.classList.add('menuing')
    stopScroll() // 장바구니와 스크롤 사라지게
  }
})

// 헤더 검색
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', function(){
  searchInputEl.focus()
  headerEl.classList.add('searching--mobile')
})
searchCancelEl.addEventListener('click', function(){
  headerEl.classList.remove('searching--mobile')
})

// 데스크탑 모드에서 검색창을 클릭한 뒤에 화면사이즈를 줄여서 모바일모드가 됐을 때 검색창이 남아있는 것 해결
// 반대로 모바일모드에서 검색창이 활성화 된 부분이 데스크탑 모드로 변경되면 검색창 사라지도록  
window.addEventListener('resize', function(){
  if(this.window.innerWidth <= 740 ){
    headerEl.classList.remove('searching')
  } else {
    headerEl.classList.remove('searching--mobile')
  }
})

// 모바일모드에서 화살표버튼 클릭시 메뉴 나타나기
const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', function(){
  if(navEl.classList.contains('menuing')){
    hideNavMenu()
  } else {
    showNavMenu()
  }
})
navEl.addEventListener('click', function(event){
  event.stopPropagation()
})
navMenuShadowEl.addEventListener('click', hideNavMenu)
window.addEventListener('click', hideNavMenu)
function showNavMenu (){
  navEl.classList.add('menuing')
}
function hideNavMenu (){
  navEl.classList.remove('menuing')
}

// 요소가 화면에 보이는지 관찰 (가시성 관찰) 
const io = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting){
      return
    } // 화면에 보이지 않을 때는 함수 종료, 
    entry.target.classList.add('show') // 화면에 보일 때
  })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el){
  io.observe(el)
})

// 비디오 재생
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller-play')
const pauseBtn = document.querySelector('.stage .controller-pause')

playBtn.addEventListener('click', function(){
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function(){
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})

// '당신에게 맞는 iPad는?' 렌더링! 
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function(ipad){
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function(color){
    colorList += `<li style="background-color:${color};"></li>`
  })
  itemEl.innerHTML = /* html */`
    <div class="thumnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})


const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function(nav){
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function(map){
    mapList += /* html */`<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */`
  <h3>
    <span class="text">${nav.title}</span>
    <span class="icon">+</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `
  navigationsEl.append(mapEl)
})

const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()

// footer menu 동작 
const mapEls = document.querySelectorAll('footer .navigations .map')
mapEls.forEach(function(el){
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click', function(){
    el.classList.toggle('active')
  })
})
