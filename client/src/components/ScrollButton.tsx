import {FC, useState} from 'react';
import {IoNotifications} from "react-icons/io5";
import {FaArrowUp} from "react-icons/fa";

const ScrollButton: FC = () => {

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div className='fixed right-5 bottom-16 animate-bounce z-[100]'>
            {visible ? (
                <div
                    onClick={scrollToTop}
                    className='flex items-center bg-custom_bg justify-center border border-[#C3D4E9] rounded-full w-11 h-11 text-2xl text-custom_text mx-2.5 cursor-pointer hover:text-[#596780]'>
                    <FaArrowUp/>
                </div>
            ) : (
                <div/>
            )}
        </div>
    );
};

export default ScrollButton;