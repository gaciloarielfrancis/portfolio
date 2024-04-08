import logo from "./img/logo.png";
import funkz from "./img/funkz.png";
import './App.css';

function App() {

  const mouseMove = (e) => {
    const container = document.querySelector("#container");
    let x = e.pageX - container.offsetLeft, y = e.pageY - container.offsetTop;
    container.style.setProperty("--x", x + "px");
    container.style.setProperty("--y", y + "px");
  }

  return (
    <div id="container" onMouseMove={ (e) => { mouseMove(e); } } className="App overflow-hidden relative h-screen w-screen">
      <nav className="fixed top-0 left-0 w-screen flex justify-between items-center">
        <img src={ logo } className="w-36" />
        <div className="float-right">
          <a className="font-mono mx-4" href="#home">Home</a>
          <a className="font-mono mx-4" href="#aboutme">About Me</a>
          <a className="font-mono mx-4" href="#porfolio">Portfolio</a>
          <a className="font-mono mx-4" href="#contactme">Contact Me</a>
        </div>
      </nav>
      <div className="flex flex-row item-start h-screen">
        <div className="basis-1/2 grid justify-items-end content-center">
          <img src={funkz} className="w-64 grayscale drop-shadow-md" />
        </div>
        <div className="basis-1/2 grid content-center font-mono">
          <h1 className="text-2xl mr-4 relative">Ariel Francis Fernando Gacilo</h1>
          <h2 className="text-xl text-slate-700 mr-4 relative">Full-Stack / Game Developer</h2>
          <q className="text-base text-slate-600 max-w-md mt-4 mr-4 relative">To obtain a challenging position in an organization that will capitalize on my skills and experiences as a programmer.</q>
        </div>
      </div>
      <footer className="fixed left-0 bottom-0 w-screen font-mono text-center text-white text-sm bg-gray-800 p-1">
        @ Funkz | gaciloarielfrancis@gmail.com
      </footer>
    </div>
  );
}

export default App;
