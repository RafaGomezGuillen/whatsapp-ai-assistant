import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getLogs } from "../../api/logs.api";

export const Logger = () => {
  const [lastLog, setLastLog] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getLogs();
        const latestLog = response[response.length - 1];

        // Check if the log is new
        if (!lastLog || latestLog.timestamp !== lastLog.timestamp) {
          setLastLog(latestLog);

          // Render different toasts based on the log level
          switch (latestLog.level) {
            case "info":
              toast.info(`${latestLog.timestamp}: ${latestLog.message}`);
              break;
            case "error":
              toast.error(`${latestLog.timestamp}: ${latestLog.message}`);
              break;
            case "debug":
              toast.success(`${latestLog.timestamp}: ${latestLog.message}`);
              break;
            default:
              toast(`[${latestLog.level}] ${latestLog.timestamp}: ${latestLog.message}`);
          }
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
    const intervalId = setInterval(fetchLogs, 1000); // Poll every second
    return () => clearInterval(intervalId);
  }, [lastLog]);

  return null;
};