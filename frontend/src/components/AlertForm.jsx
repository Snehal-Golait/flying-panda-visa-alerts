import { useState } from "react";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/alerts";

export default function AlertForm({ refresh }) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [visaType, setVisaType] = useState("Tourist");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!country.trim()) {
      newErrors.country = "Country is required";
    } else if (country.trim().length < 2) {
      newErrors.country = "Country must be at least 2 characters";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    } else if (city.trim().length < 2) {
      newErrors.city = "City must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: country.trim(),
          city: city.trim(),
          visaType,
        }),
      });

      if (!res.ok) throw new Error("Failed to add alert");

      setCountry("");
      setCity("");
      setErrors({});
      toast.success("Alert added successfully!");
      refresh();
    } catch (err) {
      toast.error("Failed to add alert");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <input
          placeholder="Country"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            if (errors.country) setErrors({ ...errors, country: "" });
          }}
          className={errors.country ? "error" : ""}
        />
        {errors.country && <span className="error-text">{errors.country}</span>}
      </div>

      <div className="form-group">
        <input
          placeholder="City"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            if (errors.city) setErrors({ ...errors, city: "" });
          }}
          className={errors.city ? "error" : ""}
        />
        {errors.city && <span className="error-text">{errors.city}</span>}
      </div>

      <div className="form-group">
        <select value={visaType} onChange={(e) => setVisaType(e.target.value)}>
          <option>Tourist</option>
          <option>Business</option>
          <option>Student</option>
        </select>
      </div>

      <button type="submit">Add Alert</button>
    </form>
  );
}
