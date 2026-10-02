// ЛАБОРАТОРНАЯ 4: ОТОБРАЖЕНИЕ БЛЮД
// Создать карточку блюда
function createDishCard(dish) {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.setAttribute("data-dish", dish.keyword);  // ← data-атрибут

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

// Отобразить блюда категории
function renderDishes(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. Фильтр по категории
    const filtered = dishes.filter(d => d.category === category);

    // 2. Сортировка по алфавиту
    filtered.sort((a, b) => a.name.localeCompare(b.name, "ru"));

    // 3. Добавляем карточки
    filtered.forEach(dish => container.appendChild(createDishCard(dish)));
}

// Запуск после загрузки страницы
document.addEventListener("DOMContentLoaded", () => {
    renderDishes("soup", "soups-grid");
    renderDishes("main", "mains-grid");
    renderDishes("drink", "drinks-grid");
});