import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

function LayoutApp() {
  const layoutStyle = {
    borderRadius: 20,
    overflow: "hidden",
  };

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
          <Button type="primary">Apple</Button>
          <Button type="primary">Tesla</Button>
          <Button type="primary">Amazon</Button>
          <Button type="primary">Stock4</Button>
          <Button type="primary">Stock5</Button>
        </Flex>

        {/* <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          /> */}
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
          }}
        >
          Бебебе с бабаба
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </Layout>
  );
}

export default LayoutApp;
