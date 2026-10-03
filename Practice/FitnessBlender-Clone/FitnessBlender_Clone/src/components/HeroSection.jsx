import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full bg-[#00b0e5] overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="w-full md:w-1/2 px-8 py-16 md:py-24 lg:px-20 text-white flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Feel Great.<br /> Body and Mind.
          </h1>
          <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-lg font-medium">
            Choose from hundreds of workouts, healthy recipes, relaxing meditations, and expert articles, for a whole body and mind approach to feeling great.
          </p>
          <div>
            <a href="/membership" className="inline-block bg-white text-gray-900 font-bold py-4 px-10 rounded shadow-sm hover:bg-gray-100 transition-colors uppercase text-sm tracking-wider">
              Join Now
            </a>
          </div>
        </div>

        {/* Image Content */}
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px]">
          <img 
            src="https://cloudfront.fitnessblender.com/assets/img/homepage/team-2024-1440.png" 
            alt="Fitness Blender trainer group picture" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
