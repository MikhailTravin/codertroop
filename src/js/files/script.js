// МЕНЮ ТЕНЬ ПЛИТОК //

const hoverShadowItems = document.querySelector('.center-menu__items');

function hoverMenuShadow() {
	if (hoverShadowItems) {

		const lerp = (a, b, t) => (1 - t) * a + t * b;
		const shadowColor = 'rgba(0, 0, 0, 0.4)';
		let activeEl = null;

		const groups = [
			new Set([2, 4, 6]),
			new Set([1, 7]),
			new Set([2, 5]),
			new Set([3, 7]),
		];

		const menuShadow = document.querySelector('.center-menu--shadow');
		const itemsShadow = Array.from(
			menuShadow.querySelectorAll('.item'),
			el => ({ el, currH: 0, prevH: 0 })
		);

		hoverShadowItems.addEventListener('mouseover', (e) => {
			activeEl = e.target.closest('.item');
		});

		hoverShadowItems.addEventListener('mouseleave', (e) => {
			activeEl = null;
		});

		function update() {
			const activeId = activeEl?.dataset.id;
			const activeGroup = activeId === null ? null : groups.find(g => g.has(+activeId));

			itemsShadow.forEach(it => {
				const targetH = activeGroup && activeGroup.has(+it.el.dataset.id) ? 80 : 0;
				it.currH = lerp(it.prevH, targetH, 0.05);
				it.currH = Math.abs(it.currH - targetH) < 1 ? targetH : it.currH;
				it.prevH = it.currH;
				const blurRadius = it.currH / 4;
				const spreadRadius = it.currH / 8;
				it.el.style.boxShadow = `0 0 ${blurRadius}px ${spreadRadius}px ${shadowColor}`;
			});

			requestAnimationFrame(update);
		}

		requestAnimationFrame(update);
	}
}
hoverMenuShadow()
window.addEventListener('resize', hoverMenuShadow)

//========================================================================================================================================================

// МЕНЮ БЛОК ПРИ НАВЕДЕНИИ //

const servicesLinkMenu = document.querySelector(".center-menu__link-1");

function serviceshoverMenu() {
	if (servicesLinkMenu) {

		const blockOneMenu = document.querySelector(".left-menu__block-one");
		const blockTwoMenu = document.querySelector(".left-menu__block-two");
		const blockTwoMenuArrow = document.querySelector(".left-menu__icon");
		const iconMenu = document.querySelector(".icon-menu");

		if (document.documentElement.clientWidth > 1200) {
			servicesLinkMenu.addEventListener("mouseenter", function () {
				window.setTimeout(function () {
					blockOneMenu.classList.add("_active");
				}, 0);
				window.setTimeout(function () {
					blockTwoMenu.classList.add("_active");
				}, 0);
			});

			blockTwoMenu.addEventListener("mouseenter", function () {
				blockOneMenu.classList.add("_active");
				blockTwoMenu.classList.add("_active");

			});
			blockTwoMenu.addEventListener("mouseleave", function () {
				window.setTimeout(function () {
					blockOneMenu.classList.remove("_active");
				}, 0);
				servicesLinkMenu.classList.add("_active");
			});
			servicesLinkMenu.addEventListener("mouseleave", function () {
				blockOneMenu.classList.remove("_active");
			});
		} else {
			servicesLinkMenu.addEventListener("click", function () {
				blockTwoMenu.classList.add("_active");
				iconMenu.classList.add("_active");
			});
			blockTwoMenuArrow.addEventListener("click", function () {
				blockTwoMenu.classList.remove("_active");
				iconMenu.classList.remove("_active");
			});
		}
	}
}
serviceshoverMenu();
window.addEventListener('resize', serviceshoverMenu)

//========================================================================================================================================================

// 3D КРУГ //

const mainCircle = document.querySelector('.circle');

