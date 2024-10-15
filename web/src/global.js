import { createStore } from "react-hooks-global-state";

import location from "./img/location.svg";
import viber from "./img/viber.svg";
import gmail from "./img/gmail.svg";
import linkedin from "./img/linkedin.svg";
import skype from "./img/skype.svg";

import html5 from "./img/html5.png";
import css3 from "./img/css3.png";
import js from "./img/js.png";
import typescript from "./img/typescript.png";
import jquery from "./img/jquery.png";
import bootstrap from "./img/bootstrap.png";
import ionic from "./img/ionic.svg";
import react from "./img/react.png";
import redux from "./img/redux.svg";
import nextjs from "./img/nextjs.png";
import tailwind from "./img/tailwind.png";
import vuejs from "./img/vuejs.png";
import pixijs from "./img/pixijs.png";
import phaserjs from "./img/phaserjs.png";
import reactspring from "./img/react-spring.png";
import gsap from "./img/gsap.png";
import babylonjs from "./img/babylonjs.png";
import axios from "./img/axios.png";
import webpack from "./img/webpack.png";
import firebase from "./img/firebase.png";
import mui from "./img/mui.png";

import php from "./img/php.png";
import mysql from "./img/mysql.png";
import python from "./img/python.png";
import mongodb from "./img/mongodb.png";
import nodejs from "./img/nodejs.png";
import symfony from "./img/symfony.webp";
import pg from "./img/pg.webp";

import dragonTiger from "./img/dragon-tiger.jpg";
import puntoBanco from "./img/punto-banco.jpg";
import threeFaces from "./img/3-faces-baccarat.jpg";
import dominoQQ from "./img/domino-qq.jpg";
import goldenBall from "./img/golden-power-ball.jpg";
import hiloCard from "./img/hilo-card.jpg";
import cryptoCrash from "./img/crypto-crash.png";
import tambolaTropika from "./img/tambola-tropika.jpg";
import keno from "./img/keno.png";
import mdc from "./img/mdc.png";
import leiprime from "./img/leiprime.png";

const reducer = (state, action) => {
  	// console.log(state, action)
  // switch (action.type) {
  //     case 'increment': return { ...state, count: state.count + 1 };
  //     case 'decrement': return { ...state, count: state.count - 1 };
  //     default: return state;
  // }
  	if(action.type === "page") {
		state.page = action.page;
	}else if(action.type === "readyPage") {
		state.readyPage = action.readyPage;
	}
	
};

