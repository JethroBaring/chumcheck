import { r as redirect } from "../../../../../chunks/index.js";
import { P as PUBLIC_API_URL } from "../../../../../chunks/public.js";
const load = async ({ locals, url, fetch, cookies }) => {
  const current = url.pathname.split("/").pop();
  if (!locals.user) {
    redirect(302, "/");
  }
  if (locals.user.type === "ME") {
    redirect(302, "/mentor");
  } else if (locals.user.type === "S") {
    redirect(302, "/user");
  } else if (locals.user.type === "M") {
    const response = await fetch(`${PUBLIC_API_URL}/startups/ranking-by-urat/`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${cookies.get("Access")}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      const mentor = await fetch(`${PUBLIC_API_URL}/users/?user_type=ME`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${cookies.get("Access")}`
        }
      });
      const mentor_data = await mentor.json();
      if (mentor.ok) {
        return {
          startups: data.filter((d) => d.qualification_status === 2),
          user: locals.user,
          current,
          mentors: mentor_data.results
        };
      }
    }
  } else {
    redirect(302, "/");
  }
};
export {
  load
};
