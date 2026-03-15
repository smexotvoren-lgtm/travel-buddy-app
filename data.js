const travelData = {
    regions: [
        {
            id: "crimea",
            name: "Крым",
            country: "Россия",
            flag: "🇷🇺",
            description: "Жемчужина России — море, горы, леса и тысячи лет истории",
            weather: {
                temp: 15,
                condition: "переменная облачность",
                sea: 12
            },
            cities: [
                {
                    id: "yalta",
                    name: "Ялта",
                    description: "Главный курорт ЮБК, окруженный горами и парками",
                    coordinates: [44.4952, 34.1667],
                    weather: {
                        temp: 16,
                        condition: "солнечно",
                        sea: 13
                    },
                    hotels: [
                        {
                            id: "hotel1",
                            name: "Ялта-Интурист",
                            stars: 4,
                            address: "Набережная им. Ленина, 15",
                            distanceToSea: 50,
                            price: 4500,
                            rating: 4.5,
                            image: "https://source.unsplash.com/400x300/?hotel",
                            amenities: ["бассейн", "спа", "свой пляж", "ресторан"],
                            coordinates: [44.4965, 34.1675],
                            bookingLink: "#"
                        },
                        {
                            id: "hotel2",
                            name: "Ореанда",
                            stars: 3,
                            address: "Набережная им. Ленина, 35/2",
                            distanceToSea: 100,
                            price: 3200,
                            rating: 4.3,
                            image: "https://source.unsplash.com/400x300/?resort",
                            amenities: ["бассейн", "сауна", "парковка"],
                            coordinates: [44.4970, 34.1660],
                            bookingLink: "#"
                        }
                    ],
                    attractions: [
                        {
                            name: "Ласточкино гнездо",
                            type: "архитектура",
                            description: "Замок на скале, символ Крыма",
                            coordinates: [44.4307, 34.1284],
                            price: 300,
                            image: "https://source.unsplash.com/400x300/?castle",
                            duration: "1 час"
                        },
                        {
                            name: "Канатная дорога на Ай-Петри",
                            type: "активность",
                            description: "Самая длинная канатная дорога в Европе",
                            coordinates: [44.4949, 34.1611],
                            price: 800,
                            image: "https://source.unsplash.com/400x300/?cablecar",
                            duration: "2 часа"
                        }
                    ],
                    restaurants: [
                        {
                            name: "Гранат",
                            cuisine: "крымская, средиземноморская",
                            avgCheck: 1500,
                            rating: 4.8,
                            address: "Набережная, 8",
                            coordinates: [44.4960, 34.1665],
                            image: "https://source.unsplash.com/400x300/?restaurant",
                            features: ["вид на море", "летняя веранда"]
                        }
                    ],
                    activities: [
                        {
                            name: "Пит-байки на Ай-Петри",
                            type: "экстрим",
                            duration: "3 часа",
                            price: 4000,
                            difficulty: "средняя",
                            route: [
                                { point: "Ялта", lat: 44.4952, lon: 34.1667 },
                                { point: "Ласточкино гнездо", lat: 44.4307, lon: 34.1284 },
                                { point: "Беседка ветров", lat: 44.4567, lon: 34.0567 },
                                { point: "Ай-Петри", lat: 44.4500, lon: 34.0500 }
                            ],
                            description: "Маршрут по серпантину на плато Ай-Петри",
                            phone: "+7 (978) 123-45-67"
                        }
                    ]
                }
            ]
        }
    ]
};
