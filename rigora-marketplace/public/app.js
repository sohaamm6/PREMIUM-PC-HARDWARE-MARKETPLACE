const products = window.RIGORA_PRODUCTS;
const categories = [["▦", "Graphics Cards", "GPUs, all generations"], ["◈", "Processors", "Intel & AMD CPUs"], ["▤", "Memory", "DDR4 & DDR5 kits"], ["▧", "Storage", "NVMe, SSDs & HDDs"], ["▦", "Motherboards", "Find your platform"], ["⌘", "Peripherals", "Gear for your setup"]];
const rupees = n => "₹" + Number(n).toLocaleString("en-IN");
const state = { cart: load("rigora-cart", []), wishlist: load("rigora-wishlist", []), query: "", filters: { category: "", brand: "", condition: "", min: "", max: "" }, sort: "featured", checkoutStep: 1, checkoutInfo: {}, currentUser: null, afterAuth: "account", lastOrderNumber: "", build: { CPU: "", GPU: "", Motherboard: "", Memory: "", Storage: "", PSU: "", Cabinet: "" } };
function load(k, f) {
    try {
        return JSON.parse(localStorage.getItem(k)) ?? f;
    }
    catch {
        return f;
    }
}
function save() { localStorage.setItem("rigora-cart", JSON.stringify(state.cart)); localStorage.setItem("rigora-wishlist", JSON.stringify(state.wishlist)); updateCount(); }
function updateCount() {
    let n = state.cart.reduce((s, x) => s + x.qty, 0);
    let el = document.getElementById("cart-count");
    if (el)
        el.textContent = n;
}
function toast(msg) { const r = document.getElementById("toast-region"); const t = document.createElement("div"); t.className = "toast"; t.innerHTML = '<span class="toast-mark">✓</span><span></span>'; t.lastChild.textContent = msg; r.appendChild(t); setTimeout(() => t.remove(), 2800); }
function openTab(route) { window.open(location.href.split("#")[0] + "#" + route, "_blank", "noopener"); }
function go(route, newTab = false) {
    if (newTab) {
        openTab(route);
        return;
    }
    location.hash = route;
}
function imageFor(p) { return p.image || ""; }
function productCard(p) { let saved = state.wishlist.includes(p.id); return `<article class="product-card">
        <div class="product-visual" data-product="${p.id}">
        <span class="pill ${p.type === "used" ? "used" : "new"}">${p.type === "used" ? "PRE-OWNED" : "NEW"}</span>${p.tag ? `<span class="pill deal">${p.tag}</span>` : ""}<button class="wish-btn ${saved ? "saved" : ""}" data-wish="${p.id}" aria-label="Toggle wishlist">${saved ? "♥" : "♡"}</button>
        <img src="${imageFor(p)}" alt="${p.name}" loading="lazy" onerror="this.style.opacity='.2'">
        </div>
        <div class="product-info">
        <div class="product-category">${p.brand} · ${p.category}</div>
        <div class="product-name" data-product="${p.id}">${p.name}</div>
        <div class="product-meta">
        <span class="star">★</span> ${p.rating} <span>(${p.reviews} reviews)</span>
        <span>·</span>
        <span>${p.type === "used" ? p.condition : "Warranty"}</span>
        </div>
        <div class="product-price-row">
        <span class="product-price">${rupees(p.price)}</span>
        <span class="product-old-price">${rupees(p.oldPrice)}</span>
        </div>
        <div class="product-bottom">
        <button class="btn btn-primary btn-sm" data-add="${p.id}">Add to cart</button>
        <button class="btn btn-secondary btn-sm add-btn" data-product="${p.id}" aria-label="View details">↗</button>
        </div>
        </div>
        </article>`; }
function head(eyebrow, title, desc, crumb = "Home") { return `<div class="page-heading">
        <div class="breadcrumbs">
        <a href="#home">Home</a>
        <span>›</span>
        <span>${crumb}</span>
        </div>
        <span class="eyebrow">${eyebrow}</span>
        <h1>${title}</h1>
        <p>${desc}</p>
        </div>`; }
