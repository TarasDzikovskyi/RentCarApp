const axios = require('axios');
// import {manufacturers, yearsOfProduction} from './test_types';
const moment = require('moment');


async function test() {
    const headers = {
        'X-RapidAPI-Key': 'bc7cef016dmsh58aef30b61f4accp100d56jsn490eb339133c',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    };

    manufacturers.forEach(car => {

        yearsOfProduction.forEach(async year => {
            const options = {
                method: 'GET',
                url: 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars',
                params: {
                    make: car,
                    limit: 6,
                    year
                },
                headers
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }

        });



    });







}

// test();



function calculatePrice(startDate, endDate, startTime, endTime, startPrice) {
    const cumulativePrices = [];
    let currentDate = new Date(startDate);
    let totalCount = 0;
    let totalTax = 0;
    let totalHours = 0;

    const isWeekend = (date) => date.getDay() % 6 === 0;

    while (currentDate <= new Date(endDate)) {
        const currentDateStr = currentDate.toISOString().split('T')[0];
        const isWeekendDay = isWeekend(currentDate);

        let price = startPrice;
        let durationInHours = 24; // Default to 24 hours for each day

        if (isWeekendDay) {
            price = Math.round(startPrice * 1.1);
        }

        if (currentDate.toISOString().split('T')[0] === startDate) {
            const startDateTime = new Date(`${startDate}T${startTime}`);
            const midnightDateTime = new Date(`${startDate}T24:00:00`);

            if (startDateTime < midnightDateTime) {
                durationInHours = Math.max(1, (midnightDateTime - startDateTime) / (60 * 60 * 1000));
            }
        } else if (currentDate.toISOString().split('T')[0] === endDate) {
            const endDateTime = new Date(`${endDate}T${endTime}`);
            const midnightDateTime = new Date(`${endDate}T00:00:00`);

            if (endDateTime > midnightDateTime) {
                durationInHours = Math.max(1, (endDateTime - midnightDateTime) / (60 * 60 * 1000));
            }
        }

        cumulativePrices.push({ date: currentDateStr, price, durationInHours });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(cumulativePrices);

    cumulativePrices.forEach(item => {
        totalCount += item.price;
        totalHours += item.durationInHours;
        if (item.price !== startPrice) totalTax += (item.price - startPrice);
    });

    console.log(totalTax);
    console.log(totalHours);

    let fullDays = Number.isInteger(totalHours / 24) ? Math.floor(totalHours / 24) : Math.floor(totalHours / 24) + 1;
    console.log(fullDays);

    fullDays === 0 ? totalCount = startPrice : totalCount = startPrice * fullDays + totalTax;
    console.log(totalCount);

}

const startDate = "2023-12-14";
const endDate = "2023-12-16";
const startTime = "15:10";
const endTime = "15:20";
const startPrice = 165;

calculatePrice(startDate, endDate, startTime, endTime, startPrice);