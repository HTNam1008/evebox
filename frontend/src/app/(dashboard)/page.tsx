console.log('dashboard - Rendering on client:', typeof window !== 'undefined');

import 'tailwindcss/tailwind.css';
import '@/styles/admin/pages/Dashboard.css';
import 'swiper/css';
import 'swiper/css/navigation';
import EventSlider from './components/dashboard/eventSlider';
import ImageSlider from './components/dashboard/imageSlider';
import SearchControls from './components/dashboard/searchControls';

// server componet - SSR
async function fetchData() {
    try {
        // const resSlides = await fetch('http://localhost:3001/api/discovery/banner');
        // const slides: Slide[] = await resSlides.json();
        const mockData = [
            {
                image: "../../../images/dashboard/presentation_pic.png",
                title: "MADE FOR THOSE",
                subtitle: "WHO DO"
            },
            {
                image: "../../../images/dashboard/presentation_pic.png",
                title: "DISCOVER EVENTS",
                subtitle: "NEAR YOU"
            },
            {
                image: "../../../images/dashboard/presentation_pic.png",
                title: "JOIN THE",
                subtitle: "COMMUNITY"
            }
        ];
        // return Array.isArray(slides) ? slides : mockData;
        return mockData;
    } catch (err) {
        console.error('Failed to fetch data:', err);
        return [];
    }
}

const Dashboard = async () => {
    const slides = await fetchData();
    const events = [1, 2, 3, 4, 5, 6, 7, 8];
    await new Promise(resolve => setTimeout(resolve, 1500));

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                <div className="w-full flex justify-center flex-col items-center px-4 md:mt-8">
                    <div className="w-full md:w-5/6 relative">
                        <ImageSlider slides={slides} />
                        <SearchControls />
                    </div>
                </div>

                <div className="mt-36"></div>

                {/* Events Section */}
                <div className="flex justify-center mt-8 px-4">
                    <div className="w-full md:w-5/6">
                        <EventSlider
                            title="Sự kiện"
                            subtitle="Đặc biệt"
                            events={events}
                        />
                        
                        <div className='mt-8'>
                            <EventSlider
                                title="Sự kiện"
                                subtitle="Đặc sắc"
                                events={events}
                            />
                        </div>

                        <div className='mt-8'>
                            <EventSlider
                                title="Sân khấu & Nghệ thuật"
                                events={events}
                                showViewMore={true}
                            />
                        </div>

                        <div className='mt-8'>
                            <EventSlider
                                title="Thể loại khác"
                                events={events}
                                showViewMore={true}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
