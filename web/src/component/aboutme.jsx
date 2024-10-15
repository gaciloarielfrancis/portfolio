import { animated, useSpring, useTransition, easings  } from "@react-spring/web";
import { useStoreState, dispatch } from "../global";
import profile from "../img/profile.png";
import { useEffect } from "react";

export const AboutMe = () => {

    const page = useStoreState("page");
    const skillSet = useStoreState("skillSet");
    const experience = useStoreState("experience");
    const education = useStoreState("education");
    const devroles = useStoreState("devroles");
    const dets = useStoreState("dets");

    const config = {
        easing: easings.linear
    };

    let labelAnims = [], skillBarAnim = [];

    const [ imgStyle, imgAnim ] = useSpring(
        () => ({ 
            from: { x: -200, opacity: 0 },
            to: { x: 0 , opacity: 1 },
            trail: 100,
            config: config
        }), 
    []);

    const label = useTransition([1, 2, 3, 4, 5], {
        from: { y: 50, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        update: { y: 50, opacity: 0, delay: 0 },
        trail: 100,
        config: config
    });
    
    label(s => {
        labelAnims.push(s);
    })

    const info = useTransition(dets, {
        from: { y: 50, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        update: { y: 50, opacity: 0, delay: 0 },
        delay: 250,
        trail: 100,
        config: config
    });

    const skills  = useTransition(skillSet, {
        from: { y: 50, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        update: { y: 50, opacity: 0, delay: 0 },
        trail: 100,
        delay: 500,
        config: { ...config, duration: 200 }
    });

    const skillBar  = useTransition(skillSet, {
        from: { scaleX: 0 },
        enter: { scaleX: 1 },
        trail: 100,
        delay: 600,
        config: { ...config, duration: 500 }
    });

    skillBar(s => {
        skillBarAnim.push(s);
    })

    const exp  = useTransition(experience, {
        from: { x: 50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        update: { x: 50, opacity: 0, delay: 0 },
        trail: 100,
        delay: 500,
        config: config
    });

    const roles  = useTransition(devroles, {
        from: { x: 50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        update: { x: 50, opacity: 0, delay: 0 },
        trail: 100,
        delay: 750,
        config: config
    });

    const educ  = useTransition(education, {
        from: { x: 50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        update: { x: 50, opacity: 0, delay: 0 },
        trail: 100,
        delay: 1000,
        config: config
    });

    useEffect(() => {
        if(page !== "aboutme") {
            imgAnim.start({
                to: { x: -200, opacity: 0 },
                onResolve: () => {
                    dispatch({ readyPage: true, type: "readyPage" });
                }
            });
        }
    }, [ page, imgAnim ])

    return (
        <div className="block grid-flow-row-dense grid-cols-2 h-auto py-12 md:grid md:h-screen relative">
            <div className={ "px-3 overflow-x-hidden overflow-y-" + (page === "aboutme" ? "auto" : "hidden") }>
                <animated.img src={ profile } className="w-32 block align-middle grayscale bg-gray-100 rounded-full m-auto md:mr-4 md:inline-block" style={ imgStyle } alt="profile" />
                <div className="inline-block align-middle">
                    <animated.div className="text-xl" style={ labelAnims[0] }>Ariel Francis Gacilo</animated.div>
                    {
                        info((style, s) => (
                            <animated.div className="text-sm text-gray-700" style={ style }>
                                { s.i }
                                { s.n }
                            </animated.div>
                        ))
                    }
                </div>
                <animated.div className="text-xl mt-5" style={ labelAnims[1] }>Skills</animated.div>
                {
                    skills((style, s, state, i) => (
                        <animated.div className="inline-block align-middle mr-1 mb-2 p-1 text-sm w-46 bg-gray-50" style={ style }>
                            <div className="w-16 inline-block align-middle">
                                <img src={ s.img } className="h-8 grayscale mx-auto" alt={ s.n } />
                            </div>
                            <div className="inline-block align-middle">
                                <div className={ "class_" + i }>{ s.n }</div>
                                <div className="relative w-24 bg-gray-400">
                                    <animated.div className="h-full bg-gray-600 absolute left-0 top-0 origin-top-left" style={{ ...skillBarAnim[i], width: ((s.r/10) * 100) + "%" }}></animated.div>
                                    <div className="text-xs text-center text-white relative">{ s.r + "/10" }</div>
                                </div>
                            </div>
                            
                        </animated.div>
                    ))
                }
            </div>
            <div className={ "px-3 overflow-x-hidden overflow-y-" + (page === "aboutme" ? "auto" : "hidden") }>
                <animated.div className="text-xl mt-5" style={ labelAnims[2] }>Employment History</animated.div>
                {
                    exp((style, e) => (
                        <animated.div className="p-2 bg-gray-50 mb-1" style={ style }>
                            <div>{ e.c } <span className="text-xs text-gray-600">{ e.p }</span></div>
                            <div className="text-sm text-gray-800">{ e.y }</div>
                        </animated.div>
                    ))
                }
                <animated.div className="text-xl mt-5" style={ labelAnims[3] }>Professional Experience</animated.div>
                {
                    roles((style, d) => (
                        <animated.p className="text-sm text-gray-700" style={ style }>{"• " + d }</animated.p>
                    ))
                }
                <animated.div className="text-xl mt-5" style={ labelAnims[4] }>Education</animated.div>
                {
                    educ((style, e) => (
                        <animated.div className="p-2 bg-gray-50 mb-1" style={ style }>
                            <div>{ e.s } <span className="text-xs text-gray-600">{ e.a }</span></div>
                            <div className="text-sm text-gray-800">{ e.c }</div>
                        </animated.div>
                    ))
                }
            </div>
        </div>
    )

}