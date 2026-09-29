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
    menuData.pizzas.forEach(({ name, price, ingredients }) => {
      const item = document.createElement('article');
      const title = document.createElement('h4');
      const amount = document.createElement('span');
      const detail = document.createElement('p');
      item.className = 'pizza-item'; title.className = 'pizza-item__name'; amount.className = 'pizza-item__price'; detail.className = 'pizza-item__ingredients';
      title.textContent = name; amount.textContent = price; detail.textContent = ingredients;
      item.append(title, amount, detail);
      pizzaTarget.append(item);
    });
  }

  const dishFrame = document.querySelector('[data-dish-frame]');
  const loader = document.querySelector('.dish-loader');
  if (dishFrame) {
    const loaded = () => loader?.classList.add('is-hidden');
    dishFrame.addEventListener('load', loaded, { once: true });
    window.setTimeout(() => loader?.classList.add('is-hidden'), 6500);
  }
})();
