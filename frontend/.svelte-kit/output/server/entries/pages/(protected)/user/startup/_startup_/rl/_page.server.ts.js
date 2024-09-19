import { P as PUBLIC_API_URL } from "../../../../../../../chunks/public.js";
const load = async ({ fetch, cookies, params }) => {
  const readiness_level = await fetch(
    `${PUBLIC_API_URL}/startup-readiness-levels/?startup_id=${params.startup}`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${cookies.get("Access")}`
      }
    }
  );
  const data = await readiness_level.json();
  if (readiness_level.ok) {
    return {
      readiness: data.results
    };
  }
};
export {
  load
};
