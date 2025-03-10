import React, { useState, useEffect } from "react";
import "./LogsViewer.css";

// Import Bootstrap components
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";

// Import API
import { fetchLogs } from "../../api/logs.api";

// Import icons
import { FaRegFileLines } from "react-icons/fa6";

export const LogsViewer = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(10);

  // Filter states
  const [level, setLevel] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [order, setOrder] = useState("desc");

  // Fetch logs whenever filters or currentPage changes
  useEffect(() => {
    const getLogs = async () => {
      try {
        const data = await fetchLogs({
          page: currentPage,
          limit: logsPerPage,
          level: level || undefined,
          startTime: startTime || undefined,
          endTime: endTime || undefined,
          order,
        });

        setLogs(data.logs); // Set logs
        setTotalPages(Math.ceil(data.totalLogs / logsPerPage)); // Calculate total pages
        
        if (data.logs.length === 0) {
          setCurrentPage(1); // Reset to the first page if no logs are found
        }
      } catch (error) {
        console.error("Failed to load logs:", error);
      }
    };

    getLogs();
  }, [currentPage, logsPerPage, level, startTime, endTime, order]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination logic
  const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    const halfWay = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      // If total pages are more than maxPagesToShow, show ellipsis
      const startPage = Math.max(currentPage - halfWay, 1);
      const endPage = Math.min(currentPage + halfWay, totalPages);

      if (startPage > 1) {
        items.push(
          <Pagination.Item
            key={1}
            onClick={() => handlePageChange(1)}
          >
            {1}
          </Pagination.Item>
        );
        if (startPage > 2) {
          items.push(<Pagination.Ellipsis key="ellipsis-start" />);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          items.push(<Pagination.Ellipsis key="ellipsis-end" />);
        }
        items.push(
          <Pagination.Item
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
    }

    return items;
  };

  return (
    <div id="logs-viewer">
      <h2>
        <FaRegFileLines /> Logs Viewer
      </h2>

      {/* Filter Form */}
      <Form style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Form.Group controlId="filterLogsPerPage">
            <Form.Label>Logs per page</Form.Label>
            <Form.Control
              as="select"
              value={logsPerPage}
              onChange={(e) => setLogsPerPage(e.target.value)}
            >
              {[...Array(16).keys()] // From 10 to 25
                .map((i) => i + 10)
                .map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="filterLevel">
            <Form.Label>Level</Form.Label>
            <Form.Control
              as="select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">All</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
              <option value="error">Error</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="filterStartTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="filterEndTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="filterOrder">
            <Form.Label>Order</Form.Label>
            <Form.Control
              as="select"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Form.Control>
          </Form.Group>
        </div>
      </Form>

      {/* Logs Display */}
      <section className="logs-container">
        {logs.map((log, index) => (
          <article key={index} className="log-card">
            <div>
              <strong>
                {log.timestamp} [<span className={log.level}>{log.level}</span>]
              </strong>
            </div>
            <div>{log.message}</div>
          </article>
        ))}
      </section>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Pagination>
          <Pagination.First
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          />
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          {renderPaginationItems()}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
          <Pagination.Last
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          />
        </Pagination>
      </div>
    </div>
  );
};
