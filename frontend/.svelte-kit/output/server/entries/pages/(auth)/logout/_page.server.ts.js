import { r as redirect } from "../../../../chunks/index.js";
const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, "/");
  }
};
const actions = {
  default: ({ cookies }) => {
    cookies.set("Access", "", {
      path: "/",
      expires: /* @__PURE__ */ new Date(0)
    });
    cookies.set("Refresh", "", {
      path: "/",
      expires: /* @__PURE__ */ new Date(0)
    });
    throw redirect(302, "/");
  }
};
export {
  actions,
  load
};