function home() {
    return `<div class="page-wrap">
        <section class="hero">
        <div class="hero-grid">
        </div>
        <div class="hero-content">
        <span class="eyebrow">THE HARDWARE MARKETPLACE</span>
        <h1>Build better.<br>
        <span class="gradient">Game harder.</span>
        </h1>
        <p class="hero-copy">Your next upgrade is closer than you think. Discover cutting-edge new hardware or score pre-owned parts that make every rupee count.</p>
        <div class="button-row">
        <button class="btn btn-primary" data-route="new-parts">Explore new parts <span>↗</span>
        </button>
        <button class="btn btn-secondary" data-route="used-parts">Discover used deals <span>→</span>
        </button>
        </div>
        <div class="hero-proof">
        <div class="proof-avatars">
        <span>G</span>
        <span>R</span>
        <span>K</span>
        <span>+</span>
        </div>
        <div>
        <div class="proof-stars">★★★★★</div>
        <span>Made for builders, by builders</span>
        </div>
        </div>
        </div>
        <div class="hero-art">
        <img class="hero-image" src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=90" alt="Premium gaming PC hardware" onerror="this.style.display='none'">
        <div class="floating-chip chip-top">
        <small>
        <span class="chip-icon">✦</span> BUILD SMARTER</small>
        <strong>Performance first.</strong>
        </div>
        <div class="floating-chip chip-bottom">
        <small>PRE-OWNED FINDS FROM</small>
        <strong>₹1,999 <span style="font-size:10px;color:var(--cyan)">↗</span>
        </strong>
        </div>
        </div>
        </section>
<div class="trust-strip">
        <div class="trust-item">
        <span class="trust-icon">⌁</span>
        <div>
        <strong>Curated hardware</strong>
        <small>Specs that matter</small>
        </div>
        </div>
        <div class="trust-item">
        <span class="trust-icon">◈</span>
        <div>
        <strong>New & pre-owned</strong>
        <small>More ways to upgrade</small>
        </div>
        </div>
        <div class="trust-item">
        <span class="trust-icon">⌑</span>
        <div>
        <strong>Buyer-first design</strong>
        <small>Clear listing details</small>
        </div>
        </div>
        <div class="trust-item">
        <span class="trust-icon">⛨</span>
        <div>
        <strong>Safety-minded</strong>
        <small>Shop with care</small>
        </div>
        </div>
        </div>
<section class="section">
        <div class="section-head">
        <div>
        <span class="eyebrow">FIND YOUR NEXT UPGRADE</span>
        <h2>Shop by category</h2>
        <p>The right component changes everything.</p>
        </div>
        <a class="text-link" href="#new-parts">All categories ↗</a>
        </div>
        <div class="category-grid">${categories.map((c, i) => `<a href="#new-parts" class="category-card" data-category="${c[1]}">
        <span class="category-symbol">${c[0]}</span>
        <strong>${c[1]}</strong>
        <small>${c[2]}</small>
        </a>`).join("")}</div>
        </section>
<section class="section section-tint">
        <div class="section-head">
        <div>
        <span class="eyebrow">THE COMMUNITY FAVOURITES</span>
        <h2>Worth the upgrade<span style="color:var(--violet)">.</span>
        </h2>
        <p>Popular picks for your next build.</p>
        </div>
        <a class="text-link" href="#new-parts">Shop all new parts ↗</a>
        </div>
        <div class="product-grid">${products.filter(p => p.type === "new").slice(0, 4).map(productCard).join("")}</div>
        </section>
<section class="section">
        <div class="promo-banner">
        <div>
        <span class="eyebrow">YOUR BUILD. YOUR RULES.</span>
        <h2>Every component.<br>One compatible build.</h2>
        <p>Plan your setup, choose your parts, and keep an eye on your total before you buy.</p>
        <div class="promo-stats">
        <div>
        <strong>7+</strong>
        <small>Component slots</small>
        </div>
        <div>
        <strong>Live</strong>
        <small>Price total</small>
        </div>
        <div>
        <strong>Smart</strong>
        <small>Compatibility notes</small>
        </div>
        </div>
        <button class="btn btn-primary" data-route="pc-builder">Open PC builder ↗</button>
        </div>
        <img class="promo-art" src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=85" alt="PC component build" loading="lazy">
        </div>
        </section>
<section class="section used-band">
        <div class="section-head">
        <div>
        <span class="eyebrow">GOOD GEAR, SECOND LIFE</span>
        <h2>Pre-owned. Not second-best.</h2>
        <p>Discover used components and make your budget go further.</p>
        </div>
        <a class="text-link" href="#used-parts">Explore pre-owned ↗</a>
        </div>
        <div class="product-grid">${products.filter(p => p.type === "used").slice(0, 4).map(productCard).join("")}</div>
        <div class="condition-note">
        <span class="green-dot">
        </span> Always review condition, photos, seller details, and return terms before buying used hardware.</div>
        </section>
<section class="section">
        <div class="sell-banner">
        <div>
        <span class="eyebrow">GOT HARDWARE TO MOVE?</span>
        <h3>Your old parts could be someone’s next upgrade.</h3>
        <p>Create a listing, describe its condition honestly, and reach fellow PC builders.</p>
        </div>
        <div style="display:flex;align-items:center;gap:18px">
        <span class="sell-banner-icon">↗</span>
        <button class="btn btn-primary" data-route="sell">Sell a component</button>
        </div>
        </div>
        </section>
        </div>`;
}
function catalog(type) {
    let list = products.filter(p => type === "new-parts" ? p.type === "new" : p.type === "used");
    if (state.query)
        list = list.filter(p => (p.name + " " + p.brand + " " + p.category + " " + p.spec).toLowerCase().includes(state.query.toLowerCase()));
    if (state.filters.category)
        list = list.filter(p => p.category === state.filters.category);
    if (state.filters.brand)
        list = list.filter(p => p.brand === state.filters.brand);
    if (state.filters.condition && state.filters.condition !== "Any")
        list = list.filter(p => p.type === "new" ? state.filters.condition === "New" : p.condition === state.filters.condition);
    if (state.filters.min)
        list = list.filter(p => p.price >= Number(state.filters.min));
    if (state.filters.max)
        list = list.filter(p => p.price <= Number(state.filters.max));
    if (state.sort === "price-low")
        list.sort((a, b) => a.price - b.price);
    if (state.sort === "price-high")
        list.sort((a, b) => b.price - a.price);
    if (state.sort === "rating")
        list.sort((a, b) => b.rating - a.rating);
    if (state.sort === "name")
        list.sort((a, b) => a.name.localeCompare(b.name));
    let title = type === "new-parts" ? "New hardware, no compromises." : "Pre-owned. Priced to move.";
    let desc = type === "new-parts" ? "Explore new components from the brands and categories builders love." : "Find second-hand components with clear condition details and prices worth a closer look.";
    let brands = [...new Set(products.filter(p => p.type === (type === "new-parts" ? "new" : "used")).map(p => p.brand))];
    return `<div class="page-wrap">${head(type === "new-parts" ? "THE LATEST & GREATEST" : "SMARTER SECOND-HAND", title, desc, type === "new-parts" ? "New parts" : "Pre-owned")}<div class="catalog-layout">
        <aside class="filter-panel" id="filter-panel">
        <div class="filter-title">Filters <button id="clear-filters">Clear all</button>
        </div>
        <div class="filter-group">
        <h4>Category</h4>${[...new Set(products.map(p => p.category))].map(c => `<label>
        <input type="checkbox" data-filter-category="${c}" ${state.filters.category === c ? "checked" : ""}> ${c}</label>`).join("")}</div>
        <div class="filter-group">
        <h4>Brand</h4>${brands.map(b => `<label>
        <input type="checkbox" data-filter-brand="${b}" ${state.filters.brand === b ? "checked" : ""}> ${b}</label>`).join("")}</div>
        <div class="filter-group">
        <h4>Price range (₹)</h4>
        <div class="price-inputs">
        <input id="min-price" type="number" placeholder="Min" value="${state.filters.min}">
        <input id="max-price" type="number" placeholder="Max" value="${state.filters.max}">
        </div>
        <button class="btn btn-secondary btn-sm" id="apply-price" style="margin-top:8px;width:100%">Apply price</button>
        </div>
        <div class="filter-group">
        <h4>Condition</h4>${(type === "new-parts" ? ["New"] : ["Excellent", "Good", "Fair", "For Parts"]).map(c => `<label>
        <input type="radio" name="condition" data-filter-condition="${c}" ${state.filters.condition === c ? "checked" : ""}> ${c}</label>`).join("")}</div>
        </aside>
        <div>
        <div class="catalog-top">
        <span class="result-count">${list.length} products found</span>
        <div class="catalog-controls">
        <button class="btn btn-secondary btn-sm" id="mobile-filter">☷ Filters</button>
        <select id="sort-select" aria-label="Sort products">
        <option value="featured">Featured</option>
        <option value="price-low" ${state.sort === "price-low" ? "selected" : ""}>Price: low to high</option>
        <option value="price-high" ${state.sort === "price-high" ? "selected" : ""}>Price: high to low</option>
        <option value="rating" ${state.sort === "rating" ? "selected" : ""}>Top rated</option>
        <option value="name" ${state.sort === "name" ? "selected" : ""}>Name A–Z</option>
        </select>
        </div>
        </div>${list.length ? `<div class="product-grid">${list.map(productCard).join("")}</div>` : `<div class="empty-state">
        <div style="font-size:35px">⌕</div>
        <h3>No matching parts found</h3>
        <p>Try another search or clear some filters.</p>
        <button class="btn btn-secondary" id="empty-clear">Clear filters</button>
        </div>`}</div>
        </div>
        </div>`;
}
function detail(id) {
    let p = products.find(x => x.id === id);
    if (!p)
        return `<div class="page-wrap">${head("PRODUCT NOT FOUND", "That part is off the grid.", "This demo product may no longer be available.")}<a class="btn btn-primary" href="#new-parts">Back to marketplace</a>
        </div>`;
    return `<div class="page-wrap">${head(p.category.toUpperCase(), p.name, `${p.brand} · ${p.spec}`, p.name)}<div class="detail-layout">
        <div class="detail-image">
        <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="detail-info">
        <span class="pill ${p.type === "used" ? "used" : "new"}" style="position:static;display:inline-block">${p.type === "used" ? "PRE-OWNED" : "NEW"}</span>
        <h1>${p.name}</h1>
        <div class="product-meta">
        <span class="star">★</span> ${p.rating} · ${p.reviews} reviews · ${p.brand}</div>
        <div class="product-price-row">
        <span class="product-price">${rupees(p.price)}</span>
        <span class="product-old-price">${rupees(p.oldPrice)}</span>
        </div>
        <p>${p.description}</p>
        <div class="spec-list">
        <div class="spec-item">
        <small>Brand</small>
        <strong>${p.brand}</strong>
        </div>
        <div class="spec-item">
        <small>Category</small>
        <strong>${p.category}</strong>
        </div>
        <div class="spec-item">
        <small>Specifications</small>
        <strong>${p.spec}</strong>
        </div>
        <div class="spec-item">
        <small>Condition</small>
        <strong>${p.condition}</strong>
        </div>
        <div class="spec-item">
        <small>Warranty</small>
        <strong>${p.warranty}</strong>
        </div>
        <div class="spec-item">
        <small>Availability</small>
        <strong style="color:var(--green)">Demo stock available</strong>
        </div>
        </div>${p.type === "used" ? `<div class="notice">Pre-owned purchase tip: ask for clear photos, a live test, proof of purchase where available, and written return terms before paying.</div>` : `<div class="notice">Demo listing. Manufacturer warranty and stock details must be confirmed by a real merchant before launch.</div>`}<div class="detail-actions">
        <button class="btn btn-primary" data-add="${p.id}">Add to cart · ${rupees(p.price)}</button>
        <button class="btn btn-secondary" data-buy="${p.id}">Buy now ↗</button>
        <button class="btn btn-ghost" data-wish="${p.id}">${state.wishlist.includes(p.id) ? "♥" : "♡"}</button>
        </div>
        <p style="font-size:10px">Sample marketplace listing. Real payment requires server configuration and Razorpay test credentials.</p>
        </div>
        </div>
        <section class="section">
        <div class="section-head">
        <div>
        <span class="eyebrow">KEEP EXPLORING</span>
        <h2>You may also like</h2>
        </div>
        <a href="#new-parts" class="text-link">View all ↗</a>
        </div>
        <div class="product-grid">${products.filter(x => x.id !== p.id && x.category === p.category).slice(0, 4).map(productCard).join("") || products.filter(x => x.id !== p.id).slice(0, 4).map(productCard).join("")}</div>
        </section>
        </div>`;
}
function sell() { return `<div class="page-wrap">${head("JOIN THE MARKETPLACE", "Give your hardware a second life.", "Create a clear, honest listing and connect with people building their next setup.", "Sell a part")}<form id="sell-form" class="form-card">
        <div class="form-section">
        <h3>01. Product details</h3>
        <p>Tell buyers exactly what you're selling.</p>
        <div class="form-grid">
        <div class="field">
        <label>Component category *</label>
        <select name="category" required>
        <option value="">Select category</option>${[...new Set(products.map(p => p.category))].map(c => `<option>${c}</option>`).join("")}</select>
        </div>
        <div class="field">
        <label>Brand *</label>
        <input name="brand" required placeholder="e.g. ASUS, AMD, Corsair">
        </div>
        <div class="field full">
        <label>Product name / model *</label>
        <input name="name" required placeholder="Exact model name">
        </div>
        <div class="field full">
        <label>Specifications</label>
        <input name="spec" placeholder="Memory, capacity, socket, model number...">
        </div>
        <div class="field full">
        <label>Description *</label>
        <textarea name="description" required placeholder="Age, usage, performance, known defects, included accessories...">
        </textarea>
        </div>
        </div>
        </div>
        <div class="form-section">
        <h3>02. Condition & photos</h3>
        <p>Be transparent. Good photos help buyers make informed decisions.</p>
        <div class="form-grid">
        <div class="field">
        <label>Condition *</label>
        <select name="condition" required>
        <option value="">Choose condition</option>
        <option>Like New</option>
        <option>Excellent</option>
        <option>Good</option>
        <option>Fair</option>
        <option>For Parts</option>
        </select>
        </div>
        <div class="field">
        <label>Warranty details</label>
        <input name="warranty" placeholder="Remaining warranty, if any">
        </div>
        <div class="field full">
        <label>Product photos</label>
        <label class="upload-box" for="sell-images">
        <span style="font-size:24px">⇧</span>
        <strong>Choose product photos</strong>JPG, PNG or WebP · preview only in this demo<input id="sell-images" type="file" accept="image/*" multiple hidden>
        </label>
        <div id="upload-preview" class="upload-preview">
        </div>
        </div>
        </div>
        </div>
        <div class="form-section">
        <h3>03. Pricing & handover</h3>
        <p>Set a fair asking price and explain how the item can be delivered.</p>
        <div class="form-grid">
        <div class="field">
        <label>Asking price (₹) *</label>
        <input name="price" type="number" min="1" required placeholder="e.g. 12000">
        </div>
        <div class="field">
        <label>Original price (₹)</label>
        <input name="oldPrice" type="number" min="0" placeholder="If known">
        </div>
        <div class="field">
        <label>City / area</label>
        <input name="location" placeholder="e.g. Pune, Maharashtra">
        </div>
        <div class="field">
        <label>Handover method</label>
        <select name="delivery">
        <option>Shipping or local pickup</option>
        <option>Local pickup only</option>
        <option>Shipping only</option>
        </select>
        </div>
        </div>
        </div>
        <div class="notice">Demo mode: submissions are stored only in this browser. Real publishing requires user authentication, backend storage, image hosting, and moderation.</div>
        <div class="form-actions">
        <button type="button" class="btn btn-ghost" data-route="home">Cancel</button>
        <button type="submit" class="btn btn-primary">Preview & publish listing ↗</button>
        </div>
        </form>
        </div>`; }