function circle3D() {

	if (mainCircle) {

		const circle_1 = document.querySelector(".circle_1");
		const circle_2 = document.querySelector(".circle_2");
		const circle_3 = document.querySelector(".circle_3");
		const mql = window.matchMedia("(min-width: 480px)");

		mql.addEventListener("change", circle3D);
		circle();

		function generateLetters(element, text, colorCircle, radius) {
			const step = 360 / text.length;
			let countCircle = 0;

			const newLetters = [...text].map((l, i) => {
				const span = document.createElement("span");
				if (l.toUpperCase() === l) ++countCircle;//Определяем новое слово по заглавной букве и увеличиваем счетчик слов
				span.innerText = l.toUpperCase(); //В css к верхнему регистру не приводим делаем это здесь
				span.style.color = colorCircle[countCircle]; //Присваиваем цвет

				const deg = step * i;
				span.style.transform = transform(deg, radius);
				span.innerText = l.toUpperCase();

				return span;
			});

			element.replaceChildren(...newLetters);
		}

		function transform(deg, radius = 180) {
			return `rotateY(${deg}deg) translateZ(${radius}px)`;
		}

		function circle() {
			if (!mainCircle) return;

			if (mql.matches) {
				const radius = 180;
				const content_1 = "DevelopmentDevelopmentDevelopmentDevelopment";
				const color_1 = ["#ccba96", "#161616", "#ccba96", "#161616"];
				generateLetters(circle_1, content_1, color_1, radius);

				const content_2 = "DesignDesignDesignDesignDesign";
				const color_2 = ["#ccba96", "#161616", "#ccba96", "#161616", "#ccba96"];
				generateLetters(circle_2, content_2, color_2, radius);

				const content_3 = "MarketingMarketingMarketingMarketing";
				const color_3 = ["#ccba96", "#161616", "#ccba96", "#161616"];
				generateLetters(circle_3, content_3, color_3, radius);
			} else {
				const radius = 140;
				const content_1 = "DevelopmentDevelopment";
				const color_1 = ["#ccba96", "#161616"];
				generateLetters(circle_1, content_1, color_1, radius);

				const content_2 = "DesignDesignDesignDesign";
				const color_2 = ["#ccba96", "#161616", "#ccba96", "#161616"];
				generateLetters(circle_2, content_2, color_2, radius);

				const content_3 = "MarketingMarketing";
				const color_3 = ["#ccba96", "#161616"];
				generateLetters(circle_3, content_3, color_3, radius);
			}
		}
	}

}
circle3D();

//========================================================================================================================================================

// ОБРАБОТЧИК ЗD КРУГ//

let modelsCircle3D = document.querySelectorAll('.item-circle__scene')

function editorCircle3D() {
	if (modelsCircle3D) {
		modelsCircle3D.forEach(model => {
			model.addEventListener('click', (e) => {

				let modelSectors = document.querySelectorAll('.item-circle-block__items')
				let sectorNumb = +e.target.parentNode.getAttribute('data-id')

				if (sectorNumb == 0) return false;

				const currentElement = modelSectors[sectorNumb - 1];

				modelSectors.forEach((sector) => {
					if (currentElement !== sector) {
						sector.classList.remove('_active');
						model.classList.remove('_active');
					}
				});

				if (currentElement.classList.contains('_active')) {
					currentElement.classList.remove('_active')
					model.classList.remove('_active');
				} else {
					currentElement.classList.add('_active')
					model.classList.add('_active');
				}
			});
		});
	}
}
editorCircle3D()
window.addEventListener('resize', editorCircle3D)

//========================================================================================================================================================

// АНИМАЦИЯ РОБОТА //

let lastScrollPosition = 0;
let superSector = document.querySelector('.steps__super-sector');
let superSectorIsActive = false;
let cardSlides = document.querySelectorAll('.steps__card-slide');
let cards = document.querySelectorAll('.steps__slide.slide-steps')

