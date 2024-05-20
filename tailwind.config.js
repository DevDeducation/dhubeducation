import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				ltbg: "#eaeded",
				font: '#282828dd',
				body: '#f5f5f5',
				whatsapp: '#25D366',
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				'primary': {
					DEFAULT: '#a63390',
					"50": "#f6ebf4",
          "100": "#edd6e9",
          "200": "#dbadd3",
          "300": "#ca85bc",
          "400": "#b85ca6",
          "500": "#a63390",
          "600": "#852973",
          "700": "#641f56",
          "800": "#42143a",
          "900": "#210a1d"
				},
				secondary: {
					DEFAULT: '#ff0084',
					"50": "#ffe6f3",
          "100": "#ffcce7",
          "200": "#ff99cf",
          "300": "#ff66b6",
          "400": "#ff339e",
          "500": "#ff0084",
          "600": "#cc006b",
          "700": "#990050",
          "800": "#660036",
          "900": "#33001b"
				},
				'dark': {
					DEFAULT: '#686789',
					50: '#CECDDA',
					100: '#C3C2D1',
					200: '#ABAAC0',
					300: '#9493AE',
					400: '#7D7C9D',
					500: '#686789',
					600: '#565572',
					700: '#44445A',
					800: '#323243',
					900: '#21212C',
					950: '#181820'
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}, 
			fontSize: {
				'2xs': "10px",
				'3xs': "8px"
			},
			boxShadow: {
				"custom": "0 2px 5px 0 rgba(0,0,0,0.1)",
				"border": "rgb(51, 51, 51) 0px 0px 0px 1px"
			},
		}
	},
	plugins: [
		require("daisyui"),
	],
};

export default config;