const builderOptions = { CPU: [["cpu-01", "Ryzen 7 7800X3D", 34999], ["cpu-02", "Core i5-12400F (pre-owned)", 8999]], GPU: [["gpu-01", "RTX 4070 SUPER", 58999], ["gpu-02", "RTX 3060 Ti (pre-owned)", 21999], ["gpu-03", "RX 6700 XT (pre-owned)", 19999]], Motherboard: [["mobo-01", "B650M WiFi", 15999]], Memory: [["ram-01", "32GB DDR5 RGB", 9999], ["ram-02", "16GB DDR4 (pre-owned)", 1999]], Storage: [["ssd-01", "990 PRO 1TB NVMe", 8999]], PSU: [["psu-01", "750W 80+ Gold", 7999]], Cabinet: [["case-01", "Airflow Mid-Tower", 6999]] };
function builder() {
    let total = 0;
    Object.entries(state.build).forEach(([k, id]) => {
        let op = (builderOptions[k] || []).find(x => x[0] === id);
        if (op)
            total += op[2];
    });
    return `<div class="page-wrap">${head("PLAN BEFORE YOU POWER ON", "Your build. Your rules.", "Choose components, see your running total, and use compatibility notes as a starting point. Confirm exact specifications before purchasing.", "PC builder")}<div class="builder-layout">
        <div class="builder-list">${Object.entries(builderOptions).map(([key, opts]) => `<div class="builder-row">
        <div class="builder-symbol">${({ CPU: "◈", GPU: "▦", Motherboard: "▧", Memory: "▤", Storage: "▥", PSU: "ϟ", Cabinet: "▣" })[key]}</div>
        <div>
        <h3>${key}</h3>
        <p>${state.build[key] ? (opts.find(x => x[0] === state.build[key]) || [])[1] : "Choose a component for this slot"}</p>
        </div>
        <select class="builder-select" data-build="${key}">
        <option value="">Choose ${key.toLowerCase()}</option>${opts.map(o => `<option value="${o[0]}" ${state.build[key] === o[0] ? "selected" : ""}>${o[1]} · ${rupees(o[2])}</option>`).join("")}</select>
        </div>`).join("")}</div>
        <aside class="builder-summary">
        <span class="eyebrow">YOUR CONFIGURATION</span>
        <h3>Build summary</h3>
        <div class="builder-total">${rupees(total)}</div>
        <p>${Object.values(state.build).filter(Boolean).length} of ${Object.keys(state.build).length} component slots selected</p>
        <div class="summary-line">
        <span>Selected components</span>
        <strong>${Object.values(state.build).filter(Boolean).length}</strong>
        </div>
        <div class="summary-line">
        <span>Estimated power</span>
        <strong>Not calculated</strong>
        </div>
        <div class="builder-warning">Compatibility is not fully validated in this demo. Confirm CPU socket, RAM generation, case clearance, and PSU requirements before buying.</div>
        <button class="btn btn-primary" id="build-to-cart">Add selected parts to cart</button>
        <button class="btn btn-secondary" id="reset-build">Reset build</button>
        <p>Prices are sample data and may not reflect current retail prices.</p>
        </aside>
        </div>
        </div>`;
}
function cart() { let items = state.cart.map(ci => ({ ...ci, p: products.find(p => p.id === ci.id) })).filter(x => x.p); let subtotal = items.reduce((s, x) => s + x.p.price * x.qty, 0); let shipping = subtotal ? 199 : 0; return `<div class="page-wrap">${head("YOUR BUILD IS COMING TOGETHER", "Your cart.", "Review your parts before you move to checkout.", "Cart")}<div class="cart-layout">
        <div class="cart-list">${items.length ? items.map(({ p, qty }) => `<div class="cart-item">
        <img src="${p.image}" alt="${p.name}">
        <div>
        <span class="pill ${p.type === "used" ? "used" : "new"}" style="position:static">${p.type === "used" ? "PRE-OWNED" : "NEW"}</span>
        <h3>${p.name}</h3>
        <p>${p.brand} · ${p.spec}</p>
        <div class="qty-control">
        <button data-qty="${p.id}" data-delta="-1">−</button>
        <span>${qty}</span>
        <button data-qty="${p.id}" data-delta="1">+</button>
        </div>
        </div>
        <div class="cart-item-price">${rupees(p.price * qty)}<button class="remove-btn" data-remove="${p.id}">Remove</button>
        </div>
        </div>`).join("") : `<div class="empty-state" style="border:0">
        <div style="font-size:38px">♧</div>
        <h3>Your cart is taking a breather.</h3>
        <p>Add a few components and they'll show up here.</p>
        <button class="btn btn-primary" data-route="new-parts">Explore hardware ↗</button>
        </div>`}</div>
        <aside class="summary-card">
        <h3>Order summary</h3>
        <div class="summary-line">
        <span>Subtotal (${items.reduce((s, x) => s + x.qty, 0)} items)</span>
        <span>${rupees(subtotal)}</span>
        </div>
        <div class="summary-line">
        <span>Estimated shipping</span>
        <span>${subtotal ? rupees(shipping) : "—"}</span>
        </div>
        <div class="summary-line">
        <span>Taxes</span>
        <span>Calculated at checkout</span>
        </div>
        <div class="summary-line total">
        <span>Estimated total</span>
        <span>${rupees(subtotal + shipping)}</span>
        </div>
        <button class="btn btn-primary" ${items.length ? "" : "disabled"} id="checkout-start">Continue to checkout ↗</button>
        <button class="btn btn-secondary" data-route="new-parts">Keep shopping</button>
        <p class="summary-note">You can browse and keep a guest cart. Sign in is required at checkout; the server recalculates the total before payment.</p>
        </aside>
        </div>
        </div>`; }
