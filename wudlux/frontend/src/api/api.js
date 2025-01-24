export const apiCall = async (url, method = "GET", body = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  console.log("API Call:", url, options);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.error(`Error: HTTP ${response.status} for URL: ${url}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error; // Re-throw to handle in the component
  }
};
