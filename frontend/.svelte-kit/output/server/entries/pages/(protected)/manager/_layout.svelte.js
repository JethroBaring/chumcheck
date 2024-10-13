import { c as create_ssr_component, v as validate_component, s as spread, b as escape_object } from "../../../../chunks/ssr.js";
import "dequal";
import "../../../../chunks/create.js";
import "clsx";
import { R as Root, T as Trigger, a as Tooltip_content, S as Settings, b as Sonner_1 } from "../../../../chunks/sonner.js";
import "../../../../chunks/stores.js";
import "../../../../chunks/index3.js";
import "../../../../chunks/index4.js";
import "../../../../chunks/index5.js";
import "../../../../chunks/client.js";
import { H as Home } from "../../../../chunks/home.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Grid_2x2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2"
      }
    ],
    ["path", { "d": "M3 12h18" }],
    ["path", { "d": "M12 3v18" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "grid-2x2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Grid = Grid_2x2;
const AdminSidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<aside class="w-14 h-screen flex-col border-r bg-background sm:flex"><nav class="flex flex-col items-center gap-4 px-2 py-4"><a href="/" class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base" data-svelte-h="svelte-lgcydf"><img src="/logo.png" alt="chumcheck logo" class="h-7 w-7"> <span class="sr-only">ChumCheck</span></a> ${validate_component(Root, "Tooltip.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "Tooltip.Trigger").$$render($$result, { asChild: true }, {}, {
        default: ({ builder }) => {
          return `<a${spread(
            [
              { href: "/manager/dashboard/pending" },
              {
                class: "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              },
              escape_object(builder)
            ],
            {}
          )}>${validate_component(Home, "Home").$$render($$result, { class: "h-5 w-5" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1677gfz">Dashboard</span></a>`;
        }
      })} ${validate_component(Tooltip_content, "Tooltip.Content").$$render($$result, { side: "right" }, {}, {
        default: () => {
          return `Dashboard`;
        }
      })}`;
    }
  })} ${validate_component(Root, "Tooltip.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "Tooltip.Trigger").$$render($$result, { asChild: true }, {}, {
        default: ({ builder }) => {
          return `<a${spread(
            [
              { href: "/manager/startups" },
              {
                class: "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              },
              escape_object(builder)
            ],
            {}
          )}>${validate_component(Grid, "Grid").$$render($$result, { class: "h-5 w-5" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1p9ssv5">Startups</span></a>`;
        }
      })} ${validate_component(Tooltip_content, "Tooltip.Content").$$render($$result, { side: "right" }, {}, {
        default: () => {
          return `Startups`;
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
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Sonner_1, "Toaster").$$render($$result, {}, {}, {})} <div class="flex w-full bg-muted/40">${validate_component(AdminSidebar, "AdminSidebar").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
