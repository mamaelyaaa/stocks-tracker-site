import { React } from "react";
import { Button, Flex, Layout, theme } from "antd";
const { Header, Content, Footer } = Layout;
import {
  AppleOutlined,
  AmazonOutlined,
  GoogleOutlined,
  OpenAIOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

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
        }}
      >
        <Flex gap="middle">
          <Button>
            <AppleOutlined />
            Apple
          </Button>
          <Button>
            <GoogleOutlined />
            Google
          </Button>
          <Button>
            <AmazonOutlined />
            Amazon
          </Button>
          <Button>
            <OpenAIOutlined />
            OpenAI
          </Button>
          <Button>
            <FacebookOutlined />
            Facebook
          </Button>
        </Flex>
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
            padding: 24,
            borderRadius: borderRadiusLG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Здесь будет график...
        </div>
      </Content>
      {/* <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer> */}
    </Layout>
  );
};
export default App;
