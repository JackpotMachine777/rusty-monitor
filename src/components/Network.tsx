import { useState, useEffect } from "react";
import { networkInfo } from "../api/network";
import { formatInternet } from "../utils/formatInternet";

export default function Network(){
    const [network, setNetwork] = useState<any>()

    useEffect(() => {
        let isMounted = true;
        const interval = setInterval(async () => {
            const data = await networkInfo();
            if(isMounted) setNetwork(data);
        }, 1000)

        return () => {
            isMounted = false;
            clearInterval(interval);
        }
    }, []);

    if(!network) return (
        <section id="network">
            <p>Loading network info...</p>
        </section>
    )

    console.log(network);

    return (
        <section id="network">
            <h2>Network Interface</h2>
            <div id="network-name">Name: {network.name}</div>
            <div id="transmitted">Transmitted: {formatInternet(network.transmitted)}</div>
            <div id="received">Received: {formatInternet(network.received)}</div>
        </section>
    )
}