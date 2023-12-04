import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TablaUsuarios from "./components/TablaUsuarios";
import ModificarTablaUsuarios from "./components/ModificarTablaUsuarios";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/tabla-usuarios" element={<TablaUsuarios />}>
					<Route
						path="modificar-usuario/:usuarioId"
						element={<ModificarTablaUsuarios />}
					/>
					<Route
						path="nuevo-usuario"
						element={<ModificarTablaUsuarios />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
