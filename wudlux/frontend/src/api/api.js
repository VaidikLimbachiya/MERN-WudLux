export const apiCall = async (url, method, body) => {
  console.log("API Call:", url, { method, headers: { "Content-Type": "application/json" }, body });

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("API Error Response:", error);
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
};
