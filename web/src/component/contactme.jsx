import { APIProvider, Map, InfoWindow } from '@vis.gl/react-google-maps';
import { animated, useSpring, useTransition, easings  } from "@react-spring/web";
import { useStoreState, dispatch } from "../global";
import { useEffect } from "react";
import profile from "../img/profile.png";

export const ContactMe = () => {

    const page = useStoreState("page");
    const contacts = useStoreState("contacts");
    const position = { lat: 12.750830, lng: 121.478351 };
    const mapStyles = [
        { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }]},
        { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }]}
    ];

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

    const [ mapStyle, mapAnim ] = useSpring(
        () => ({ 
            from: { y: 20, opacity: 0 },
            to: { y: 0 , opacity: 1 },
            config: config
        }), 
    []);

    const cont = useTransition(contacts, {
        from: { y: 50, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        update: { y: 50, opacity: 0 },
        delay: 250,
        trail: 100,
        config: config
    });

    useEffect(() => {
        if(page !== "contactme") {
            hAnim.start({
                to: { y: 20, opacity: 0 },
                onResolve: () => {
                    setTimeout(() => { dispatch({ readyPage: true, type: "readyPage" }) }, 500);
                }
            });
            mapAnim.start({
                to: { y: 20, opacity: 0 }
            });
        }
    }, [ page ])

    return (
        <div className="block grid-flow-row-dense grid-cols-2 h-auto py-12 md:grid md:h-screen relative">
            <div className="px-3 overflow-x-hidden">
                <animated.h1 className="text-2xl mb-10" style={ hStyle }>Contact Me</animated.h1>
                {
                    cont((style, item) => (
                        <animated.div className="mb-4" style={ style }>
                            <img src={ item.i } className="w-6 h-6 inline-block mr-2" />
                            <label className="text-gray-600">{ item.n }</label>
                        </animated.div>
                    ))
                }
            </div>
            <animated.div className="px-3 overflow-x-hidden" style={ mapStyle }>
                <APIProvider apiKey={ 'AIzaSyCok2WHd10-T1FV3KFbKYoxH_joD5bmjL8' }>
                    <Map defaultCenter={ position } defaultZoom={ 8 } className="h-96 grayscale md:h-full" 
                        mapTypeControl={ false } streetViewControl={ false } zoomControl={ false }
                        styles={ mapStyles }>
                        <InfoWindow position={ position }>
                            <img src={ profile } className="w-14 bg-gray-100 rounded-full" />
                        </InfoWindow>
                    </Map>
                </APIProvider>
            </animated.div>
            
            
            
        </div>
    )

}