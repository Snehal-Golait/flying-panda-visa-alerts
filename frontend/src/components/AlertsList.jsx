import React, { useState } from "react";
import toast from "react-hot-toast";

const API_URL = `${import.meta.env.VITE_API_BASE || "http://localhost:5000"}/alerts`;

const AlertsList = ({ alerts, refresh, totalCount }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success("Status updated successfully!");
      refresh();
    } catch (err) {
      toast.error("Failed to update status");
      console.error("Failed to update status", err);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Alert deleted successfully!");
      refresh();
    } catch (err) {
      toast.error("Failed to delete alert");
      console.error("Failed to delete alert", err);
    }
    setShowModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  if (alerts.length === 0) {
    return (
      <div className="card empty">
        {totalCount === 0
          ? "No visa alerts created yet."
          : "No alerts match your filter."}
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>City</th>
              <th>Visa</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.country}</td>
                <td>{alert.city}</td>
                <td>{alert.visaType}</td>

                <td>
                  <span
                    className={`badge ${
                      alert.status === "Booked" ? "booked" : "active"
                    }`}
                  >
                    {alert.status}
                  </span>
                </td>

                <td className="actions">
                  {alert.status !== "Booked" && (
                    <button
                      className="secondary"
                      onClick={() => updateStatus(alert.id, "Booked")}
                    >
                      Mark Booked
                    </button>
                  )}

                  <button
                    className="danger"
                    onClick={() => openDeleteModal(alert.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this alert?</p>
            <div className="modal-actions">
              <button className="danger" onClick={confirmDelete}>
                Delete
              </button>
              <button className="secondary" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertsList;