function checkout() {
    if (!state.currentUser) {
        state.afterAuth = "checkout";
        return signInPage();
    }
    if (!state.cart.length)
        return `<div class="page-wrap">${head("CHECKOUT", "Your cart is empty.", "Add a product before starting checkout.", "Delivery")}<button class="btn btn-primary" data-route="new-parts">Browse products</button>
        </div>`;
    const saved = state.checkoutInfo;
    return `<div class="page-wrap">${head("SECURE CHECKOUT", "Delivery details.", "Enter where your hardware should be delivered. Payment is handled on its own page.", "Delivery")}<div class="checkout-layout">
        <form class="checkout-form" id="checkout-form">
        <h3>Delivery information</h3>
        <p style="color:var(--muted);font-size:11px">Signed in as ${escapeHtml(state.currentUser.email)}.</p>
        <div class="form-grid">
        <div class="field">
        <label>Full name *</label>
        <input name="name" required value="${escapeHtml(saved.name || state.currentUser.name || "")}" placeholder="Your name">
        </div>
        <div class="field">
        <label>Email address *</label>
        <input name="email" type="email" required value="${escapeHtml(saved.email || state.currentUser.email || "")}" placeholder="you@example.com">
        </div>
        <div class="field full">
        <label>Address *</label>
        <input name="address" required maxlength="250" value="${escapeHtml(saved.address || "")}" placeholder="House, street, area">
        </div>
        <div class="field">
        <label>City *</label>
        <input name="city" required value="${escapeHtml(saved.city || "")}" placeholder="City">
        </div>
        <div class="field">
        <label>PIN code *</label>
        <input name="pin" inputmode="numeric" pattern="[0-9]{6}" required value="${escapeHtml(saved.pin || "")}" placeholder="6-digit PIN">
        </div>
        <div class="field full">
        <label>Phone number *</label>
        <input name="phone" type="tel" pattern="[0-9+() -]{10,16}" required value="${escapeHtml(saved.phone || "")}" placeholder="Contact number">
        </div>
        </div>
        <div class="form-actions">
        <button class="btn btn-ghost" type="button" data-route="cart">Back to cart</button>
        <button class="btn btn-primary" type="submit">Continue to payment →</button>
        </div>
        </form>${orderSummary()}</div>
        </div>`;
}
function orderSummary() {
    const items = state.cart.map(ci => ({ ...ci, p: products.find(p => p.id === ci.id) })).filter(x => x.p);
    const subtotal = items.reduce((sum, item) => sum + item.p.price * item.qty, 0);
    const shipping = subtotal ? 199 : 0;
    return `<aside class="summary-card">
        <h3>Order summary</h3>${items.map(({ p, qty }) => `<div class="summary-line">
        <span>${escapeHtml(p.name)} × ${qty}</span>
        <span>${rupees(p.price * qty)}</span>
        </div>`).join("")}<div class="summary-line">
        <span>Shipping</span>
        <span>${subtotal ? rupees(shipping) : "—"}</span>
        </div>
        <div class="summary-line total">
        <span>Estimated total</span>
        <span>${rupees(subtotal + shipping)}</span>
        </div>
        <p class="summary-note">The server recalculates prices before creating a payment order.</p>
        </aside>`;
}
function paymentPage() {
    if (!state.currentUser) {
        state.afterAuth = "payment";
        return signInPage();
    }
    if (!state.cart.length)
        return `<div class="page-wrap">${head("PAYMENT", "Your cart is empty.", "Add products before paying.", "Payment")}<button class="btn btn-primary" data-route="new-parts">Browse products</button>
        </div>`;
    if (!state.checkoutInfo.address)
        return `<div class="page-wrap">${head("PAYMENT", "Delivery details needed.", "Complete delivery information before opening payment.", "Payment")}<button class="btn btn-primary" data-route="checkout">Enter delivery details</button>
        </div>`;
    return `<div class="page-wrap">${head("SECURE PAYMENT", "One last step.", "Pay securely through Razorpay checkout. This project should use Razorpay TEST keys during development.", "Payment")}<div class="checkout-layout">
        <section class="checkout-form">
        <h3>Payment</h3>
        <div class="payment-demo">Razorpay checkout will open after you continue. Do not enter real card details while using test credentials.</div>
        <p style="color:var(--muted);font-size:12px">Delivery to: <strong>${escapeHtml(state.checkoutInfo.name)}</strong>
        <br>${escapeHtml(state.checkoutInfo.address)}, ${escapeHtml(state.checkoutInfo.city)} ${escapeHtml(state.checkoutInfo.pin)}<br>${escapeHtml(state.checkoutInfo.email)}</p>
        <div class="form-actions">
        <button class="btn btn-ghost" data-route="checkout">Back to delivery</button>
        <button class="btn btn-primary" id="start-payment">Pay securely ↗</button>
        </div>
        <p id="payment-message" class="summary-note" role="status">
        </p>
        </section>${orderSummary()}</div>
        </div>`;
}
function signInPage() {
    return `<div class="page-wrap">${head("WELCOME BACK", "Sign in to Rigora.", "You can browse the marketplace as a guest. Sign in is needed only to place an order.", "Sign in")}<form id="signin-form" class="form-card">
        <div class="form-section">
        <h3>Customer sign in</h3>
        <p>Use the email address and password for your Rigora account.</p>
        <div class="form-grid">
        <div class="field full">
        <label>Email address *</label>
        <input name="email" type="email" autocomplete="email" required placeholder="you@example.com">
        </div>
        <div class="field full">
        <label>Password *</label>
        <input name="password" type="password" autocomplete="current-password" minlength="8" required placeholder="At least 8 characters">
        </div>
        </div>
        <p id="auth-message" class="summary-note" role="status">
        </p>
        </div>
        <div class="form-actions">
        <button type="button" class="btn btn-ghost" data-route="home">Continue as guest</button>
        <button type="submit" class="btn btn-primary">Sign in</button>
        </div>
        <p class="summary-note">New to Rigora? <a href="#signup" style="color:var(--violet)">Create an account</a>
        </p>
        </form>
        </div>`;
}
function signUpPage() {
    return `<div class="page-wrap">${head("JOIN RIGORA", "Create your account.", "Registration is only needed when you are ready to buy. Browsing remains open to everyone.", "Sign up")}<form id="signup-form" class="form-card">
        <div class="form-section">
        <h3>Customer registration</h3>
        <p>Your password is securely hashed by the backend and is never stored as plain text.</p>
        <div class="form-grid">
        <div class="field full">
        <label>Full name *</label>
        <input name="name" autocomplete="name" minlength="2" maxlength="80" required placeholder="Your full name">
        </div>
        <div class="field full">
        <label>Email address *</label>
        <input name="email" type="email" autocomplete="email" required placeholder="you@example.com">
        </div>
        <div class="field full">
        <label>Password *</label>
        <input name="password" type="password" autocomplete="new-password" minlength="8" maxlength="128" required placeholder="Choose at least 8 characters">
        </div>
        </div>
        <p id="auth-message" class="summary-note" role="status">
        </p>
        </div>
        <div class="form-actions">
        <button type="button" class="btn btn-ghost" data-route="home">Continue as guest</button>
        <button type="submit" class="btn btn-primary">Create account</button>
        </div>
        <p class="summary-note">Already registered? <a href="#signin" style="color:var(--violet)">Sign in</a>
        </p>
        </form>
        </div>`;
}
function orderSuccess() {
    return `<div class="page-wrap">
        <div class="status-banner">
        <div class="big-check">✓</div>
        <h2>Payment verified</h2>
        <p>Your payment has been verified by the server.</p>
        <p>Order: <strong>${escapeHtml(state.lastOrderNumber || "Confirmed")}</strong>
        </p>
        <button class="btn btn-primary" data-route="account">View account</button> <button class="btn btn-secondary" data-route="home">Back to home</button>
        </div>
        </div>`;
}
function account() {
    if (!state.currentUser)
        return `<div class="page-wrap">${head("YOUR RIGORA SPACE", "Your account.", "Sign in to see your account, or keep browsing without an account.", "Account")}<div class="form-card">
        <h3>Welcome to Rigora</h3>
        <p style="color:var(--muted)">You do not need an account to explore products or use the PC builder.</p>
        <div class="button-row">
        <button class="btn btn-primary" data-route="signin">Sign in</button>
        <button class="btn btn-secondary" data-route="signup">Create account</button>
        <button class="btn btn-ghost" data-route="home">Continue as guest</button>
        </div>
        </div>
        </div>`;
    return `<div class="page-wrap">${head("YOUR RIGORA SPACE", "Your dashboard.", "Manage your Rigora account and orders.", "Account")}<div class="dashboard-grid">
        <aside class="dash-nav">
        <button class="active" data-dash="overview">▦ Overview</button>
        <button data-dash="orders">♧ My orders</button>
        <button data-dash="listings">▣ My listings</button>
        <button data-dash="wishlist">♡ Wishlist (${state.wishlist.length})</button>
        <button id="signout-button">↪ Sign out</button>
        </aside>
        <section class="dash-panel" id="dashboard-content">
        <h3>Welcome, ${escapeHtml(state.currentUser.name)}.</h3>
        <p style="color:var(--muted);font-size:12px">Signed in as ${escapeHtml(state.currentUser.email)}.</p>
        <div class="button-row">
        <button class="btn btn-primary" data-route="new-parts">Find your next upgrade</button>
        <button class="btn btn-secondary" data-route="cart">Open cart</button>
        </div>
        </section>
        </div>
        </div>`;
}
function wishlist() { let list = products.filter(p => state.wishlist.includes(p.id)); return `<div class="page-wrap">${head("SAVED FOR LATER", "Your wishlist.", "Keep track of the parts you want to come back to.", "Wishlist")}<section class="section" style="padding-top:0">${list.length ? `<div class="product-grid">${list.map(productCard).join("")}</div>` : `<div class="empty-state">
        <div style="font-size:36px">♡</div>
        <h3>No saved parts yet</h3>
        <p>Tap the heart on any product to save it here.</p>
        <button class="btn btn-primary" data-route="new-parts">Explore products</button>
        </div>`}</section>
        </div>`; }
