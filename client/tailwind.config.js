/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        'bg-emerald-800',
        'bg-purple-800',
        'bg-blue-800',
        'bg-red-800',
        'bg-orange-800',
        'bg-indigo-800',
        'bg-pink-800',
        'bg-cyan-800',
        'hover:bg-emerald-700',
        'hover:bg-purple-700',
        'hover:bg-blue-700',
    ]
}