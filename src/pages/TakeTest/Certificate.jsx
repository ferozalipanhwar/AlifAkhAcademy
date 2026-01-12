import { useEffect, useRef } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";

const Certificate = ({ result, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // High Resolution Setup
    const scale = 2; // For sharp text on retina displays
    canvas.width = 1000 * scale;
    canvas.height = 700 * scale;
    canvas.style.width = "100%";
    canvas.style.maxWidth = "800px"; // On screen size
    ctx.scale(scale, scale);

    /* ===== Background ===== */
    const bg = ctx.createLinearGradient(0, 0, 1000, 700);
    bg.addColorStop(0, "#ffffff");
    bg.addColorStop(1, "#f8fafc");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1000, 700);

    /* ===== Ornamental Border ===== */
    // Outer Gold
    ctx.strokeStyle = "#ca8a04"; // Gold-600
    ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, 960, 660);
    
    // Inner Green
    ctx.strokeStyle = "#166534"; // Green-800
    ctx.lineWidth = 4;
    ctx.strokeRect(35, 35, 930, 630);

    // Corner Ornaments (Simple Lines)
    ctx.beginPath();
    ctx.moveTo(50, 50); ctx.lineTo(150, 50);
    ctx.moveTo(50, 50); ctx.lineTo(50, 150);
    ctx.moveTo(950, 50); ctx.lineTo(850, 50);
    ctx.moveTo(950, 50); ctx.lineTo(950, 150);
    ctx.moveTo(50, 650); ctx.lineTo(150, 650);
    ctx.moveTo(50, 650); ctx.lineTo(50, 550);
    ctx.moveTo(950, 650); ctx.lineTo(850, 650);
    ctx.moveTo(950, 650); ctx.lineTo(950, 550);
    ctx.strokeStyle = "#ca8a04";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.textAlign = "center";

    /* ===== Logo / Header ===== */
    ctx.fillStyle = "#166534";
    ctx.font = "bold 24px 'Helvetica Neue', Arial";
    ctx.fillText("ALIFAKH ACADEMY", 500, 100);

    ctx.fillStyle = "#ca8a04"; // Gold color for star
    ctx.font = "20px Arial";
    ctx.fillText("★ ★ ★", 500, 130);

    /* ===== Main Title ===== */
    ctx.fillStyle = "#1f2937"; // Gray-800
    ctx.font = "bold italic 56px 'Times New Roman', serif";
    ctx.fillText("Certificate of Completion", 500, 200);

    /* ===== Presentation Line ===== */
    ctx.fillStyle = "#6b7280"; // Gray-500
    ctx.font = "italic 20px 'Times New Roman', serif";
    ctx.fillText("This is to certify that", 500, 250);

    /* ===== Student Name (Highlight) ===== */
    ctx.fillStyle = "#166534"; // Green-800
    ctx.font = "bold 48px 'Great Vibes', 'Brush Script MT', cursive"; // Script font style
    // Fallback if script font not loaded
    if(ctx.measureText("test").width < 10) ctx.font = "bold italic 40px serif"; 
    
    ctx.fillText(result.userId?.name || "Student Name", 500, 310);
    
    // Underline name
    ctx.beginPath();
    ctx.moveTo(300, 320);
    ctx.lineTo(700, 320);
    ctx.strokeStyle = "#ca8a04";
    ctx.lineWidth = 1;
    ctx.stroke();

    /* ===== Description ===== */
    ctx.fillStyle = "#374151";
    ctx.font = "20px Arial";
    ctx.fillText("Has successfully cleared the assessment for", 500, 370);

    /* ===== Test Title ===== */
    ctx.fillStyle = "#000000";
    ctx.font = "bold 28px Arial";
    ctx.fillText(result.testId?.title || "Test Module", 500, 410);

    /* ===== Stats Box ===== */
    // Draw box
    ctx.fillStyle = "#f0fdf4";
    ctx.fillRect(350, 440, 300, 80);
    ctx.strokeStyle = "#bbf7d0";
    ctx.lineWidth = 1;
    ctx.strokeRect(350, 440, 300, 80);

    // Stats Text
    ctx.fillStyle = "#166534";
    ctx.font = "bold 18px Arial";
    ctx.fillText(`Score: ${result.score} / ${result.totalMarks}`, 500, 470);
    ctx.fillStyle = "#374151";
    ctx.font = "16px Arial";
    ctx.fillText(`Performance Grade: ${result.grade}`, 500, 495);

    /* ===== Footer / Signatures ===== */
    const dateStr = new Date(result.createdAt).toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    // Date Left Side
    ctx.textAlign = "left";
    ctx.fillStyle = "#4b5563";
    ctx.font = "16px Arial";
    ctx.fillText("Date Issued:", 150, 580);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 16px Arial";
    ctx.fillText(dateStr, 150, 605);

    // Signature Right Side
    ctx.textAlign = "right";
    ctx.fillStyle = "#4b5563";
    ctx.font = "16px Arial";
    ctx.fillText("Director of Education", 850, 580);
    
    // Fake Signature
    ctx.font = "italic 24px cursive";
    ctx.fillStyle = "#166534";
    ctx.fillText("Alifakh Admin", 850, 610);

    /* ===== Valid ID ===== */
    ctx.textAlign = "center";
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px Arial";
    ctx.fillText(`Certificate ID: ${result._id}`, 500, 660);

  }, [result]);

  const downloadCertificate = () => {
    const link = document.createElement("a");
    link.download = `Certificate-${result.userId?.name || 'Student'}.png`;
    link.href = canvasRef.current.toDataURL("image/png", 1.0);
    link.click();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-700">Certificate Preview</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <FaTimes />
          </button>
        </div>

        {/* Canvas Area */}
        <div className="p-6 bg-gray-100 flex justify-center overflow-auto">
          <canvas 
            ref={canvasRef} 
            className="shadow-xl rounded bg-white" 
            style={{ width: "100%", maxWidth: "800px", height: "auto" }}
          />
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t bg-white flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button
            onClick={downloadCertificate}
            className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 shadow-lg shadow-green-200 transition flex items-center gap-2"
          >
            <FaDownload /> Download Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;