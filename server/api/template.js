const express = require("express");

const router = express.Router();

const TemplateModel = require("../models/TemplateModel");

router.get("/template", (req, res) => {
  TemplateModel.findById(req?.query?.id)
    .then((response) =>
      res
        .status(200)
        .json({ data: response, success: true, message: "Template found!" })
    )
    .catch((err) =>
      res.status(500).json({ data: null, success: false, message: err })
    );
});

module.exports = router;