function genericPage(route) { let data = { help: ["HELP CENTRE", "How can we help?", "Find answers about buying, selling, and using this demo marketplace."], shipping: ["DELIVERY", "Shipping & returns", "Production shipping, delivery, and return terms must be configured by the marketplace operator."], safety: ["BUYER SAFETY", "Buy with confidence.", "For pre-owned hardware, review seller details, request test evidence, and agree on return terms before payment."], contact: ["GET IN TOUCH", "Talk to the Rigora team.", "This is a demo project. Add a real support inbox and contact workflow before launch."], privacy: ["LEGAL", "Privacy policy", "Replace this placeholder with a reviewed privacy policy describing real data collection, processing, retention, and user rights."], terms: ["LEGAL", "Terms & conditions", "Replace this placeholder with reviewed marketplace terms before accepting real users or payments."] }[route] || ["RIGORA", "Page coming soon.", "This section is part of the planned marketplace experience."]; return `<div class="page-wrap">${head(data[0], data[1], data[2], data[1])}<div class="form-card">
        <h3>${data[1]}</h3>
        <p style="color:var(--muted)">${data[2]}</p>
        <button class="btn btn-primary" data-route="home">Back to home</button>
        </div>
        </div>`; }
function escapeHtml(s) { return String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function render() {
    let raw = location.hash.slice(1) || "home";
    let [route, arg] = raw.split("/");
    const app = document.getElementById("app");
    if ((route === "checkout" || route === "payment") && !state.currentUser) {
        state.afterAuth = route;
        app.innerHTML = signInPage();
        wirePage("signin");
        return;
    }
    if (route === "home")
        app.innerHTML = home();
    else if (route === "new-parts" || route === "used-parts")
        app.innerHTML = catalog(route);
    else if (route === "product")
        app.innerHTML = detail(arg);
    else if (route === "sell")
        app.innerHTML = sell();
    else if (route === "pc-builder")
        app.innerHTML = builder();
    else if (route === "cart")
        app.innerHTML = cart();
    else if (route === "checkout")
        app.innerHTML = checkout();
    else if (route === "payment")
        app.innerHTML = paymentPage();
    else if (route === "signin")
        app.innerHTML = signInPage();
    else if (route === "signup")
        app.innerHTML = signUpPage();
    else if (route === "order-success")
        app.innerHTML = orderSuccess();
    else if (route === "account")
        app.innerHTML = account();
    else if (route === "wishlist")
        app.innerHTML = wishlist();
    else
        app.innerHTML = genericPage(route);
    document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === route));
    updateCount();
    window.scrollTo({ top: 0, behavior: "smooth" });
    wirePage(route);
}
function wirePage(route) {
    document.querySelectorAll("[data-route]").forEach(b => b.addEventListener("click", () => go(b.dataset.route)));
    document.querySelectorAll("[data-product]").forEach(el => el.addEventListener("click", () => go("product/" + el.dataset.product)));
    document.querySelectorAll("[data-add]").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); addCart(b.dataset.add); }));
    document.querySelectorAll("[data-wish]").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); toggleWish(b.dataset.wish); }));
    document.querySelectorAll("[data-buy]").forEach(b => b.addEventListener("click", () => { addCart(b.dataset.buy, true); }));
    document.querySelectorAll("[data-category]").forEach(a => a.addEventListener("click", () => { state.filters.category = a.dataset.category; state.filters.brand = ""; state.filters.condition = ""; state.filters.min = ""; state.filters.max = ""; }));
    const sort = document.getElementById("sort-select");
    if (sort)
        sort.addEventListener("change", () => { state.sort = sort.value; render(); });
    document.querySelectorAll("[data-filter-category]").forEach(c => c.addEventListener("change", () => { state.filters.category = c.checked ? c.dataset.filterCategory : ""; render(); }));
    document.querySelectorAll("[data-filter-brand]").forEach(c => c.addEventListener("change", () => { state.filters.brand = c.checked ? c.dataset.filterBrand : ""; render(); }));
    document.querySelectorAll("[data-filter-condition]").forEach(c => c.addEventListener("change", () => { state.filters.condition = c.checked ? c.dataset.filterCondition : ""; render(); }));
    const clear = () => { state.filters = { category: "", brand: "", condition: "", min: "", max: "" }; state.query = ""; render(); };
    document.getElementById("clear-filters")?.addEventListener("click", clear);
    document.getElementById("empty-clear")?.addEventListener("click", clear);
    document.getElementById("apply-price")?.addEventListener("click", () => { state.filters.min = document.getElementById("min-price").value; state.filters.max = document.getElementById("max-price").value; render(); });
    document.getElementById("mobile-filter")?.addEventListener("click", () => document.getElementById("filter-panel").classList.toggle("collapsed"));
    document.querySelectorAll("[data-qty]").forEach(b => b.addEventListener("click", () => {
        let x = state.cart.find(x => x.id === b.dataset.qty);
        if (x) {
            x.qty += Number(b.dataset.delta);
            if (x.qty < 1)
                state.cart = state.cart.filter(c => c.id !== x.id);
            save();
            render();
        }
    }));
    document.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => { state.cart = state.cart.filter(x => x.id !== b.dataset.remove); save(); render(); toast("Item removed from cart"); }));
    document.getElementById("checkout-start")?.addEventListener("click", () => {
        if (!state.currentUser) {
            state.afterAuth = "checkout";
            go("signin");
            return;
        }
        go("checkout");
    });
    document.querySelectorAll("[data-build]").forEach(s => s.addEventListener("change", () => { state.build[s.dataset.build] = s.value; render(); }));
    document.getElementById("reset-build")?.addEventListener("click", () => { Object.keys(state.build).forEach(k => state.build[k] = ""); render(); });
    document.getElementById("build-to-cart")?.addEventListener("click", () => {
        let ids = Object.values(state.build).filter(Boolean);
        if (!ids.length) {
            toast("Choose at least one component first");
            return;
        }
        ids.forEach(id => {
            let existing = state.cart.find(x => x.id === id);
            if (existing)
                existing.qty++;
            else
                state.cart.push({ id, qty: 1 });
        });
        save();
        toast("Selected parts added to cart");
        go("cart");
    });
    document.getElementById("sell-images")?.addEventListener("change", e => {
        let box = document.getElementById("upload-preview");
        box.innerHTML = "";
        [...e.target.files].slice(0, 6).forEach(f => {
            if (!f.type.startsWith("image/"))
                return;
            let img = document.createElement("img");
            img.src = URL.createObjectURL(f);
            img.alt = "Selected product photo";
            box.appendChild(img);
        });
    });
    document.getElementById("sell-form")?.addEventListener("submit", e => { e.preventDefault(); let fd = new FormData(e.target); let listing = Object.fromEntries(fd.entries()); listing.id = "listing-" + Date.now(); listing.status = "Pending review"; let all = load("rigora-listings", []); all.unshift(listing); localStorage.setItem("rigora-listings", JSON.stringify(all)); showModal("Listing submitted for demo review", "Your listing has been saved in this browser as a pending demo listing. Real marketplace publishing requires a backend and moderation.", "View dashboard", "account"); });
    document.getElementById("checkout-form")?.addEventListener("submit", e => {
        e.preventDefault();
        state.checkoutInfo = Object.fromEntries(new FormData(e.target).entries());
        go("payment");
    });
    document.getElementById("signin-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const message = document.getElementById("auth-message");
        const submit = e.target.querySelector('button[type="submit"]');
        submit.disabled = true;
        submit.textContent = "Signing in…";
        try {
            const result = await apiRequest("/api/auth/login", { method: "POST", body: Object.fromEntries(new FormData(e.target).entries()) });
            state.currentUser = result.user;
            updateAccountButton();
            toast("Welcome back!");
            go(state.afterAuth || "account");
        }
        catch (error) {
            message.textContent = error.message;
        }
        finally {
            submit.disabled = false;
            submit.textContent = "Sign in";
        }
    });
    document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const message = document.getElementById("auth-message");
        const submit = e.target.querySelector('button[type="submit"]');
        submit.disabled = true;
        submit.textContent = "Creating account…";
        try {
            const result = await apiRequest("/api/auth/register", { method: "POST", body: Object.fromEntries(new FormData(e.target).entries()) });
            state.currentUser = result.user;
            updateAccountButton();
            toast("Your account is ready!");
            go(state.afterAuth || "account");
        }
        catch (error) {
            message.textContent = error.message;
        }
        finally {
            submit.disabled = false;
            submit.textContent = "Create account";
        }
    });
    document.getElementById("signout-button")?.addEventListener("click", async () => {
        try {
            await apiRequest("/api/auth/logout", { method: "POST", body: {} });
        }
        catch (error) {
            toast(error.message);
        }
        state.currentUser = null;
        updateAccountButton();
        toast("Signed out");
        go("home");
    });
    document.getElementById("start-payment")?.addEventListener("click", startPayment);
    document.querySelectorAll("[data-dash]").forEach(button => button.addEventListener("click", async () => {
        document.querySelectorAll("[data-dash]").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        const area = document.getElementById("dashboard-content");
        area.innerHTML = '<p style="color:var(--muted)">Loading your account information…</p>';
        if (button.dataset.dash === "orders") {
            try {
                const result = await apiRequest("/api/payments/my-orders");
                const orders = result.orders || [];
                area.innerHTML = '<h3>My orders</h3>' + (orders.length
                    ? '<div class="table-wrap"><table><thead><tr><th>Order</th><th>Date</th><th>Total</th><th>Status</th></tr></thead><tbody>' + orders.map(order => '<tr><td>' + escapeHtml(order.orderNumber) + '</td><td>' + escapeHtml(new Date(order.createdAt).toLocaleDateString("en-IN")) + '</td><td>' + rupees(order.totalPaise / 100) + '</td><td><span class="pill">' + escapeHtml(order.status.replaceAll("_", " ")) + '</span></td></tr>').join("") + '</tbody></table></div>'
                    : '<p style="color:var(--muted)">No orders found for this account yet.</p>');
            }
            catch (error) {
                area.innerHTML = '<h3>My orders</h3><p style="color:var(--muted)">' + escapeHtml(error.message) + '</p>';
            }
        }
        else if (button.dataset.dash === "listings") {
            const listings = load("rigora-listings", []);
            area.innerHTML = '<h3>My listings</h3>' + (listings.length
                ? '<div class="table-wrap"><table><thead><tr><th>Product</th><th>Price</th><th>Status</th></tr></thead><tbody>' + listings.map(listing => '<tr><td>' + escapeHtml(listing.name) + '</td><td>' + rupees(listing.price) + '</td><td><span class="pill">' + escapeHtml(listing.status) + '</span></td></tr>').join("") + '</tbody></table></div>'
                : '<p style="color:var(--muted)">You have not listed a component yet. Demo listings are still saved only in this browser.</p><button class="btn btn-primary" data-route="sell">Create a listing</button>');
        }
        else if (button.dataset.dash === "wishlist") {
            area.innerHTML = '<h3>Saved parts</h3><p style="color:var(--muted)">You have ' + state.wishlist.length + ' saved product(s) in this browser.</p><button class="btn btn-primary" data-route="wishlist">Open wishlist</button>';
        }
        else {
            let orderCount = 0;
            try {
                orderCount = (await apiRequest("/api/payments/my-orders")).orders.length;
            }
            catch { /* Account overview can still render when order history is unavailable. */ }
            area.innerHTML = '<div class="dash-stats"><div class="dash-stat"><small>Orders</small><strong>' + orderCount + '</strong></div><div class="dash-stat"><small>Saved products</small><strong>' + state.wishlist.length + '</strong></div><div class="dash-stat"><small>Account</small><strong>Active</strong></div></div><h3>Welcome, ' + escapeHtml(state.currentUser.name) + '.</h3><p style="color:var(--muted);font-size:12px">Your account is stored in MongoDB. Wishlist and seller listings are currently browser-local.</p><div class="button-row"><button class="btn btn-primary" data-route="new-parts">Find your next upgrade</button><button class="btn btn-secondary" data-route="cart">Open cart</button></div>';
        }
        area.querySelectorAll("[data-route]").forEach(link => link.addEventListener("click", () => go(link.dataset.route)));
    }));
}
function addCart(id, buy = false) {
    let p = products.find(x => x.id === id);
    if (!p)
        return;
    let x = state.cart.find(x => x.id === id);
    if (x)
        x.qty++;
    else
        state.cart.push({ id, qty: 1 });
    save();
    toast(p.name + " added to cart");
    if (buy)
        go("cart");
}
function toggleWish(id) {
    if (state.wishlist.includes(id)) {
        state.wishlist = state.wishlist.filter(x => x !== id);
        toast("Removed from wishlist");
    }
    else {
        state.wishlist.push(id);
        toast("Saved to wishlist");
    }
    save();
    render();
}
function showModal(title, desc, action, route) {
    let old = document.querySelector(".modal-backdrop");
    old?.remove();
    let b = document.createElement("div");
    b.className = "modal-backdrop";
    b.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><span class="eyebrow">RIGORA MARKETPLACE</span><h2>${escapeHtml(title)}</h2><p>${escapeHtml(desc)}</p><div class="modal-actions"><button class="btn btn-secondary" id="modal-close">Close</button><button class="btn btn-primary" id="modal-action">${escapeHtml(action)}</button></div></div>`;
    document.body.appendChild(b);
    b.querySelector("#modal-close").onclick = () => b.remove();
    b.querySelector("#modal-action").onclick = () => { b.remove(); go(route); };
    b.addEventListener("click", e => {
        if (e.target === b)
            b.remove();
    });
}
async function apiRequest(url, options = {}) {
    const response = await fetch(url, { method: options.method || "GET", credentials: "same-origin", headers: { "Content-Type": "application/json", ...(options.headers || {}) }, body: options.body === undefined ? undefined : JSON.stringify(options.body) });
    let data = {};
    try {
        data = await response.json();
    }
    catch { }
    if (!response.ok)
        throw new Error(data.message || `Request failed (${response.status}). Is the server running?`);
    return data;
}
function updateAccountButton() {
    const button = document.getElementById("account-shortcut");
    if (!button)
        return;
    button.textContent = state.currentUser ? (state.currentUser.name || "R").trim().split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase() : "JD";
    button.title = state.currentUser ? `Account: ${state.currentUser.name}` : "Sign in or create account";
}
async function startPayment() {
    const button = document.getElementById("start-payment");
    const message = document.getElementById("payment-message");
    if (!state.currentUser) {
        state.afterAuth = "payment";
        go("signin");
        return;
    }
    if (typeof window.Razorpay !== "function") {
        message.textContent = "Razorpay checkout script did not load. Check your internet connection and try again.";
        return;
    }
    button.disabled = true;
    button.textContent = "Preparing secure payment…";
    try {
        const created = await apiRequest("/api/payments/create-order", { method: "POST", body: { items: state.cart, delivery: state.checkoutInfo } });
        const checkout = new window.Razorpay({
            key: created.keyId, amount: created.amount, currency: created.currency, name: "Rigora Marketplace", description: `Order ${created.orderNumber}`, order_id: created.razorpayOrderId,
            prefill: created.customer, theme: { color: "#9b7bff" },
            handler: async function (paymentResult) {
                try {
                    const verified = await apiRequest("/api/payments/verify", { method: "POST", body: paymentResult });
                    state.lastOrderNumber = verified.orderNumber || created.orderNumber;
                    state.cart = [];
                    save();
                    go("order-success");
                }
                catch (error) {
                    message.textContent = `Payment may have been completed, but server verification failed: ${error.message}. Do not pay again yet; contact the site administrator and check the Razorpay dashboard.`;
                    button.disabled = false;
                    button.textContent = "Retry verification / payment support";
                }
            },
            modal: { ondismiss: function () { button.disabled = false; button.textContent = "Pay securely ↗"; message.textContent = "Payment window closed. No order is confirmed until the server verifies payment."; } }
        });
        checkout.on("payment.failed", function (result) { message.textContent = result.error?.description || "Payment failed. You can try again."; button.disabled = false; button.textContent = "Try payment again ↗"; });
        checkout.open();
    }
    catch (error) {
        message.textContent = error.message;
        button.disabled = false;
        button.textContent = "Pay securely ↗";
    }
}
async function initializeApp() {
    try {
        const result = await apiRequest("/api/auth/me");
        state.currentUser = result.user || null;
    }
    catch (error) {
        console.warn("Rigora API is not ready yet:", error.message);
    }
    updateAccountButton();
    if (!location.hash)
        history.replaceState(null, "", location.pathname + location.search + "#home");
    render();
}
function doSearch(value) { state.query = value.trim(); state.filters = { category: "", brand: "", condition: "", min: "", max: "" }; go("new-parts"); }
document.getElementById("search-form").addEventListener("submit", e => { e.preventDefault(); doSearch(document.getElementById("global-search").value); });
document.getElementById("mobile-search-form").addEventListener("submit", e => { e.preventDefault(); doSearch(document.getElementById("mobile-search-input").value); });
document.getElementById("wishlist-shortcut").addEventListener("click", () => go("wishlist"));
document.getElementById("account-shortcut").addEventListener("click", () => go("account"));
document.getElementById("newsletter-form").addEventListener("submit", e => { e.preventDefault(); document.getElementById("newsletter-message").textContent = "Thanks — newsletter demo signup complete."; e.target.reset(); toast("Thanks for subscribing!"); });
window.addEventListener("hashchange", render);
initializeApp();
