/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';


if (document.querySelector('.swiper')) { // Указываем скласс нужного слайдера
	// Создаем слайдер
	new Swiper('.swiper', { // Указываем скласс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		speed: 800,

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},

	});
}

//========================================================================================================================================================

// ФИЛЬТРЫ ПОРТФОЛИО//

function filterPortfolio() {

	const filterList = document.querySelector('.portfolio__filters-list-wrap');

	if (filterList) {

		const activeFilter = 1;
		const portfolioViewToggle = document.querySelector('.portfolio__toggle-button')
		const filterButtons = filterList.querySelectorAll('button');
		const slides = document.querySelectorAll('.portfolio-slide');

		// Изменить внешний вид портфолио
		const changePortfolioView = () => {

			const desktop = document.querySelector('.portfolio__desktop');
			const mobile = document.querySelector('.portfolio__mobile');
			const sideDesktop = document.querySelector('.portfolio__side-desktop');
			const sideMobile = document.querySelector('.portfolio__side-mobile');

			if (portfolioViewToggle.checked) {
				desktop.classList.add('_hidden')
				mobile.classList.remove('_hidden')
				sideDesktop.classList.remove('_active')
				sideMobile.classList.add('_active')
			} else {
				desktop.classList.remove('_hidden')
				mobile.classList.add('_hidden')
				sideDesktop.classList.add('_active')
				sideMobile.classList.remove('_active')
			}
		}

		// Изменить фильтр
		const changeFilter = (e) => {
			let button = e.target
			if (!button.classList.contains('portfolio__filters-item')) return false;
			let filterNumber = button.getAttribute('data-filter')
			filterButtons.forEach((button) => {
				button.classList.remove('_active')
			})
			button.classList.add('_active')
			hideUnproperSlides(filterNumber)
		}

		// Слайдер ПК
		const desktopSwiper = new Swiper('.desktop-portfolio__desktop-swiper', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			autoHeight: false,
			// Кнопки "влево/вправо"
			navigation: {
				nextEl: ".portfolio__arrow-next-desktop",
				prevEl: ".portfolio__arrow-prev-desktop",
			},
		});

		// Слайдер мобилка
		const mobileSwiper = new Swiper('.mobile-portfolio__mobile-swiper', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			autoHeight: false,
			// Кнопки "влево/вправо"
			navigation: {
				nextEl: ".portfolio__arrow-next-mobile",
				prevEl: ".portfolio__arrow-prev-mobile",
			},
		});

		// Спрятить слайды которые не подпадают под фильтр
		const hideUnproperSlides = (active) => {
			slides.forEach((slide) => {
				let slideFilter = slide.getAttribute('data-filter')
				if (slideFilter != active) {
					slide.style.display = 'none'
				} else {
					slide.style.display = null
				}
				if (active == 1) {
					slide.style.display = null
				}
			})
			desktopSwiper.update()
			mobileSwiper.update()
		}

		filterList.addEventListener('click', (e) => {
			changeFilter(e)
		})

		portfolioViewToggle.addEventListener('change', changePortfolioView)

		changePortfolioView();
	}
}
filterPortfolio()
