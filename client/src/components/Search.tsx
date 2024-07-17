import {FC, useEffect, useState} from 'react';
import {GoSearch} from "react-icons/go";
import {LuSettings2} from "react-icons/lu";
import {useNavigate} from "react-router-dom";


const Search: FC = ({isVisible, setIsVisible, cars}) => {
    const [search, setSearch] = useState<string>('');
    const [searchedCars, setSearchedCars] = useState([]);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (search !== '') {
            const filteredCars = cars.filter(car => {
                const makeLowerCase = car.make.toLowerCase();
                const modelLowerCase = car.model.toLowerCase();
                const searchLowerCase = search.toLowerCase();

                return makeLowerCase.includes(searchLowerCase) || modelLowerCase.includes(searchLowerCase);
            });

            setSearchedCars(filteredCars);
        } else setSearchedCars([])
    }, [search]);


    return (
        <div className='flex justify-end w-full'>
            <div className='w-[40%]'>
                <div className='relative w-full'>
                    {showDialog && searchedCars.length > 0 && (
                        <div
                            className='bg-custom_red h-[200px] w-full absolute right-0 top-14 rounded-md bg-custom_white overflow-y-auto z-20'>

                            {searchedCars.map((car, idx) => (
                                <div key={idx}
                                     onClick={() => {
                                         navigate(`${car.id}`);
                                         setShowDialog(false);
                                     }}

                                     className='px-5 py-2 border-b-[1px] cursor-pointer flex items-center'>
                                    <img src={car.image} alt="img" width='75px'/>
                                    <p className='pl-3 font-semibold capitalize'>{car.make} {car.model}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="rounded-md overflow-hidden w-full">
                    <div className="md:flex ">
                        <div className="w-full pt-3">

                            <div className="relative">
                                <i className="absolute text-gray-400 top-3 left-4">
                                    <GoSearch/>
                                </i>
                                <input type="text"
                                       onFocus={() => setShowDialog(true)}
                                    // onBlur={() => setShowDialog(false)}
                                       onChange={(e) => setSearch(e.target.value)}
                                       className="bg-white h-10 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
                                       name="" placeholder='Type something here...'/>
                                <span className="absolute top-3 right-5 border-l pl-4">
                                <i
                                    onClick={() => setIsVisible(!isVisible)}
                                    className={isVisible ? "text-lg text-custom_primary hover:cursor-pointer" : "text-lg text-custom_icons hover:text-custom_primary hover:cursor-pointer"}>
                                    <LuSettings2/>
                                </i>
                            </span>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/*</div>*/}

        </div>
    );
};

export default Search;