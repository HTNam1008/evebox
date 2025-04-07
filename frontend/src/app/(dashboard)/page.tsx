/* Package System */
import 'tailwindcss/tailwind.css';
import 'swiper/css';
import 'swiper/css/navigation';

/* Package Application */
import '@/styles/admin/pages/Dashboard.css';
import EventSlider from './components/dashboard/eventSlider';
import ImageSlider from './components/dashboard/imageSlider';
import SearchControls from './components/dashboard/searchControls';
import { CategorySpecial } from '@/types/model/frontDisplay';
// import { fetchEvents } from './libs/server/fetchEvents';
// import { fetchRecommendEvents } from './libs/server/fetchRecommendEvents';
import { getFrontDisplayEvents, getRecommendedEvents } from '@/lib/server/event.api';
import TabSwitcher from '../(dashboard)/components/dashboard/tabSwitcher'; // Import the new client component

const Dashboard = async () => {
    const data = await getFrontDisplayEvents();
    const weekTime = 'week';
    const monthTime = 'month';
    const dataMonthlyRecommendedEvent = await getRecommendedEvents(monthTime);
    const dataImageSlider = await getRecommendedEvents(weekTime);

    const events = {
        specialEvents: data.data.specialEvents || [],
        trendingEvents: data.data.trendingEvents || [],
        onlyOnEve: data.data.onlyOnEve || [],
        categorySpecial: data.data.categorySpecial as CategorySpecial[] || [],
    };

    const sliderMontlyEvents = dataMonthlyRecommendedEvent.data || [];


    const sliderEvents = dataImageSlider.data || [];

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                <div className="w-full flex justify-center flex-col items-center px-4 md:mt-8">
                    <div className="w-full md:w-5/6 relative">
                        <ImageSlider events={sliderEvents} />
                        <SearchControls />
                    </div>
                </div>

                <div className="mt-36"></div>

                {/* Events Section */}
                <div className="flex justify-center mt-8 px-4">
                    <div className="w-full md:w-5/6">
                        <EventSlider title="special" subtitle="specialEvent" events={events.specialEvents} />
                        <div className="mt-8">
                            <EventSlider title="trending" subtitle="trendingEvent" events={events.trendingEvents} />
                        </div>
                        <div className="mt-8">
                            <EventSlider title="onlyOnEve" subtitle="onlyOnEveEvent" events={events.onlyOnEve} showViewMore />
                        </div>

                        {/* Client-side TabSwitcher */}
                        <TabSwitcher 
                            sliderEvents={sliderEvents}
                            dataMonthlyRecommendedEvent={sliderMontlyEvents}
                        />

                        {events.categorySpecial?.map((category, index) => (
                            <div key={index} className="mt-8">
                                <EventSlider title={category.category.name} events={category.events} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
export const dynamic = 'force-dynamic';
