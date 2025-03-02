import 'tailwindcss/tailwind.css';

export default function DashboardLoading() {
    return (
        <div className="animate-pulse">
            {/* Navigation Bar Skeleton */}
            {/* <div className="fixed top-0 left-0 right-0 bg-sky-900 h-16 z-50">
                <div className="w-full px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
                        <div className="w-18 h-9 bg-gray-300 rounded"></div>
                        <div className="w-20 h-6 bg-gray-300 rounded hidden sm:block"></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-8 bg-gray-300 rounded"></div>
                        <div className="w-24 h-8 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div> */}

            {/* Main Content */}
            <div className="min-h-screen flex flex-col mt-16">
                {/* Image Slider Skeleton */}
                <div className="w-full flex justify-center flex-col items-center px-4 md:mt-8">
                    <div className="w-full md:w-5/6 relative">
                        <div className="h-[500px] bg-gray-300 rounded-lg"></div>
                        
                        {/* Search Controls Skeleton */}
                        <div className="absolute left-0 right-0 -bottom-20 mx-auto w-full md:w-11/12 px-4">
                            <div className="bg-sky-900 p-6 rounded-lg shadow-lg">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className="flex-1 h-20 bg-gray-300 rounded"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Sliders Skeleton */}
                <div className="flex justify-center mt-36 px-4">
                    <div className="w-full md:w-5/6">
                        {[1,2,3,4].map(section => (
                            <div key={section} className="mt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-48 h-8 bg-gray-300 rounded"></div>
                                    <div className="w-24 h-6 bg-gray-300 rounded"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    {[1,2,3,4].map(card => (
                                        <div key={card} className="bg-gray-300 rounded-lg h-64"></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Skeleton */}
            {/* <div className="w-full bg-sky-900 mt-12 py-12">
                <div className="flex flex-col items-center gap-8">
                    <div className="w-48 h-8 bg-gray-300 rounded"></div>
                    <div className="w-72 h-10 bg-gray-300 rounded"></div>
                    <div className="flex gap-4">
                        {[1,2,3,4,5].map(i => (
                            <div key={i} className="w-20 h-6 bg-gray-300 rounded"></div>
                        ))}
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export function EventSliderLoading() {
    return (
        <div className="animate-pulse">
            {/* Navigation Bar Skeleton */}
            {/* <div className="fixed top-0 left-0 right-0 bg-sky-900 h-16 z-50">
                <div className="w-full px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
                        <div className="w-18 h-9 bg-gray-300 rounded"></div>
                        <div className="w-20 h-6 bg-gray-300 rounded hidden sm:block"></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-8 bg-gray-300 rounded"></div>
                        <div className="w-24 h-8 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div> */}

            {/* Main Content */}
            <div className="min-h-screen flex flex-col mt-16">
                {/* Event Sliders Skeleton */}
                <div className="flex justify-center mt-36 px-4">
                    <div className="w-full md:w-5/6">
                        {[1,2,3,4].map(section => (
                            <div key={section} className="mt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-48 h-8 bg-gray-300 rounded"></div>
                                    <div className="w-24 h-6 bg-gray-300 rounded"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    {[1,2,3,4].map(card => (
                                        <div key={card} className="bg-gray-300 rounded-lg h-64"></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Skeleton */}
            {/* <div className="w-full bg-sky-900 mt-12 py-12">
                <div className="flex flex-col items-center gap-8">
                    <div className="w-48 h-8 bg-gray-300 rounded"></div>
                    <div className="w-72 h-10 bg-gray-300 rounded"></div>
                    <div className="flex gap-4">
                        {[1,2,3,4,5].map(i => (
                            <div key={i} className="w-20 h-6 bg-gray-300 rounded"></div>
                        ))}
                    </div>
                </div>
            </div> */}
        </div>
    )
}