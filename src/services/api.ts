const API_BASE_URL = "http://127.0.0.1:5000/api";

interface HealthResponse {
  status: string;
  message: string;
}

export async function checkApiHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data: HealthResponse = await response.json();

  return data;
}
