import { BASEURL, ACCESS_TOKEN } from "../constants/apiConstants";
import {
	CREATE_REQUEST_TOKEN_URL,
	CREATE_SESSION_URL,
	VALIDATE_WITH_LOGIN_URL,
	ACCOUNT_URL,
} from "../constants/endpoints";
import { computed } from "vue";

export default function useAuth(app) {
	const user = computed({
		get: () => JSON.parse(localStorage.getItem("user-id") || "null"),
		set: (value) => localStorage.setItem("user-id", JSON.stringify(value)),
	});
	async function createRequestToken() {
		const res = await fetch(`${BASEURL}/3/${CREATE_REQUEST_TOKEN_URL}`, {
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
		});
		const data = await res.json();
		if (!data.success) {
			throw new Error("Creating request token failed.");
		}
		return data.request_token;
	}

	async function validateWithLogin(requestToken, username, password) {
		const options = {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
			body: JSON.stringify({
				username: username,
				password: password,
				request_token: requestToken,
			}),
		};
		const res = await fetch(
			`${BASEURL}/3/${VALIDATE_WITH_LOGIN_URL}`,
			options
		);
		const data = await res.json();
		if (!data.success) {
			throw new Error("Authorizing the request token failed.");
		}
	}

	async function createSession(requestToken) {
		const options = {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
			body: JSON.stringify({ request_token: requestToken }),
		};

		const res = await fetch(`${BASEURL}/3/${CREATE_SESSION_URL}`, options);
		const data = await res.json();
		if (!data.success) {
			throw new Error("Creating session failed.");
		}
		sessionStorage.setItem("session_id", data.session_id);
	}

	async function getAccountData() {
		const sessionId = sessionStorage.getItem("session_id");
		if (!sessionId) {
			throw new Error("No session ID.");
		}
		const params = new URLSearchParams();
		params.append("session_id", sessionId);
		const url = `${BASEURL}/3/${ACCOUNT_URL}?${params}`;
		const options = {
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
		};
		const res = await fetch(url, options);
		const data = await res.json();
		if (!data.id) {
			throw new Error("Getting user info failed.");
		}
		sessionStorage.setItem("user_id", data.id);
		return data;
	}

	async function login(username, password) {
		const requestToken = await createRequestToken();
		await validateWithLogin(requestToken, username, password);
		await createSession(requestToken);

		user.value = await getAccountData();
	}
    app.provide('user', user.value);
    app.provide('login', login);
}
