import { ShoppingBag, Award } from 'lucide-react';

export default function TennisShopLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                  New Collection 2025
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                Elevate Your
                <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Tennis Game
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Premium rackets, apparel, and accessories for players who demand excellence on every serve.
              </p>
              <div className="flex gap-4">
                <button className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300">
                  Explore
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-blue-600 rounded-3xl p-1">
                <div className="bg-white rounded-3xl p-8 flex items-center justify-center min-h-[500px]">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Award className="w-16 h-16 text-white" />
                    </div>
                    <div className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      #1
                    </div>
                    <p className="text-gray-600 font-medium">Rated Tennis Store</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

