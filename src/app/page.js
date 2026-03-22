import Link from 'next/link';
import AnimatedHero from './components/AnimatedHero';
import DeleteButton from './components/DeleteButton'; 
import connectDB from './lib/mongodb';
import Car from '../models/Car';

// Function to fetch cars from the database with search support
async function getCars(searchQuery) {
  try {
    await connectDB();
    
    let query = {};
    if (searchQuery) {
      // Create a search filter for brand or model
      query = {
        $or: [
          { brand: { $regex: searchQuery, $options: 'i' } },
          { model: { $regex: searchQuery, $options: 'i' } }
        ]
      };
    }

    // Get cars from DB, newest ones at the top
    const cars = await Car.find(query).sort({ createdAt: -1 });
    return cars;
  } catch (error) {
    console.error("Database connection/fetch error:", error);
    return [];
  }
}

export default async function Home({ searchParams }) {
  // Extract search term from URL parameters (await is needed in Next.js 15)
  const search = (await searchParams).search || ""; 
  const cars = await getCars(search);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      
      {/* 1. STICKY NAVIGATION BAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition">
            NEXT<span className="text-blue-500">RIDE</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-blue-400 transition font-semibold">Buy Cars</Link>
            <Link href="/sell" className="hover:text-blue-400 transition font-semibold">Sell Your Car</Link>
          </div>

          <Link href="/sell">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-bold transition shadow-lg shadow-blue-500/20">
              Post an Ad
            </button>
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION WITH ANIMATIONS */}
      <AnimatedHero />

      {/* 3. CAR LISTINGS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">
            {search ? `Results for "${search}"` : "Recently Added Listings"}
          </h2>
          <div className="h-px flex-1 bg-slate-800 mx-8 hidden md:block"></div>
          {search && (
            <Link href="/" className="text-slate-500 text-xs font-bold hover:text-white transition-all">
              CLEAR SEARCH
            </Link>
          )}
        </div>
        
        {cars.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-slate-800 rounded-[3rem] bg-slate-900/10">
            <p className="text-slate-500 text-lg italic mb-4">No vehicles matched your search.</p>
            <Link href="/" className="text-blue-500 font-bold hover:underline">View All Cars</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cars.map((car) => (
              <div key={car._id.toString()} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/40 transition-all duration-500 group shadow-2xl">
                
                {/* Image Wrapper */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                   src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"} 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={car.brand} 
                  />
                  <div className="absolute top-5 left-5 bg-slate-950/90 backdrop-blur-md text-[10px] font-black px-3 py-1.5 rounded-full border border-slate-800 tracking-widest">
                    {car.year}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                      {car.brand} {car.model}
                    </h3>
                    {/* Delete Link Component */}
                    <DeleteButton carId={car._id.toString()} />
                  </div>
                  
                  <p className="text-slate-500 text-sm mb-8 line-clamp-1 italic">
                    {car.description || "Premium performance vehicle listing."}
                  </p>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-slate-800/50">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Asking Price</p>
                      <span className="text-2xl font-black text-white">
                        {car.price.includes("Rs") ? car.price : `Rs. ${car.price}`}
                      </span>
                    </div>
                    <Link href={`/car/${car._id}`}>
                      <button className="bg-white text-black hover:bg-blue-600 hover:text-white text-[10px] font-black px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-xl shadow-white/5">
                        DETAILS
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
      {/* 4. FOOTER SECTION */}
      <footer className="mt-20 border-t border-slate-900 bg-slate-950/50 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-black tracking-tighter text-white mb-6">
              NEXT<span className="text-blue-500">RIDE</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              The premium destination for buying and selling performance machines in Sri Lanka.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">Navigation</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li><Link href="/" className="hover:text-blue-500 transition">Inventory</Link></li>
              <li><Link href="/sell" className="hover:text-blue-500 transition">Post Advertisement</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition">Leasing Partners</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">Connect</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li>Colombo, Sri Lanka</li>
              <li>support@nextride.lk</li>
              <li>+94 11 234 5678</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 text-center text-slate-700 text-[10px] font-bold tracking-[0.3em] uppercase">
          © 2025 NEXTRIDE PREMIUM MARKETPLACE. ALL RIGHTS RESERVED.
        </div>
      </footer>

    </main>
  );
}