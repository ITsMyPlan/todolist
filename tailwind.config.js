/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        fontFamily: {
            apple: ['Apple SD Gothic Neo'],
            appleBold: ['Apple SD Gothic Neo Bold'],
            pretendard: ['Pretendard-Regular'],
        },
        extend: {
            backgroundImage: {
                light: `url(/desktop/desktopLight.png)`,
                dark: 'url(/desktop/desktopDark.png)',
            },
        },
    },
    plugins: [],
};
