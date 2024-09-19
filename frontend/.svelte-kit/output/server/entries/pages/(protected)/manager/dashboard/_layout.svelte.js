import { c as create_ssr_component, v as validate_component, a as add_attribute, d as each, e as escape } from "../../../../../chunks/ssr.js";
import { H as Home } from "../../../../../chunks/home.js";
import "dequal";
import "../../../../../chunks/create.js";
import "clsx";
import "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../../chunks/stores.js";
import { S as ShoppingCart, P as Package, U as Users, L as LineChart } from "../../../../../chunks/users.js";
import { M as Menu, S as Sheet_content, P as Package2, a as Search, D as Dropdown_menu_separator } from "../../../../../chunks/menu.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import "../../../../../chunks/index3.js";
import "../../../../../chunks/index4.js";
import { R as Root$1, T as Trigger$1, D as Dropdown_menu_content, a as Dropdown_menu_label, b as Dropdown_menu_item } from "../../../../../chunks/index6.js";
import { I as Input } from "../../../../../chunks/input.js";
import { R as Root, T as Trigger } from "../../../../../chunks/index5.js";
import { R as Root$2, T as Tabs_list, a as Tabs_trigger } from "../../../../../chunks/index7.js";
import { S as Sun, M as Moon } from "../../../../../chunks/Moon.js";
import { R as Root$3, D as Dialog_content } from "../../../../../chunks/index8.js";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "../../../../../chunks/table-row.js";
import { R as Root$4, S as Select_trigger, V as Value, a as Select_content, b as Select_item } from "../../../../../chunks/index9.js";
import "../../../../../chunks/client.js";
import { B as Button } from "../../../../../chunks/button.js";
import { B as Badge } from "../../../../../chunks/badge.js";
const Circle_plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "M8 12h8" }],
    ["path", { "d": "M12 8v8" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "circle-plus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const CirclePlus = Circle_plus;
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let showTopTen = false;
  function toggleTopTen() {
    showTopTen = !showTopTen;
  }
  let ten = [
    data.mentors[0].id,
    data.mentors[0].id,
    data.mentors[0].id,
    data.mentors[0].id,
    data.mentors[0].id,
    data.mentors[0].id,
    data.mentors[0].id,
    data.mentors[0].id,
    data.mentors[0].id,
    data.mentors[0].id
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="grid min-h-screen w-full"><div class="flex w-full flex-col bg-muted/40"><header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">${validate_component(Root, "Sheet.Root").$$render($$result, {}, {}, {
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
  })}</header> <main class="flex flex-1 flex-col gap-3 p-4 lg:p-6 lg:pb-4">${validate_component(Root$2, "Tabs.Root").$$render($$result, { value: data.current, class: "" }, {}, {
    default: () => {
      return `<div class="flex items-center">${validate_component(Tabs_list, "Tabs.List").$$render($$result, {}, {}, {
        default: () => {
          return `<button>${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "pending" }, {}, {
            default: () => {
              return `Pending`;
            }
          })}</button> <button>${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "rated" }, {}, {
            default: () => {
              return `Rated`;
            }
          })}</button> <button>${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "qualified" }, {}, {
            default: () => {
              return `Qualified`;
            }
          })}</button>`;
        }
      })} ${data.current === "rated" ? `<div class="ml-auto flex items-center gap-2">${validate_component(Button, "Button").$$render($$result, { size: "sm", class: "h-7 gap-1" }, {}, {
        default: () => {
          return `${validate_component(CirclePlus, "CirclePlus").$$render($$result, { class: "h-3.5 w-3.5" }, {}, {})} <span class="sr-only sm:not-sr-only sm:whitespace-nowrap" data-svelte-h="svelte-1npgg4e">Accept Top 10</span>`;
        }
      })}</div>` : ``}</div> ${slots.default ? slots.default({}) : ``}`;
    }
  })}</main></div></div> ${validate_component(Root$3, "Dialog.Root").$$render(
    $$result,
    {
      open: showTopTen,
      onOpenChange: toggleTopTen
    },
    {},
    {
      default: () => {
        return `${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-[90%] max-w-[800px]" }, {}, {
          default: () => {
            return `<form method="post" class="min-h-full flex flex-col justify-between">${validate_component(Table, "Table.Root").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Table_header, "Table.Header").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                          default: () => {
                            return `Rank`;
                          }
                        })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                          default: () => {
                            return `Startup Name`;
                          }
                        })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                          default: () => {
                            return `Mentor`;
                          }
                        })}`;
                      }
                    })}`;
                  }
                })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
                  default: () => {
                    return `${each(data.startups.filter((a) => a.qualification_status === 2).slice(0, 10), (startup, i) => {
                      return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
                        default: () => {
                          return `${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "font-medium" }, {}, {
                            default: () => {
                              return `${escape(i + 1)}`;
                            }
                          })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                            default: () => {
                              return `${escape(startup.name)}`;
                            }
                          })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                            default: () => {
                              return `${validate_component(Root$4, "Select.Root").$$render(
                                $$result,
                                {
                                  selected: ten[i].value,
                                  onSelectedChange: (v) => {
                                    v && (ten[i] = v.value);
                                  }
                                },
                                {},
                                {
                                  default: () => {
                                    return `${validate_component(Select_trigger, "Select.Trigger").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `${validate_component(Value, "Select.Value").$$render($$result, { placeholder: "Choose a mentor" }, {}, {})} `;
                                      }
                                    })} ${validate_component(Select_content, "Select.Content").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `${each(data.mentors, (mentor) => {
                                          return `${validate_component(Select_item, "Select.Item").$$render($$result, { value: mentor.id }, {}, {
                                            default: () => {
                                              return `${escape(`${mentor.first_name} ${mentor.last_name}`)}`;
                                            }
                                          })}`;
                                        })} `;
                                      }
                                    })} `;
                                  }
                                }
                              )} <input type="hidden"${add_attribute("name", `startup${i + 1}Id`, 0)}${add_attribute("value", startup.id, 0)}> <input type="hidden"${add_attribute("name", `startup${i + 1}Mentor`, 0)}${add_attribute("value", ten[i], 0)}> `;
                            }
                          })} `;
                        }
                      })}`;
                    })}`;
                  }
                })}`;
              }
            })} <div class="flex justify-end ">${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-fit" }, {}, {
              default: () => {
                return `Approve`;
              }
            })}</div></form>`;
          }
        })}`;
      }
    }
  )}`;
});
export {
  Layout as default
};
