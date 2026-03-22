import Link from 'next/link';
import connectDB from '../../lib/mongodb'; 
import Car from '../../../models/Car';

async function getCar(id) {
  try {
    await connectDB();
    const car = await Car.findById(id);
    return car;
  } catch (error) {
    console.error("Error fetching car details:", error);
    return null;
  }
}

export default async function CarDetails({ params }) {
  const { id } = await params; 
  const car = await getCar(id);

  if (!car) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Vehicle Not Found</h1>
          <Link href="/" className="text-blue-500 hover:underline">Go back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation / Back Button */}
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-blue-500 transition mb-10 group text-sm font-bold">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> BACK TO INVENTORY
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Image Section */}
          <div className="space-y-6">
            <div className="aspect-video relative overflow-hidden rounded-[2.5rem] border border-slate-800 shadow-2xl">
              <img 
                src="car.image" 
                className="w-full h-full object-cover"
                alt={car.brand}
              />
            </div>
            {/* Thumbnails Placeholder */}
            <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square bg-slate-900 rounded-2xl border border-slate-800"></div>
               ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {car.year} Model
              </span>
              <div className="h-px w-10 bg-slate-800"></div>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Performance Series</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight uppercase">
              {car.brand} <br />
              <span className="text-blue-500">{car.model}</span>
            </h1>

            <div className="space-y-6 mb-10">
              <p className="text-slate-400 leading-relaxed text-lg">
                {car.description || "No specific details provided for this vehicle. Please contact the seller for more information."}
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 mb-10">
              <p className="text-slate-500 text-xs font-bold uppercase mb-2">Buy it for</p>
              <h2 className="text-5xl font-black text-white">
                {car.price.includes("Rs") ? car.price : `Rs. ${car.price}`}
              </h2>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-white text-black hover:bg-blue-600 hover:text-white py-5 rounded-2xl font-black text-sm transition-all duration-300 shadow-xl shadow-white/5">
                CONTACT SELLER
              </button>
              <button className="bg-slate-900 border border-slate-800 px-8 py-5 rounded-2xl hover:bg-slate-800 transition text-xl">
                ❤
              </button>
            </div>
          </div>

        </div>

        {/* Technical Specs Summary */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-slate-900">
          <div>
            <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Condition</p>
            <p className="text-white font-bold">Registered</p>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Fuel Type</p>
            <p className="text-white font-bold">Petrol/Hybrid</p>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Transmission</p>
            <p className="text-white font-bold">Automatic</p>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Seller Location</p>
            <p className="text-white font-bold">Colombo, LK</p>
          </div>
        </div>
      </div>
    </main>
  );
}