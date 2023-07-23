const API_URL = "http://localhost:5000";

export async function getAllChickens() {
  const res = await fetch(API_URL + "/all");
  return res.json();
}

export async function submitChicken(chicken) {
  const res = await fetch(API_URL + "/new", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chicken),
  });
  return res.json();
}

export async function updootChicken(id) {
  const res = await fetch(API_URL + "/updoot", {
    method: "PUT",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

export async function downdootChicken(id) {
  const res = await fetch(API_URL + "/downdoot", {
    method: "PUT",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return res.json();
}
