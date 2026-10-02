// ЛАБОРАТОРНАЯ 4: ВЫБОР БЛЮД И СТОИМОСТЬ
let selectedDishes = {
    soup: null,
    main: null,
    drink: null
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

    const hasAny = selectedDishes.soup || selectedDishes.main || selectedDishes.drink;

    // Ничего не выбрано
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

    // Напиток
    if (selectedDishes.drink) {
        html += `<p><strong>Напиток:</strong> ${selectedDishes.drink.name} — ${selectedDishes.drink.price} руб.</p>`;
        total += selectedDishes.drink.price;
    } else {
        html += `<p><strong>Напиток:</strong> Напиток не выбран</p>`;
    }

    itemsBlock.innerHTML = html;
    document.getElementById("total-value").textContent = total + " руб.";

    document.getElementById("hidden-soup").value = selectedDishes.soup ? selectedDishes.soup.keyword : "";
    document.getElementById("hidden-main").value = selectedDishes.main ? selectedDishes.main.keyword : "";
    document.getElementById("hidden-drink").value = selectedDishes.drink ? selectedDishes.drink.keyword : "";
}

// Клик по карточке
document.addEventListener("click", (event) => {
    const card = event.target.closest(".dish-card");
    if (!card) return;

    const keyword = card.getAttribute("data-dish");
    const dish = findDish(keyword);
    if (!dish) return;

    // Сохраняем блюдо в его категорию
    selectedDishes[dish.category] = dish;

    // Обновляем блок
    updateOrderDisplay();
});