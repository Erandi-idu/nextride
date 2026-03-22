"use client";
import { useState } from "react";
import Link from "next/link";

export default function SellCar() {
  // Define state for form inputs
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    price: "",
    year: "",
    description: ""
  });

  // State for selected image and loading status
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!image) return "";
    
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "nextride_preset"); 

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dhit4resc/image/upload", {
        method: "POST",
        body: data,
      });
      const file = await res.json();
      return file.secure_url; // Returns the Cloudinary image link
    } catch (err) {
      console.error("Cloudinary Error:", err);
      return "";
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upload image first
      const imageUrl = await uploadImage();

      // 2. Send data to our MongoDB API
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: imageUrl }),
      });

      if (res.ok) {
        alert("Car Ad Posted Successfully!");
        // Reset form after success
        setFormData({ brand: "", model: "", price: "", year: "", description: "" });
        setImage(null);
      } else {
        alert("Failed to save to database");
      }
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 px-6 pb-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-slate-500 text-xs font-bold mb-8 inline-block hover:text-white transition">
          ← BACK TO HOME
        </Link>
        
        <h1 className="text-4xl font-black mb-10 text-center tracking-tight">SELL YOUR <span className="text-blue-500">RIDE</span></h1>
        
        <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-[2.5rem] space-y-6 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Brand</label>
              <input 
                type="text" placeholder="Toyota, BMW, etc." required
                className="w-full bg-slate-800/50 p-4 rounded-2xl outline-none border border-slate-700 focus:border-blue-500 transition"
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                value={formData.brand}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Model</label>
              <input 
                type="text" placeholder="Prius, M4, etc." required
                className="w-full bg-slate-800/50 p-4 rounded-2xl outline-none border border-slate-700 focus:border-blue-500 transition"
                onChange={(e) => setFormData({...formData, model: e.target.value})}
                value={formData.model}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Price (LKR)</label>
              <input 
                type="text" placeholder="e.g. 12,500,000" required
                className="w-full bg-slate-800/50 p-4 rounded-2xl outline-none border border-slate-700 focus:border-blue-500 transition"
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                value={formData.price}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Year</label>
              <input 
                type="number" placeholder="2022" required
                className="w-full bg-slate-800/50 p-4 rounded-2xl outline-none border border-slate-700 focus:border-blue-500 transition"
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                value={formData.year}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Upload Car Photo</label>
            <input 
              type="file" accept="image/*" required
              className="w-full bg-slate-800/30 p-4 rounded-2xl border border-dashed border-slate-700 file:bg-blue-600 file:border-none file:text-white file:px-4 file:py-1 file:rounded-lg file:mr-4 file:cursor-pointer"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Description</label>
            <textarea 
              placeholder="Tell more about the car condition..." rows="4"
              className="w-full bg-slate-800/50 p-4 rounded-2xl outline-none border border-slate-700 focus:border-blue-500 transition"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              value={formData.description}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? "PROCESSSING..." : "POST MY ADVERTISEMENT"}
          </button>
        </form>
      </div>
    </main>
  );
}