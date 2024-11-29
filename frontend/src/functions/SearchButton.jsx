import React, { useState, useCallback } from "react";
import { AutoComplete, Input, Button } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";

const SearchButton = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/search/${query}?exchange=US`
      );
      setOptions(
        response.data.map((item) => ({
          value: item.symbol,
          label: (
            <div>
              {item.symbol}
              <span style={{ marginLeft: 10, color: "gray" }}>
                {item.description}
              </span>
            </div>
          ),
        }))
      );
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  };

  // Дебаунсинг функции поиска
  const debouncedFetchSuggestions = useCallback(
    debounce((query) => {
      if (query.length > 3) {
        fetchSuggestions(query);
      } else {
        setOptions([]); // Очистка списка, если символов меньше 4
      }
    }, 500),
    [] // Депенденси массив пуст, чтобы debounce не пересоздавался
  );

  const handleSearch = (value) => {
    debouncedFetchSuggestions(value.trim()); // Убираем лишние пробелы
  };

  const handleSelect = (value) => {
    console.log("Выбранный символ:", value);
  };
  
  const onClick = (id) => {
    
  }

  return (
    <>
      <AutoComplete
        className="w-48"
        options={options}
        onSelect={handleSelect}
        onSearch={handleSearch}
        placeholder="Поиск..."
        notFoundContent={loading ? "Загрузка..." : "Ничего не найдено"}
      >
        <Input.Search></Input.Search>
      </AutoComplete>
    </>
  );
};

export default SearchButton;