// Пагинация
function enablePagination() {

	let pagination = document.querySelector('.steps__pagination');

	if (pagination) {

		let paginationItems = pagination.querySelectorAll('.pagination-steps__item');

		// Обработка блока пагинации (Проверка находиться ли пользователь в блоке с "Этапами")
		const [first, last] = [cardSlides[0], cardSlides[cardSlides.length - 1]]
		const [firstDist, lastDist] = [first.getBoundingClientRect().top, last.getBoundingClientRect().top]

		if (firstDist < window.innerHeight / 6 && lastDist > 0) {
			pagination.classList.add('_active')
		} else {
			pagination.classList.remove('_active')
		}

		// Обработка элемента пагинации (Проверка на каком этапе находиться пользователь)
		cardSlides.forEach((slide, index) => {
			let toTop = slide.getBoundingClientRect().top
			if (toTop < window.innerHeight / 2 && superSectorIsActive) {

				paginationItems[index].classList.add('_active')
			} else {
				paginationItems[index].classList.remove('_active')
			}
		})
		if (!superSectorIsActive) return false;
	}

}
window.addEventListener("scroll", enablePagination);

// Отрисовать траекторию
function drawPath() {

	if (cards.length) {

		// Сгенерировать <path> 
		const generatePath = (breakPoints) => {
			let d = ''
			for (let line in breakPoints) {
				d += `M ${breakPoints[line].from.x} ${breakPoints[line].from.y} ${breakPoints[line].to.x} ${breakPoints[line].to.y}` + ' '
			}

			return d
		}

		// Получить расстояние от крайней точки блока до стороны страницы
		const getRect = (selector, side) => selector.getBoundingClientRect()[side];

		let svg = document.querySelector('#robot-path');
		let path = svg.querySelector('path');
		let [contTop, contBottom] = [superSector.getBoundingClientRect().top, superSector.getBoundingClientRect().bottom];
		let [contLeft, contRight] = [superSector.getBoundingClientRect().left, superSector.getBoundingClientRect().right];
		let contHeight = contBottom - contTop;
		let contWidth = contRight - contLeft;

		svg.setAttribute("viewBox", `0 0 ${contWidth} ${contHeight}`)

		const pathBreakPoints = {
			0: {
				from: {
					x: contWidth / 2,
					y: 0
				},
				to: {
					x: 0,
					y: 0
				}
			},
			1: {
				from: {
					x: 0,
					y: 0
				},
				to: {
					x: 0,
					y: (getRect(cards[0], 'bottom') - getRect(cards[0], 'top'))
				}
			},
			2: {
				from: {
					x: 0,
					y: (getRect(cards[0], 'bottom') - getRect(cards[0], 'top'))
				},
				to: {
					x: contWidth,
					y: (getRect(cards[0], 'bottom') - getRect(cards[0], 'top'))
				}
			},
			3: {
				from: {
					x: contWidth,
					y: (getRect(cards[0], 'bottom') - getRect(cards[0], 'top'))
				},
				to: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) + 0
				}
			},
			4: {
				from: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) + 0
				},
				to: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) + 0
				}
			},
			5: {
				from: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) + 0
				},
				to: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) + 0
				}
			},
			6: {
				from: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) + 0
				},
				to: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) + 0
				}
			},
			7: {
				from: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) + 0
				},
				to: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) + 0
				}
			},
			8: {
				from: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) + 0
				},
				to: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) + 0
				}
			},
			///
			9: {
				from: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) + 0
				},
				to: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) + 0
				}
			},
			10: {
				from: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) + 0
				},
				to: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) + 0
				}
			},
			11: {
				from: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) + 0
				},
				to: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) + 0
				}
			},
			12: {
				from: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) + 0
				},
				to: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) + 0
				}
			},
			13: {
				from: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) + 0
				},
				to: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) + 0
				}
			},
			14: {
				from: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) + 0
				},
				to: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) + 0
				}
			},
			15: {
				from: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) + 0
				},
				to: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) + 0
				}
			},
			16: {
				from: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) + 0
				},
				to: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) + 0
				}
			},
			17: {
				from: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) + 0
				},
				to: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) +
						(getRect(cards[8], 'bottom') - getRect(cards[8], 'top')) + 0
				}
			},
			18: {
				from: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) +
						(getRect(cards[8], 'bottom') - getRect(cards[8], 'top')) + 0
				},
				to: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) +
						(getRect(cards[8], 'bottom') - getRect(cards[8], 'top')) + 0
				}
			},
			19: {
				from: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) +
						(getRect(cards[8], 'bottom') - getRect(cards[8], 'top')) + 0
				},
				to: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) +
						(getRect(cards[8], 'bottom') - getRect(cards[8], 'top')) +
						(getRect(cards[9], 'bottom') - getRect(cards[9], 'top')) + 0
				}
			},
			20: {
				from: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) +
						(getRect(cards[8], 'bottom') - getRect(cards[8], 'top')) +
						(getRect(cards[9], 'bottom') - getRect(cards[9], 'top')) + 0
				},
				to: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) +
						(getRect(cards[8], 'bottom') - getRect(cards[8], 'top')) +
						(getRect(cards[9], 'bottom') - getRect(cards[9], 'top')) + 0
				},
			},
			21: {
				from: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) +
						(getRect(cards[8], 'bottom') - getRect(cards[8], 'top')) +
						(getRect(cards[9], 'bottom') - getRect(cards[9], 'top')) + 0
				},
				to: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) +
						(getRect(cards[8], 'bottom') - getRect(cards[8], 'top')) +
						(getRect(cards[9], 'bottom') - getRect(cards[9], 'top')) +
						(getRect(cards[10], 'bottom') - getRect(cards[10], 'top')) + 0
				}
			},
			22: {
				from: {
					x: 0,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) +
						(getRect(cards[8], 'bottom') - getRect(cards[8], 'top')) +
						(getRect(cards[9], 'bottom') - getRect(cards[9], 'top')) +
						(getRect(cards[10], 'bottom') - getRect(cards[10], 'top')) + 0
				},
				to: {
					x: contWidth,
					y: (getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[1], 'bottom') - getRect(cards[1], 'top')) +
						(getRect(cards[2], 'bottom') - getRect(cards[2], 'top')) +
						(getRect(cards[3], 'bottom') - getRect(cards[3], 'top')) +
						(getRect(cards[4], 'bottom') - getRect(cards[4], 'top')) +
						(getRect(cards[5], 'bottom') - getRect(cards[5], 'top')) +
						(getRect(cards[6], 'bottom') - getRect(cards[6], 'top')) +
						(getRect(cards[7], 'bottom') - getRect(cards[7], 'top')) +
						(getRect(cards[8], 'bottom') - getRect(cards[8], 'top')) +
						(getRect(cards[9], 'bottom') - getRect(cards[9], 'top')) +
						(getRect(cards[10], 'bottom') - getRect(cards[10], 'top')) + 0
				}
			}

		}

		path.setAttribute('d', generatePath(pathBreakPoints))
	}

}
drawPath();
window.addEventListener("resize", drawPath);

