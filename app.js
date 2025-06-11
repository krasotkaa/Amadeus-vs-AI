'use strict'

//Carousel Slider

const frameElement = document.querySelector('.carousel__frame')
const carouselSlidesContainerElement =
	document.querySelector('.carousel__slides')
const carouselSlidesElements =
	carouselSlidesContainerElement.querySelectorAll('.carousel__slide')
const prevButtons = document.querySelectorAll('.slider-arrow--left')
const nextButtons = document.querySelectorAll('.slider-arrow--right')

let currentSlideIndex = 0
let slideInterval

function showSlide() {
	const frameWidth = frameElement.clientWidth
	carouselSlidesContainerElement.style.transform = `translateX(-${
		currentSlideIndex * frameWidth
	}px)`
}

function nextSlide() {
	currentSlideIndex++
	if (currentSlideIndex > carouselSlidesElements.length - 1) {
		currentSlideIndex = 0
	}
	showSlide()
	resetInterval()
}

function previousSlide() {
	currentSlideIndex--
	if (currentSlideIndex < 0) {
		currentSlideIndex = carouselSlidesElements.length - 1
	}
	showSlide()
	resetInterval()
}

function resetInterval() {
	if (slideInterval) {
		clearInterval(slideInterval)
	}
	slideInterval = setInterval(nextSlide, 10000)
}

nextButtons.forEach(el => {
	el.addEventListener('click', nextSlide)
})

prevButtons.forEach(el => {
	el.addEventListener('click', previousSlide)
})

resetInterval()

//Mega Menu Logic
const moreLinksLink = document.querySelector('.more-links-link')
const megaMenuElement = document.querySelector('.mega-menu')
const headerElement = document.querySelector('.header')

function showMegaMenu() {
	setTimeout(() => {
		headerElement.classList.add('active')
		megaMenuElement.style.transform = 'translateY(0%)'
	}, 300)
}

function hideMegaMenu() {
	headerElement.classList.remove('active')
	megaMenuElement.style.transform = 'translateY(-115%)'
}

moreLinksLink.addEventListener('mouseenter', showMegaMenu)

megaMenuElement.addEventListener('mouseleave', hideMegaMenu)
