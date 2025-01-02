import React, {useEffect, useState} from "react";

function RadiosConversion() {
    const [conversionRate, setConversionRate] = useState(null);
    const [conversionRateCompra, setConversionRateCompra] = useState(null);
    const [conversionRateEurUsd, setConversionRateEurUsd] = useState(null);
    const [conversionRateEurCrc, setConversionRateEurCrc] = useState(null);
    const [mostrarDolares, setMostrarDolares] = useState(true);

    // Function to fetch currency conversion rates
    const fetchConversionRate = async () => {
        const response = await fetch("https://www.sucursalelectronica.com/exchangerate/showXmlExchangeRate.do");
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");

        console.log(xmlDoc); // Inspect the structure of XML

        const radioCompraUSD = xmlDoc.querySelector("buyRateUSD") ? xmlDoc.querySelector("buyRateUSD").textContent : null;
        const radioVentaUSD = xmlDoc.querySelector("saleRateUSD") ? xmlDoc.querySelector("saleRateUSD").textContent : null;
        const radioCompraEUR = xmlDoc.querySelector("buyRateEUR") ? xmlDoc.querySelector("buyRateEUR").textContent : null;
        const radioVentaEUR = xmlDoc.querySelector("saleRateEUR") ? xmlDoc.querySelector("saleRateEUR").textContent : null;

        setConversionRate(radioCompraUSD);
        setConversionRateCompra(radioVentaUSD);
        setConversionRateEurCrc(radioCompraEUR);
        setConversionRateEurUsd(radioVentaEUR);
    };


    useEffect(() => {
        fetchConversionRate();
    }, []);

    let content;
    if (mostrarDolares) {
        content = (
            <>
                <div className="rates-container">
                    <div className="rate-item">
                        <p>Compra</p>
                        <p>{conversionRate ? `₡${conversionRate}` : "Cargando..."}</p>
                    </div>
                    <div className="rate-item">
                        <p>Venta</p>
                        <p>{conversionRateCompra ? `₡${conversionRateCompra}` : "Cargando..."}</p>
                    </div>
                </div>
            </>
        )
    } else if (!mostrarDolares) {
        content = (
            <>
                <div className="rates-container">
                    <div className="rate-item">
                        <p>Compra</p>
                        <p>{conversionRateEurCrc ? `₡${conversionRateEurCrc}` : "Cargando..."}</p>
                    </div>
                    <div className="rate-item">
                        <p>Venta</p>
                        <p>{conversionRateEurUsd ? `₡${conversionRateEurUsd}` : "Cargando..."}</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            <div>
                <p className="p">Moneda:</p>
                <button onClick={() => setMostrarDolares(true)}
                        disabled={mostrarDolares}>USD
                </button>
                <button onClick={() => setMostrarDolares(false)}
                        disabled={!mostrarDolares}>EUR
                </button>
            </div>
            <br/>
            {content}
        </div>
    );
}

export default RadiosConversion;
