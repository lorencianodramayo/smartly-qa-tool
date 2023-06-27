import React from "react";
import { Button, Card, Divider, Typography } from "antd";
import UploadFile from "../../components/UploadFile";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { parseZipFile } from "../../redux/reducers/upload";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [zipFile, setZipFile] = React.useState(null);

  const { uuid, fetching } = useSelector((state) => state.upload);

  React.useEffect(() => {
    !_.isEmpty(uuid) && navigate(`/playground/${uuid}`);
  }, [navigate, uuid]);

  const handleFileUpload = (file) => {
    setZipFile(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", zipFile);

    dispatch(parseZipFile(formData));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Card style={{ width: 800 }}>
        <Typography.Title
          level={5}
          style={{ margin: 0, marginBottom: "1.5em", fontWeight: 800 }}
        >
          Upload file
        </Typography.Title>
        <UploadFile onFileDrag={handleFileUpload} />
        <Divider />
        <Button
          type="primary"
          block
          size="large"
          onClick={handleUpload}
          disabled={_.isEmpty(zipFile)}
          loading={fetching}
        >
          Let&apos;s go!
        </Button>
      </Card>
    </div>
  );
}
