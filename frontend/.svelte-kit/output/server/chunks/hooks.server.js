import { P as PUBLIC_API_URL } from "./public.js";
import jwt from "jsonwebtoken";
const handle = async ({ event, resolve }) => {
  let access = event.cookies.get("Access");
  if (!access) {
    try {
      const refresh = event.cookies.get("Refresh");
      if (!refresh) {
        return await resolve(event);
      }
      const response = await fetch(`${PUBLIC_API_URL}/tokens/refresh/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${refresh}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          refresh
        })
      });
      1;
      if (response.ok) {
        const data = await response.json();
        event.cookies.set("Access", data?.access, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          maxAge: 5 * 60
        });
        access = event.cookies.get("Access");
      } else {
        console.error("Request failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("inside refresh");
      console.log(error);
    }
  }
  if (access) {
    try {
      const decoded = jwt.verify(
        access,
        "django-insecure-vak*mz%99+#882*g*87x8$%!r=trnnqd)zh2)i$w51ra4cd&eg"
      );
      const response = await fetch(`${PUBLIC_API_URL}/users/${decoded?.user_id}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json"
          // Add this line
        }
      });
      if (response.ok) {
        const data = await response.json();
        event.locals.user = {
          id: Number.parseInt(decoded.user_id),
          type: data?.user_type,
          email: data?.email,
          firstName: data?.first_name,
          lastName: data?.last_name
        };
        console.log("access token not expired");
      } else {
        console.error("Request failed:", response.status, response.statusText);
      }
    } catch (err) {
      console.log("access token expired");
      console.log(err);
    }
  }
  return await resolve(event);
};
export {
  handle
};
