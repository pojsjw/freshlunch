// ================= ЛАБОРАТОРНАЯ 5: ФИЛЬТРЫ =================
const filters = {
    soup:    [{ kind: "fish", label: "Рыбный" }, { kind: "meat", label: "Мясной" }, { kind: "veg", label: "Вегетарианский" }],
    main:    [{ kind: "fish", label: "Рыбное" }, { kind: "meat", label: "Мясное" }, { kind: "veg", label: "Вегетарианское" }],
    salad:   [{ kind: "fish", label: "Рыбный" }, { kind: "meat", label: "Мясной" }, { kind: "veg", label: "Вегетарианский" }],
    drink:   [{ kind: "cold", label: "Холодный" }, { kind: "hot", label: "Горячий" }],
    dessert: [{ kind: "small", label: "Маленькая порция" }, { kind: "medium", label: "Средняя порция" }, { kind: "big", label: "Большая порция" }]
};

// ================= ЛАБОРАТОРНАЯ 4 + 8: СОЗДАНИЕ КАРТОЧКИ =================
function createDishCard(dish) {
    const card = document.createElement("div");
    card.className = "dish-card";
    
    // ЛАБА 8: Если блюдо уже в корзине — подсвечиваем его рамкой
    if (typeof selectedDishes !== "undefined" && selectedDishes[dish.category] && selectedDishes[dish.category].keyword === dish.keyword) {
        card.classList.add("selected");
    }

    card.setAttribute("data-dish", dish.keyword);
    card.setAttribute("data-kind", dish.kind); // ЛАБА 5

    const img = document.createElement("img");
    // ЛАБА 7/8: Если пришла ссылка с API (не http), ставим заглушку
    img.src = dish.image.startsWith("http") ? dish.image : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";
    img.alt = dish.name;

    const name = document.createElement("p");
    name.className = "dish-name";
    name.textContent = dish.name;

    const weight = document.createElement("p");
    weight.className = "dish-weight";
    weight.textContent = dish.count;

    const price = document.createElement("p");
    price.className = "dish-price";
    price.textContent = dish.price + " руб.";

    const button = document.createElement("button");
    button.className = "add-btn";
    
    // ЛАБА 8: Если блюдо в корзине — меняем кнопку на "Удалить"
    if (typeof selectedDishes !== "undefined" && selectedDishes[dish.category] && selectedDishes[dish.category].keyword === dish.keyword) {
        button.textContent = "Удалить";
        button.classList.add("delete-btn");
    } else {
        button.textContent = "Добавить";
    }

    card.append(img, name, weight, price, button);
    return card;
}

// ================= ЛАБОРАТОРНАЯ 5: ФИЛЬТРЫ =================
function createFilters(category) {
    const wrap = document.createElement("div");
    wrap.className = "filters";

    filters[category].forEach(f => {
        const btn = document.createElement("button");
        btn.className = "filter-btn";
        btn.textContent = f.label;
        btn.setAttribute("data-kind", f.kind);
        btn.setAttribute("data-category", category);
        wrap.appendChild(btn);
    });

    return wrap;
}

// ================= ЛАБОРАТОРНАЯ 4 + 5: ОТРИСОВКА КАТЕГОРИИ =================
function renderDishes(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const section = container.parentElement;
    const existingFilters = section.querySelector(".filters");
    if (!existingFilters) {
        section.insertBefore(createFilters(category), container);
    }

    container.innerHTML = "";
    const filtered = dishes.filter(d => d.category === category);
    filtered.sort((a, b) => a.name.localeCompare(b.name, "ru"));

    filtered.forEach(dish => container.appendChild(createDishCard(dish)));
}

// ================= ЛАБОРАТОРНАЯ 5: СЛУШАТЕЛЬ ФИЛЬТРОВ =================
document.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-btn");
    if (!btn) return;

    const kind = btn.getAttribute("data-kind");
    const category = btn.getAttribute("data-category");
    const container = document.querySelector(`#${category === "soup" ? "soups-grid" :
                                                       category === "main" ? "mains-grid" :
                                                       category === "salad" ? "salads-grid" :
                                                       category === "drink" ? "drinks-grid" :
                                                       "desserts-grid"}`);

    const isActive = btn.classList.contains("active");
    container.parentElement.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    container.innerHTML = "";

    let toShow;
    if (isActive) {
        toShow = dishes.filter(d => d.category === category);
    } else {
        btn.classList.add("active");
        toShow = dishes.filter(d => d.category === category && d.kind === kind);
    }

    toShow.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    toShow.forEach(dish => container.appendChild(createDishCard(dish)));
});


// ================= ЛАБОРАТОРНАЯ 7 + 8: ЗАПУСК =================

// Эта функция вызывается из dishes.js, когда данные пришли с API (ЛАБА 7)
function renderAllDishes() {
    renderDishes("soup", "soups-grid");
    renderDishes("main", "mains-grid");
    renderDishes("salad", "salads-grid");
    renderDishes("drink", "drinks-grid");
    renderDishes("dessert", "desserts-grid");
    
    // ЛАБА 8: После отрисовки включаем корзину и нижнюю плашку (из order.js)
    if (typeof initOrder === "function") {
        initOrder();
    }
}

// Запускаем загрузку при старте (ЛАБА 7)
document.addEventListener("DOMContentLoaded", () => {
    loadDishes(); // ← вызываем функцию из dishes.js
});