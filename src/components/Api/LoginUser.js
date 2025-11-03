// src/api/authApi.js
export async function loginUser(credentials) {
  // credentials = { email, password }
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data; // expected: { token, user, ... }
}

export async function registerUser(payload) {
  // payload = { name, email, password, confirmPassword? }
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
