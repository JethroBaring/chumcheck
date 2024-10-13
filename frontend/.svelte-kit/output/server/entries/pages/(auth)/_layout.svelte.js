import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { C as Card } from "../../../chunks/card.js";
import "clsx";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="relative h-full w-full"><div class="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#ecf3fc_1px,transparent_1px),linear-gradient(to_bottom,#ecf3fc_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#171e31_1px,transparent_1px),linear-gradient(to_bottom,#171e31_1px,transparent_1px)]"></div> <div class="flex h-screen items-center justify-center">${validate_component(Card, "Card.Root").$$render(
    $$result,
    {
      class: "flex h-4/5 w-4/5 items-center justify-center rounded-xl bg-white shadow-lg dark:bg-[#020817]"
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}</div></div>`;
});
export {
  Layout as default
};
