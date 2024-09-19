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
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-f1nrop_START -->${$$result.title = `<title>Register</title>`, ""}<!-- HEAD_svelte-f1nrop_END -->`, ""} <div class="bg-muted/40 text-flutter-gray dark:text-flutter-white relative flex h-full flex-1 flex-col items-center rounded-bl-xl rounded-tl-xl" data-svelte-h="svelte-t8npo1"><div class="absolute flex w-full cursor-pointer items-center gap-2 p-5"><img src="launchlab_logo.png" alt="citeams_logo" class="h-7 w-7"> <a href="/" class="cursor-pointer text-xl font-black normal-case">ChumCheck</a></div> <div class="flex flex-1 items-center justify-center"><img src="register.svg" alt="" class="h-3/4 w-3/4"></div></div> <div class="bg-background text-flutter-gray dark:text-flutter-white flex h-full flex-1 items-center justify-center rounded-br-xl rounded-tr-xl"><form method="post" class="flex items-center justify-center py-12"><div class="mx-auto grid w-[350px] gap-6"><div class="grid gap-2 text-center" data-svelte-h="svelte-1urua6q"><h1 class="text-3xl font-bold">Register</h1> <p class="text-[15px] text-muted-foreground text-balance">Enter all information below to create an account</p></div> <div class="grid gap-4"><div class="grid gap-2"><div class="flex items-center">${validate_component(Label, "Label").$$render($$result, { for: "firstName" }, {}, {
      default: () => {
        return `First name`;
      }
    })}</div> ${validate_component(Input, "Input").$$render(
      $$result,
      {
        name: "firstName",
        id: "firstName",
        type: "text",
        required: true,
        value: $form.firstName
      },
      {
        value: ($$value) => {
          $form.firstName = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="grid gap-2"><div class="flex items-center">${validate_component(Label, "Label").$$render($$result, { for: "lastName" }, {}, {
      default: () => {
        return `Last name`;
      }
    })}</div> ${validate_component(Input, "Input").$$render(
      $$result,
      {
        name: "lastName",
        id: "lastName",
        type: "text",
        required: true,
        value: $form.lastName
      },
      {
        value: ($$value) => {
          $form.lastName = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
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
    })}</div> ${validate_component(Input, "Input").$$render(
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
    )}</div> <div class="grid gap-2"><div class="flex items-center">${validate_component(Label, "Label").$$render($$result, { for: "repeatPassword" }, {}, {
      default: () => {
        return `Repeat Password`;
      }
    })}</div> ${validate_component(Input, "Input").$$render(
      $$result,
      {
        name: "repeatPassword",
        id: "repeatPassword",
        type: "password",
        required: true,
        value: $form.repeatPassword
      },
      {
        value: ($$value) => {
          $form.repeatPassword = $$value;
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
					Create Account`;
        }
      }
    )}</div> <div class="mt-4 text-center text-sm" data-svelte-h="svelte-vmqhyz">Already have an account?
				<a href="/login" class="underline">Login</a></div></div></form></div>`;
  } while (!$$settled);
  $$unsubscribe_form();
  return $$rendered;
});
export {
  Page as default
};
