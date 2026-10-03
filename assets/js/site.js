(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); document.body.classList.remove('menu-open');
    }));
  }

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader(); window.addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  const menuData = window.laKermesseMenu;
  const priceTarget = document.querySelector('[data-lunch-prices]');
  const lunchTarget = document.querySelector('[data-lunch-columns]');
  const pizzaTarget = document.querySelector('[data-pizza-list]');
  if (menuData && priceTarget && lunchTarget && pizzaTarget) {
    menuData.lunch.prices.forEach(({ price, label }) => {
      const item = document.createElement('p');
      const amount = document.createElement('strong');
      amount.textContent = price;
      item.append(amount, ` ${label}`);
      priceTarget.append(item);
    });
    menuData.lunch.sections.forEach(({ title, items }) => {
      const group = document.createElement('div');
      const heading = document.createElement('h4');
      const list = document.createElement('ul');
      heading.textContent = title;
      items.forEach(text => { const entry = document.createElement('li'); entry.textContent = text; list.append(entry); });
      group.append(heading, list);
      lunchTarget.append(group);
    });
    menuData.pizzas.forEach(({ name, price, ingredients, image }) => {
      const item = document.createElement('article');
      const title = document.createElement('h4');
      const amount = document.createElement('span');
      const detail = document.createElement('p');
      const disc = document.createElement('div');
      const pizzaImage = document.createElement('img');
      const copy = document.createElement('div');
      item.className = 'pizza-card'; disc.className = 'pizza-card__disc'; pizzaImage.className = 'pizza-card__image'; copy.className = 'pizza-card__copy'; title.className = 'pizza-card__name'; amount.className = 'pizza-card__price'; detail.className = 'pizza-card__ingredients';
      pizzaImage.src = image; pizzaImage.alt = `Pizza ${name}`; pizzaImage.loading = 'lazy';
      title.textContent = name; amount.textContent = price; detail.textContent = ingredients;
      disc.append(pizzaImage); copy.append(title, detail, amount); item.append(disc, copy);
      pizzaTarget.append(item);
    });
  }

  const pizzaShowcase = document.querySelector('[data-pizza-showcase]');
  const pizzaViewport = document.querySelector('[data-pizza-viewport]');
  const pizzaTrack = document.querySelector('[data-pizza-list]');
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');

  if (pizzaShowcase && pizzaViewport && pizzaTrack && reducedMotion) {
    const palette = [
      { background: '#0d3442', foreground: '#f4efe4' },
      { background: '#329fc0', foreground: '#06171f' },
      { background: '#e7776f', foreground: '#06171f' },
      { background: '#d6aa3c', foreground: '#06171f' },
      { background: '#e97aac', foreground: '#06171f' },
      { background: '#66b98d', foreground: '#06171f' },
      { background: '#ee9a72', foreground: '#06171f' },
      { background: '#0d3442', foreground: '#f4efe4' }
    ];
    let geometry = { overflow: 0, startOffset: 0 };
    let framePending = false;
    let resizeFrame;

    const clamp = value => Math.min(1, Math.max(0, value));
    const hexToRgb = hex => [1, 3, 5].map(position => parseInt(hex.slice(position, position + 2), 16));
    const mixColor = (from, to, amount) => {
      const start = hexToRgb(from);
      const end = hexToRgb(to);
      return `rgb(${start.map((value, index) => Math.round(value + (end[index] - value) * amount)).join(', ')})`;
    };
    const setPalette = progress => {
      const position = progress * (palette.length - 1);
      const index = Math.min(palette.length - 2, Math.floor(position));
      const amount = position - index;
      const current = palette[index];
      const next = palette[index + 1];
      pizzaShowcase.style.setProperty('--pizza-background', mixColor(current.background, next.background, amount));
      pizzaShowcase.style.setProperty('--pizza-foreground', mixColor(current.foreground, next.foreground, amount));
    };
    const renderProgress = () => {
      framePending = false;
      if (!geometry.overflow) return;
      const progress = clamp((geometry.startOffset - pizzaShowcase.getBoundingClientRect().top) / geometry.overflow);
      const translate = -geometry.overflow + geometry.overflow * progress;
      pizzaTrack.style.transform = `translate3d(${translate}px, 0, 0)`;
      pizzaTrack.querySelectorAll('.pizza-card__image').forEach((image, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        image.style.transform = `rotate(${progress * 300 * direction}deg)`;
      });
      setPalette(progress);
    };
    const requestRender = () => {
      if (!framePending) {
        framePending = true;
        window.requestAnimationFrame(renderProgress);
      }
    };
    const resetStaticState = () => {
      pizzaShowcase.classList.remove('is-enhanced');
      pizzaShowcase.style.removeProperty('height');
      pizzaShowcase.style.removeProperty('--pizza-background');
      pizzaShowcase.style.removeProperty('--pizza-foreground');
      pizzaTrack.style.removeProperty('transform');
      pizzaTrack.querySelectorAll('.pizza-card__image').forEach(image => image.style.removeProperty('transform'));
      geometry = { overflow: 0, startOffset: 0 };
    };
    const recalculate = () => {
      if (reducedMotion.matches) {
        resetStaticState();
        return;
      }
      pizzaShowcase.classList.add('is-enhanced');
      const stickyScene = pizzaShowcase.querySelector('.pizza-showcase__sticky');
      const headerHeight = header?.getBoundingClientRect().height || 0;
      pizzaShowcase.style.setProperty('--pizza-sticky-offset', `${Math.ceil(headerHeight)}px`);
      const overflow = Math.max(0, pizzaTrack.scrollWidth - pizzaViewport.clientWidth);
      const stickyHeight = stickyScene.getBoundingClientRect().height;
      geometry = { overflow, startOffset: headerHeight };
      pizzaShowcase.style.height = `${Math.ceil(stickyHeight + overflow)}px`;
      requestRender();
    };
    const queueRecalculate = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(recalculate);
    };

    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', queueRecalculate, { passive: true });
    window.addEventListener('load', queueRecalculate, { once: true });
    reducedMotion.addEventListener?.('change', queueRecalculate);
    recalculate();
  }

})();
