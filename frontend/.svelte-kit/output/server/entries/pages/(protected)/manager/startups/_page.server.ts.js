import { P as PUBLIC_API_URL } from "../../../../../chunks/public.js";
const load = async ({ cookies }) => {
  const response = await fetch(`${PUBLIC_API_URL}/startups/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.get("Access")}`
    }
  });
  const data = await response.json();
  if (response.ok) {
    return {
      startups: data.results
    };
  }
};
export {
  load
};
