import {FC, useState} from 'react';
import 'rc-time-picker/assets/index.css';


const Contacts: FC = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className='h-screen'>
            CONTACTS


            {/*<div className="min-h-screen bg-gray-100 flex flex-col justify-center">*/}
            {/*    <div className="relative py-3 sm:max-w-xl mx-auto">*/}
            {/*        <nav>*/}
            {/*            <button*/}
            {/*                className="w-14 h-14 relative focus:outline-none bg-teal-600 rounded"*/}
            {/*                onClick={() => setOpen(!open)}*/}
            {/*            >*/}
            {/*                <div className="block w-5 absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">*/}
            {/*                    <span className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-500 ease-in-out */}
            {/*                        ${open ? 'rotate-45' : '-translate-y-2'}`}/>*/}

            {/*                    <span*/}
            {/*                        className={`block absolute h-0.5 w-5 text-white bg-current transform transition duration-500 ease-in-out */}
            {/*                        ${open ? 'opacity-0' : ''}`}/>*/}

            {/*                    <span className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-500 ease-in-out */}
            {/*                        ${open ? '-rotate-45 ' : 'translate-y-2'}`}/>*/}
            {/*                </div>*/}
            {/*            </button>*/}
            {/*        </nav>*/}
            {/*    </div>*/}
            {/*</div>*/}


        </div>
    );
};

export default Contacts;