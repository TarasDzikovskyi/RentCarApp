/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        theme: {
            screens: {
                'tablet': '640px',
                // => @media (min-width: 640px) { ... }

                'laptop': '1024px',
                // => @media (min-width: 1024px) { ... }

                'desktop': '1280px',
                // => @media (min-width: 1280px) { ... }
            }
        },

        container: {
            // padding: '2rem',
            center: true
        },

        extend: {
            colors: {
                custom_bg: '#F6F7F9',
                custom_white: '#FFFFFF',
                custom_white2: '#FEFEFE',
                custom_text: '#90A3BF',
                custom_title: '#1A202C',
                custom_primary: '#3563E9',
                custom_icons: '#596780',
                custom_tint: '#D6E4FD',
                custom_border: '#C4C4C4',
                custom_red: '#ED3F3F',
                custom_gray: '#90A3BF'
            },

            gridTemplateColumns: {
                'auto_cars': 'repeat(auto-fill, 270px)',
                'auto_filters': 'repeat(auto-fill, 430px)',
            },

            boxShadow: {
                "custom_shadow": "-1px 1px 27px -3px rgba(53,99,233,0.75);",
                "custom_shadow_auth": "-1px 1px 25px -3px rgba(144,163,191,0.75);"
            }

        },
    },
    plugins: [require('tailwind-hamburgers')],
}

