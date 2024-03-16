/* eslint-disable react/prop-types */
import { useState } from "react";
import { IconButton } from "@vkontakte/vkui";
import { Icon16Add, Icon16Minus } from "@vkontakte/icons";
import "@vkontakte/vkui/dist/vkui.css";

import "./Counter.css";

export function Counter({ defaultValue, minValue, maxValue, onChange }) {
    
  const [value, setValue] = useState(defaultValue);

  function handleIncrement() {
    if (value < maxValue) {
      setValue(value + 1);
      onChange(value + 1);
    }
  }

  function handleDecrement() {
    if (value > minValue) {
      setValue(value - 1);
      onChange(value - 1);
    }
  }

  return (
    <div className="counter">
      <div className="counter__button">
        <IconButton onClick={handleDecrement} aria-label="add">
          <Icon16Minus />
        </IconButton>
      </div>
      <div>{value}</div>
      <div className="counter__button">
        <IconButton onClick={handleIncrement} aria-label="remove">
          <Icon16Add />
        </IconButton>
      </div>
    </div>
  );
}
