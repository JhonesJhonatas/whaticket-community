import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";

export function useLogs(){
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleGetLogs = useCallback(async() => {
    try {
      setLoading(true);
      const { data } = await api.get("/logs");
      setLogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetLogs();
  }, [handleGetLogs]);

  return {
    loading,
    logs,
    handlers: {
      handleGetLogs,
    }
  };
}