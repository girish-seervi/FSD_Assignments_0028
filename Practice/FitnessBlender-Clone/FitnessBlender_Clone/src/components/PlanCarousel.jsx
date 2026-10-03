import React from 'react';

const plans = [
  {
    category: "Join a Free Challenge",
    title: "Fitness Blender's Free 2 Week Challenge",
    subtitle: "Strength Training, Cardio, and Mobility Workouts for a Strong Body and Mind",
    duration: "2 Weeks",
    time: "31 Min/Day",
    image: "https://d18zdz9g6n5za7.cloudfront.net/plan/320/320-15649-fitness-blenders-free-2-week-challenge-98aa.jpg" // Note: updated logic for direct cdn url for images later, using placeholders for now if exact url is complex
  },
  {
    category: "Start With The Basics",
    title: "5 Day Challenge Trainer Series: Essentials with Erica",
    subtitle: "Beginner-Friendly Total Body Strength Training with Cardio",
    duration: "1 Week",
    time: "35 Min/Day",
    image: "https://d18zdz9g6n5za7.cloudfront.net/plan/320/320-15647-5-day-challenge-trainer-series-essentials-with-erica-8eba.jpg"
  },
  {
    category: "Get Stronger",
    title: "5 Day Challenge Trainer Series: Level Up with Tasha",
    subtitle: "Time Under Tension Strength with Cardio for Muscle Growth",
    duration: "1 Week",
    time: "42 Min/Day",
    image: "https://d18zdz9g6n5za7.cloudfront.net/plan/320/320-15454-5-day-challenge-trainer-series-level-up-with-tasha-a267.jpg"
  },
  {
    category: "Commit to 4 Weeks",
    title: "FB 30: 30 Day Team Program",
    subtitle: "A Mix of Strength, Cardio, and Mobility Training Types",
    duration: "4 Weeks",
    time: "30 Min/Day",
    image: "https://d18zdz9g6n5za7.cloudfront.net/plan/320/320-15494-fb30-30-day-team-program-a-mix-of-strength-cardio-and-mobility-training-types-8cce.jpg"
  }
];

const PlanCarousel = () => {
  return (
    <section className="py-20 bg-[#f4f7f8]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Not sure where to start?</h2>
        <p className="text-lg text-gray-600">Programs offer day-to-day guidance on an interactive calendar to keep you on track.</p>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8">
          {plans.map((plan, idx) => (
            <div key={idx} className="min-w-[300px] md:min-w-[340px] flex flex-col snap-start">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">{plan.category}</h3>
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex-1 flex flex-col cursor-pointer group transition-transform hover:-translate-y-1">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  {/* Using gray backgrounds as placeholders if image URL fails */}
                  <img src={plan.image} alt={plan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => {e.target.style.display = 'none'}} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{plan.title}</h4>
                  <p className="text-sm text-gray-600 mb-4 flex-1">{plan.subtitle}</p>
                  <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase">
                    <span>{plan.duration}</span>
                    <span>{plan.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="/plans" className="text-blue-600 font-bold hover:underline">View All Programs</a>
        </div>
      </div>
    </section>
  );
};

export default PlanCarousel;
