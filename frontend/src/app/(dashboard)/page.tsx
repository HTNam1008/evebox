'use client';
console.log('dashboard - Rendering on client:', typeof window !== 'undefined');

/* Package System */
import 'tailwindcss/tailwind.css';
import 'swiper/css';
import 'swiper/css/navigation';

/* Package Application */
import '@/styles/admin/pages/Dashboard.css';
import EventSlider from './components/dashboard/eventSlider';
import ImageSlider from './components/dashboard/imageSlider';
import SearchControls from './components/dashboard/searchControls';
import { useFetchEvents } from './libs/hooks/useFetchEvents';
import mapCategoryName from './libs/functions/mapCategoryName';


const Dashboard = () => {
    // const slides = fetchData();
    const { events, loading, error } = useFetchEvents();
    if (loading) {
      return <div>Loading events...</div>;
    }
  
    if (error) {
        throw new Error("500 - Internal Server Error"); // This triggers `error.tsx`
      }

    const { specialEvents, trendingEvents, onlyOnEve, categorySpecial } = events;
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                <div className="w-full flex justify-center flex-col items-center px-4 md:mt-8">
                    <div className="w-full md:w-5/6 relative">
                        <ImageSlider />
                        <SearchControls />
                    </div>
                </div>

                <div className="mt-36"></div>

                {/* Events Section */}
                <div className="flex justify-center mt-8 px-4">
                    <div className="w-full md:w-5/6">
                        <EventSlider title="Sự kiện" subtitle="Đặc biệt" events={specialEvents} />
                        <div className="mt-8">
                            <EventSlider title="Sự kiện" subtitle="Xu hướng" events={trendingEvents} />
                        </div>
                        <div className="mt-8">
                            <EventSlider title="Sự kiện" subtitle="Đặc sắc" events={onlyOnEve} showViewMore />
                        </div>

                        {categorySpecial?.map((category, index) => (
                            <div key={index} className="mt-8">
                                <EventSlider title={mapCategoryName(category.category.name)} events={category.events} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
