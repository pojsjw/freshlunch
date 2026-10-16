// ЛАБОРАТОРНАЯ 4: МАССИВ БЛЮД 
// ЛАБОРАТОРНАЯ 5: МАССИВ БЛЮД
// (добавлено свойство kind + новые блюда + 2 новые категории)
const dishes = [
    // СУПЫ
    {
        keyword: "tomatny",
        name: "Томатный суп",
        price: 320,
        category: "soup",
        kind: "veg", // ЛАБ 5
        count: "300 г",
        image: "https://images.gastronom.ru/pQ3jVXAxb33JK-GS0d2iVsIcUttttl0tYkVjEuJUB4A/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzllMTFmYTgxLWRhZGQtNDJhOC05NTM0LTU1ZDMzYjk0MjlmZi5qcGc.webp"
    },
    {
        keyword: "tykva",
        name: "Крем-суп из тыквы",
        price: 350,
        category: "soup",
        kind: "veg",
        count: "300 г",
        image: "https://avatars.mds.yandex.net/get-vertis-journal/3911415/fbb6a65b-f670-4750-96d6-ed1d19c1475e.jpg/1600x1600"
    },
    {
        keyword: "kuriny",
        name: "Куриный бульон",
        price: 290,
        category: "soup",
        kind: "meat", // ЛАБ 5
        count: "350 г",
        image: "https://sun9-54.vkuserphoto.ru/s/v1/ig2/1d_rc33OpCUUN3mC6TYWdzZF0TlKdhrzmZ_hJEjl_gNSwBE7ywbJHiRT2zAD7q-xk_5a2twiiA_OVqxEdxAPtQRe.jpg?quality=95&as=32x16,48x24,72x36,108x54,160x80,240x120,360x180,480x240,540x270,640x320,720x360,1080x540,1280x640,1440x720,1600x800&from=bu&u=LQuaxrneGHTSBvuD03LpeFUZ6CFjI7nd0y7ex4Z3ppU&cs=640x0"
    },
     {
        keyword: "borsch",
        name: "Борщ с говядиной", // ЛАБА 5 
        price: 380,
        category: "soup",
        kind: "meat",
        count: "350 г",
        image: "https://halalmsk.ru/wp-content/uploads/2021/03/borshch-s-govyadinoy-1.jpg?v=1616669702"
    },
    {
        keyword: "ukha",
        name: "Уха из лосося", // ЛАБА 5 
        price: 420,
        category: "soup",
        kind: "fish",
        count: "350 г",
        image: "https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI1MDExMy8zNThlQ0guanBlZw.webp"
    },
    {
        keyword: "fish_soup",
        name: "Рыбный суп с креветками", // ЛАБА 5 
        price: 450,
        category: "soup",
        kind: "fish",
        count: "300 г",
        image: "https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI1MTAxNy8zZzN0Tm8uanBlZw.webp"
    },

    // ГЛАВНЫЕ БЛЮДА
    {
        keyword: "kurica_kinoa",
        name: "Курица с киноа",
        price: 470,
        category: "main",
        kind: "meat", // ЛАБА 5
        count: "350 г",
        image: "https://ic.pics.livejournal.com/pliskina/67435712/27310/27310_900.jpg"
    },
    {
        keyword: "losos",
        name: "Запечённый лосось",
        price: 620,
        category: "main",
        kind: "fish", // ЛАБА 5
        count: "280 г",
        image: "https://images.gastronom.ru/JUv119X3SJl5p6LTBsgN8yuBNV9k4Zxe6qa372C3nSY/pr:article-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzFhMzMzZTMxLWVjOWEtNDBkMi1hNzNhLTRhZGNkNGFiMjgwNi5qcGc.webp"
    },
    {
        keyword: "govyadina",
        name: "Говядина с гречкой",
        price: 490,
        category: "main",
        kind: "meat", // ЛАБА 5
        count: "320 г",
        image: "https://img.povar.ru/main-micro/81/a3/b7/82/kasha_grechnevaya_s_govyadinoi-782221.JPG"
    },
    {
        keyword: "forel",
        name: "Форель на гриле", // ЛАБА 5 
        price: 580,
        category: "main",
        kind: "fish",
        count: "280 г",
        image: "https://static.1000.menu/img/content-v2/98/9f/47567/steik-foreli-na-grile_1718072150_8_p8unqxc_max.jpg"
    },
    {
        keyword: "tofu",
        name: "Тофу с овощами", // ЛАБА 5 
        price: 420,
        category: "main",
        kind: "veg",
        count: "300 г",
        image: "https://avatars.mds.yandex.net/i?id=3c364d9bac90d35947d96114bb3c0a9b_l-5886906-images-thumbs&n=13"
    },
    {
        keyword: "veggie_bowl",
        name: "Овощной боул", // ЛАБА 5 
        price: 390,
        category: "main",
        kind: "veg",
        count: "320 г",
        image: "https://i.pinimg.com/originals/c5/81/51/c58151e1ec25423dd71930438f7a2579.png"
    },
        // САЛАТЫ И СТАРТЕРЫ (НОВАЯ КАТЕГОРИЯ, 6 блюд)
    {
        keyword: "greek",
        name: "Греческий салат", // ЛАБА 5 новое
        price: 340,
        category: "salad",
        kind: "veg",
        count: "250 г",
        image: "https://static.1000.menu/img/content-v2/40/b1/23014/salat-grecheskii-s-brynzoi-klassicheskii_1699633389_2_max.jpg"
    },
    {
        keyword: "caesar",
        name: "Цезарь с курицей", // ЛАБА 5 новое
        price: 420,
        category: "salad",
        kind: "meat",
        count: "280 г",
        image: "https://static.1000.menu/img/content-v2/8c/ac/13116/cezar-s-pekinskoi-kapustoi_1612946883_27_max.jpg"
    },
    {
        keyword: "tuna_salad",
        name: "Салат с тунцом", // ЛАБА 5 новое
        price: 450,
        category: "salad",
        kind: "fish",
        count: "250 г",
        image: "https://www.koolinar.ru/all_image/article/3/3683/article-602076da-69d7-42c7-87e4-95bded083ce5_large.webp"
    },
    {
        keyword: "veggie_salad",
        name: "Овощной салат", // ЛАБА 5 новое
        price: 290,
        category: "salad",
        kind: "veg",
        count: "220 г",
        image: "https://img.povar.ru/mobile/ff/1e/13/de/salat_miks-782005.jpg"
    },
    {
        keyword: "caprese",
        name: "Салат Капрезе", // ЛАБА 5 новое
        price: 380,
        category: "salad",
        kind: "veg",
        count: "230 г",
        image: "https://avatars.mds.yandex.net/get-vertis-journal/4220003/c34350e5-6d79-44c0-9b7b-54b262417680.jpg/1600x1600"
    },
    {
        keyword: "spinach",
        name: "Салат со шпинатом", // ЛАБА 5 новое
        price: 320,
        category: "salad",
        kind: "veg",
        count: "210 г",
        image: "https://img.povar.ru/main-micro/30/ec/40/03/salat_so_shpinatom_i_percem-848607.jpg"
    },
    // НАПИТКИ
    {
        keyword: "smoothie",
        name: "Ягодный смузи",
        price: 250,
        category: "drink",
        kind: "cold", // ЛАБА 5
        count: "300 мл",
        image: "https://images.gastronom.ru/UGFxAYkqQdXvno7l9Ox06NuU7NZBMwIPqvgeKQvAero/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzL2Q1ZjU2ZGY2LWE0N2EtNGJjOS04MGM5LTIyMGE4ZWYwYWJjMC5qcGc.webp"
    },
    {
        keyword: "orange_juice",
        name: "Апельсиновый сок",
        price: 220,
        category: "drink",
        kind: "cold", // ЛАБА 5
        count: "250 мл",
        image: "https://avatars.mds.yandex.net/i?id=8ed8994176d2eaf9b69723605c8e2bb5_l-7069324-images-thumbs&n=13"
    },
    {
        keyword: "green_tea",
        name: "Зелёный чай",
        price: 150,
        category: "drink",
        kind: "hot", // ЛАБА 5
        count: "400 мл",
        image: "https://i.pinimg.com/736x/b4/28/6f/b4286f31e030b7b48010809bc9d1d43b.jpg"
    },
    {
        keyword: "lemonade",
        name: "Домашний лимонад", // ЛАБА 5 новое
        price: 180,
        category: "drink",
        kind: "cold",
        count: "400 мл",
        image: "https://images.gastronom.ru/CtSerq1cPYGxXzNAX77V6guv1UZStumSGwawFyH7xW0/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzE5NDAxZDRiLWUxOWEtNDFjMC04NTVkLWIzNTUxYjA1NjNmOS5qcGc.webp"
    },
    {
        keyword: "black_tea",
        name: "Чёрный чай", // ЛАБА 5 новое
        price: 150,
        category: "drink",
        kind: "hot",
        count: "400 мл",
        image: "https://ir.ozone.ru/s3/multimedia-m/w1200/6796192018.jpg"
    },
    {
        keyword: "coffee",
        name: "Американо", // ЛАБА 5 новое
        price: 180,
        category: "drink",
        kind: "hot",
        count: "250 мл",
        image: "https://кафешашлычныйдвор.рф/wp-content/uploads/2022/03/photo.jpg"
    },
    // ДЕСЕРТЫ (НОВАЯ КАТЕГОРИЯ, 6 блюд)
    {
        keyword: "tiramisu",
        name: "Тирамису",  // ЛАБА 5 новое
        price: 350,
        category: "dessert",
        kind: "medium",
        count: "150 г",
        image: "https://fissman.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/c50/1ngpnjrgffyptj6ilzlkyo1nevzqa7tk/800_800_1/tiramisu.webp"
    },
    {
        keyword: "cheesecake",
        name: "Чизкейк", // ЛАБА 5 новое
        price: 380,
        category: "dessert",
        kind: "medium",
        count: "160 г",
        image: "https://images.gastronom.ru/_BqhFkIUh2fMkaeIGd0di-DEI5Tk0ndmEWYoLAOwlBA/pr:product-content-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzL2E0ZDY2ZTk3LTBjMzQtNGY0ZC1iOWJmLTkzZTUxOGFhMTc2NS5qcGc.webp"
    },
    {
        keyword: "macaron",
        name: "Макарон", // ЛАБА 5 новое
        price: 120,
        category: "dessert",
        kind: "small",
        count: "30 г",
        image: "https://img.povar.ru/main-micro/4b/43/66/28/francuzskie_makaruni-299641.jpg"
    },
    {
        keyword: "eclair",
        name: "Эклер", // ЛАБА 5 новое
        price: 150,
        category: "dessert",
        kind: "small",
        count: "70 г",
        image: "https://img.povar.ru/uploads/9d/48/d1/8a/francuzskie_ekleri-831642.jpg"
    },
    {
        keyword: "cookie",
        name: "Печенье с шоколадом", // ЛАБА 5 новое
        price: 100,
        category: "dessert",
        kind: "small",
        count: "50 г",
        image: "https://avatars.mds.yandex.net/get-vertis-journal/4220003/8f0f0ad4-cd26-495f-b2d2-706c4033b7e0.jpg/1600x1600"
    },
    {
        keyword: "cake",
        name: "Шоколадный торт", // ЛАБА 5 новое
        price: 450,
        category: "dessert",
        kind: "big",
        count: "250 г",
        image: "https://cdn.lifehacker.ru/wp-content/uploads/2023/04/shutterstock_1532438783_1681814518-1800x900.jpg"
    }
];