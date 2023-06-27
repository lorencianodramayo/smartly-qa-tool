import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Layout, Select, theme } from "antd";

import { useParams } from "react-router-dom";
import { useOnMount } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { getTemplate } from "../../redux/reducers/template";

import Frame from "../../components/Frame";
import _ from "lodash";
import Typography from "antd/es/typography/Typography";

const { Header, Sider, Content } = Layout;

const Playground = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  const {
    data: { template, _id, name, path },
    fetching,
    error,
  } = useSelector((state) => state.template);

  const { playgroundId } = useParams();

  useOnMount(() => {
    dispatch(getTemplate(playgroundId));
  });

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        theme="light"
        trigger={null}
        collapsedWidth={0}
        collapsible
        collapsed={collapsed}
        width={300}
      >
        <div style={{ padding: "2em" }}>
          {!_.isEmpty(template) &&
            Object.keys(template?.elements)?.map((data, index) => (
              <div key={index}>
                {Object.keys(template?.elements[data])?.map((child, index) => (
                  <div key={index}>
                    {child === "reportingDimension" ? (
                      <Typography style={{ fontWeight: 800 }}>
                        {template?.elements[data][child]}
                      </Typography>
                    ) : child === "text" || child === "url" ? (
                      _.isUndefined(template?.elements[data].enum) ? (
                        <Input
                          defaultValue={template?.elements[data][child].value}
                        />
                      ) : (
                        <Select
                          style={{ width: "100%" }}
                          defaultValue={template?.elements[data][child].value}
                          options={template?.elements[data].enum}
                        />
                      )
                    ) : child === "image" || child === "video" ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px dashed #ececec",
                          padding: "0.5em",
                          borderRadius: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "80px",
                            height: "80px",
                            overflow: "hidden",
                            borderRadius: "8px",
                            marginRight: "18px",
                            border: "1px solid #f1f1f1cc",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={`https://storage.googleapis.com/${path}/${_id}/${name}/${template?.elements[data][child].src}`}
                            alt={data}
                            style={{
                              width: "-webkit-fill-available",
                              height: "auto",
                            }}
                          />
                        </div>
                        <Typography>
                          {template?.elements[data][child].src}
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                ))}
                <Divider />
              </div>
            ))}
        </div>
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 0 : 300,
        }}
      >
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            style={{
              padding: "1em",
              background: "#fff",
              borderRadius: "8px",
              border: "1px solid #ececec",
              width: "max-content",
            }}
          >
            <Frame
              width={template?.width}
              height={template?.height}
              bucketName={path}
              templateId={_id}
              templateName={name}
              elements={template?.elements}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Playground;
