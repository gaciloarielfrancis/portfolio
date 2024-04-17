import { useStoreState } from "./global";
import { Navigation } from "./component/nav";
import { Home } from "./component/home";
import { AboutMe } from "./component/aboutme";
import { Portfolio } from "./component/portfolio";
import { ContactMe } from "./component/contactme";
import { Footer } from "./component/footer";
import "./App.css";
import { useEffect, useState } from "react";

function App() {

  	const page = useStoreState("page");
  	const readyPage = useStoreState("readyPage");
  	const [ currentPage, setCurrentPage ] = useState("home");

  	const mouseMove = (e) => {
		const container = document.querySelector("#container");
		let x = e.pageX - container.offsetLeft, y = e.pageY - container.offsetTop;
		container.style.setProperty("--x", x + "px");
		container.style.setProperty("--y", y + "px");
  	}

	useEffect(() => {
		if(readyPage) {
			setCurrentPage(page);
		}
	}, [ page, readyPage ])

	return (
		<div id="container" onMouseMove={ (e) => { mouseMove(e); } } className="App font-mono overflow-y-auto overflow-x-hidden relative h-screen w-screen md:overflow-hidden">
			<Navigation />
			{
				currentPage === "home" ? <Home /> : 
				currentPage === "aboutme" ? <AboutMe /> : 
				currentPage === "portfolio" ? <Portfolio /> : 
				currentPage === "contactme" ? <ContactMe /> : <></>
			}
			<Footer />
		</div>
	);
}

export default App;
