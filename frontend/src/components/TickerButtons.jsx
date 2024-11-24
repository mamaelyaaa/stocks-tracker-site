import { Button, Flex, Input } from "antd";
const { Search } = Input;

import {
  AppleOutlined,
  AmazonOutlined,
  GoogleOutlined,
  OpenAIOutlined,
  FacebookOutlined,
  GithubOutlined
} from "@ant-design/icons";

function TickerButtons () {
    return (
        <div>
            <Flex gap="middle">
            <Search placeholder="Поиск..." style={{ width: 200 }} />
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
        </div>
    );
};

export default TickerButtons;
