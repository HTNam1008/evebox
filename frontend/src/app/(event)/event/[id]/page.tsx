'use client';

import { useFetchEventDetail } from '../../libs/hooks/useFetchEventDetail';
import EventDetailClient from '../components/eventDetail';
import EventLoading from './loading';

// Fetch dữ liệu trong Server Component
export default  function EventDetail({ params }: { params: { id: string } }) {
    // let event = null;
    // const event = {
    //     id: id,
    //     title: 'Dream world wide in jakatra',
    //     description: 'DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. The workshop taught participants the magic of creating stunning 3D models and animations using Blender. It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, which added to the excitement.',
    //     date: '0:00 - 23:00, 25 tháng 10, 2024',
    //     location: 'Đường Nguyễn Huệ, Quận 1, TP.HCM',
    // };
    /* try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
            // cache: 'no-store', // Đảm bảo luôn lấy dữ liệu mới từ server
        });
        if (response.ok) {
            event = await response.json();
        }
    } catch (error) {
        console.error('Error fetching event:', error);
    }

    // Trường hợp không tìm thấy sự kiện
    if (!event) {
        return <div>Event not found</div>;
    } */

    const { event, loading, error } = useFetchEventDetail(params.id);

    if (loading)  return <EventLoading />;
    if (error) return <div>{error}</div>;
    if (!event) return <div>Event not found</div>;

    return (
        <div>
            {/* <NavigationBar /> */}
            <EventDetailClient event={event} />
            {/* <Footer /> */}
        </div>
    );
}
