'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import EventSlider from "./eventSlider";
import { useFetchEvents } from "../../libs/hooks/useFetchEvents";
import mapCategoryName from '../../libs/functions/mapCategoryName';
import {EventSliderLoading} from '../../loading';


const EventSection = () => {
    const { events, loading, error } = useFetchEvents();
    if (loading) {
      return <EventSliderLoading />;
    }
  
    if (error) {
        throw new Error("500 - Internal Server Error"); // This triggers `error.tsx`
    }

    const { specialEvents, trendingEvents, onlyOnEve, categorySpecial } = events;
    return (
        <>
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
       </>
    );
};
  
  export default EventSection;
  