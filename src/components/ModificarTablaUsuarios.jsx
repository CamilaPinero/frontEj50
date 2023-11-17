/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { createUser, updateUser } from "./ApiMethods";

export default function ModificarTablaUsuarios({
	fetchUsuarios,
	setMostrarTabla,
	usuarios,
	usuarioId,
	setUsuarioId,
	nombreForm,
}) {
	const usuarioInicial = {
		user: "",
		password: "",
		email: "",
		is_premium: 0,
		birthdate: "",
	};

	const [nuevoUsuario, setNuevoUsuario] = useState(usuarioInicial);

	useEffect(() => {
		if (usuarioId) {
			let usuario = usuarios.find((u) => u.id === usuarioId);
			setNuevoUsuario(usuario);
		}
	}, [usuarioId, usuarios]);

	function handleNuevoUsuarioChange(e) {
		setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		//si no usuarioId === null el formulario es para crear un usuario nuevo, de lo contrario es de edicion
		if (!usuarioId) {
			await createUser(nuevoUsuario);
			fetchUsuarios();
			setNuevoUsuario(usuarioInicial);
			setMostrarTabla(false);
		} else {
			await updateUser(usuarioId, nuevoUsuario);
			fetchUsuarios();
			setNuevoUsuario(usuarioInicial);
			setMostrarTabla(false);
			setUsuarioId(null);
		}
	}

	return (
		<>
			<div className="card nuevoUsuario">
				<div className="dialog">
					<div className="content">
						<div className="cardHeaders">
							<h5 className="title">{nombreForm} usuario</h5>
						</div>
						<form id="usuarios-form" onSubmit={handleSubmit}>
							<div className="cardBody">
								<div className="mb-3">
									<label
										htmlFor="usuario"
										className="form-label"
									>
										Usuario
									</label>
									<input
										type="text"
										className="form-control"
										id="usuario"
										aria-describedby="usuario"
										name="user"
										onChange={handleNuevoUsuarioChange}
										value={nuevoUsuario.user}
									/>
								</div>
								<div className="mb-3">
									<label
										htmlFor="contraseña"
										className="form-label"
									>
										Contraseña
									</label>
									<input
										type="password"
										className="form-control"
										id="contraseña"
										name="password"
										onChange={handleNuevoUsuarioChange}
										value={nuevoUsuario.password}
									/>
								</div>
								<div className="mb-3">
									<label
										htmlFor="email"
										className="form-label"
									>
										Email
									</label>
									<input
										type="email"
										className="form-control"
										id="email"
										name="email"
										onChange={handleNuevoUsuarioChange}
										value={nuevoUsuario.email}
									/>
								</div>
								<div className="mb-3">
									<label
										htmlFor="is_premium"
										className="form-label"
									>
										Premium
									</label>
									<input
										type="text"
										className="form-control"
										id="is_premium"
										name="is_premium"
										onChange={handleNuevoUsuarioChange}
										value={nuevoUsuario.is_premium}
									/>
								</div>
								<div className="mb-3">
									<label
										htmlFor="contraseña"
										className="form-label"
									>
										Fecha de Nacimiento
									</label>
									<input
										type="date"
										className="form-control"
										id="birthdate"
										name="birthdate"
										onChange={handleNuevoUsuarioChange}
										value={
											nuevoUsuario.birthdate
												? `${new Date(
														nuevoUsuario.birthdate
												  ).getFullYear()}-${
														new Date(
															nuevoUsuario.birthdate
														).getMonth() < 9
															? "0" +
															  (new Date(
																	nuevoUsuario.birthdate
															  ).getMonth() +
																	1)
															: new Date(
																	nuevoUsuario.birthdate
															  ).getMonth() + 1
												  }-${
														new Date(
															nuevoUsuario.birthdate
														).getDate() < 10
															? "0" +
															  new Date(
																	nuevoUsuario.birthdate
															  ).getDate()
															: new Date(
																	nuevoUsuario.birthdate
															  ).getDate()
												  }`
												: ""
										}
									/>
								</div>
							</div>
							<div className="card-footer">
								<button
									type="button"
									className="btn btn-secondary btn-sm"
									onClick={() => setMostrarTabla(false)}
								>
									Close
								</button>
								<button
									type="submit"
									className="btn btn-primary btn-sm"
									form="usuarios-form"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