//Переместить робота
let prevPos = [0, 0] // Начальная позиция
function moveRobot() {
	let robots = document.querySelectorAll('.steps__robots')
	if (robots) {
		if (!superSectorIsActive) return false;
		let element;
		let x = document.querySelectorAll('.steps__slide.slide-steps')[9].getBoundingClientRect().bottom;
		let cont = document.querySelector('.steps__svg-path-container');
		let contHeight = x - cont.getBoundingClientRect().top;
		let scrollPercentage = (-cont.getBoundingClientRect().top + window.innerHeight / 2) / contHeight
		let path = document.getElementById("trace");
		let pathLen = path.getTotalLength();
		let pt = path.getPointAtLength(scrollPercentage * pathLen * 0.9);

		robots.forEach(robot => {
			robot.style.display = 'none'
		})

		pt.x = Math.floor(pt.x)
		pt.y = Math.floor(pt.y)

		if (pt.x > prevPos[0]) {
			element = document.getElementById("robot-right");
			element.style.display = 'block'
			element.style.left = '0'
		} else if (pt.x < prevPos[0]) {
			element = document.getElementById("robot-left");
			element.style.display = 'block'
			element.style.left = '0'
		} else {
			element = document.getElementById("robot");
			element.style.display = 'block'
			element.style.left = '0'
		}

		element.style.transform = `translate(${pt.x}px, ${pt.y}px)`
		prevPos = [pt.x, pt.y]

	}
}
window.addEventListener("scroll", moveRobot);
window.addEventListener("resize", moveRobot);

