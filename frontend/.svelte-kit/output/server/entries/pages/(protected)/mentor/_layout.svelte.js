import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { S as Sidebar } from "../../../../chunks/Sidebar.js";
import { b as Sonner_1 } from "../../../../chunks/sonner.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Sonner_1, "Toaster").$$render($$result, {}, {}, {})} <div class="flex w-full bg-muted/40">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
