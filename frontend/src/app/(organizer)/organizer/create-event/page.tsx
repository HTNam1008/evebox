/* Package System */
import 'tailwindcss/tailwind.css';

/* Package Application */
import Sidebar from './components/common/sidebar';
import InformationEventClient from './components/info-event/page';
// import TimeAndTypeTickets from './components/time-type/page';
// import Setting from './components/info-setting/page';
// import InformationPaymentClient from './components/info-payment/page';
// import CreateQuestions from './components/info-regis/page';

export default async function Page() {

    return (
        <div className="flex min-h-screen">
            {/* Sidebar có chiều rộng cố định và không đè lên nội dung */}
            <div className="w-64 bg-gray-900 mr-6">
                <Sidebar />
            </div>

            <div className='w-full flex flex-col'>
                <InformationEventClient></InformationEventClient>

                {/* <TimeAndTypeTickets></TimeAndTypeTickets> */}

                {/* <Setting></Setting> */}

                {/* <CreateQuestions /> */}

                {/* <InformationPaymentClient></InformationPaymentClient> */}
            </div>

        </div>
    )
}

export const dynamic = 'force-dynamic';