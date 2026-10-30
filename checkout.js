// ================= ЛАБОРАТОРНАЯ 8: ОФОРМЛЕНИЕ ЗАКАЗА =================

// API_KEY мы берем из dishes.js, поэтому здесь его не объявляем
const API_ORDERS = "https://web-basics-api-gagashaggy.msk1.amvera.tech/labs/api/orders";

function initCheckout() {
    const saved = JSON.parse(localStorage.getItem("myOrder") || "{}");
    const grid = document.getElementById("checkout-grid");
    const emptyMsg = document.getElementById("empty-message");
    const formSection = document.getElementById("checkout-form-section");
    const itemsBlock = document.getElementById("checkout-items");
    
    let total = 0;
    let html = "";
    let hasAny = false;

    grid.innerHTML = "";

    for (let key in saved) {
        const kw = saved[key];
        if (kw) {
            // Ищем в блюдах с сервера (dishes) или в локальных (myDishes)
            let dish = null;
            if (typeof dishes !== "undefined" && dishes.length > 0) {
                dish = dishes.find(d => d.keyword === kw);
            }
            if (!dish && typeof myDishes !== "undefined") {
                dish = myDishes.find(d => d.keyword === kw);
            }

            if (dish) {
                hasAny = true;
                const card = document.createElement("div");
                card.className = "dish-card";
                
                const imgSrc = (dish.image && dish.image.startsWith("http")) 
                    ? dish.image 
                    : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";

                card.innerHTML = `
                    <img src="${imgSrc}" alt="${dish.name}">
                    <p class="dish-name">${dish.name}</p>
                    <p class="dish-price">${dish.price} руб.</p>
                    <button class="add-btn delete-btn" data-keyword="${dish.keyword}">Удалить</button>
                `;
                grid.appendChild(card);
                
                html += `<p><strong>${dish.name}:</strong> ${dish.price} руб.</p>`;
                total += dish.price;
            }
        }
    }

    if (!hasAny) {
        emptyMsg.style.display = "block";
        formSection.style.display = "none";
    } else {
        emptyMsg.style.display = "none";
        formSection.style.display = "block";
        itemsBlock.innerHTML = html;
        document.getElementById("checkout-total").textContent = total + " руб.";
    }
}

// ================= ЛАБА 8: ЗАПУСК И ОБРАБОТЧИКИ =================

// Удаление блюда
document.addEventListener("click", (e) => {
    if (e.target.closest(".delete-btn")) {
        const kw = e.target.getAttribute("data-keyword");
        const saved = JSON.parse(localStorage.getItem("myOrder") || "{}");
        for (let key in saved) {
            if (saved[key] === kw) saved[key] = null;
        }
        localStorage.setItem("myOrder", JSON.stringify(saved));
        location.reload();
    }
});

// Отправка формы
document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem("myOrder") || "{}");
    
    // Собираем данные
    const data = {
        full_name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        delivery_address: document.getElementById("address").value,
        delivery_type: document.querySelector('input[name="delivery_type"]:checked').value,
        comment: document.getElementById("comment").value,
        soup_id: saved.soup ? (dishes.find(d => d.keyword === saved.soup)?.id || -1) : -1,
        main_course_id: saved.main ? (dishes.find(d => d.keyword === saved.main)?.id || -1) : -1,
        salad_id: saved.salad ? (dishes.find(d => d.keyword === saved.salad)?.id || -1) : -1,
        drink_id: saved.drink ? (dishes.find(d => d.keyword === saved.drink)?.id || -1) : -1,
        dessert_id: saved.dessert ? (dishes.find(d => d.keyword === saved.dessert)?.id || -1) : -1,
    };

    if (data.delivery_type === "by_time") {
        data.delivery_time = document.getElementById("time").value;
    }

    try {
        const res = await fetch(`${API_ORDERS}?api_key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Ошибка");
        alert("Заказ успешно отправлен!");
        localStorage.removeItem("myOrder");
        window.location.href = "lunch.html";
    } catch (err) {
        alert("Не удалось отправить заказ.");
    }
});

// Самое главное: когда страница загрузится, запускаем initCheckout
document.addEventListener("DOMContentLoaded", () => {
    // Ждем полсекунды, чтобы dishes.js успел загрузить блюда (на всякий случай)
    setTimeout(() => {
        initCheckout();
    }, 500);
});