//Скролл робота
let sectorThreeButton = document.querySelector('.animate-robot__button');
let sectorThree = document.querySelector('.sectors__slide.steps');

//Клик на кнопку "Поехали"
if (sectorThreeButton) {
	sectorThreeButton.addEventListener('click', () => {
		sectorThree.classList.add('_active');
		animateRobotEntrance();
	})

	setTimeout(() => {
		superSector.classList.remove('_active'); // Прячем весь контент после кнопки поехали
	}, 500);

}

// Анимирование робота после нажатия на кнопку "Поехали"
function animateRobotEntrance() {
	if (sectorThreeButton) {
		let path = document.querySelector('#robot-path');
		let robotTippy = document.querySelector('.animate-robot__tippy');
		let robotImage = document.querySelector('.animate-robot__img');

		robotTippy.style.transition = 'all 1s'
		robotTippy.style.opacity = 0;
		robotTippy.style.transform = 'scale(0.1)'

		sectorThreeButton.style.transition = 'all 1s'
		sectorThreeButton.style.opacity = 0;
		sectorThreeButton.style.transform = 'scale(0.1)'

		document.querySelector('.steps__translate-sector').style.transform = 'translateY(0px)'
		superSectorIsActive = true
		setTimeout(() => {
			superSector.classList.add('_active')
			robot.classList.add('_active')
			robotImage.classList.add('_active')
		}, 800)
	}
}

// Анимация робот тень и свечение
function robotAnimation() {
	let robotShadow = document.querySelector('.animate-robot__shadow');
	let robotGlow = document.querySelector('.animate-robot__glow');

	if (robotShadow) {
		setTimeout(() => {
			robotShadow.classList.add('_active')
		}, 3000)
	}

	if (robotGlow) {
		setTimeout(() => {
			robotGlow.classList.add('_active')
		}, 3000)
	}
}
robotAnimation()

//========================================================================================================================================================

// АНИМАЦИЯ СТРЕЛОК В ПОРТФОЛИО //

const portfolioArrows = document.querySelector('.portfolio__arrows');

function animationButtonPortfolio() {

	if (portfolioArrows) {

		let iconButtonPrev = document.querySelector(".portfolio__arrow-prev-desktop");
		let iconButtonNext = document.querySelector(".portfolio__arrow-next-desktop");
		let iconButtonPrevMob = document.querySelector(".portfolio__arrow-prev-mobile");
		let iconButtonNextMob = document.querySelector(".portfolio__arrow-next-mobile");

		function AnimationHandlerDesktop() {
			if (iconButtonPrev) {
				iconButtonPrev.addEventListener("click", function (e) {
					iconButtonPrev.classList.add('_active');
				});
			};
			if (iconButtonNext) {
				iconButtonNext.addEventListener("click", function (e) {
					iconButtonNext.classList.add('_active');
				});
			};
		}

		function AnimationHandlerMobile() {
			if (iconButtonPrevMob) {
				iconButtonPrevMob.addEventListener("click", function (e) {
					iconButtonPrevMob.classList.add('_active');
				});
			};
			if (iconButtonNextMob) {
				iconButtonNextMob.addEventListener("click", function (e) {
					iconButtonNextMob.classList.add('_active');
				});
			};
		}

		// Отслеживаем окончание анимации
		iconButtonPrev.addEventListener("animationend", AnimationHandler, false);
		iconButtonNext.addEventListener("animationend", AnimationHandler, false);
		iconButtonPrevMob.addEventListener("animationend", AnimationHandler, false);
		iconButtonNextMob.addEventListener("animationend", AnimationHandler, false);

		function AnimationHandler() {
			iconButtonPrev.classList.remove('_active');
			iconButtonNext.classList.remove('_active');
			iconButtonPrevMob.classList.remove('_active');
			iconButtonNextMob.classList.remove('_active');
		}

		AnimationHandlerDesktop();
		AnimationHandlerMobile();
	}
}
animationButtonPortfolio()

//========================================================================================================================================================

// СКРОЛЛ ГЛАВНОГО БЛОКА //

