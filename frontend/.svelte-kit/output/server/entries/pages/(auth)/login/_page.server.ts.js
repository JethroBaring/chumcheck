import { P as PUBLIC_API_URL } from "../../../../chunks/public.js";
import { z } from "zod";
import { d as dev } from "../../../../chunks/formData.js";
import "../../../../chunks/client.js";
import "just-clone";
import "ts-deepmerge";
import { f as fail, r as redirect } from "../../../../chunks/index.js";
import "devalue";
import { s as superValidate, z as zod, m as message } from "../../../../chunks/zod.js";
import "memoize-weak";
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});
const load = async () => {
  const form = await superValidate(zod(loginSchema));
  return {
    form
  };
};
const actions = {
  default: async ({ fetch, request, cookies }) => {
    const form = await superValidate(request, zod(loginSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    const { email, password } = form.data;
    try {
      const response = await fetch(`${PUBLIC_API_URL}/tokens/acquire/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const data = await response.json();
      if (response.ok) {
        cookies.set("Refresh", data.refresh, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
          secure: !dev
        });
        cookies.set("Access", data.access, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          maxAge: 5 * 60,
          secure: !dev
        });
        throw redirect(302, "/");
      }
      return message(form, { text: data.message });
    } catch (error) {
      console.log(error);
    }
  }
};
export {
  actions,
  load
};
