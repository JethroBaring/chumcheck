import { r as redirect } from "../../../../chunks/index.js";
const load = async ({ locals }) => {
  if (!locals.user) {
    redirect(302, "/");
  }
  switch (locals.user.type) {
    case "ME":
      return redirect(302, "/mentor");
    case "S":
      return redirect(302, "/user");
    case "M":
      return {
        user: locals.user
      };
    default:
      redirect(302, "/");
  }
};
export {
  load
};
