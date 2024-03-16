import { useEffect, useState } from "react";
import {
  SplitLayout,
  SplitCol,
  Panel,
  PanelHeader,
  CardGrid,
  Card,
  Title,
  Button,
} from "@vkontakte/vkui";
import {} from "@vkontakte/icons";
import PropTypes from "prop-types";
import "@vkontakte/vkui/dist/vkui.css";
import { observer, useLocalObservable } from "mobx-react-lite";
import { toJS } from "mobx";

import "./App.module.css";
import { CartItem } from "./components/CartItem/CartItem";
import fetchGoodsData from "../utils/api";

export const App = observer(() => {
  const [isNegative, setIsNegative] = useState(false);

  const handleClick = () => {
    setIsNegative(true);
    setTimeout(() => {
      setIsNegative(false);
    }, 1000);
  };

  // Создаем локальный стейт для хранения данных о товарах MobX
  const itemsStore = useLocalObservable(() => ({
    items: [],

    // Функция для загрузки данных о товарах
    async fetchItems() {
      try {
        const response = await fetchGoodsData();
        // Добавляем свойство counter к каждому элементу массива товаров
        this.items = response.map((item) => ({
          ...item,
          counter: 1,
        }));
      } catch (error) {
        console.error("Error fetching goods data:", error);
      }
    },

    // Функция для удаления товара из корзины
    removeItem(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId);
    },

    // Функция для обновления количества товара в хранилище
    updateItemCounter(itemId, counter) {
      const itemIndex = this.items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        // Обновляем значение счетчика для конкретного товара
        this.items[itemIndex].counter = counter;
      }
    },
  }));

  // Функция для обработки нажатия на счетчик
  const handleCounterChange = (itemId, newValue) => {
    itemsStore.updateItemCounter(itemId, newValue);
  };

  // console.log(toJS(itemsStore.items));

  // Функция для обработки нажатия на корзину
  const handleRemoveItem = (itemId) => {
    itemsStore.removeItem(itemId);
  };

  // Функция для обработки нажатия на "Обновить корзину"
  const handleRefresh = () => {
    itemsStore.fetchItems();
  };

  // Вызываем функцию загрузки данных при монтировании компонента
  useEffect(() => {
    itemsStore.fetchItems();
  }, [itemsStore]); // Рендерим при обновлении данных в сторе

  // Функция для вычисления общей стоимости товаров в корзине
  const getTotalPrice = () => {
    // Преобразуем массив MobX в JavaScript-массив
    const items = toJS(itemsStore.items);
    // Суммируем цены всех товаров, умноженные на их счетчики (количество)
    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.counter,
      0
    );
    // Метод для работы с денежными значениями
    return totalPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <SplitLayout
      style={{ justifyContent: "center" }}
      header={<PanelHeader delimiter="none" />}
    >
      <SplitCol width="100%" stretchedOnMobile autoSpaced>
        <Panel id="main">
          <PanelHeader>Корзина</PanelHeader>
          <CardGrid size="m">
            <Card style={{ flex: 3 }}>
              {/* Маппинг данных для создания карточек */}
              {itemsStore.items.map((item) => (
                <CartItem
                  item={item}
                  key={item.id}
                  onDelete={() => handleRemoveItem(item.id)}
                  onCounterChange={handleCounterChange}
                />
              ))}
            </Card>
            <Card style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <Title level="2" style={{ margin: "5%" }}>
                    Итого
                  </Title>
                  <Title level="1" style={{ margin: "5%" }}>
                    {getTotalPrice()}
                  </Title>
                </div>
                <Button
                  style={{
                    margin: "5% 5%",
                    transition: "background-color 0.3s",
                  }}
                  appearance={isNegative ? "negative" : "accent"}
                  onClick={handleClick}
                >
                  К оформлению
                </Button>
                <Button
                  onClick={handleRefresh}
                  mode="outline"
                  style={{ margin: "5% 5%" }}
                >
                  Обновить корзину
                </Button>
              </div>
            </Card>
          </CardGrid>
        </Panel>
      </SplitCol>
    </SplitLayout>
  );
});

App.propTypes = {
  initialPanel: PropTypes.string.isRequired,
};
