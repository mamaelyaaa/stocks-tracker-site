import { React, useState, useRef, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import {
  Button,
  Flex,
  Layout,
  theme,
  FloatButton,
  Input,
  Spin,
  Card,
  Tour,
  AutoComplete,
} from "antd";

import {
  AppleOutlined,
  AmazonOutlined,
  GoogleOutlined,
  XOutlined,
  WindowsOutlined,
  GithubOutlined,
  SendOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const steps = [
    {
      title: "Выберите кампанию",
      description: "Нажмите на интересующую вас кампанию из этих 5 или...",
      target: () => ref1.current,
    },
    {
      title: "Используйте поиск",
      description:
        "Поиск определит какую кампанию вы имеете в виду и построит график по ней",
      target: () => ref2.current,
    },
  ];

  const fetchChart = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/trade/daily/${id}`,
        {
          responseType: "blob",
        }
      );
      const imageBlob = URL.createObjectURL(response.data);
      setChart(imageBlob);
    } catch (error) {
      console.error("Ошибка при загрузке графика:", error);
    } finally {
      setLoading(false);
    }
  };

  const onClickChart = (id) => {
    fetchChart(id);
  };

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
      fetchChart(id);
    };

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
          <Input.Search onSearch={onClick}></Input.Search>
        </AutoComplete>
      </>
    );
  };

  return (
    <div className="flex h-screen w-screen">
      <Layout>
        <Header className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-slate-400">
          <div ref={ref2} className="flex">
            <SearchButton></SearchButton>
          </div>
          <div className="flex gap-3" ref={ref1}>
            <Button onClick={() => onClickChart("AAPL")}>
              <AppleOutlined />
              Apple
            </Button>
            <Button onClick={() => onClickChart("GOOGL")}>
              <GoogleOutlined />
              Google
            </Button>
            <Button onClick={() => onClickChart("AMZN")}>
              <AmazonOutlined />
              Amazon
            </Button>
            <Button onClick={() => onClickChart("MSFT")}>
              <WindowsOutlined />
              Microsoft
            </Button>
            <Button onClick={() => onClickChart("TSLA")}>
              <XOutlined />
              Tesla
            </Button>
          </div>
          <Button shape="circle" onClick={() => setOpen(true)}>
            <QuestionCircleOutlined />
          </Button>
        </Header>

        <Content className="p-8 flex items-center justify-center">
          {loading ? (
            <Spin size="large" />
          ) : chart ? (
            <div
              className="flex items-center justify-center min-w-full min-h-full p-1.5 w-auto"
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                height: "500px",
                width: "800px",
              }}
            >
              <img
                className="max-w-full max-h-full rounded-lg object-contain"
                src={chart}
                alt="График компании"
              />
            </div>
          ) : (
            <div className="flex items-center">
              <Card hoverable className="border-gray-300">
                <Flex>
                  <h1 className="font-medium text-center">Трекер Акций</h1>
                </Flex>
              </Card>
            </div>
          )}
        </Content>

        <Footer className="flex justify-center">
          <Button
            target="_blank"
            href="https://t.me/ShmokiTraderBot"
            type="primary"
            icon={<SendOutlined />}
          >
            Telegram Bot
          </Button>
        </Footer>
      </Layout>

      <FloatButton
        href="https://github.com/mamaelyaaa/trader-site"
        target="_blank"
        icon={<GithubOutlined />}
      />
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
      />
    </div>
  );
};

export default Home;
