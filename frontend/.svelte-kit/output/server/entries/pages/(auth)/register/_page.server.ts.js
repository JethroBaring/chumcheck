import { P as PUBLIC_API_URL } from "../../../../chunks/public.js";
import { z } from "zod";
import "../../../../chunks/client.js";
import "../../../../chunks/formData.js";
import "just-clone";
import "ts-deepmerge";
import { f as fail } from "../../../../chunks/index.js";
import "devalue";
import { s as superValidate, z as zod, m as message } from "../../../../chunks/zod.js";
import "memoize-weak";
const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  repeatPassword: z.string().min(8)
});
const load = async () => {
  const form = await superValidate(zod(registerSchema));
  return {
    form
  };
};
const actions = {
  default: async ({ fetch, request }) => {
    const form = await superValidate(request, zod(registerSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    const { firstName, lastName, email, password, repeatPassword } = form.data;
    if (password !== repeatPassword) {
      return message(form, { text: "Password do not match" });
    }
    const response = await fetch(`${PUBLIC_API_URL}/users/signup/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirm_password: repeatPassword
      })
    });
    const data = await response.json();
    if (response.ok) {
      return message(form, { text: "Account created successfully" });
    }
    console.log("WEW");
    return message(form, { text: data.message });
  }
};
export {
  actions,
  load
};
