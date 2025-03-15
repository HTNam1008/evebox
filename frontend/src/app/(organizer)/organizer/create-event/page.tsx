/* Package System */
import 'tailwindcss/tailwind.css';

/* Package Application */
import Sidebar from './components/common/sidebar';
import InformationEventClient from './components/infoEvent';
// import TimeAndTypeTickets from './components/time&TypeTickets';
// import Setting from './components/setting';
// import InformationPaymentClient from './components/infoPayment';
// import CreateQuestions from './components/createQuestion';

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

                {/* <InformationPaymentClient></InformationPaymentClient> */}

                {/* <CreateQuestions /> */}
            </div>
            
        </div>
    )
}

export const dynamic = 'force-dynamic';