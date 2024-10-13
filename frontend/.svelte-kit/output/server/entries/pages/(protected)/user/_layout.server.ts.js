import { r as redirect } from "../../../../chunks/index.js";
const load = async ({ locals }) => {
  if (!locals.user) {
    redirect(302, "/");
  }
  switch (locals.user.type) {
    case "M":
      return redirect(302, "/manager");
    case "ME":
      return redirect(302, "/mentor");
    case "S":
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
