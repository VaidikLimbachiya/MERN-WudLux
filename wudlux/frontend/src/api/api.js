export const apiCall = async (url, method, body) => {
  const refreshAccessToken = async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include", // Send cookies
      });
  
      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }
  
      const data = await response.json();
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        return true;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
    return false;
  };
  
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  console.log("API Call:", url, { method, headers, body });

  let response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  // If token expired, try refreshing and retry request
  if (response.status === 401) {
    console.warn("Access token expired. Attempting refresh...");

    const refreshed = await refreshAccessToken();
    if (refreshed) {
      headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;

      // Retry the original request with the new token
      response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });
    } else {
      console.error("Refresh token failed. Redirecting to login.");
      localStorage.clear();
      window.location.href = "/log-in"; // Redirect user to login page
      throw new Error("Session expired. Please log in again.");
    }
  }

  if (!response.ok) {
    const error = await response.json();
    console.error("API Error Response:", error);
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
};
