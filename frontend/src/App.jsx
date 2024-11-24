import { React } from "react";
import { Button, Input, Layout, theme, FloatButton } from "antd";
// import TelegramIcon from "./assets/telegram.svg";
import TickerButtons from "./components/TickerButtons.jsx";

import { GithubOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const layoutStyle = {
  borderRadius: 20,
  overflow: "hidden",
};

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={layoutStyle}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#4CAF50", // Зеленый цвет (hex)
          color: "#ffffff", // Контрастный белый текст'
        }}
      >
        <TickerButtons />
      </Header>

      <Content
        style={{
          padding: "30px",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            // padding: 24,
            borderRadius: borderRadiusLG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Здесь будет график...
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        <Button
          target="_blank"
          href="https://t.me/ShmokiTraderBot"
          type="primary"
        >
          Telegram Bot
        </Button>
      </Footer>

      <FloatButton
        href="https://github.com/mamaelyaaa/trader-site"
        target="_blank"
        icon={<GithubOutlined />}
      />
    </Layout>
  );
};
export default App;
