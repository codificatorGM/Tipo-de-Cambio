import React, {useState, useEffect} from 'react';

function MostrarFecha() {
    const [fecha, setFecha] = useState('');

    function actualizarTiempo() {
        const hoy = new Date();
        const fechaFormateada = `${hoy.getMonth() + 1}/${hoy.getDate()}/${hoy.getFullYear()}   ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;
        setFecha(fechaFormateada);
    }

    useEffect(() => {
        actualizarTiempo(); // Set the initial time
        const interval = setInterval(actualizarTiempo, 1000); // Update time every second
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="disclaimer">
            <p>Fecha Actual: {fecha}</p>
            <div className="seccionLinea">
                <p>*Datos obtenidos de </p>
                <a href={"https://www.baccredomatic.com/es-cr"}> BAC Credomatic© - Costa Rica</a>
            </div>
        </div>
    );
}

export default MostrarFecha;
