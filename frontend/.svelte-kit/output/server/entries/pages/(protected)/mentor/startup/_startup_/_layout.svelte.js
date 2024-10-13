import { c as create_ssr_component, v as validate_component, e as escape, d as each, a as add_attribute } from "../../../../../../chunks/ssr.js";
import { U as UserRoundPlus, a as UserRound, C as Close, b as Chart, N as Newspaper, F as Footprints, B as Bookcheck, R as Road } from "../../../../../../chunks/cuboid.js";
import { S as ShoppingCart, P as Package, U as Users, L as LineChart } from "../../../../../../chunks/users.js";
import { H as Home } from "../../../../../../chunks/home.js";
import { P as Package2, M as Menu, S as Sheet_content, a as Search, D as Dropdown_menu_separator } from "../../../../../../chunks/menu.js";
import { P as Plus } from "../../../../../../chunks/plus.js";
import { R as Root, T as Trigger, D as Dialog_content } from "../../../../../../chunks/index8.js";
import "../../../../../../chunks/index3.js";
import "../../../../../../chunks/index4.js";
import { R as Root$2, T as Trigger$2, D as Dropdown_menu_content, a as Dropdown_menu_label, b as Dropdown_menu_item } from "../../../../../../chunks/index6.js";
import { I as Input } from "../../../../../../chunks/input.js";
import { R as Root$1, T as Trigger$1 } from "../../../../../../chunks/index5.js";
import { L as Label } from "../../../../../../chunks/label.js";
import { S as Sun, M as Moon } from "../../../../../../chunks/Moon.js";
import "../../../../../../chunks/stores.js";
import { B as Button } from "../../../../../../chunks/button.js";
import { B as Badge } from "../../../../../../chunks/badge.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let currentTab = data.cur;
  let search;
  let searchedUsers = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex min-h-screen w-full text-flutter-gray dark:text-flutter-white">${`<div class="hidden w-[280px] border-r bg-muted/40 md:block"><div class="flex h-full max-h-screen flex-col gap-2"><div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6"><a href="/" class="flex items-center gap-2 font-semibold">${validate_component(Package2, "Package2").$$render($$result, { class: "h-6 w-6" }, {}, {})} <span class="">${escape(data.startup.name)}</span></a> <div class="ml-auto flex items-center gap-3">${validate_component(Root, "Dialog.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Trigger, "Dialog.Trigger").$$render($$result, {}, {}, {
          default: () => {
            return `<button class="flex items-center">${validate_component(UserRoundPlus, "UserRoundPlus").$$render($$result, { class: "h-4 w-4" }, {}, {})}</button>`;
          }
        })} ${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-1/2 sm:max-w-[425px]" }, {}, {
          default: () => {
            return `<div class="flex flex-col gap-5"><div class="" data-svelte-h="svelte-mgsuw7"><h1 class="text-[18px] font-semibold">Invite member</h1></div> <form><div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
              default: () => {
                return `Type an email, then invite them to your startup.`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                name: "email",
                id: "email",
                type: "text",
                placeholder: "m@example.com",
                value: search
              },
              {
                value: ($$value) => {
                  search = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div></form> <div class="flex flex-col gap-5">${each(searchedUsers, (user) => {
              return `<div class="flex items-center justify-between gap-3"><div class="flex items-center gap-3"><img src="/images/placeholder.jpg"${add_attribute("width", 36, 0)}${add_attribute("height", 36, 0)} alt="Avatar" class="overflow-hidden rounded-full"> <p>${escape(user.email)}</p></div> <button>${validate_component(Plus, "Add").$$render($$result, { class: "h-4 w-4" }, {}, {})}</button> </div>`;
            })}</div></div>`;
          }
        })}`;
      }
    })} ${validate_component(Root, "Dialog.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Trigger, "Dialog.Trigger").$$render($$result, {}, {}, {
          default: () => {
            return `<button class="flex items-center">${validate_component(UserRound, "UserRound").$$render($$result, { class: "h-4 w-4" }, {}, {})}</button>`;
          }
        })} ${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "sm:max-w-[425px] h-1/2" }, {}, {
          default: () => {
            return `<div class="flex flex-col gap-5"><div class="" data-svelte-h="svelte-1p9vdm1"><h1 class="text-[18px] font-semibold">Members</h1></div> <div class="flex flex-col gap-5"><div class="flex items-center justify-between gap-3"><div class="flex items-center gap-3" data-svelte-h="svelte-eq3zkz"><img src="/images/placeholder.jpg"${add_attribute("width", 36, 0)}${add_attribute("height", 36, 0)} alt="Avatar" class="overflow-hidden rounded-full"> <p>Sample</p></div> <button>${validate_component(Close, "Remove").$$render($$result, { class: "h-4 w-4" }, {}, {})}</button></div> <div class="flex items-center justify-between gap-3"><div class="flex items-center gap-3" data-svelte-h="svelte-eq3zkz"><img src="/images/placeholder.jpg"${add_attribute("width", 36, 0)}${add_attribute("height", 36, 0)} alt="Avatar" class="overflow-hidden rounded-full"> <p>Sample</p></div> <button>${validate_component(Close, "Remove").$$render($$result, { class: "h-4 w-4" }, {}, {})}</button></div></div></div>`;
          }
        })}`;
      }
    })}</div></div> <div class="flex-1"><nav class="grid items-start px-2 text-sm font-medium lg:px-4"><a${add_attribute("href", `/mentor/startup/${data.startupId}/rl`, 0)}${add_attribute(
      "class",
      `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentTab === "rl" ? "bg-muted text-primary" : "text-muted-foreground"}`,
      0
    )}>${validate_component(Chart, "Chart").$$render($$result, { class: "h-4 w-4" }, {}, {})}
							Readiness Level</a> <a${add_attribute("href", `/mentor/startup/${data.startupId}/rna`, 0)}${add_attribute(
      "class",
      `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentTab === "rna" ? "bg-muted text-primary" : "text-muted-foreground"}`,
      0
    )}>${validate_component(Newspaper, "Newspaper").$$render($$result, { class: "h-4 w-4" }, {}, {})}
							Readiness and Needs Assessment</a> <a${add_attribute("href", `/mentor/startup/${data.startupId}/rns`, 0)}${add_attribute(
      "class",
      `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentTab === "rns" ? "bg-muted text-primary" : "text-muted-foreground"}`,
      0
    )}>${validate_component(Footprints, "Footprints").$$render($$result, { class: "h-4 w-4" }, {}, {})}
							Recommended Next Step</a> <a${add_attribute("href", `/mentor/startup/${data.startupId}/i`, 0)}${add_attribute(
      "class",
      `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentTab === "i" ? "bg-muted text-primary" : "text-muted-foreground"}`,
      0
    )}>${validate_component(Bookcheck, "Bookcheck").$$render($$result, { class: "h-4 w-4" }, {}, {})}
							Initiatives</a> <a${add_attribute("href", `/mentor/startup/${data.startupId}/rb`, 0)}${add_attribute(
      "class",
      `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentTab === "rb" ? "bg-muted text-primary" : "text-muted-foreground"}`,
      0
    )}>${validate_component(Road, "Road").$$render($$result, { class: "h-4 w-4" }, {}, {})}
							Roadblocks</a></nav></div></div></div>`} <div class="flex flex-1 flex-col"><header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"><button>${`${validate_component(Close, "Close").$$render($$result, { class: "w-5" }, {}, {})}`}</button> ${validate_component(Root$1, "Sheet.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Trigger$1, "Sheet.Trigger").$$render($$result, { asChild: true }, {}, {
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
            return `<nav class="grid gap-2 text-lg font-medium"><a href="##" class="flex items-center gap-2 text-lg font-semibold">${validate_component(Package2, "Package2").$$render($$result, { class: "h-6 w-6" }, {}, {})} <span class="sr-only">${escape(data.startup.name)}</span></a> <a href="##" class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">${validate_component(Home, "Home").$$render($$result, { class: "h-5 w-5" }, {}, {})}
							Dashboard</a> <a href="##" class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">${validate_component(ShoppingCart, "ShoppingCart").$$render($$result, { class: "h-5 w-5" }, {}, {})}
							Orders
							${validate_component(Badge, "Badge").$$render(
              $$result,
              {
                class: "ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              },
              {},
              {
                default: () => {
                  return `6`;
                }
              }
            )}</a> <a href="##" class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">${validate_component(Package, "Package").$$render($$result, { class: "h-5 w-5" }, {}, {})}
							Products</a> <a href="##" class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">${validate_component(Users, "Users").$$render($$result, { class: "h-5 w-5" }, {}, {})}
							Customers</a> <a href="##" class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">${validate_component(LineChart, "LineChart").$$render($$result, { class: "h-5 w-5" }, {}, {})}
							Analytics</a></nav>`;
          }
        })}`;
      }
    })} <div class="relative ml-auto flex-1 md:grow-0">${validate_component(Search, "Search").$$render(
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
        return `Mentor`;
      }
    })} ${validate_component(Root$2, "DropdownMenu.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Trigger$2, "DropdownMenu.Trigger").$$render($$result, { asChild: true }, {}, {
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
            })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
              default: () => {
                return `<form action="/logout" method="post"><button type="submit">${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                  default: () => {
                    return `Logout`;
                  }
                })}</button></form>`;
              }
            })}`;
          }
        })}`;
      }
    })}</header> <main class="mx-auto flex w-full flex-1 flex-col gap-4 p-4 lg:gap-4 lg:p-6">${slots.default ? slots.default({}) : ``}</main></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Layout as default
};
