async function fetchGoodsData() {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Ошибка API. Status: ${response.status}`);
    }
    const data = await response.json(); // Получим массив со всеми данными
    const randomItems = getRandomItems(data, 3); // Выбираем случайные 3 товара
    const selectedItems = randomItems.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
    })); // Создаем новые объекты только с нужными полями
    return selectedItems; // Возвращаем только выбранные товары
    // console.log(selectedItems);
  } catch (error) {
    console.error("Ошибка в запросе данных:", error);
    return null;
  }
}

// Функция для выбора случайных товаров из массива
function getRandomItems(items, count) {
  const shuffledItems = items.sort(() => 0.5 - Math.random()); // Перемешиваем массив товаров
  return shuffledItems.slice(0, count); // Выбираем первые count товаров
}

export default fetchGoodsData;
