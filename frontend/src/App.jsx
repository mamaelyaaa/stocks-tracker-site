import { React, useState } from "react";
import {
  Button,
  Flex,
  Layout,
  theme,
  FloatButton,
  Image,
  Input,
  Spin,
} from "antd";
import axios from "axios";

import {
  AppleOutlined,
  AmazonOutlined,
  GoogleOutlined,
  XOutlined,
  WindowsOutlined,
  GithubOutlined,
  SendOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const onClick = (id) => {
    fetchChart(id);
  };

  return (
    <div className="flex m-0">
      <Layout className="overflow-auto rounded-3xl">
        <Header className="flex items-center bg-green-500">
          <div>
            <Flex gap="middle">
              <Search placeholder="Поиск..." />
              <Button onClick={() => onClick("AAPL")}>
                <AppleOutlined />
                Apple
              </Button>
              <Button onClick={() => onClick("GOOGL")}>
                <GoogleOutlined />
                Google
              </Button>
              <Button onClick={() => onClick("AMZN")}>
                <AmazonOutlined />
                Amazon
              </Button>
              <Button onClick={() => onClick("MSFT")}>
                <WindowsOutlined />
                Microsoft
              </Button>
              <Button onClick={() => onClick("TSLA")}>
                <XOutlined />
                Tesla
              </Button>
            </Flex>
          </div>
        </Header>

        <Content className="p-8">
          <div
            className="flex items-center justify-center"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: "100%",
              minWidth: "100%",
              padding: "5px",
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
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  // objectFit: "contain",
                }}
              />
            ) : (
              <p>Здесь будет график...</p>
            )}
            <Image />
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
    </div>
  );
};
export default App;
