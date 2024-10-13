import { c as create_ssr_component, v as validate_component, s as spread, b as escape_object } from "./ssr.js";
import { H as Home } from "./home.js";
import { R as Root, T as Trigger, a as Tooltip_content, S as Settings } from "./sonner.js";
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<aside class="w-14 h-screen flex-col border-r bg-background sm:flex"><nav class="flex flex-col items-center gap-4 px-2 py-4"><a href="/" class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base" data-svelte-h="svelte-lgcydf"><img src="/logo.png" alt="chumcheck logo" class="h-7 w-7"> <span class="sr-only">ChumCheck</span></a> ${validate_component(Root, "Tooltip.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "Tooltip.Trigger").$$render($$result, { asChild: true }, {}, {
        default: ({ builder }) => {
          return `<a${spread(
            [
              { href: "/" },
              {
                class: "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              },
              escape_object(builder)
            ],
            {}
          )}>${validate_component(Home, "Home").$$render($$result, { class: "h-5 w-5" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1in8tzo">Home</span></a>`;
        }
      })} ${validate_component(Tooltip_content, "Tooltip.Content").$$render($$result, { side: "right" }, {}, {
        default: () => {
          return `Home`;
        }
      })}`;
    }
  })}</nav> <nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">${validate_component(Root, "Tooltip.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "Tooltip.Trigger").$$render($$result, { asChild: true }, {}, {
        default: ({ builder }) => {
          return `<a${spread(
            [
              { href: "##" },
              {
                class: "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              },
              escape_object(builder)
            ],
            {}
          )}>${validate_component(Settings, "Settings").$$render($$result, { class: "h-5 w-5" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-3jnvtq">Settings</span></a>`;
        }
      })} ${validate_component(Tooltip_content, "Tooltip.Content").$$render($$result, { side: "right" }, {}, {
        default: () => {
          return `Settings`;
        }
      })}`;
    }
  })}</nav></aside>`;
});
export {
  Sidebar as S
};
