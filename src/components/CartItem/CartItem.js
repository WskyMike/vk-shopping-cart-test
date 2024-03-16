/* eslint-disable react/prop-types */
import { Card, Title, Caption } from "@vkontakte/vkui";
import { Icon24DeleteOutline } from "@vkontakte/icons";
import "@vkontakte/vkui/dist/vkui.css";

import "./CartItem.css";
import { Counter } from "../Counter/Counter";

export function CartItem({ item, onDelete, onCounterChange }) {

  // Обработка нажатия на иконку удаления
  function onCancelClick() {
    onDelete(item.id);
  }

  // Обновление значения счетчика в хранилище MobX и передача его в компонент Counter
  function handleCounterChange(newValue) {
    // Вызываем с новым значением счетчика
    onCounterChange(item.id, newValue);
  }

  return (
    <div>
      <Card mode="outline" style={{ margin: "1%", width: "auto" }}>
        <div className="cartitem">
          <div className="cartitem__preview">
            <picture>
              <img
                className="cartitem__preview-image"
                src={item.image}
                alt={item.title}
                width={120}
                height={120}
              />
            </picture>
          </div>

          <div className="cartitem__info">
            <div className="cartitem__info-textgroup">
              <div className="cartitem__info-price">
                <Title level="2">{item.price} $</Title>
              </div>
              <div className="cartitem__info-name">{item.title}</div>
              <div className="cartitem__info-description">
                {" "}
                <Caption level="1" style={{ marginBottom: 16 }}>
                  {item.description}
                </Caption>
              </div>
            </div>
            <div className="cartitem__info-controllers">
              <div className="cartitem__info-counter">
                <Counter
                  maxValue={10}
                  defaultValue={item.counter}
                  minValue={1}
                  onChange={handleCounterChange}
                />
              </div>
              <div onClick={onCancelClick}>
                <div className="cartitem__info-delete">
                  <Icon24DeleteOutline />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
