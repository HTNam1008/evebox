"use client";

import { useState } from 'react';
import EventSlider from './eventSlider';
import { Event } from '../../libs/interface/dashboard.interface';


interface TabSwitcherProps {
    sliderEvents: Event[];
    dataMonthlyRecommendedEvent: Event[];
}

export default function TabSwitcher ({ sliderEvents, dataMonthlyRecommendedEvent }: TabSwitcherProps) {
    const [activeTab, setActiveTab] = useState('weekend');

    return (
        <>
            {/* Tabs */}
            <div className="flex justify-center mt-8">
                <div className="w-full  flex gap-4 border-b border-gray-600 pb-2">
                    <button
                        className={`px-4 py-2 text-lg font-semibold ${
                            activeTab === 'weekend' ? 'border-b-4 border-green-500 text-black-500' : 'text-gray-400'
                        }`}
                        onClick={() => setActiveTab('weekend')}
                    >
                        Cuối tuần này
                    </button>
                    <button
                        className={`px-4 py-2 text-lg font-semibold ${
                            activeTab === 'month' ? 'border-b-4 border-green-500 text-black-500' : 'text-gray-400'
                        }`}
                        onClick={() => setActiveTab('month')}
                    >
                        Tháng này
                    </button>
                </div>
            </div>
            <>
                {activeTab === 'weekend' ? (
                    <EventSlider title='' events={sliderEvents} showViewMore />
                ) : (
                    <EventSlider title='' events={dataMonthlyRecommendedEvent} showViewMore />
                )}
            </>
        </>
    );
};
