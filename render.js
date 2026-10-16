// ЛАБОРАТОРНАЯ 5: ОТОБРАЖЕНИЕ + ФИЛЬТРЫ 
// Фильтры по категориям (ЛАБА 5)
const filters = {
    soup:    [{ kind: "fish", label: "Рыбный" }, { kind: "meat", label: "Мясной" }, { kind: "veg", label: "Вегетарианский" }],
    main:    [{ kind: "fish", label: "Рыбное" }, { kind: "meat", label: "Мясное" }, { kind: "veg", label: "Вегетарианское" }],
    salad:   [{ kind: "fish", label: "Рыбный" }, { kind: "meat", label: "Мясной" }, { kind: "veg", label: "Вегетарианский" }],
    drink:   [{ kind: "cold", label: "Холодный" }, { kind: "hot", label: "Горячий" }],
    dessert: [{ kind: "small", label: "Маленькая порция" }, { kind: "medium", label: "Средняя порция" }, { kind: "big", label: "Большая порция" }]
};
// Создать карточку блюда (ЛАБА 4 — без изменений)
function createDishCard(dish) {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.setAttribute("data-dish", dish.keyword);
    card.setAttribute("data-kind", dish.kind);   // ← ЛАБА 5

    const img = document.createElement("img");
    img.src = dish.image;
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
    button.textContent = "Добавить";

    card.append(img, name, weight, price, button);
    return card;
}

// Создать блок с фильтрами (ЛАБА 5) 
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

// Отобразить блюда категории (ЛАБА 4 + ЛАБА 5 фильтры)
function renderDishes(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // ЛАБА 5: добавляем фильтры ПЕРЕД сеткой
    const section = container.parentElement;
    const existingFilters = section.querySelector(".filters");
    if (!existingFilters) {
        section.insertBefore(createFilters(category), container);
    }

    // Очищаем контейнер перед отрисовкой
    container.innerHTML = "";

    // Фильтр + сортировка (ЛАБА 4)
    const filtered = dishes.filter(d => d.category === category);
    filtered.sort((a, b) => a.name.localeCompare(b.name, "ru"));

    filtered.forEach(dish => container.appendChild(createDishCard(dish)));
}

// Слушатель кликов по фильтрам (ЛАБА 5)
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

    // Переключаем active
    const isActive = btn.classList.contains("active");

    // Снимаем active со всех кнопок этой категории
    container.parentElement.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));

    // Очищаем
    container.innerHTML = "";

    // Определяем какие блюда показать
    let toShow;
    if (isActive) {
        // Если кликнули по активной — показываем все
        toShow = dishes.filter(d => d.category === category);
    } else {
        // Иначе — только этого типа
        btn.classList.add("active");
        toShow = dishes.filter(d => d.category === category && d.kind === kind);
    }

    toShow.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    toShow.forEach(dish => container.appendChild(createDishCard(dish)));
});

// Запуск (ЛАБА 4 + 2 новые категории)
document.addEventListener("DOMContentLoaded", () => {
    renderDishes("soup", "soups-grid");
    renderDishes("main", "mains-grid");
    renderDishes("salad", "salads-grid");      // ЛАБА 5
    renderDishes("drink", "drinks-grid");
    renderDishes("dessert", "desserts-grid");  // ЛАБА 5
});