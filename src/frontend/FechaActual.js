import React, {useState, useEffect} from 'react';
import github_mark from '../imagenes/github-mark.svg';
import mail from '../imagenes/mail.svg';

function MostrarFecha() {
    const [fecha, setFecha] = useState('');

    function actualizarTiempo() {
        const hoy = new Date();
        const fechaFormateada = `${hoy.getMonth() + 1}/${hoy.getDate()}/${hoy.getFullYear()}   ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;
        setFecha(fechaFormateada);
    }

    useEffect(() => {
        actualizarTiempo(); // Estado inicial
        const interval = setInterval(actualizarTiempo, 1000); // Actualizar temporarizador cada segundo
        // Limpia temporizador cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="disclaimer">
            <p className="fechaActual" >Fecha Actual: {fecha}</p>
            <div className="seccionLinea">
                <p>*Datos obtenidos de <a href={"https://github.com/codificatorGM/api-bancos-costa-rica"}> APIs abiertas bancos Costa Rica</a>
                    <a href="https://github.com/codificatorGM/Tipo-de-Cambio"> <img src={github_mark} alt="github_mark"
                                                                                    className="github-img"/></a>
                    <a href="mailto:hruns2000@gmail.com"> <img src={mail} alt="mail"
                                                                                    className="mail"/></a>
                </p>
            </div>
        </div>
    );
}

export default MostrarFecha;