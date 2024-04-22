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
    }, [ page ])

    return (
        <div className="block h-auto px-3 py-12 overflow-y-auto md:h-screen relative">
            <animated.h1 className="text-2xl text-center mb-10" style={ hStyle }>My Works</animated.h1>
            <div className="flex flex-wrap justify-between">
                {
                    portAnim((style, p, i) => (
                        <animated.div className="mr-2 mb-2 inline-block w-full max-w-96 text-left relative" style={ style } key={ "port-" + i }>
                            <img src={ p.i } className="w-36 h-36 inline-block align-top object-contain bg-gray-100" />
                            <div className="inline-block ml-2 align-top">
                                <h1 className="text-md">{ p.n }</h1>
                                {
                                    p.t.map((t, x) => (
                                        <img src={ t } className="h-6 inline-block mr-2 mb-2 grayscale" alt={ "port-" + i + "-" + x } key={ "port-" + i + "-" + x } />
                                    ))
                                }
                                <a className="transition transition-all duration-300 absolute right-2 bottom-2 py-1 px-4 cursor-pointer bg-gray-500 text-white text-center hover:bg-black"
                                    target="_blank"
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