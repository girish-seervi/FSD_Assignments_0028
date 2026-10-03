import React from 'react';

const features = [
  {
    title: "Trainer Series",
    description: "Exercise with your favorite trainer in our new Trainer Series programs.",
    cta: "View Series",
    image: "https://cloudfront.fitnessblender.com/assets/img/homepage/trainer-series-1440.png",
    bgColor: "bg-[#f1e6db]", // bg-sand
    textColor: "text-gray-900",
    btnColor: "bg-gray-900 text-white hover:bg-gray-800"
  },
  {
    title: "Earn a Free Plus Membership",
    description: "Share your referral code and every sign up earns rewards to put toward your membership.",
    cta: "Learn About Rewards",
    image: "https://cloudfront.fitnessblender.com/assets/img/about/reward-1440.png",
    bgColor: "bg-[#91a6c4]", // bg-lavender-teal roughly
    textColor: "text-white",
    btnColor: "bg-white text-gray-900 hover:bg-gray-100"
  },
  {
    title: "Small Footprint\nBig Gains",
    description: "The perfect dumbbells for any space. Use discount code FBXPB20 for $20 off an order of $200 or more.",
    cta: "Shop PowerBlock",
    image: "https://cloudfront.fitnessblender.com/assets/img/homepage/pb-50-1440.png",
    bgColor: "bg-[#435265]", // bg-dusk roughly
    textColor: "text-white",
    btnColor: "bg-white text-gray-900 hover:bg-gray-100"
  },
  {
    title: "Specialty Content",
    description: "Pilot programs provide special content tailored to smaller audiences, conditions, or life events.",
    cta: "Browse Pilot Programs",
    image: "https://cloudfront.fitnessblender.com/assets/img/homepage/pilot-programs-1440.png",
    bgColor: "bg-[#acc655]", // bg-green-lime roughly
    textColor: "text-white",
    btnColor: "bg-white text-gray-900 hover:bg-gray-100"
  },
  {
    title: "Workout Videos",
    description: "Exercise with certified personal trainers whether you're at home or on the road.",
    cta: "Find a Workout",
    image: "https://cloudfront.fitnessblender.com/assets/img/homepage/workouts-1440.png",
    bgColor: "bg-[#7c8b9b]", // bg-steel-grey roughly
    textColor: "text-white",
    btnColor: "bg-white text-gray-900 hover:bg-gray-100"
  },
  {
    title: "Supportive Community",
    description: "Stay motivated and engaged with a little help from a supportive community of other members.",
    cta: "Visit Community",
    image: "https://cloudfront.fitnessblender.com/assets/img/homepage/community-1440.png",
    bgColor: "bg-[#f5e3d7]", // slightly different sand/community color
    textColor: "text-gray-900",
    btnColor: "bg-gray-900 text-white hover:bg-gray-800"
  }
];

const FeatureGrid = () => {
  return (
    <section className="w-full flex flex-wrap">
      {features.map((feature, index) => (
        <div key={index} className={`w-full md:w-1/2 flex flex-col ${feature.bgColor} relative overflow-hidden`}>
          <div className="flex-1 flex flex-col items-center text-center px-6 pt-16 pb-12 z-10">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 whitespace-pre-line ${feature.textColor}`}>
              {feature.title}
            </h2>
            <p className={`text-lg mb-8 max-w-md ${feature.textColor} opacity-90`}>
              {feature.description}
            </p>
            <a 
              href="#" 
              className={`inline-block py-3 px-8 rounded font-bold uppercase tracking-wide text-sm transition-colors shadow-sm ${feature.btnColor}`}
            >
              {feature.cta}
            </a>
          </div>
          <div className="w-full h-[400px] mt-auto">
            <img 
              src={feature.image} 
              alt={feature.title}
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureGrid;
