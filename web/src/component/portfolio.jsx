import { animated, useSpring, useTransition, easings  } from "@react-spring/web";
import { useStoreState, dispatch } from "../global";
import { useEffect } from "react";

export const Portfolio = () => {

    const page = useStoreState("page");
    const portfolio = useStoreState("portfolio");

    const config = {
        easing: easings.linear
    };

    const [ hStyle, hAnim ] = useSpring(
        () => ({ 
            from: { y: 20, opacity: 0 },
            to: { y: 0 , opacity: 1 },
            config: config
        }), 
    []);

    const portAnim = useTransition(portfolio, {
        from: { y: 50, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        update: { y: 50, opacity: 0 },
        trail: 100,
        delay: 300,
        config: config
    });

    useEffect(() => {
        if(page !== "portfolio") {
            hAnim.start({
                to: { y: 20, opacity: 0 },
                onResolve: () => {
                    setTimeout(() => { dispatch({ readyPage: true, type: "readyPage" }) }, 1000);
                }
            });
        }
    }, [ page, hAnim ])

    return (
        <div className="block h-auto px-3 py-12 overflow-y-auto md:h-screen relative">
            <animated.h1 className="text-2xl text-center mb-10" style={ hStyle }>My Works</animated.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    portAnim((style, p, i) => (
                        <animated.div className="flex mb-4" style={ style } key={ "port-" + i }>
                            <div className="flex-none w-32">
                                <img src={ p.i } className="w-32 h-32 inline-block align-top object-contain bg-gray-100" alt="portfolio-logo" />
                            </div>
                            <div className="w-full grow pl-2 relative">
                                <h1 className="text-md">{ p.n }</h1>
                                {
                                    p.t.map((t, x) => (
                                        <img src={ t } className="h-6 inline-block mr-2 mb-2 grayscale" alt={ "port-" + i + "-" + x } key={ "port-" + i + "-" + x } />
                                    ))
                                }
                                <a className="transition transition-all duration-300 absolute right-2 bottom-2 py-1 px-4 cursor-pointer bg-gray-500 text-white text-center hover:bg-black"
                                    target="_blank"
                                    rel="noreferrer"
                                    href={ p.l }
                                >
                                    View
                                </a>
                            </div>
                            
                        </animated.div>
                    ))
                }
            </div>
        </div>
        
    )

}