import { animated, useSpring } from "@react-spring/web";
import logo from "../img/logo.png";
import { dispatch, useStoreState } from "../global";

export const Navigation = () => {

    const page = useStoreState("page");
    const links = [["Home", "home"], ["About Me", "aboutme"], ["Works", "portfolio"], ["Contact Me", "contactme"]];

    const [ props, animation ] = useSpring(
        () => ({ 
            right: "-100%",
            opacity: 0,
            config: {
                duration: 100
            }
        }), 
    []);

    const menu = (show = true) => {
        animation.start({ 
            to: [ { right: show ? "0px" : "-100%", opacity: show ? 1 : 0 } ] 
        });
    }

    const clickSideMenu = (p) => {
        dispatch({ page: p, type: "page" });
        dispatch({ readyPage: false, type: "readyPage" });
        menu(false);
    }

    return (
        <nav className="fixed top-0 left-0 w-screen flex justify-between items-center pb-2 bg-white z-50">
            <img src={ logo } className="w-36" alt="logo" />

            <button type="button" className="mx-4 block md:hidden" onClick={ () => { menu() } }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
            </button>

            <animated.div style={props} className="float-right text-right z-10 absolute right-0 top-0 opacity-0 bg-gradient-to-b from-gray-50 h-screen 
                md:static md:text-left md:!opacity-100 md:h-auto md:bg-none">
                <button type="button" className="mx-4 my-1 inline-block md:hidden" onClick={ () => { menu(false) } }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                {
                    links.map(l => (
                        <a className={ 
                                "mx-4 block md:inline-block my-2 px-2 transition-all ease-linear duration-300 md:my-0 hover:bg-gray-800 hover:text-white" +
                                (page === l[1] ? " text-white bg-gray-800" : "")
                            } 
                            onClick={ () => { clickSideMenu(l[1]) } } 
                            href={ "#" + l[1] } key={ l[1] }>
                                { l[0] }
                        </a>
                    ))
                }
            </animated.div>
        </nav>
    )

}