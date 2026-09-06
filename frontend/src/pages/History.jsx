import { useEffect, useState } from "react";
import { getWasteHistory } from "../services/wasteService";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getWasteHistory();
      setHistory(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Waste Scan History</h1>

      {history.length === 0 ? (
        <p>No Scan History Found</p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <img
              src={item.image}
              alt="Waste"
              width="250"
            />

            <p><strong>Waste:</strong> {item.waste_type}</p>

            <p><strong>Confidence:</strong> {item.confidence_score}%</p>

            <p><strong>Recommendation:</strong> {item.recommendation}</p>

            <p><strong>Date:</strong> {item.created_at}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;