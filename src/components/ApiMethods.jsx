/* eslint-disable no-unused-vars */
export async function createUser(user) {
	try {
		const response = await fetch("http://localhost:3000/usuarios", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error:", error);
	}
}

export async function updateUser(userId, updatedUserData) {
	try {
		const response = await fetch(
			`http://localhost:3000/usuarios/${userId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedUserData),
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error:", error);
	}
}

export async function deleteUser(userId) {
	try {
		const response = await fetch(
			`http://localhost:3000/usuarios/${userId}`,
			{
				method: "DELETE",
			}
		);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
	} catch (error) {
		console.error("Error:", error);
	}
}
