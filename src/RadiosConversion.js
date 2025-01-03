import React, {useEffect, useState} from "react";
import logobac from './imagenes/logobac.svg';
import logobccr from './imagenes/logobccr.svg';
import logobp from './imagenes/logobp.svg';
import logobn from './imagenes/logobn.svg';

function RadiosConversion() {
    const [conversionRate, setConversionRate] = useState(null);
    const [conversionRateCompra, setConversionRateCompra] = useState(null);
    const [conversionRateEurUsd, setConversionRateEurUsd] = useState(null);
    const [conversionRateEurCrc, setConversionRateEurCrc] = useState(null);
    const [conversionCompraUsdBCCR, setconversionCompraUsdBCCR] = useState(null);
    const [conversionVentaUsdBCCR, setconversionVentaUsdBCCR] = useState(null);
    const [conversionEurUsdBCCR, setconversionEurUsdBCCR] = useState(null);
    const [conversionEurCrcBCCR, setconversionEurCrcBCCR] = useState(null);
    const [conversionUsdCompraBP, setconversionUsdCompraBP] = useState(null);
    const [conversionUsdVentaBP, setconversionUsdVentaBP] = useState(null);
    const [conversionUsdCompraBN, setConversionUsdCompraBN] = useState(null);
    const [conversionUsdVentaBN, setConversionUsdVentaBN] = useState(null);
    const [conversionEurCompraBN, setConversionEurCompraBN] = useState(null);
    const [conversionEurVentaBN, setConversionEurVentaBN] = useState(null);
    const [mostrarDolares, setMostrarDolares] = useState(true);

    // Function to fetch currency conversion rates
    const fetchConversionRate = async () => {

        const response = await fetch("https://www.sucursalelectronica.com/exchangerate/showXmlExchangeRate.do");
        const responseBCCR = await fetch("https://api.hacienda.go.cr/indicadores/tc");
        const dataBCCR = await responseBCCR.json();
        const responseBP = await fetch ("https://www.appsbp.com/WsSINPEMovilV2/ServiciosGeneral/indicadoresfinancieros");
        const dataBP = await responseBP.json();
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");

        const responseBNC = await fetch("http://localhost:3001/api/fetch-dollars");
        const dataBNC = await responseBNC.json();
        setConversionUsdCompraBN(dataBNC.conversionUsdCompraBN);

        const responseBNV = await fetch("http://localhost:3001/api/fetch-dollars-venta");
        const dataBNV = await responseBNV.json();
        setConversionUsdVentaBN(dataBNV.conversionUsdVentaBN);

        const responseBNCE = await fetch("http://localhost:3001/api/fetch-eur");
        const dataBNCE = await responseBNCE.json();
        setConversionEurCompraBN(dataBNCE.conversionEurCompraBN);

        const responseBNVE = await fetch("http://localhost:3001/api/fetch-eur-venta");
        const dataBNVE = await responseBNVE.json();
        setConversionEurVentaBN(dataBNVE.conversionEurVentaBN);

        const radioCompraUSD = xmlDoc.querySelector("buyRateUSD") ? xmlDoc.querySelector("buyRateUSD").textContent : null;
        const radioVentaUSD = xmlDoc.querySelector("saleRateUSD") ? xmlDoc.querySelector("saleRateUSD").textContent : null;
        const radioCompraEUR = xmlDoc.querySelector("buyRateEUR") ? xmlDoc.querySelector("buyRateEUR").textContent : null;
        const radioVentaEUR = xmlDoc.querySelector("saleRateEUR") ? xmlDoc.querySelector("saleRateEUR").textContent : null;

        setConversionRate(radioCompraUSD);
        setConversionRateCompra(radioVentaUSD);
        setConversionRateEurCrc(radioCompraEUR);
        setConversionRateEurUsd(radioVentaEUR);

        setconversionCompraUsdBCCR(dataBCCR.dolar.compra.valor);
        setconversionVentaUsdBCCR(dataBCCR.dolar.venta.valor);
        setconversionEurUsdBCCR(dataBCCR.euro.dolares);
        setconversionEurCrcBCCR(dataBCCR.euro.colones);

        const indicadores = dataBP.Indicadores;
        let descripcionCompra;
        let descripcionVenta

        for (let i = 0; i < indicadores.length; i++) {
            const Descripcion = indicadores[i].Descripcion;
            const Valor = indicadores[i].Valor;

            if (Descripcion === 'Tipo Cambio Compra') {
                descripcionCompra = Valor;
            }
            if (Descripcion === 'Tipo Cambio Venta') {
                descripcionVenta = Valor;
            }
        }
        setconversionUsdCompraBP(descripcionCompra)
        setconversionUsdVentaBP(descripcionVenta)

    };


    useEffect(() => {
        fetchConversionRate();
    }, []);

    let content;
    if (mostrarDolares) {
        content = (
            <>
                <div className="rates-container">
                    <img src={logobccr} alt={logobccr}
                         className="logobancos"/>
                    <div className="rate-item">
                        <p> Compra</p>
                        <p> {conversionCompraUsdBCCR ? `₡${conversionCompraUsdBCCR}` : "Cargando..."}
                        </p>
                    </div>
                    <div className="rate-item">
                        <p>Venta</p>
                        <p>{conversionVentaUsdBCCR ? `₡${conversionVentaUsdBCCR}` : "Cargando..."}</p>
                    </div>
                </div>

                <div className="rates-container">
                    <img src={logobn} alt={logobn}
                         className="logobancos"/>
                    <div className="rate-item">
                        <p>Compra</p>
                        <p>{conversionUsdCompraBN ? `₡${conversionUsdCompraBN}` : "Cargando..."}</p>
                    </div>
                    <div className="rate-item">
                        <p>Venta</p>
                        <p>{conversionUsdVentaBN ? `₡${conversionUsdVentaBN}` : "Cargando..."}</p>
                    </div>
                </div>


                <div className="rates-container">
                    <img src={logobac} alt={logobac}
                         className="logobancos"/>
                    <div className="rate-item">
                        <p>Compra</p>
                        <p>{conversionRate ? `₡${conversionRate}` : "Cargando..."}</p>
                    </div>
                    <div className="rate-item">
                        <p>Venta</p>
                        <p>{conversionRateCompra ? `₡${conversionRateCompra}` : "Cargando..."}</p>
                    </div>
                </div>

                <div className="rates-container">
                    <img src={logobp} alt={logobp}
                         className="logobancos"/>
                    <div className="rate-item">
                        <p>Compra</p>
                        <p>{conversionUsdCompraBP ? `₡${conversionUsdCompraBP}` : "Cargando..."}</p>
                    </div>
                    <div className="rate-item">
                        <p>Venta</p>
                        <p>{conversionUsdVentaBP ? `₡${conversionUsdVentaBP}` : "Cargando..."}</p>
                    </div>
                </div>

            </>
        )
    } else if (!mostrarDolares) {
        content = (
            <>
                <div className="eur-rates-container">
                    <img src={logobccr} alt={logobccr}
                         className="logobancos"/>
                    <p>1 Euro (€1) =</p>
                    <div className="rate-item">
                        <p>Dolares</p>
                        <p>{conversionEurUsdBCCR ? `₡${conversionEurUsdBCCR}` : "Cargando..."}</p>
                    </div>
                    <div className="rate-item">
                        <p>Colones</p>
                        <p>{conversionEurCrcBCCR ? `₡${conversionEurCrcBCCR}` : "Cargando..."}</p>
                    </div>
                </div>

                <div className="rates-container">
                    <img src={logobn} alt={logobn}
                         className="logobancos"/>
                    <div className="rate-item">
                        <p>Compra</p>
                        <p>{conversionEurCompraBN ? `₡${conversionEurCompraBN}` : "Cargando..."}</p>
                    </div>
                    <div className="rate-item">
                        <p>Venta</p>
                        <p>{conversionEurVentaBN ? `₡${conversionEurVentaBN}` : "Cargando..."}</p>
                    </div>
                </div>

                <div className="rates-container">
                    <img src={logobac} alt={logobac}
                         className="logobancos"/>
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
