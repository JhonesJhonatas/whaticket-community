import express from "express";
import isAuth from "../middleware/isAuth";
import ListLogsService from "../services/LogServices/ListLogsService";

const logRoutes = express.Router();

logRoutes.get("/logs", isAuth, async (req, res) => {
  const response = await ListLogsService();
  res.send(response);
});

export default logRoutes;
