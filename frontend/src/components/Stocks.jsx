import { React, useState, useRef } from "react";
import axios from "axios";
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
} from "antd";

import {
  AppleOutlined,
  AmazonOutlined,
  GoogleOutlined,
  XOutlined,
  WindowsOutlined,
  GithubOutlined,
  SendOutlined,
  InfoCircleOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function Stocks() {
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
      description: "",
      target: () => ref1.current,
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
      setLoading(false); // Скрываем индикатор загрузки
    }
  };

  const onClickChart = (id) => {
    fetchChart(id);
  };

  return (
    <div className="flex m-0 justify-center">
      <Layout className="overflow-auto rounded-3xl">
        <Header className="flex items-center justify-center gap-3 bg-green-500">
          <Link className="flex text-white gap-2" to={{ pathname: "/" }}>
            Stocks
            <AreaChartOutlined />
          </Link>
          <Search placeholder="Поиск..." />
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
        </Header>

        <Content className="p-8">
          <div
            className="flex items-center justify-center p-2 bg"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: "100%",
              minWidth: "100%",
              // padding: "5px",
              height: "500px",
              width: "800px",
            }}
          >
            {loading ? (
              <Spin size="large" />
            ) : chart ? (
              <img
                className="max-w-full max-h-full rounded-lg object-contain"
                src={chart}
                alt="График компании"
                style={
                  {
                    // maxWidth: "100%",
                    // maxHeight: "100%",
                    // objectFit: "contain",
                  }
                }
              />
            ) : (
              <Card
                size="default"
                className="border-gray-300"
                title={
                  <h1 className="font-medium gap-4 flex">Stocks Tracker</h1>
                }
              >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
                <Button type="primary" onClick={() => setOpen(true)}>
                  <InfoCircleOutlined />
                  Подсказка
                </Button>
              </Card>
            )}
          </div>
        </Content>

        <Footer className="text-center">
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
}
export default Stocks;