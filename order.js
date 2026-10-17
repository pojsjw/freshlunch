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
// ЛАБОРАТОРНАЯ 6: ПРОВЕРКА КОМБО И УВЕДОМЛЕНИЯ

// Показать уведомление
function showNotification(message) {
    // Удаляем старое, если есть
    const old = document.querySelector(".notification-overlay");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.className = "notification-overlay";

    const box = document.createElement("div");
    box.className = "notification-box";

    const text = document.createElement("p");
    text.textContent = message;

    const btn = document.createElement("button");
    btn.textContent = "Окей";
    btn.addEventListener("click", () => overlay.remove());

    box.append(text, btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

// Проверка комбо при отправке формы
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        const s = selectedDishes.soup;
        const m = selectedDishes.main;
        const sal = selectedDishes.salad;
        const d = selectedDishes.drink;
        const des = selectedDishes.dessert;

        // 1. Ничего не выбрано
        if (!s && !m && !sal && !d && !des) {
            event.preventDefault();
            showNotification("Ничего не выбрано. Выберите блюда для заказа");
            return;
        }

        // 2. Выбраны все, кроме напитка
        if ((s || m || sal) && !d) {
            event.preventDefault();
            showNotification("Выберите напиток");
            return;
        }

        // 3. Выбран суп, но нет главного/салата
        if (s && !m && !sal) {
            event.preventDefault();
            showNotification("Выберите главное блюдо/салат/стартер");
            return;
        }

        // 4. Выбран салат, но нет супа/главного
        if (sal && !s && !m) {
            event.preventDefault();
            showNotification("Выберите суп или главное блюдо");
            return;
        }

        // 5. Выбран напиток/десерт, но нет главного
        if ((d || des) && !m && !sal && !s) {
            event.preventDefault();
            showNotification("Выберите главное блюдо");
            return;
        }

        // 6. Проверка на соответствие комбо
        const isValidCombo =
            // 1: суп + главное + салат + напиток
            (s && m && sal && d) ||
            // 2: суп + главное + напиток
            (s && m && d && !sal) ||
            // 3: суп + салат + напиток
            (s && sal && d && !m) ||
            // 4: главное + салат + напиток
            (m && sal && d && !s) ||
            // 5: главное + напиток
            (m && d && !s && !sal);

        if (!isValidCombo) {
            event.preventDefault();
            showNotification("Выберите главное блюдо");
        }
    });
});