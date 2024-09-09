import Log from "../../models/Log";
import User from "../../models/User";

type Response = Log[];

const ListLogsService = async (): Promise<Response> => {
  const logs = await Log.findAll({
    include: [
      {
        model: User,
        as: "author",
        attributes: ["name"]
      }
    ]
  });
  return logs;
};

export default ListLogsService;