function readyScript() {
	window.addEventListener('scroll', elTravel);

	let srcProcent;

	function elTravel() {
		let sectorsSlide = document.querySelectorAll('.sectors__slide');

		for (let index = 0; index < sectorsSlide.length; index++) {
			const sectorSlide = sectorsSlide[index];
			const sectorSlideTop = sectorSlide.getBoundingClientRect().top * 3;
			const sectorSlideHeight = sectorSlide.offsetHeight;
			if (sectorSlide.classList.contains('main-block')) {
				let blockTypes = document.querySelector('.main-block__center');
				let mainBlockLogo = document.querySelector('.main-block__logo');
				let mainBlockSubLogo = document.querySelector('.main-block__sublogo');
				let mainBlockText = document.querySelector('.main-block__text');
				let mainBlockLink = document.querySelector('.main-block__link');
				let mainBlock = document.querySelector('.main-block');
				let circleContent = document.querySelector('.circle__content');
				srcProcent = (scrollY - sectorSlideTop) / sectorSlideHeight * 100;
				if (scrollY > sectorSlideTop && scrollY < sectorSlideTop + sectorSlideHeight) {
					let blockTypesSlide = scrollY - sectorSlideTop;
					blockTypes.classList.add('_fixed');
					blockTypes.style.cssText = `transform: translate(0px,${blockTypesSlide}px);`;
					elTravelTypes();
				} else if (scrollY <= sectorSlideTop) {
					blockTypes.style.cssText = `transform: translate(0px,0px);`;
					blockTypes.classList.remove('_fixed');
					mainBlockLogo.style.cssText = `transform: translate(0px,0px);`;
					mainBlockSubLogo.style.cssText = `transform: translate(0px,0px);`;
					mainBlockText.style.cssText = `transform: translate(0px,0px);`;
					mainBlockLink.style.cssText = `transform: translate(0px,0px);`;
					mainBlock.style.cssText = `opacity: 1; min-height: 100vh; `;
					circleContent.style.cssText = `opacity: 0;`;
				} else if (scrollY >= sectorSlideTop + sectorSlideHeight) {
					blockTypes.style.cssText = `transform: translate(0px,${sectorSlideHeight}px);`;
					blockTypes.classList.remove('_fixed');
					mainBlock.style.cssText = `opacity: 0; min-height: 0vh; pointer-events: none;`;
					circleContent.style.cssText = `opacity: 1; transition-duration: 0.3s; transition-delay: 0.5s;`;
				}
			}
		}
	}

	function elTravelTypes() {
		let mainBlockLogo = document.querySelector('.main-block__logo');
		let mainBlockSubLogo = document.querySelector('.main-block__sublogo');
		let mainBlockText = document.querySelector('.main-block__text');
		let mainBlockLink = document.querySelector('.main-block__link');
		let mainBlockTranslate = -800 / 100 * srcProcent;
		mainBlockLogo.style.cssText = `transform: translate(0px,${mainBlockTranslate}px);`;
		mainBlockSubLogo.style.cssText = `transform: translate(0px,${mainBlockTranslate}px);`;
		mainBlockText.style.cssText = `transform: translate(0px,${mainBlockTranslate}px);`;
		mainBlockLink.style.cssText = `transform: translate(0px,${mainBlockTranslate}px);`;
	}

	function onResize() {
		elTravel();
	}
	window.addEventListener('resize', onResize);

	elTravel();

}
readyScript();

//========================================================================================================================================================

// ВИДЖЕТ //

function widget() {

	let chatWidget = document.querySelector('.chat-widget__body');

	if (chatWidget) {
		let chatLine = document.querySelector(".chat-widget__line-holder");

		chatWidget.addEventListener('click', function () {
			chatWidget.classList.toggle("_active");
			chatLine.classList.toggle("_active");
			let chatBot = document.querySelectorAll('.chat-widget__chat-bot')
			let chatPulse = document.querySelectorAll('.chat-widget__pulsation')
			chatBot.forEach((chatBot) => chatBot.classList.toggle('_active'))
			chatPulse.forEach((chatPulse) => chatPulse.classList.toggle('_active'))
		});
	}
}
widget()