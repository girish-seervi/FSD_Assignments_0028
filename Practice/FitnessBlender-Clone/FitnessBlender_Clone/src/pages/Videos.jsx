import React from 'react';
import { Search, Filter, PlayCircle } from 'lucide-react';

const mockVideos = [
  { id: 1, title: 'Upper Body Strength Training', length: '40 Min', difficulty: '3/5', image: 'https://d18zdz9g6n5za7.cloudfront.net/video/320/320-802-upper-body-strength-training-918b.jpg' },
  { id: 2, title: 'HIIT Cardio and Core', length: '35 Min', difficulty: '4/5', image: 'https://d18zdz9g6n5za7.cloudfront.net/video/320/320-798-hiit-cardio-and-core-9a81.jpg' },
  { id: 3, title: 'Lower Body Active Stretch', length: '20 Min', difficulty: '2/5', image: 'https://d18zdz9g6n5za7.cloudfront.net/video/320/320-796-lower-body-active-stretch-7a2e.jpg' },
  { id: 4, title: 'Kettlebell Strength', length: '45 Min', difficulty: '4/5', image: 'https://d18zdz9g6n5za7.cloudfront.net/video/320/320-793-kettlebell-strength-82b4.jpg' },
  { id: 5, title: 'Low Impact Cardio', length: '25 Min', difficulty: '1/5', image: 'https://d18zdz9g6n5za7.cloudfront.net/video/320/320-785-low-impact-cardio-9b1c.jpg' },
  { id: 6, title: 'Total Body Pilates', length: '30 Min', difficulty: '3/5', image: 'https://d18zdz9g6n5za7.cloudfront.net/video/320/320-780-total-body-pilates-7e3d.jpg' }
];

export default function Videos() {
  return (
    <div className="bg-[#f4f7f8] min-h-screen pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6">
          <h1 className="text-3xl font-black text-gray-900">Workout Videos</h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 mt-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded shadow-sm p-4 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold uppercase tracking-wider text-sm">Filters</h2>
              <Filter size={16} className="text-gray-500" />
            </div>

            <div className="space-y-6">
              {/* Filter Group */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 border-b pb-1">Difficulty</h3>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(level => (
                    <label key={level} className="flex items-center space-x-2 text-sm text-gray-600">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Level {level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3 border-b pb-1">Duration</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <label className="flex items-center space-x-2"><input type="checkbox" /><span>&lt; 10 Min</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" /><span>10 - 20 Min</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" /><span>20 - 30 Min</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" /><span>30 - 45 Min</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" /><span>45+ Min</span></label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Video Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold text-gray-500">{mockVideos.length} Videos Found</span>
            <div className="relative">
              <input type="text" placeholder="Search videos..." className="pl-3 pr-10 py-2 border rounded shadow-sm text-sm focus:outline-blue-500" />
              <Search size={16} className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVideos.map(video => (
              <div key={video.id} className="bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <img src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => e.target.style.display = 'none'} />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle size={48} className="text-white drop-shadow-md" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">{video.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 uppercase font-semibold">
                    <span>{video.length}</span>
                    <span>Level {video.difficulty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}