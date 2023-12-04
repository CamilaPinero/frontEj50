import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteUser } from "./ApiMethods";
export default function TablaUsuarios() {
	const navigate = useNavigate();
	const [usuarios, setUsuarios] = useState([]);
	const [isLoading, setLoading] = useState(true);

	function handleMostrarTablaEdicion(id) {
		navigate(`modificar-usuario/${id}`);
	}

	const fetchUsuarios = async () => {
		try {
			const response = await fetch("http://localhost:3000/usuarios", {
				method: "GET",
			});
			if (!response.ok) {
				throw new Error("error");
			}
			const data = await response.json();
			setUsuarios(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsuarios();
	}, []);

	async function handleDeleteUsuario(id) {
		await deleteUser(id);
		fetchUsuarios();
	}

	return (
		<div className="container">
			<div className="card">
				<div className="cardHeaders">
					<h5>Usuarios</h5>
					<button
						className="btn-sm btn btn-outline-primary"
						onClick={() => navigate("nuevo-usuario")}
					>
						Nuevo Usuario
					</button>
				</div>
				<div className="cardBody">
					<table className="table table-striped table-bordered">
						<thead id="tHeadUsuarios">
							<tr>
								<th scope="col">Id</th>
								<th scope="col">Usuario</th>
								<th scope="col">Email</th>
								<th scope="col">Is Premium</th>
								<th scope="col">Fecha de Nacimiento</th>
								<th scope="col">Configuracion</th>
							</tr>
						</thead>
						<tbody id="tBodyUsuarios">
							{isLoading ? (
								<tr>
									<th>cargando...</th>
								</tr>
							) : (
								<>
									{usuarios.map((usuario) => (
										<tr key={usuario.id}>
											<td scope="row">{usuario.id}</td>
											<td scope="row">{usuario.user}</td>
											<td scope="row">{usuario.email}</td>
											<td scope="row">
												{usuario.is_premium
													? "Si"
													: "No"}
											</td>
											<td scope="row">
												{usuario.birthdate &&
													`${new Date(
														usuario.birthdate
													).getDate()}-${
														new Date(
															usuario.birthdate
														).getMonth() + 1
													}`}
											</td>
											<td scope="row" className="config">
												<button
													className="btn btn-sm edit"
													onClick={() =>
														handleMostrarTablaEdicion(
															usuario.id
														)
													}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
													>
														<title>
															pencil-outline
														</title>
														<path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
													</svg>
												</button>
												<button
													className="btn btn-sm delete"
													id={usuario.id}
													onClick={() =>
														handleDeleteUsuario(
															usuario.id
														)
													}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
													>
														<title>
															delete-outline
														</title>
														<path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
													</svg>
												</button>
											</td>
										</tr>
									))}
								</>
							)}
						</tbody>
					</table>
				</div>
			</div>
			<Outlet />
		</div>
	);
}
