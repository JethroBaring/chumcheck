import { r as redirect } from "../../../chunks/index.js";
const load = ({ locals }) => {
  if (locals.user) {
    if (locals.user.type === "S") {
      throw redirect(302, "/user");
    } else if (locals.user.type === "M") {
      throw redirect(302, "/manager/dashboard/pending");
    } else {
      throw redirect(302, "/mentor");
    }
  }
};
export {
  load
};
