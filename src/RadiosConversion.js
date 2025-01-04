import React, { useEffect, useState } from "react";
import logobac from './imagenes/logobac.svg';
import logobccr from './imagenes/logobccr.svg';
import logobp from './imagenes/logobp.svg';
import logobn from './imagenes/logobn.svg';
import logosb from './imagenes/logosb.svg';

function RadiosConversion() {
    const [conversionUsdCompraBAC, setConversionUsdCompraBAC] = useState(null);
    const [conversionUsdVentaBAC, setConversionUsdVentaBAC] = useState(null);
    const [conversionEurCompraBAC, setConversionEurCompraBAC] = useState(null);
    const [conversionEurVentaBAC, setConversionEurVentaBAC] = useState(null);

    const [conversionCompraUsdBCCR, setconversionCompraUsdBCCR] = useState(null);
    const [conversionVentaUsdBCCR, setconversionVentaUsdBCCR] = useState(null);
    const [conversionEurUsdBCCR, setconversionEurUsdBCCR] = useState(null);
    const [conversionEurCrcBCCR, setconversionEurCrcBCCR] = useState(null);

    const [conversionUsdCompraBP, setConversionUsdCompraBP] = useState(null);
    const [conversionUsdVentaBP, setConversionUsdVentaBP] = useState(null);

    const [conversionUsdCompraBN, setConversionUsdCompraBN] = useState(null);
    const [conversionUsdVentaBN, setConversionUsdVentaBN] = useState(null);
    const [conversionEurCompraBN, setConversionEurCompraBN] = useState(null);
    const [conversionEurVentaBN, setConversionEurVentaBN] = useState(null);

    const [conversionUsdCompraSB, setConversionUsdCompraSB] = useState(null);
    const [conversionUsdVentaSB, setConversionUsdVentaSB] = useState(null);

    const [mostrarDolares, setMostrarDolares] = useState(true);

    // Function to fetch currency conversion rates
    const fetchConversionRate = async () => {
        const respuestaBAC = await fetch("https://www.sucursalelectronica.com/exchangerate/showXmlExchangeRate.do");
        const respuestaBCCR = await fetch("https://api.hacienda.go.cr/indicadores/tc");
        const dataBCCR = await respuestaBCCR.json();
        const respuestaBP = await fetch("https://www.appsbp.com/WsSINPEMovilV2/ServiciosGeneral/indicadoresfinancieros");
        const dataBP = await respuestaBP.json();
        const dataBAC = await respuestaBAC.text();
        const parserDOM = new DOMParser();
        const xmlDoc = parserDOM.parseFromString(dataBAC, "application/xml");

        const radioCompraUsdBAC = xmlDoc.querySelector("buyRateUSD") ? xmlDoc.querySelector("buyRateUSD").textContent : null;
        const radioVentaUsdBAC = xmlDoc.querySelector("saleRateUSD") ? xmlDoc.querySelector("saleRateUSD").textContent : null;
        const radioCompraEurBAC = xmlDoc.querySelector("buyRateEUR") ? xmlDoc.querySelector("buyRateEUR").textContent : null;
        const radioVentaEurBAC = xmlDoc.querySelector("saleRateEUR") ? xmlDoc.querySelector("saleRateEUR").textContent : null;

        setConversionUsdCompraBAC(radioCompraUsdBAC);
        setConversionUsdVentaBAC(radioVentaUsdBAC);
        setConversionEurVentaBAC(radioCompraEurBAC);
        setConversionEurCompraBAC(radioVentaEurBAC);

        setconversionCompraUsdBCCR(dataBCCR.dolar.compra.valor);
        setconversionVentaUsdBCCR(dataBCCR.dolar.venta.valor);
        setconversionEurUsdBCCR(dataBCCR.euro.dolares);
        setconversionEurCrcBCCR(dataBCCR.euro.colones);

        verificarDatosBP(dataBP);

        try {
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

            const responseSBC = await fetch("http://localhost:3001/api/fetch-sb-radios");
            const dataSBC = await responseSBC.json();
            setConversionUsdCompraSB(dataSBC.conversionSBCompra);

            const responseSBV = await fetch("http://localhost:3001/api/fetch-sb-radios");
            const dataSBV = await responseSBV.json();
            setConversionUsdVentaSB(dataSBV.conversionSBVenta);

        } catch (error) {
            console.error("Error obteniendo radios de conversion :", error);
            setConversionUsdCompraBN("-- \n No Disponible");
            setConversionUsdVentaBN("-- \n No Disponible");
            setConversionEurCompraBN("-- \n No Disponible");
            setConversionEurVentaBN("-- \n No Disponible");
            setConversionUsdCompraSB("-- \n No Disponible");
            setConversionUsdVentaSB("-- \n No Disponible");
        }
    };

    function verificarDatosBP(dataBP) {
        const indicadores = dataBP.Indicadores;

        for (let i = 0; i < indicadores.length; i++) {
            const Descripcion = indicadores[i].Descripcion;
            const Valor = indicadores[i].Valor;

            if (Descripcion === 'Tipo Cambio Compra') {
                setConversionUsdCompraBP(Valor);
            }
            if (Descripcion === 'Tipo Cambio Venta') {
                setConversionUsdVentaBP(Valor);
            }
        }
    }

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
                        <p>{conversionUsdCompraBAC ? `₡${conversionUsdCompraBAC}` : "Cargando..."}</p>
                    </div>
                    <div className="rate-item">
                        <p>Venta</p>
                        <p>{conversionUsdVentaBAC ? `₡${conversionUsdVentaBAC}` : "Cargando..."}</p>
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

                <div className="rates-container">
                    <img src={logosb} alt={logosb}
                         className="logobancos"/>
                    <div className="rate-item">
                        <p>Compra</p>
                        <p>{conversionUsdCompraSB ? `₡${conversionUsdCompraSB}` : "Cargando..."}</p>
                    </div>
                    <div className="rate-item">
                        <p>Venta</p>
                        <p>{conversionUsdVentaSB ? `₡${conversionUsdVentaSB}` : "Cargando..."}</p>
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
                        <p>{conversionEurVentaBAC ? `₡${conversionEurVentaBAC}` : "Cargando..."}</p>
                    </div>
                    <div className="rate-item">
                        <p>Venta</p>
                        <p>{conversionEurCompraBAC ? `₡${conversionEurCompraBAC}` : "Cargando..."}</p>
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