/// trabajando en el servicio de usuario

async function getUser(username, password) {
    let url2 = `http://localhost:8080/api/users/getUser/6`;
    const token = `44b4ff323b3509c5b897e8199c0655197797128fa71d81335f68b9a2a3286f30`;

    let responses = await fetch(
        url2, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    },
        5,
    );
    console.log("responses OK: ", responses.ok);
}