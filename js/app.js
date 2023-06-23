// Класс SmoothScroll, который создает объект для плавного скролла страницы
class SmoothScroll {
	constructor(wrapper, content, smooth = 1.5, effects = true) {
	  this.wrapper = wrapper; // Селектор элемента, который должен быть обернут в обертку скролла
	  this.content = content; // Селектор элемента, который должен быть прокручен внутри обертки скролла
	  this.smooth = smooth; // Скорость плавного скролла. По умолчанию равна 1.5
	  this.effects = effects; // Определяет, включены ли эффекты плавного скролла. По умолчанию равна true
	}
  
	// Метод create() создает экземпляр ScrollSmoother, используя переданные параметры
	create() {
	  ScrollSmoother.create({
		wrapper: this.wrapper,
		content: this.content,
		smooth: this.smooth,
		effects: this.effects
	  });
	}
  }
  
  // Класс HeroSection, который создает объект для анимации главной секции страницы
  class HeroSection {
	constructor(selector) {
	  this.selector = selector; // Селектор главной секции страницы
	}
  
	// Метод animate() использует gsap.fromTo() для создания анимации, которая запускается при прокрутке страницы
	animate() {
	  gsap.fromTo(this.selector, { opacity: 1 }, {
		opacity: 0,
		scrollTrigger: {
		  trigger: this.selector, // Триггер, который запускает анимацию
		  start: 'center', // Точка начала анимации
		  end: '820', // Точка окончания анимации
		  scrub: true // Плавное переключение между точками начала и окончания анимации
		}
	  });
	}
  }
  
  // Класс GalleryItem, который создает объект для анимации элементов галереи
  class GalleryItem {
	constructor(selector, xOffset, yOffset, start, end) {
	  this.selector = selector; // Селектор элемента галереи
	  this.xOffset = xOffset; // Смещение элемента по оси X. По умолчанию равна 0
	  this.yOffset = yOffset; // Смещение элемента по оси Y. По умолчанию равна 0
	  this.start = start; // Начальная точка анимации элемента. По умолчанию равна 0
	  this.end = end; // Конечная точка анимации элемента. По умолчанию равна 0
	}
  
	// Метод animate() использует gsap.fromTo() для создания анимации элемента галереи, которая запускается при прокрутке страницы
	animate() {
	  gsap.fromTo(this.selector, { opacity: 0, x: this.xOffset }, {
		opacity: 1, x: 0,
		scrollTrigger: {
		  trigger: this.selector, // Триггер, который запускает анимацию
		  start: this.start, // Точка начала анимации
		  end: this.end, // Точка окончания анимации
		  scrub: true // Плавное переключение между точками начала и окончания анимации
		}
	  });
	}
  }
  
  const smoothScroll = new SmoothScroll('.wrapper', '.content');
  const heroSection = new HeroSection('.hero-section');
  const galleryItemsL = gsap.utils.toArray('.gallery__left .gallery__item');
  const galleryItemsR = gsap.utils.toArray('.gallery__right .gallery__item');
  
  if (ScrollTrigger.isTouch !== 1) {
	smoothScroll.create();
	heroSection.animate();
  
	galleryItemsL.forEach(item => {
	  const galleryItem = new GalleryItem(item, -50, 0, '-850', '-100');
	  galleryItem.animate();
	});
  
	galleryItemsR.forEach(item => {
	  const galleryItem = new GalleryItem(item, 50, 0, '-750', 'top');
	  galleryItem.animate();
	});
}