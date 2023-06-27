import React from "react";

import PropTypes from "prop-types";

export default function Frame({
  width,
  height,
  bucketName,
  templateName,
  templateId,
}) {
  return (
    <iframe
      style={{ border: 0 }}
      width={width}
      height={height}
      src={`https://storage.googleapis.com/${bucketName}/${templateId}/${templateName}/index.html`}
      title={templateName}
    />
  );
}

Frame.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  bucketName: PropTypes.string,
  templateName: PropTypes.string,
  templateId: PropTypes.string,
  elements: PropTypes.object,
};
