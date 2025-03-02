/* Package System */
import 'tailwindcss/tailwind.css';
import 'swiper/css';
import 'swiper/css/navigation';

/* Package Application */
import '@/styles/admin/pages/Dashboard.css';
import ImageSlider from './components/dashboard/imageSlider';
import SearchControls from './components/dashboard/searchControls';
// import Error from './components/dashboard/error';
import EventSection from './components/dashboard/eventSection';

const Dashboard = () => {
    // const slides = fetchData();
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
                    <EventSection/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
