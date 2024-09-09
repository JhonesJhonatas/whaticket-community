/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from "express";
import ListLogsService from "../services/LogServices/ListLogsService";

export async function index(req: Request, res: Response) {
  const logs = await ListLogsService();
  return res.json(logs);
}
