import React, {useEffect, useState} from "react";
import logobac from '../imagenes/logobac.svg';
import logobccr from '../imagenes/logobccr.svg';
import logobp from '../imagenes/logobp.svg';
import logobn from '../imagenes/logobn.svg';
import logosb from '../imagenes/logosb.svg';
import logobla from '../imagenes/logobla.svg';
import crc from '../imagenes/crc.svg';
import usa from '../imagenes/usa.svg';
import exchange from '../imagenes/exchange.svg';
import fetch from "node-fetch";

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

    const [conversionUsdCompraBLA, setConversionUsdCompraBLA] = useState(null);
    const [conversionUsdVentaBLA, setConversionUsdVentaBLA] = useState(null);
    const [conversionEurCompraBLA, setConversionEurCompraBLA] = useState(null);
    const [conversionEurVentaBLA, setConversionEurVentaBLA] = useState(null);

    const [mostrarDolares, setMostrarDolares] = useState(true);
    const [cambioBandera, setCambioBandera] = useState(0);
    const [valorBanco, setValorBanco] = useState("bncr");

    const [monto, setMonto] = useState(0);
    const [resultado, setResultado] = useState(null)

    // Function to fetch currency conversion rates
    const fetchConversionRate = async () => {
        //Obtener tipo de cambio BAC, BCCR y Banco Popular
        const respuestaBAC = await fetch("https://www.sucursalelectronica.com/exchangerate/showXmlExchangeRate.do");
        const dataBAC = await respuestaBAC.text();
        const parserDOM = new DOMParser();
        const xmlDoc = parserDOM.parseFromString(dataBAC, "application/xml");

        const radioCompraUsdBAC = xmlDoc.querySelector("buyRateUSD").textContent;
        const radioVentaUsdBAC = xmlDoc.querySelector("saleRateUSD").textContent;
        const radioCompraEurBAC = xmlDoc.querySelector("buyRateEUR").textContent;
        const radioVentaEurBAC = xmlDoc.querySelector("saleRateEUR").textContent;

        setConversionUsdCompraBAC(radioCompraUsdBAC);
        setConversionUsdVentaBAC(radioVentaUsdBAC);
        setConversionEurVentaBAC(radioCompraEurBAC);
        setConversionEurCompraBAC(radioVentaEurBAC);

        const respuestaBCCR = await fetch("https://api.hacienda.go.cr/indicadores/tc");
        const dataBCCR = await respuestaBCCR.json(); //Obtener respuesta formato json
        setconversionCompraUsdBCCR(dataBCCR.dolar.compra.valor);
        setconversionVentaUsdBCCR(dataBCCR.dolar.venta.valor);
        setconversionEurUsdBCCR(dataBCCR.euro.dolares);
        setconversionEurUsdBCCR(dataBCCR.euro.valor);
        setconversionEurCrcBCCR(dataBCCR.euro.colones);

        const respuestaBLA = await fetch ("https://www.lafise.com/OpenBankingProxy/obl/v1/banks/BLCR/rates");
        const dataBBLA = await respuestaBLA.json();
        setConversionUsdCompraBLA(dataBBLA.rates.USD.buying);
        setConversionUsdVentaBLA(dataBBLA.rates.USD.selling);
        setConversionEurCompraBLA(dataBBLA.rates.EUR.buying);
        setConversionEurVentaBLA(dataBBLA.rates.EUR.selling);

        const respuestaBP = await fetch("https://www.appsbp.com/WsSINPEMovilV2/ServiciosGeneral/indicadoresfinancieros");
        const dataBP = await respuestaBP.json(); //Obtener respuesta formato json
        verificarDatosBP(dataBP);

        // Obtener tipo de cambio Banco Nacional de Costa Rica y ScotiaBank
        try {
            const respuestaBNC = await fetch("http://localhost:3001/api/fetch-usd-compra");
            const dataBNC = await respuestaBNC.json();
            setConversionUsdCompraBN(dataBNC.conversionUsdCompraBN);

            const respuestaBNV = await fetch("http://localhost:3001/api/fetch-usd-venta");
            const dataBNV = await respuestaBNV.json();
            setConversionUsdVentaBN(dataBNV.conversionUsdVentaBN);

            const respuestaBNCE = await fetch("http://localhost:3001/api/fetch-eur-compra");
            const dataBNCE = await respuestaBNCE.json();
            setConversionEurCompraBN(dataBNCE.conversionEurCompraBN);

            const respuestaBNVE = await fetch("http://localhost:3001/api/fetch-eur-venta");
            const dataBNVE = await respuestaBNVE.json();
            setConversionEurVentaBN(dataBNVE.conversionEurVentaBN);

            const respuestaSBC = await fetch("http://localhost:3001/api/fetch-sb-radios");
            const dataSBC = await respuestaSBC.json();
            setConversionUsdCompraSB(dataSBC.conversionSBCompra);

            const respuestaSBV = await fetch("http://localhost:3001/api/fetch-sb-radios");
            const dataSBV = await respuestaSBV.json();
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

    // Verificar tipo de cambio de Banco Popular
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
//
    useEffect(() => {
        fetchConversionRate();
    }, []);

    //Mostrar contenido imagen conversion
    const imagenConversion = () => {
        switch (valorBanco) {
            case "bncr":
                return <div>
                    <img src={logobccr} alt="BNCR Logo" className="logobancos"/>
                </div>
            case "bn":
                return <div>
                    <img src={logobn} alt="BN Logo" className="logobancos"/>
                </div>
            case "bac":
                return <div><img src={logobac} alt="BAC Logo" className="logobancos"/>
                </div>
            case "bp":
                return <div><img src={logobp} alt="BP Logo" className="logobancos"/>
                </div>
            case "sb":
                return <div><img src={logosb} alt="SB Logo" className="logobancos"/>
                </div>
            case "bla":
                return <div><img src={logobla} alt="BLA Logo" className="logobancos"/>
                </div>
            default:
                return null;
        }
    }

    const tCambioConversion = () => {
        switch (valorBanco) {
            case "bncr":
                return <div><p className="p-conversion"> 1 U$D = ₡{conversionCompraUsdBCCR} <br/>
                    1 CRC = ${(1 / conversionCompraUsdBCCR).toFixed(4)}
                </p></div>
            case "bn":
                return <div>
                    <p> 1 U$D = ₡{conversionUsdCompraBN} <br/>
                        1 CRC = ${(1 / conversionUsdCompraBN).toFixed(4)}
                    </p>
                </div>
            case "bac":
                return <div><p> 1 U$D = ₡{conversionUsdCompraBAC} <br/>
                    1 CRC = ${(1 / conversionUsdCompraBAC).toFixed(4)}
                </p></div>
            case "bp":
                return <div><p> 1 U$D = ₡{conversionUsdCompraBP} <br/>
                    1 CRC = ${(1 / conversionUsdCompraBP).toFixed(4)}
                </p></div>
            case "sb":
                return <div><p> 1 U$D = ₡{conversionUsdCompraSB} <br/>
                    1 CRC = ${(1 / conversionUsdCompraSB).toFixed(4)}
                </p></div>
            case "bla":
                return <div><p> 1 U$D = ₡{conversionUsdCompraBLA} <br/>
                    1 CRC = ${(1 / conversionUsdCompraBLA).toFixed(4)}
                </p></div>
        }
    }

    const cambioBanco = (event) => {
        setValorBanco(event.target.value); // Actualizar banco en cambio de estado
    };

    const obtenerCambio = (event) => {
        setMonto(event.target.value); // Actualizar cambio cuando se obtiene valor
    };

    useEffect(() => {
            const montoInicial = parseFloat(monto);
            let montoFinal;

            if (cambioBandera === 0) {
                switch (valorBanco) {
                    case "bncr":
                        montoFinal = montoInicial * conversionCompraUsdBCCR;
                        break;
                    case "bn":
                        montoFinal = montoInicial * conversionUsdCompraBN;
                        break;
                    case "bac":
                        montoFinal = montoInicial * conversionUsdCompraBAC;
                        break;
                    case "bp":
                        montoFinal = montoInicial * conversionUsdCompraBP;
                        break;
                    case "sb":
                        montoFinal = montoInicial * conversionUsdCompraSB;
                        break;
                    case "bla":
                        montoFinal = montoInicial * conversionUsdCompraBLA;
                        break;
                    default:
                        montoFinal = null;
                }
            } else if (cambioBandera === 1) {
                switch (valorBanco) {
                    case "bncr":
                        montoFinal = montoInicial / conversionVentaUsdBCCR;
                        break;
                    case "bn":
                        montoFinal = montoInicial / conversionUsdVentaBN;
                        break;
                    case "bac":
                        montoFinal = montoInicial / conversionUsdVentaBAC;
                        break;
                    case "bp":
                        montoFinal = montoInicial / conversionUsdVentaBP;
                        break;
                    case "sb":
                        montoFinal = montoInicial / conversionUsdVentaSB;
                        break;
                    case "bla":
                        montoFinal = montoInicial / conversionUsdVentaBLA;
                        break;
                    default:
                        montoFinal = null;
                }
            }
                setResultado(montoFinal.toFixed(2));
    }, [cambioBandera, conversionCompraUsdBCCR, conversionUsdCompraBAC, conversionUsdCompraBLA, conversionUsdCompraBN, conversionUsdCompraBP, conversionUsdCompraSB, conversionUsdVentaBAC, conversionUsdVentaBLA, conversionUsdVentaBN, conversionUsdVentaBP, conversionUsdVentaSB, conversionVentaUsdBCCR, monto, valorBanco]);
    
    const obtenerConversion = (e) => {
        e.preventDefault();
    };

    //Mostrar contenido tipo de cambio
    let contenido;
    if (mostrarDolares) {
        contenido = (
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

                <div className="rates-container">
                    <img src={logobla} alt={logobla}
                         className="logobancos"/>
                    <div className="rate-item">
                        <p>Compra</p>
                        <p>{conversionUsdCompraBLA ? `₡${conversionUsdCompraBLA}` : "Cargando..."}</p>
                    </div>
                    <div className="rate-item">
                        <p>Venta</p>
                        <p>{conversionUsdVentaBLA ? `₡${conversionUsdVentaBLA}` : "Cargando..."}</p>
                    </div>
                </div>

            </>
        )
    } else if (!mostrarDolares) {
        contenido = (
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

                <div className="rates-container">
                    <img src={logobla} alt={logobla}
                         className="logobancos"/>
                    <div className="rate-item">
                        <p>Compra</p>
                        <p>{conversionEurVentaBLA ? `₡${conversionEurVentaBLA}` : "Cargando..."}</p>
                    </div>
                    <div className="rate-item">
                        <p>Venta</p>
                        <p>{conversionEurCompraBLA ? `₡${conversionEurCompraBLA}` : "Cargando..."}</p>
                    </div>
                </div>
            </>
        )
    }

    let contenidoBandera;
    if (cambioBandera === 0) {
        contenidoBandera = (
            <>
        <div className="tcambio-banderas">
            <img src={usa} alt="usa" className="logobanderas"/>
            <button onClick={ ()=> {
                   setCambioBandera(1)
                }
            } className="button-cambio">
                <img src={exchange} alt="exchange" className="logobanderas"/>
            </button>
            <img src={crc} alt="crc" className="logobanderas"/>
        </div>
            </>
        )
    } else if (cambioBandera === 1) {
        contenidoBandera = (
        <>
            <div className="tcambio-banderas">
                <img src={crc} alt="crc" className="logobanderas"/>
                <button onClick={ ()=> {
                    setCambioBandera(0)
                }
                } className="button-cambio">
                    <img src={exchange} alt="exchange" className="logobanderas"/>
                </button>
                <img src={usa} alt="usa" className="logobanderas"/>
            </div>
        </>
        )
    }

    return (
        <>
            <div>
                {contenidoBandera}
            </div>

            <div className="rates-container-conversion">
                <div className="left-content">
                    <div className="input-container">
                        <select name="bancos" id="bancos" value={valorBanco} onChange={cambioBanco}>
                            <option value="bncr">BNCR</option>
                            <option value="bn">BN</option>
                            <option value="bac">BAC</option>
                            <option value="bp">Banco Popular</option>
                            <option value="sb">ScotiaBank</option>
                            <option value="bla">Banco LAFISE</option>
                        </select>
                    </div>
                    <div className="conversion-logo">{imagenConversion()}</div>
                    <form className="form-monto">
                        <label htmlFor="monto">Monto: </label>
                        <input
                            type="number"
                            id="monto"
                            value={monto}
                            onChange={obtenerCambio}
                        />
                    </form>
                    <div className="tcambio-conversion">
                        {tCambioConversion()}
                    </div>
                </div>
            </div>

            {resultado !== null && (
                <div className="resultado-container">
                {<div className="tcambio-conversion">
                        <div>Resultado: ₡{resultado} </div>
                </div>}
            </div>)}

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
                    {contenido}
                </div>
            </>
            );
            }

            export default RadiosConversion;