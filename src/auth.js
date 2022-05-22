import { API_URL } from ".";

export function login (email, password, setInstance) {
    const url = `${API_URL}/user/login`;

    return fetch(url, {
        method: "POST",
        headers: { accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password})
    })
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("instance", JSON.stringify({ token: res.token, email: email }));
        setInstance({ token: res.token, email: email });
    })
}

export function register (email, password) {
    const url = `${API_URL}/user/register`;

    return fetch(url, {
        method: "POST",
        headers: { accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password})
    })
    .then(res => res.json())
    .then(res => console.log(res))
}