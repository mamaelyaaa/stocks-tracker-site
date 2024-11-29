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
import Home from "./Home";

function Stocks() {
  return (
    <Home>
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
            title={<h1 className="font-medium gap-4 flex">Stocks Tracker</h1>}
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
    </Home>
  );
}
export default Stocks;
