import { P as PUBLIC_API_URL } from "../../../../../../chunks/public.js";
const load = async ({ cookies }) => {
  const response = await fetch(`${PUBLIC_API_URL}/startups/ranking-by-rubrics/`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("Access")}`
    }
  });
  const data = await response.json();
  if (response.ok) {
    console.log(data);
    return {
      applicants: data,
      access: cookies.get("Access")
    };
  }
};
export {
  load
};
