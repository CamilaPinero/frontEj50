import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TablaUsuarios from "./components/TablaUsuarios";
import ModificarTablaUsuarios from "./components/ModificarTablaUsuarios";

function App() {
	return (
		<Router>
			<TablaUsuarios />
			<Routes>
				<Route
					path="/modificar-usuario"
					element={<ModificarTablaUsuarios />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