const initialState = {
	page: "home",
	readyPage: true,
	skillSet: [
		{ n: "Axios", img: axios, r: 10, y: 5 },
		{ n: "Babylon.js", img: babylonjs, r: 8, y: 2 },
		{ n: "Bootstrap", img: bootstrap, r: 10, y: 9 },
		{ n: "CSS3", img: css3, r: 10, y: 9 },
		{ n: "Firebase", img: firebase, r: 7, y: 2 },
		{ n: "GSAP", img: gsap, r: 10, y: 9 },
		{ n: "HTML5", img: html5, r: 10, y: 9 },
		{ n: "Ionic", img: ionic, r: 8, y: 3 },
		{ n: "JavaScript", img: js, r: 10, y: 9 },
		{ n: "jQuery", img: jquery, r: 10, y: 9 },
		{ n: "Material UI", img: mui, r: 10, y: 2 },
		{ n: "MongoDB", img: mongodb, r: 8, y: 2 },
		{ n: "MySQL/MySQLi", img: mysql, r: 10, y: 7 },
		{ n: "Next.js", img: nextjs, r: 7, y: 1 },
		{ n: "Node.js", img: nodejs, r: 9, y: 7 },
		{ n: "Phaser", img: phaserjs, r: 8, y: 2 },
		{ n: "PHP", img: php, r: 10, y: 7 },
		{ n: "PixiJs", img: pixijs, r: 10, y: 3 },
		{ n: "PostgreSQL", img: pg, r: 10, y: 3 },
		{ n: "Python", img: python, r: 8, y: 2 },
		{ n: "React", img: react, r: 10, y: 3 },
		{ n: "React Spring", img: reactspring, r: 7, y: 2 },
		{ n: "Redux", img: redux, r: 10, y: 3 },
		{ n: "Symfony", img: symfony, r: 10, y: 3 },
		{ n: "Tailwind CSS", img: tailwind, r: 8, y: 2 },
		{ n: "TypeScript", img: typescript, r: 10, y: 3 },
		{ n: "Vue.js", img: vuejs, r: 6, y: 1 },
		{ n: "Webpack", img: webpack, r: 10, y: 3 },
	],
	experience: [
		{ c: "Blueline Active Asia", p: "Game Developer", y: "October 2021 - April 2024" },
		{ c: "Smartest Guys in the Room", p: "Full-stack / Game Developer", y: "January 2016 - October 2021" },
		{ c: "Immersive Media Inc.", p: "Senior Software Engineer", y: "January 2014 - January 2016" }
	],
	education: [
		{ s: "Innovative College of Science and Technology", a: "Bongabong Oriental Mindoro", c: "Bachelor of Science in Information Techonology" },
		{ s: "MICVHS Dangay Extension", a: "Roxas Oriental Mindoro", c: "High School" },
		{ s: "Roxas Elementary School", a: "Roxas Oriental Mindoro", c: "Elementary" }
	],
	devroles: [
		"Converting designs into code such as Figma, Photoshop, Illustrator or etc.",
		"Collaborating with the project manager, graphic artist, animator and QA to make sure the projects meet quality standards.",
		"Creating or modifying an API and contributing reusable modules to my team",
		"Design the database structure and server management.",
		"Implementing SEO with an open graph to make the website searchable by users",
		"Optimizing website performance and its load time by using code minification and converting images into sprite sheets, then using tinypng, or using webp format for images and webm format for videos.",
		"Debugging or troubleshooting",
		"Deploying websites to server and deploying mobile applications into the Google Play Store or App Store."
	],
	dets: [
        {
            i:      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 inline-block mr-2">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>,
            n: "Bongabong, Oriental Mindoro, Philippines 5211"
        },
        {
            i:      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 inline-block mr-2">
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>,
            n: "+63 998 036 4770"
        },
        {
            i:      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 inline-block mr-2">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>,
            n: "gaciloarielfrancis@gmail.com"
        }
    ],
	portfolio: [
		{ n: "Dragon Tiger", i: dragonTiger, t: [html5, typescript, react, pixijs, gsap, webpack], l: "https://lottery.gpistaging.com/Login?game=dragontiger&vendor=W88&mode=try&lang=en" },
		{ n: "Punto Banco", i: puntoBanco, t: [html5, typescript, react, pixijs, gsap, webpack], l: "https://lottery.gpistaging.com/Login?game=puntobanco&vendor=W88&mode=try&lang=en" },
		{ n: "Three Faces Baccarat", i: threeFaces, t: [html5, typescript, react, pixijs, gsap, webpack], l: "https://lottery.gpistaging.com/Login?game=threefacesbaccarat&vendor=W88&mode=try&lang=en" },
		{ n: "Domino QQ Virtual Dealer", i: dominoQQ, t: [html5, typescript, react, pixijs, gsap, webpack], l: "https://lottery.gpistaging.com/Login?game=dominoqqvirtualdealer&vendor=W88&mode=try&lang=en" },
		{ n: "Golden Power Ball", i: goldenBall, t: [html5, typescript, react, pixijs, gsap, webpack], l: "https://lottery.gpistaging.com/Login?game=goldenpowerball&vendor=W88&mode=try&lang=en" },
		{ n: "HiLo Card", i: hiloCard, t: [html5, typescript, react, pixijs, gsap, webpack], l: "https://lottery.gpistaging.com/Login?game=hilocard&vendor=W88&mode=try&lang=en" },
		{ n: "Crypto Crash", i: cryptoCrash, t: [html5, typescript, react, pixijs, gsap, webpack], l: "https://games.crescendoops.com/Login?vendor=W88&s=&lang=en&game=cryptocrash&mode=try" },
		{ n: "Tambola Tropika", i: tambolaTropika, t: [html5, typescript, react, pixijs, gsap, webpack], l: "https://lottery.gpistaging.com/Login?game=tambolatropika&vendor=W88&mode=try&lang=en" },
		{ n: "Keno Mobile", i: keno, t: [html5, js, react, redux, reactspring, pixijs], l: "https://crescendogames.studio/Login?vendor=W88&s=&lang=en&game=newkeno&mode=try" },
		{ n: "Lei Prime", i: leiprime, t: [html5, js, react, tailwind, php, symfony, mysql], l: "https://leiprime.com" },
		{ n: "My Dominion Corp", i: mdc, t: [html5, js, react, tailwind, mui, php, symfony, mysql], l: "https://mydominioncorp.com" },
	],
	contacts: [
		{ i: location, n: "Bongabong, Oriental Mindoro, Philippines 5211" },
        { i: viber, n: "+63 998 036 4770" },
        { i: gmail, n: "gaciloarielfrancis@gmail.com" },
		{ i: linkedin, n: "https://www.linkedin.com/in/ariel-francis-gacilo-01a694b0/" },
		{ i: skype, n: "gaciloarielfrancis" }
	]
};

export const { dispatch, useStoreState } = createStore(reducer, initialState);