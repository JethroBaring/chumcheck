import { c as create_ssr_component, v as validate_component, a as add_attribute, d as each, e as escape } from "../../../../../chunks/ssr.js";
import { D as Down } from "../../../../../chunks/chevron-down.js";
import { H as Home } from "../../../../../chunks/home.js";
import { M as Menu, S as Sheet_content, P as Package2, a as Search, D as Dropdown_menu_separator } from "../../../../../chunks/menu.js";
import { R as Root$2, T as Trigger$2, D as Dialog_content } from "../../../../../chunks/index8.js";
import "../../../../../chunks/index3.js";
import "../../../../../chunks/index4.js";
import { C as Card } from "../../../../../chunks/card.js";
import "clsx";
import { R as Root$1, T as Trigger$1, D as Dropdown_menu_content, a as Dropdown_menu_label, b as Dropdown_menu_item } from "../../../../../chunks/index6.js";
import { I as Input } from "../../../../../chunks/input.js";
import { R as Root, T as Trigger } from "../../../../../chunks/index5.js";
import "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { S as Sun, M as Moon } from "../../../../../chunks/Moon.js";
import "../../../../../chunks/stores.js";
import { A as ApplicationForm } from "../../../../../chunks/ApplicationForm.js";
import { B as Button } from "../../../../../chunks/button.js";
import { B as Badge } from "../../../../../chunks/badge.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let showApplication = false;
  let { data } = $$props;
  function toggleShowApplication() {
    showApplication = !showApplication;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1tbr4kt_START -->${$$result.title = `<title>ChumCheck</title>`, ""}<!-- HEAD_svelte-1tbr4kt_END -->`, ""} <div class="grid min-h-screen w-full"><div class="flex w-full flex-col bg-muted/40"><header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">${validate_component(Root, "Sheet.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "Sheet.Trigger").$$render($$result, { asChild: true }, {}, {
        default: ({ builder }) => {
          return `${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "outline",
              size: "icon",
              class: "shrink-0 md:hidden",
              builders: [builder]
            },
            {},
            {
              default: () => {
                return `${validate_component(Menu, "Menu").$$render($$result, { class: "h-5 w-5" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-9wqi12">Toggle navigation menu</span>`;
              }
            }
          )}`;
        }
      })} ${validate_component(Sheet_content, "Sheet.Content").$$render($$result, { side: "left", class: "flex flex-col" }, {}, {
        default: () => {
          return `<nav class="grid gap-2 text-lg font-medium"><a href="##" class="flex items-center gap-2 text-lg font-semibold">${validate_component(Package2, "Package2").$$render($$result, { class: "h-6 w-6" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1vyedid">Acme Inc</span></a> <a href="##" class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">${validate_component(Home, "Home").$$render($$result, { class: "h-5 w-5" }, {}, {})}
							Home</a></nav>`;
        }
      })}`;
    }
  })} <p class="font-semibold" data-svelte-h="svelte-1e7e65s">Startups</p> <div class="relative ml-auto flex-1 md:grow-0">${validate_component(Search, "Search").$$render(
    $$result,
    {
      class: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
    },
    {},
    {}
  )} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "search",
      placeholder: "Search...",
      class: "w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
    },
    {},
    {}
  )}</div> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "ghost",
      size: "icon",
      class: "hover:bg-transparent hover:text-flutter-blue"
    },
    {},
    {
      default: () => {
        return `${validate_component(Sun, "Sun").$$render(
          $$result,
          {
            class: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          },
          {},
          {}
        )} ${validate_component(Moon, "Moon").$$render(
          $$result,
          {
            class: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          },
          {},
          {}
        )} <span class="sr-only" data-svelte-h="svelte-ntgole">Toggle theme</span>`;
      }
    }
  )} ${validate_component(Badge, "Badge").$$render($$result, {}, {}, {
    default: () => {
      return `Manager`;
    }
  })} ${validate_component(Root$1, "DropdownMenu.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger$1, "DropdownMenu.Trigger").$$render($$result, { asChild: true }, {}, {
        default: ({ builder }) => {
          return `${validate_component(Button, "Button").$$render(
            $$result,
            {
              builders: [builder],
              variant: "outline",
              size: "icon",
              class: "overflow-hidden rounded-full"
            },
            {},
            {
              default: () => {
                return `<img src="/images/placeholder.jpg"${add_attribute("width", 36, 0)}${add_attribute("height", 36, 0)} alt="Avatar" class="overflow-hidden rounded-full">`;
              }
            }
          )}`;
        }
      })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, { align: "end" }, {}, {
        default: () => {
          return `${validate_component(Dropdown_menu_label, "DropdownMenu.Label").$$render($$result, {}, {}, {
            default: () => {
              return `My Account`;
            }
          })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
            default: () => {
              return `Settings`;
            }
          })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
            default: () => {
              return `Support`;
            }
          })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} <form action="/logout" method="post"><button type="submit">${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
            default: () => {
              return `Logout`;
            }
          })}</button></form>`;
        }
      })}`;
    }
  })}</header> <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"> <div class="relative flex w-full items-center justify-between"><button class="flex w-fit cursor-pointer items-center gap-1">${`${validate_component(Down, "Down").$$render($$result, { class: "h-4 w-4" }, {}, {})}`} <h1 class="text-sm" data-svelte-h="svelte-18ghf1h">Assigned startups</h1></button> ${validate_component(Root$2, "Dialog.Root").$$render(
    $$result,
    {
      open: showApplication,
      onOpenChange: toggleShowApplication
    },
    {},
    {
      default: () => {
        return `${validate_component(Trigger$2, "Dialog.Trigger").$$render($$result, { class: "absolute right-0 h-8" }, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, { class: "text-white" }, {}, {
              default: () => {
                return `Apply`;
              }
            })}`;
          }
        })} ${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-4/5 max-w-[700px]" }, {}, {
          default: () => {
            return `${validate_component(ApplicationForm, "ApplicationForm").$$render($$result, {}, {}, {})}`;
          }
        })}`;
      }
    }
  )}</div>  ${`<div class="grid grid-cols-5 gap-5">${each(data.startups, (startup) => {
    return `<a${add_attribute("href", `/manager/startups/${startup.id}/rl`, 0)} data-sveltekit-preload-data="tap">${validate_component(Card, "Card.Root").$$render(
      $$result,
      {
        class: "flex h-44 cursor-pointer items-center justify-center text-xl font-semibold"
      },
      {},
      {
        default: () => {
          return `${escape(startup.name)}`;
        }
      }
    )} </a>`;
  })}</div>`}</main></div></div>`;
});
export {
  Page as default
};
