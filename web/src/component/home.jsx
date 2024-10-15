import { useSpring, animated, easings  } from "@react-spring/web"
import funkz from "../img/funkz.png";
import { useEffect } from "react";
import { dispatch, useStoreState } from "../global";

export const Home = () => {

    const page = useStoreState("page");

    const [ imgProps, imgAnim ] = useSpring(
        () => ({ 
            from: { x: -200, opacity: 0 },
            to: { x: 0 , opacity: 1 },
            config: {
                easing: easings.linear
            }
        }), 
    []);

    const [ h1Props, h1Anim ] = useSpring(
        () => ({ 
            from: { y: -20, opacity: 0 },
            to: { y: 0 , opacity: 1 },
            config: {
                easing: easings.linear
            }
        }), 
    []);

    const [ h2Props, h2Anim ] = useSpring(
        () => ({ 
            from: { y: -20, opacity: 0 },
            to: { y: 0 , opacity: 1 },
            delay: 250,
            config: {
                easing: easings.linear
            }
        }), 
    []);

    const [ qProps, qAnim ] = useSpring(
        () => ({ 
            from: { y: -20, opacity: 0 },
            to: { y: 0 , opacity: 1 },
            delay: 500,
            config: {
                duration: 250,
                easing: easings.linear
            }
        }), 
    []);

    useEffect(() => {
        if(page !== "home") {
            qAnim.start({
                to: { y: -20, opacity: 0 }
            });
            h2Anim.start({
                to: { y: -20, opacity: 0 },
                delay: 250
            });
            h1Anim.start({
                to: { y: -20, opacity: 0 },
                delay: 500
            });
            imgAnim.start({
                to: { x: -200, opacity: 0 },
                delay: 500,
                onResolve: () => {
                    dispatch({ readyPage: true, type: "readyPage" });
                }
            })
        }
    }, [ page, imgAnim, h1Anim, h2Anim, qAnim ])

    return (
        <div className="flex flex-row item-start h-screen">
            <div className="basis-1/2 grid justify-items-end content-center">
                <animated.img src={funkz} style={{ ...imgProps }} className="w-64 grayscale drop-shadow-md" alt="funkz" />
            </div>
            <div className="basis-1/2 grid content-center">
                <animated.h1 style={{ ...h1Props }} className="text-2xl mr-4 md:relative">Ariel Francis Fernando Gacilo</animated.h1>
                <animated.h2 style={{ ...h2Props }} className="text-xl text-slate-700 mr-4 md:relative">Full-Stack Developer</animated.h2>
                <animated.q style={{ ...qProps }} className="text-base text-slate-600 max-w-md mt-4 mr-4 md:relative">To obtain a challenging position in an organization that will capitalize on my skills and experiences as a programmer.</animated.q>
            </div>
        </div>
    )

}