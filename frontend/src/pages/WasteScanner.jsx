import { useState } from "react";
import { scanWaste } from "../services/wasteService";

function WasteScanner() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };


  const handleScan = async () => {

    if (!image) {
      alert("Please select an image");
      return;
    }


    const formData = new FormData();

    formData.append("image", image);


    try {

      setLoading(true);

      const data = await scanWaste(formData);

      setResult(data);


    } catch (error) {

      console.log(error);

      alert("Scan failed");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div style={{
      padding: "30px",
      maxWidth: "600px",
      margin: "auto"
    }}>


      <h1>♻️ AI Waste Scanner</h1>


      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />


      {
        preview && (

          <div style={{marginTop:"20px"}}>

            <h3>Selected Image</h3>

            <img
              src={preview}
              alt="preview"
              width="300"
              style={{
                borderRadius:"10px"
              }}
            />

          </div>

        )
      }



      <br/>


      <button
        onClick={handleScan}
        disabled={loading}
        style={{
          padding:"10px 25px",
          cursor:"pointer"
        }}
      >

        {loading ? "Analysing..." : "Scan Waste"}

      </button>



      {
        result && (

          <div
            style={{
              marginTop:"30px",
              padding:"20px",
              border:"1px solid #ddd",
              borderRadius:"15px"
            }}
          >

            <h2>Result</h2>


            <h3>
              🗑️ {result.waste_type}
            </h3>


            <p>
              Confidence:
              <b> {result.confidence_score}%</b>
            </p>


            <div
              style={{
                width:"100%",
                background:"#ddd",
                height:"15px",
                borderRadius:"10px"
              }}
            >

              <div
                style={{
                  width:`${result.confidence_score}%`,
                  height:"15px",
                  background:"green",
                  borderRadius:"10px"
                }}
              />

            </div>


            <p style={{marginTop:"20px"}}>
              💡 {result.recommendation}
            </p>


          </div>

        )
      }


    </div>

  );
}


export default WasteScanner;