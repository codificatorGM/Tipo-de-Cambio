import logo from './imagenes/logo.svg';

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
            </header>
                <main className="App-body">
                <div>
                    <h1>Conversión por Divisas</h1>
                    <RadiosConversion/> {/* Render RadiosConversion component */}
                </div>
          </main>
            <footer className="App-footer">
                <div>
                    <FechaActual/> {}
                </div>
            </footer>
        </div>
    );
}

export default App;
