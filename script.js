
(() => {
    'use strict';

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const money = value => '₱' + Number(value).toLocaleString('en-PH');
    const cartKey = 'daina_bakehouse_cart_v2';

    const getCart = () => {
        try {
            const saved = JSON.parse(localStorage.getItem(cartKey) || '{}');

            return saved && typeof saved === 'object' && !Array.isArray(saved)
                ? saved
                : {};
        } catch {
            return {};
        }
    };

    let cart = getCart();

    const product = id => PRODUCTS.find(item => item.id === Number(id));

    const escapeHTML = value =>
        String(value).replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));

    function toast(message) {
        const element = $('#toast');

        if (!element) return;

        element.textContent = message;
        element.classList.add('show');

        clearTimeout(toast.timer);

        toast.timer = setTimeout(() => {
            element.classList.remove('show');
        }, 2800);
    }

    function updateCounter() {
        const count = Object.values(cart).reduce(
            (sum, quantity) => sum + (Number(quantity) || 0),
            0
        );

        $$('.cart-count').forEach(element => {
            element.textContent = count;
        });
    }

    function saveCart() {
        try {
            localStorage.setItem(cartKey, JSON.stringify(cart));
        } catch {
        }

        updateCounter();
    }

    function addToCart(id) {
        const item = product(id);

        if (!item) return;

        cart[id] = Math.min(99, (Number(cart[id]) || 0) + 1);

        saveCart();
        toast(item.name + ' added to your cart');
        renderCart();
    }

    function productCard(item) {
        return `
            <article class="product-card">
                <div class="product-image">
                    <img
                        src="${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.name)}"
                        loading="lazy"
                    >
                    ${
                        item.best
                            ? '<span class="pill best-seller-badge">BEST SELLER</span>'
                            : ''
                    }
                </div>

                <div class="product-info">
                    <small class="eyebrow">${escapeHTML(item.category)}</small>
                    <h3>${escapeHTML(item.name)}</h3>
                    <p>${escapeHTML(item.description)}</p>

                    <div class="product-meta">
                        <strong>${money(item.price)}</strong>
                        <small>${escapeHTML(item.unit || 'Per item')}</small>
                    </div>

                    <div class="product-actions">
                        <button
                            class="btn"
                            type="button"
                            data-add="${item.id}"
                        >Add to Cart +</button>

                        <button
                            class="details"
                            type="button"
                            data-detail="${item.id}"
                        >View Details</button>
                    </div>
                </div>
            </article>
        `;
    }

    function showProductDetails(id) {
        const item = product(id);

        if (!item) return;

        let dialog = $('#productDialog');

        if (!dialog) {
            dialog = document.createElement('dialog');
            dialog.id = 'productDialog';
            dialog.className = 'product-dialog';

            document.body.append(dialog);

            dialog.addEventListener('click', event => {
                if (event.target === dialog) dialog.close();
            });
        }

        dialog.innerHTML = `
            <button
                class="dialog-close"
                type="button"
                aria-label="Close product details"
                data-close-dialog
            >×</button>

            <div class="dialog-inner">
                <img
                    src="${escapeHTML(item.image)}"
                    alt="${escapeHTML(item.name)}"
                >

                <div>
                    <p class="eyebrow">${escapeHTML(item.category)}</p>

                    ${
                        item.best
                            ? '<span class="best-label-inline">BEST SELLER</span>'
                            : ''
                    }

                    <h2>${escapeHTML(item.name)}</h2>
                    <p>${escapeHTML(item.description)}</p>
                    <h3>${money(item.price)}</h3>

                    <p>
                        ${escapeHTML(item.unit || 'Per item')}.
                        Please contact the bakehouse to confirm current
                        availability and ordering details.
                    </p>

                    <button
                        class="btn"
                        type="button"
                        data-add="${item.id}"
                    >Add to Cart +</button>
                </div>
            </div>
        `;

        dialog.showModal();
    }

    document.addEventListener('click', event => {
        const addButton = event.target.closest('[data-add]');

        if (addButton) {
            addToCart(addButton.dataset.add);
        }

        const detailButton = event.target.closest('[data-detail]');

        if (detailButton) {
            showProductDetails(detailButton.dataset.detail);
        }

        if (event.target.closest('[data-close-dialog]')) {
            $('#productDialog')?.close();
        }

        const quantityButton = event.target.closest('[data-qty]');

        if (quantityButton) {
            const id = quantityButton.dataset.id;

            cart[id] = Math.max(
                0,
                Math.min(
                    99,
                    (Number(cart[id]) || 0) +
                    Number(quantityButton.dataset.qty)
                )
            );

            if (!cart[id]) delete cart[id];

            saveCart();
            renderCart();
        }

        const removeButton = event.target.closest('[data-remove]');

        if (removeButton) {
            delete cart[removeButton.dataset.remove];

            saveCart();
            renderCart();
        }
    });

    const menuToggle = $('#menuToggle');
    const navbar = $('#navbar');

    menuToggle?.addEventListener('click', () => {
        const open = navbar.classList.toggle('show');

        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute(
            'aria-label',
            open ? 'Close navigation' : 'Open navigation'
        );
    });

    $$('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navbar?.classList.remove('show');
            menuToggle?.setAttribute('aria-expanded', 'false');
        });
    });

    function renderFeaturedSections() {
        $$('[data-products]').forEach(container => {
            const type = container.dataset.products;
            let items;

            if (type === 'featured') {
                items = [19, 20, 23, 1].map(product).filter(Boolean);
            } else if (type === 'best' || type === 'best-all') {
                items = PRODUCTS.filter(item => item.best);
            } else {
                const categories = type.split(',');

                items = PRODUCTS.filter(item =>
                    categories.includes(item.category)
                );
            }

            const limit = Number(container.dataset.limit) || items.length;

            container.innerHTML = items
                .slice(0, limit)
                .map(productCard)
                .join('');
        });
    }

    renderFeaturedSections();

    const categories = [
        'All Products',
        'Bread',
        'Cakes',
        'Cakes & Pastries',
        'Pastries',
        'Crinkles',
        'Coffee',
        'Drinks / Beverages'
    ];

    let selectedCategory = 'All Products';
    let searchText = '';

    function matchesSearch(item, query) {
        const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

        const haystack = `
            ${item.name}
            ${item.category}
            ${item.description}
            ${item.keywords}
        `.toLowerCase();

        return terms.every(term => haystack.includes(term));
    }

    function renderShop() {
        const grid = $('#shopGrid');

        if (!grid) return;

        const params = new URLSearchParams(location.search);
        const requestedCategory = params.get('category') || 'All Products';

        selectedCategory = categories.includes(requestedCategory)
            ? requestedCategory
            : 'All Products';

        searchText = (params.get('q') || '').trim();

        const sort = $('#sortProducts')?.value || 'featured';
        const filters = $('#categoryFilters');

        if (filters) {
            filters.innerHTML = categories.map(category => `
                <button
                    type="button"
                    class="filter-btn ${
                        selectedCategory === category ? 'active' : ''
                    }"
                    data-category="${escapeHTML(category)}"
                    aria-pressed="${selectedCategory === category}"
                >${escapeHTML(category)}</button>
            `).join('');
        }

        let items = PRODUCTS.filter(item => {
            let categoryMatches =
                selectedCategory === 'All Products' ||
                item.category === selectedCategory;

            if (selectedCategory === 'Cakes & Pastries') {
                categoryMatches = [
                    'Cakes',
                    'Pastries',
                    'Crinkles'
                ].includes(item.category);
            }

            return categoryMatches &&
                (!searchText || matchesSearch(item, searchText));
        });

        if (sort === 'price-low') {
            items.sort((a, b) => a.price - b.price);
        }

        if (sort === 'price-high') {
            items.sort((a, b) => b.price - a.price);
        }

        if (sort === 'name') {
            items.sort((a, b) => a.name.localeCompare(b.name));
        }

        grid.innerHTML = items.map(productCard).join('');

        const count = $('#productCount');

        if (count) {
            count.textContent =
                `Showing ${items.length} of ${PRODUCTS.length} products`;
        }

        const empty = $('#emptyProducts');

        if (empty) {
            empty.hidden = items.length > 0;
        }

        const input = $('#siteSearch');

        if (input && document.activeElement !== input) {
            input.value = params.get('q') || '';
        }
    }

    $('#categoryFilters')?.addEventListener('click', event => {
        const button = event.target.closest('[data-category]');

        if (!button) return;

        const url = new URL(location.href);

        if (button.dataset.category === 'All Products') {
            url.searchParams.delete('category');
        } else {
            url.searchParams.set('category', button.dataset.category);
        }

        history.replaceState(null, '', url);

        renderShop();
    });

    $('#sortProducts')?.addEventListener('change', renderShop);

    renderShop();

    const requestedProduct =
        new URLSearchParams(location.search).get('product');

    if ($('#shopGrid') && requestedProduct && product(requestedProduct)) {
        showProductDetails(requestedProduct);
    }

    const searchInput = $('#siteSearch');
    const searchResults = $('#searchResults');
    const searchForm = $('#searchForm');
    const clearSearch = $('#clearSearch');

    function showSearchResults() {
        if (!searchInput || !searchResults || !searchForm) return;

        const query = searchInput.value.trim();

        searchForm.classList.toggle('has-query', Boolean(query));

        searchInput.setAttribute(
            'aria-expanded',
            String(Boolean(query))
        );

        if (!query) {
            searchResults.hidden = true;
            searchResults.innerHTML = '';
            return;
        }

        const matches = PRODUCTS
            .filter(item => matchesSearch(item, query))
            .slice(0, 6);

        searchResults.innerHTML = matches.length
            ? matches.map(item => `
                <a
                    class="search-result"
                    role="option"
                    href="menu.html?product=${item.id}"
                >
                    <img src="${escapeHTML(item.image)}" alt="">

                    <span>
                        ${escapeHTML(item.name)}<br>
                        <small>${escapeHTML(item.category)}</small>
                    </span>

                    <strong>${money(item.price)}</strong>
                </a>
            `).join('')
            : '<p>No products found. Try another search.</p>';

        searchResults.hidden = false;
    }

    searchInput?.addEventListener('input', showSearchResults);
    searchInput?.addEventListener('focus', showSearchResults);

    searchForm?.addEventListener('submit', event => {
        event.preventDefault();

        const url = new URL('menu.html', location.href);
        const query = searchInput.value.trim();

        if (query) {
            url.searchParams.set('q', query);
        }

        const category =
            new URLSearchParams(location.search).get('category');

        if (category) {
            url.searchParams.set('category', category);
        }

        location.href = url.href;
    });

    clearSearch?.addEventListener('click', () => {
        if (!searchInput) return;

        searchInput.value = '';

        showSearchResults();
        searchInput.focus();

        if ($('#shopGrid')) {
            const url = new URL(location.href);

            url.searchParams.delete('q');

            history.replaceState(null, '', url);

            renderShop();
        }
    });

    document.addEventListener('click', event => {
        if (searchForm && !searchForm.contains(event.target)) {
            if (searchResults) {
                searchResults.hidden = true;
            }

            searchInput?.setAttribute('aria-expanded', 'false');
        }
    });

    searchInput?.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            if (searchResults) {
                searchResults.hidden = true;
            }

            searchInput.setAttribute('aria-expanded', 'false');
        }
    });

    function renderSocialLinks() {
        $$('[data-social-links]').forEach(container => {
            container.innerHTML = SITE_CONFIG.socialLinks.map(link => {
                if (link.isExample) {
                    return `
                        <span
                            class="social-link social-link-example"
                            title="Example profile URL in SITE_CONFIG; replace before enabling"
                            aria-label="${escapeHTML(link.name)} profile link is an example"
                        >
                            <span class="social-icon">${escapeHTML(link.icon)}</span>
                            <span class="social-label">${escapeHTML(link.name)}</span>
                        </span>
                    `;
                }

                return `
                    <a
                        class="social-link"
                        href="${escapeHTML(link.url)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Daina’s Bakehouse on ${escapeHTML(link.name)}"
                    >
                        <span class="social-icon">${escapeHTML(link.icon)}</span>
                        <span class="social-label">${escapeHTML(link.name)}</span>
                    </a>
                `;
            }).join('');
        });
    }

    function renderBranches() {
        const container = $('#branchCards');

        if (container) {
            container.innerHTML = SITE_CONFIG.branches.map((branch, index) => `
                <article class="info-card branch-card">
                    <span class="eyebrow">BRANCH ${index + 1}</span>
                    <h2>${escapeHTML(branch.name)}</h2>

                    <p>
                        <strong>Address:</strong>
                        ${escapeHTML(branch.address)}
                    </p>

                    <p>
                        <strong>Hours:</strong>
                        ${escapeHTML(branch.hours)}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        <a href="tel:${escapeHTML(branch.phone.replace(/[^+\d]/g, ''))}">
                            ${escapeHTML(branch.phone)}
                        </a>
                    </p>

                    <a
                        href="${escapeHTML(branch.map)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-link"
                    >View on Google Maps ↗</a>
                </article>
            `).join('');
        }

        const contactBranches = $('#contactBranchLinks');

        if (contactBranches) {
            contactBranches.innerHTML = SITE_CONFIG.branches.map(branch => `
                <li>
                    <a
                        href="${escapeHTML(branch.map)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >${escapeHTML(branch.name)} — View on Google Maps ↗</a>
                </li>
            `).join('');
        }
    }

    function renderContactDetails() {
        const container = $('#contactBusinessDetails');

        if (!container) return;

        const contact = SITE_CONFIG.contact;

        const email = `
            <p>
                <strong>Email:</strong>
                <a href="mailto:${escapeHTML(contact.email)}">
                    ${escapeHTML(contact.email)}
                </a>
            </p>
        `;

        const phone = `
            <p>
                <strong>Customer service:</strong>
                <a href="tel:${escapeHTML(contact.phone.replace(/[^+\d]/g, ''))}">
                    ${escapeHTML(contact.phone)}
                </a>
            </p>
        `;

        container.innerHTML = `
            <p><strong>Business:</strong> Daina’s Bakehouse</p>
            ${email}
            ${phone}
        `;
    }

    renderSocialLinks();
    renderBranches();
    renderContactDetails();

    const cartTotal = () =>
        Object.entries(cart).reduce((sum, [id, quantity]) => {
            return sum +
                (product(id)?.price || 0) * Number(quantity || 0);
        }, 0);

    function renderCart() {
        const rows = $('#cartItems');
        const summary = $('#cartSummary');
        const checkoutSummary = $('#checkoutSummary');

        const validItems = Object.entries(cart).filter(([id, quantity]) => {
            return product(id) &&
                Number.isInteger(quantity) &&
                quantity > 0;
        });

        if (rows) {
            rows.innerHTML = validItems.length
                ? validItems.map(([id, quantity]) => {
                    const item = product(id);

                    return `
                        <div class="cart-row">
                            <img
                                src="${escapeHTML(item.image)}"
                                alt="${escapeHTML(item.name)}"
                            >

                            <div>
                                <h3>${escapeHTML(item.name)}</h3>
                                <p>${money(item.price)} per item</p>

                                <div class="qty">
                                    <button
                                        type="button"
                                        data-qty="-1"
                                        data-id="${id}"
                                        aria-label="Decrease ${escapeHTML(item.name)}"
                                    >−</button>

                                    <span>${quantity}</span>

                                    <button
                                        type="button"
                                        data-qty="1"
                                        data-id="${id}"
                                        aria-label="Increase ${escapeHTML(item.name)}"
                                    >+</button>

                                    <button
                                        type="button"
                                        class="remove"
                                        data-remove="${id}"
                                    >Remove</button>
                                </div>
                            </div>

                            <strong>${money(item.price * quantity)}</strong>
                        </div>
                    `;
                }).join('')
                : `
                    <div class="info-card">
                        <h2>Your cart is empty</h2>
                        <p>Find something delicious to add to your basket.</p>
                        <a class="btn" href="menu.html">Browse the Shop →</a>
                    </div>
                `;
        }

        const summaryHTML = validItems.map(([id, quantity]) => {
            const item = product(id);

            return `
                <div class="summary-line">
                    <span>${escapeHTML(item.name)} × ${quantity}</span>
                    <strong>${money(item.price * quantity)}</strong>
                </div>
            `;
        }).join('') + `
            <div class="summary-line">
                <strong>Subtotal</strong>
                <strong>${money(cartTotal())}</strong>
            </div>

            <p class="muted">
                Your subtotal reflects the products currently in your basket.
            </p>
        `;

        if (summary) {
            summary.innerHTML = summaryHTML;
        }

        if (checkoutSummary) {
            checkoutSummary.innerHTML = validItems.length
                ? summaryHTML
                : '<p>Your cart is empty. Add products before reviewing your order.</p>';
        }

        const checkoutLink = $('#checkoutLink');

        if (checkoutLink) {
            checkoutLink.setAttribute(
                'aria-disabled',
                String(!validItems.length)
            );

            checkoutLink.onclick = validItems.length
                ? null
                : event => event.preventDefault();
        }

        const submit = $('#checkoutForm button[type="submit"]');

        if (submit) {
            submit.disabled = !validItems.length;
        }
    }

    renderCart();

    $('#checkoutForm')?.addEventListener('submit', event => {
        event.preventDefault();

        if (
            !Object.keys(cart).length ||
            !event.currentTarget.reportValidity()
        ) {
            return;
        }

        const formData = new FormData(event.currentTarget);

        const items = Object.entries(cart)
            .map(([id, quantity]) => {
                const item = product(id);

                return item
                    ? `${item.name} × ${quantity} — ${money(item.price * quantity)}`
                    : '';
            })
            .filter(Boolean)
            .join('\n');

        const fulfillment = String(
            formData.get('fulfillment') || 'Pickup inquiry'
        );

        const subject = encodeURIComponent(
            `Order inquiry — Daina’s Bakehouse`
        );

        const body = encodeURIComponent(
            `Hello Daina’s Bakehouse,\n\n` +
            `I would like to arrange this order:\n${items}\n\n` +
            `Total: ${money(cartTotal())}\n` +
            `Fulfillment: ${fulfillment}\n` +
            `Name: ${formData.get('name')}\n` +
            `Email: ${formData.get('email')}\n` +
            `Phone: ${formData.get('phone')}\n` +
            `Notes: ${formData.get('notes') || 'None'}\n\n` +
            `Please confirm availability and arrangements.`
        );

        $('#checkoutFeedback').innerHTML = `
            <div class="notice">
                <strong>Order details prepared.</strong>

                <p>
                    Your ${fulfillment.toLowerCase()} request is ready to send
                    to customer service. Please send the prepared email to
                    complete your request.
                </p>

                <a
                    class="btn"
                    href="mailto:${encodeURIComponent(SITE_CONFIG.contact.email)}?subject=${subject}&body=${body}"
                >Open order email →</a>
            </div>
        `;
    });

    $$('.local-form').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();

            if (!form.reportValidity()) return;

            const data = new FormData(form);

            const subject = encodeURIComponent(
                data.get('subject') ||
                'Website inquiry — Daina’s Bakehouse'
            );

            const body = encodeURIComponent(
                `Name: ${data.get('name') || ''}\n` +
                `Email: ${data.get('email') || ''}\n` +
                `Subject: ${data.get('subject') || ''}\n\n` +
                `${data.get('message') || ''}`
            );

            const mailto =
                `mailto:${encodeURIComponent(SITE_CONFIG.contact.email)}` +
                `?subject=${subject}&body=${body}`;

            const feedback = $('.form-feedback', form);

            if (feedback) {
                feedback.innerHTML = `
                    Your message is ready in your email app.
                    Please send the prepared email to complete your inquiry.
                    <a href="${mailto}">Open email draft</a>.
                `;
            }

            window.location.href = mailto;
        });
    });

    $('#newsletterForm')?.addEventListener('submit', event => {
        event.preventDefault();

        if (!event.currentTarget.reportValidity()) return;

        toast(
            'Thank you for your interest! Please contact us by email to hear about bakery updates.'
        );

        event.currentTarget.reset();
    });

    let accountMode = 'login';

    $$('[data-account-tab]').forEach(button => {
        button.addEventListener('click', () => {
            accountMode = button.dataset.accountTab;

            $$('[data-account-tab]').forEach(tab => {
                tab.classList.toggle('active', tab === button);
            });

            const submit = $('#accountSubmit');

            if (submit) {
                submit.textContent = 'Account Access Unavailable';
            }

            const explanation = $('#accountExplanation');

            if (explanation) {
                explanation.textContent =
                    `Customer ${accountMode === 'login' ? 'sign-in' : 'registration'} ` +
                    'is not connected on this website. Please do not enter a password.';
            }

            const feedback = $('#accountFeedback');

            if (feedback) {
                feedback.textContent = '';
            }
        });
    });

    $('#accountForm')?.addEventListener('submit', event => {
        event.preventDefault();

        const feedback = $('#accountFeedback');

        if (feedback) {
            feedback.textContent =
                'Customer account access is not available online yet. Please contact customer service for assistance.';
        }

        event.currentTarget.reset();
    });

    document.addEventListener('error', event => {
        const image = event.target;

        if (
            !(image instanceof HTMLImageElement) ||
            image.dataset.fallbackApplied
        ) {
            return;
        }

        image.dataset.fallbackApplied = 'true';

        const fallback =
            'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=82';

        image.src = fallback;

        image.closest('[data-lightbox]')
            ?.setAttribute('data-lightbox', fallback);
    }, true);

    $$('[data-lightbox]').forEach(button => {
        button.addEventListener('click', () => {
            const dialog = $('#lightbox');
            const image = $('#lightboxImage');

            if (!dialog || !image) return;

            image.src = button.dataset.lightbox;
            image.alt = $('img', button)?.alt || 'Bakery photograph';

            dialog.showModal();
        });
    });

    $('#closeLightbox')?.addEventListener('click', () => {
        $('#lightbox')?.close();
    });

    $('#lightbox')?.addEventListener('click', event => {
        if (event.target.id === 'lightbox') {
            event.target.close();
        }
    });

    updateCounter();
})();
