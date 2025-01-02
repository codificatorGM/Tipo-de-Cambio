import logo from './logo.svg';
import './App.css';
import RadiosConversion from "./RadiosConversion";
import FechaActual from "./FechaActual";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>Tipo de Cambio</h1>
                </div>
                <img src={logo} className="App-logo" alt="logo"/>
                <div>
                    <h1>Conversión por Divisas</h1>
                    <RadiosConversion/> {/* Render RadiosConversion component */}
                </div>
                <div>
                    <FechaActual/> {}
                </div>
            </header>
        </div>
    );
}

export default App;
