import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AlertForm from "./components/AlertForm";
import AlertsList from "./components/AlertsList";

const API_URL = "http://localhost:5000/alerts";

export default function App() {
  const [alerts, setAlerts] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchAlerts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setAlerts(data);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const filteredAlerts = filterCountry
    ? alerts.filter((alert) =>
        alert.country.toLowerCase().includes(filterCountry.toLowerCase())
      )
    : alerts;

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedAlerts = filteredAlerts.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  return (
    <div className="container">
      <Toaster position="top-right" />
      <h1>Flying Panda – Visa Alerts</h1>
      <h3>Create Visa Alert</h3>

      <AlertForm refresh={fetchAlerts} />

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by country..."
          value={filterCountry}
          onChange={(e) => {
            setFilterCountry(e.target.value);
            setCurrentPage(1);
          }}
          className="filter-input"
        />
      </div>

      <AlertsList
        alerts={paginatedAlerts}
        refresh={fetchAlerts}
        totalCount={filteredAlerts.length}
      />

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
