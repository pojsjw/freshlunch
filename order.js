// ================= ЛАБОРАТОРНЫЕ 4, 5, 8: ЗАКАЗ + LOCALSTORAGE =================

let selectedDishes = {
    soup: null,
    main: null,
    salad: null,     // ЛАБА 5
    drink: null,
    dessert: null    // ЛАБА 5
};

// ================= ЛАБОРАТОРНАЯ 8: LOCALSTORAGE =================
// 1. Загружаем сохраненные блюда из localStorage при старте страницы
function loadOrderFromStorage() {
    const saved = localStorage.getItem("myOrder");
    if (saved) {
        const savedKeywords = JSON.parse(saved);
        for (let key in selectedDishes) {
            if (savedKeywords[key]) {
                // Ищем блюдо в массиве dishes (который скачался с API в 7 лабе)
                selectedDishes[key] = dishes.find(d => d.keyword === savedKeywords[key]) || null;
            }
        }
    }
}

// 2. Сохраняем заказ в localStorage (только keyword)
function saveOrderToStorage() {
    const toSave = {};
    for (let key in selectedDishes) {
        toSave[key] = selectedDishes[key] ? selectedDishes[key].keyword : null;
    }
    localStorage.setItem("myOrder", JSON.stringify(toSave));
}

// ================= ЛАБОРАТОРНАЯ 8: НИЖНЯЯ ПАНЕЛЬ =================
// Вместо updateOrderDisplay (из 4 лабы) теперь обновляем нижнюю плашку
function updateBottomPanel() {
    const panel = document.getElementById("order-panel");
    const totalSpan = document.getElementById("panel-total");
    const link = document.getElementById("panel-link");

    if (!panel) return; // Если мы не на странице lunch.html

    let total = 0;
    let hasAny = false;

    for (let key in selectedDishes) {
        if (selectedDishes[key]) {
            total += selectedDishes[key].price;
            hasAny = true;
        }
    }

    // Если ничего не выбрано — скрываем панель
    if (!hasAny) {
        panel.style.display = "none";
        return;
    }

    panel.style.display = "flex";
    totalSpan.textContent = total + " руб.";

    // ЛАБА 6 + 8: Проверка комбо для ссылки
    const s = selectedDishes.soup;
    const m = selectedDishes.main;
    const sal = selectedDishes.salad;
    const d = selectedDishes.drink;

    const isValidCombo = (s && m && sal && d) || (s && m && d && !sal) || (s && sal && d && !m) || (m && sal && d && !s) || (m && d && !s && !sal);

    // Если комбо собрано верно — ссылка кликабельна. Иначе — серая.
    if (isValidCombo) {
        link.style.pointerEvents = "auto";
        link.style.opacity = "1";
    } else {
        link.style.pointerEvents = "none";
        link.style.opacity = "0.5";
    }
}

// ================= ЛАБОРАТОРНЫЕ 4, 5, 8: КЛИК ПО КАРТОЧКЕ =================
document.addEventListener("click", (event) => {
    const card = event.target.closest(".dish-card");
    if (!card) return;

    const keyword = card.getAttribute("data-dish");
    const dish = dishes.find(d => d.keyword === keyword);
    if (!dish) return;

    // ЛАБА 8: Если кликнули по кнопке "Удалить" — убираем блюдо из заказа
    if (event.target.closest(".delete-btn")) {
        selectedDishes[dish.category] = null;
    } else {
        // Иначе — добавляем (ЛАБА 4)
        selectedDishes[dish.category] = dish;
    }

    saveOrderToStorage();
    updateBottomPanel();

    // Перерисовываем карточки, чтобы обновилась кнопка (Добавить/Удалить)
    if (typeof renderAllDishes === "function") {
        renderAllDishes();
    }
});

// ================= ЛАБОРАТОРНАЯ 6: УВЕДОМЛЕНИЯ =================
// (Эту функцию мы оставили, она понадобится на странице оформления заказа)
function showNotification(message) {
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

// ================= ЛАБОРАТОРНАЯ 8: ЗАПУСК =================
function initOrder() {
    loadOrderFromStorage();
    updateBottomPanel();
}