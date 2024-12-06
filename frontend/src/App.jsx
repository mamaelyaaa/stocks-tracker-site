import { React, useState, useRef, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import {
  Button,
  Flex,
  Result,
  Layout,
  theme,
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
  DownloadOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const steps = [
    {
      title: "Выберите кампанию",
      description: "Нажмите на интересующую вас кампанию из этих 5",
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
      setError(false);
      const response = await axios.get(
        `http://127.0.0.1:8000/trade/daily/${id}`,
        {
          responseType: "blob",
        }
      );
      const imageBlob = URL.createObjectURL(response.data);
      setChart({ id, imageBlob });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/trade/daily/${id}/csv`,
        {
          responseType: "blob", 
        }
      );
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${id}_data.csv`); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Ошибка при скачивании CSV:", error);
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
              <div className="flex justify-between">
                <span>{item.symbol}</span>
                <span className="text-gray-400 ml-6 text-sm">
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

    const debouncedFetchSuggestions = useCallback(
      debounce((query) => {
        if (query.length >= 3) {
          fetchSuggestions(query);
        } else {
          setOptions([]); 
        }
      }, 300),
      [] 
    );

    const handleSearch = (value) => {
      debouncedFetchSuggestions(value.trim());
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
          <Button
            type="primary"
            href="https://t.me/ShmokiTraderBot"
            shape="circle"
            target="_blank"
            icon={<SendOutlined />}
          ></Button>
        </Header>

        <Content className="p-8 flex flex-col items-center justify-center">
          {loading ? (
            <div
              className="flex items-center justify-center min-w-full min-h-full p-4"
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Spin size="large" />
            </div>
          ) : error ? (
            <div
              className="flex items-center justify-center min-w-full min-h-full p-4"
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Result
                status="error"
                title="Ошибка загрузки данных"
                subTitle="Произошла ошибка при загрузке данных. Пожалуйста, проверьте соединение с сервером или повторите попытку позже."
              />
            </div>
          ) : chart ? (
            <div
              className="flex flex-col items-center justify-center min-w-full min-h-full p-4"
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div
                className="flex items-center justify-center w-full"
                style={{
                  height: "85%",
                }}
              >
                <img
                  className="max-w-full max-h-full rounded-lg object-contain"
                  src={chart.imageBlob}
                  alt="График компании"
                />
              </div>
              <div className="flex items-center justify-center w-full mt-4">
                <Button
                  type="primary"
                  onClick={() => downloadCSV(chart.id)}
                  icon={<DownloadOutlined />}
                  color="danger"
                  variant="solid"
                >
                  Скачать данные в CSV
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 flex items-center flex-col justify-center">
              <Card
                hoverable
                className="border-gray-300 mb-10 w-full max-w-lg flex flex-col items-center justify-center p-6"
              >
                <div className="flex justify-center items-center w-full mb-4">
                  <img
                    src="/logo.jpg" // Замените на ссылку к вашему изображению
                    alt="Welcome Illustration"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <h1 className="font-medium text-center text-xl mb-2">
                  Добро пожаловать в Трекер Акций!
                </h1>
                <p className="text-center text-gray-500">
                  Выберите кампанию выше или воспользуйтесь поиском для
                  получения данных о её графиках.
                </p>
              </Card>
              <div className="flex justify-center w-full">
                <Button
                  type="primary"
                  size="large"
                  href="https://t.me/ShmokiTraderBot"
                  target="_blank"
                  icon={<SendOutlined />}
                >
                  Перейти в Telegram Бота
                </Button>
              </div>
            </div>
          )}
        </Content>

        <Footer className="flex justify-end">
          {/* <Button
            target="_blank"
            href="https://t.me/ShmokiTraderBot"
            type="primary"
            icon={<SendOutlined />}
          >
            Telegram Bot
          </Button> */}
          <Button
            size="large"
            href="https://github.com/mamaelyaaa/trader-site"
            target="_blank"
            shape="circle"
            icon={<GithubOutlined />}
          ></Button>
        </Footer>
      </Layout>

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

export default App;
