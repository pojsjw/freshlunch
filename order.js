// ЛАБОРАТОРНАЯ 4 + 5: ЗАКАЗ

let selectedDishes = {
    soup: null,
    main: null,
    salad: null,     // ЛАБА 5
    drink: null,
    dessert: null    // ЛАБА 5
};

// Найти блюдо по keyword
function findDish(keyword) {
    return dishes.find(d => d.keyword === keyword);
}

// Обновить блок "Ваш заказ"
function updateOrderDisplay() {
    const emptyMsg = document.getElementById("order-empty");
    const itemsBlock = document.getElementById("order-items");
    const totalBlock = document.getElementById("order-total");

    const hasAny = selectedDishes.soup || selectedDishes.main ||
                   selectedDishes.salad || selectedDishes.drink ||
                   selectedDishes.dessert;

    if (!hasAny) {
        emptyMsg.style.display = "block";
        itemsBlock.style.display = "none";
        totalBlock.style.display = "none";
        return;
    }

    emptyMsg.style.display = "none";
    itemsBlock.style.display = "block";
    totalBlock.style.display = "block";

    let total = 0;
    let html = "";

    // Суп
    if (selectedDishes.soup) {
        html += `<p><strong>Суп:</strong> ${selectedDishes.soup.name} — ${selectedDishes.soup.price} руб.</p>`;
        total += selectedDishes.soup.price;
    } else {
        html += `<p><strong>Суп:</strong> Блюдо не выбрано</p>`;
    }

    // Главное блюдо
    if (selectedDishes.main) {
        html += `<p><strong>Главное блюдо:</strong> ${selectedDishes.main.name} — ${selectedDishes.main.price} руб.</p>`;
        total += selectedDishes.main.price;
    } else {
        html += `<p><strong>Главное блюдо:</strong> Блюдо не выбрано</p>`;
    }

    // Салат (ЛАБА 5)
    if (selectedDishes.salad) {
        html += `<p><strong>Салат:</strong> ${selectedDishes.salad.name} — ${selectedDishes.salad.price} руб.</p>`;
        total += selectedDishes.salad.price;
    } else {
        html += `<p><strong>Салат:</strong> Блюдо не выбрано</p>`;
    }

    // Напиток
    if (selectedDishes.drink) {
        html += `<p><strong>Напиток:</strong> ${selectedDishes.drink.name} — ${selectedDishes.drink.price} руб.</p>`;
        total += selectedDishes.drink.price;
    } else {
        html += `<p><strong>Напиток:</strong> Напиток не выбран</p>`;
    }

    // Десерт (ЛАБА 5)
    if (selectedDishes.dessert) {
        html += `<p><strong>Десерт:</strong> ${selectedDishes.dessert.name} — ${selectedDishes.dessert.price} руб.</p>`;
        total += selectedDishes.dessert.price;
    } else {
        html += `<p><strong>Десерт:</strong> Блюдо не выбрано</p>`;
    }

    itemsBlock.innerHTML = html;
    document.getElementById("total-value").textContent = total + " руб.";

    // Скрытые поля (ЛАБА 4 + 5)
    document.getElementById("hidden-soup").value    = selectedDishes.soup    ? selectedDishes.soup.keyword    : "";
    document.getElementById("hidden-main").value    = selectedDishes.main    ? selectedDishes.main.keyword    : "";
    document.getElementById("hidden-salad").value   = selectedDishes.salad   ? selectedDishes.salad.keyword   : ""; // ЛАБА 5
    document.getElementById("hidden-drink").value   = selectedDishes.drink   ? selectedDishes.drink.keyword   : "";
    document.getElementById("hidden-dessert").value = selectedDishes.dessert ? selectedDishes.dessert.keyword : ""; // ЛАБА 5
}

// Клик по карточке
document.addEventListener("click", (event) => {
    const card = event.target.closest(".dish-card");
    if (!card) return;

    const keyword = card.getAttribute("data-dish");
    const dish = findDish(keyword);
    if (!dish) return;

    selectedDishes[dish.category] = dish;
    updateOrderDisplay();
});