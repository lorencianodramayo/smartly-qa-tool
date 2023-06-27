import { useParams } from "react-router-dom";
import { useOnMount } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { getTemplate } from "../../redux/reducers/template";

import Frame from "../../components/Frame";
import _ from "lodash";

export default function Playground() {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          padding: "1em",
          background: "#fff",
          borderRadius: "8px",
          border: "1px solid #ececec",
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
      <div>
        {!_.isEmpty(template) &&
          Object.keys(template?.elements)?.map((data, index) => (
            <div key={index}>
              {Object.keys(template?.elements[data])?.map((child, index) => (
                <div key={index}>
                  {child === "reportingDimension"
                    ? template?.elements[data][child]
                    : child === "text" || child === "url"
                    ? template?.elements[data][child].value
                    : child === "image" || child === "video"
                    ? template?.elements[data][child].src
                    : null}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
