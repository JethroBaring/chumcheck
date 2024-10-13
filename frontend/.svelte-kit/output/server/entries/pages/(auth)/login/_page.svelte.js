import { a as subscribe } from "../../../../chunks/lifecycle.js";
import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/index4.js";
import { I as Input } from "../../../../chunks/input.js";
import { L as Label } from "../../../../chunks/label.js";
import "../../../../chunks/client.js";
import { s as superForm } from "../../../../chunks/formData.js";
import "just-clone";
import "ts-deepmerge";
import "../../../../chunks/index.js";
import "devalue";
import { B as Button } from "../../../../chunks/button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let { data } = $$props;
  let isLoading = false;
  const { form, errors, enhance, message } = superForm(data.form);
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1bel8ov_START -->${$$result.title = `<title>Login</title>`, ""}<!-- HEAD_svelte-1bel8ov_END -->`, ""} <div class="bg-muted/40 text-flutter-gray dark:text-flutter-white relative flex h-full flex-1 flex-col items-center rounded-bl-xl rounded-tl-xl" data-svelte-h="svelte-17eq7kl"><div class="absolute flex w-full cursor-pointer items-center gap-2 p-5"><img src="launchlab_logo.png" alt="citeams_logo" class="h-7 w-7"> <a href="/" class="cursor-pointer text-xl font-black normal-case">ChumCheck</a></div> <div class="flex flex-1 items-center justify-center"><img src="loginv2.svg" alt="" class="h-3/4 w-3/4"></div></div> <div class="bg-background text-flutter-gray dark:text-flutter-white flex h-full flex-1 items-center justify-center rounded-br-xl rounded-tr-xl"><form method="post" class="flex items-center justify-center py-12"><div class="mx-auto grid w-[350px] gap-6"><div class="grid gap-2 text-center" data-svelte-h="svelte-oqw02a"><h1 class="text-3xl font-bold">Login</h1> <p class="text-[15px] text-muted-foreground text-balance">Enter your email below to login to your account</p></div> <div class="grid gap-4"><div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
      default: () => {
        return `Email`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        name: "email",
        id: "email",
        type: "email",
        placeholder: "m@example.com",
        required: true,
        value: $form.email
      },
      {
        value: ($$value) => {
          $form.email = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="grid gap-2"><div class="flex items-center">${validate_component(Label, "Label").$$render($$result, { for: "password" }, {}, {
      default: () => {
        return `Password`;
      }
    })} <a href="/forgotpassword" class="ml-auto inline-block text-sm underline" data-svelte-h="svelte-18bzu7k">Forgot your password?</a></div> ${validate_component(Input, "Input").$$render(
      $$result,
      {
        name: "password",
        id: "password",
        type: "password",
        required: true,
        value: $form.password
      },
      {
        value: ($$value) => {
          $form.password = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "submit",
        class: "w-full",
        disabled: isLoading
      },
      {},
      {
        default: () => {
          return `${``}
					Login`;
        }
      }
    )}</div> <div class="mt-4 text-center text-sm" data-svelte-h="svelte-6zxid3">Don&#39;t have an account?
				<a href="/register" class="underline">Sign up</a></div></div></form></div>`;
  } while (!$$settled);
  $$unsubscribe_form();
  return $$rendered;
});
export {
  Page as default
};
