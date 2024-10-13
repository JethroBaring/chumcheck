import { c as create_ssr_component, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import { P as PUBLIC_API_URL } from "../../../chunks/public.js";
import { S as Sun, M as Moon } from "../../../chunks/Moon.js";
import "../../../chunks/stores.js";
import { B as Button } from "../../../chunks/button.js";
import { C as Card } from "../../../chunks/card.js";
import "clsx";
const AboutUs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="relative h-full w-full" data-svelte-h="svelte-12mqtfq"><div class="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#ecf3fc_1px,transparent_1px),linear-gradient(to_bottom,#ecf3fc_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#171e31_1px,transparent_1px),linear-gradient(to_bottom,#171e31_1px,transparent_1px)]"></div> <div class="mx-auto flex h-screen w-4/5 items-center justify-between" id="aboutus"><div class="flex flex-1 items-center text-flutter-gray dark:text-flutter-white"><div class="flex flex-1 flex-col gap-5"><p class="text-4xl font-extrabold">About Us</p> <p class="text-2xl font-medium">ChumCheck is a dedicated program designed to <br>support startups on their path to
					success. <br>It provides essential resources and guidance <br>to innovative
					entrepreneurs, with a specific focus <br>on incubation and acceleration.</p></div> <div class="relative flex-1"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-flutter-blue opacity-20 blur-[100px]"></div> <img src="aboutus.svg" alt="startup" class="w-full"></div></div></div></div>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<header class="${[
    "fixed z-10 left-1/2 top-0 flex w-screen -translate-x-1/2 justify-center text-flutter-gray dark:text-flutter-white",
    " "
  ].join(" ").trim()}"><nav class="flex w-4/5 items-center p-[var(--navbar-padding,0.5rem)] px-0"><div class="flex flex-1 cursor-pointer gap-2" data-svelte-h="svelte-145o3s"><img src="logo.png" alt="citeams_logo" class="h-7 w-7"> <a href="/" class="cursor-pointer text-xl font-black normal-case">ChumCheck</a></div> <div class="flex-none font-medium"><ul class="flex cursor-pointer items-center gap-7 text-sm"><li class="hover:text-flutter-blue active:scale-95" data-svelte-h="svelte-2me387"><a href="#hero">Home</a></li> <li class="hover:text-flutter-blue active:scale-95" data-svelte-h="svelte-9wddpj"><a href="#howitwork">How it Works</a></li> <li class="hover:text-flutter-blue active:scale-95" data-svelte-h="svelte-hfcbpo"><a href="#aboutus">About Us</a></li> <li class="hover:text-flutter-blue active:scale-95" data-svelte-h="svelte-gig96c"><a data-sveltekit-reload href="/login">Login</a></li> <li>${validate_component(Button, "Button").$$render(
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
  )}</li></ul></div></nav></header>`;
});
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="relative h-full w-full"><div class="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#ecf3fc_1px,transparent_1px),linear-gradient(to_bottom,#ecf3fc_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#171e31_1px,transparent_1px),linear-gradient(to_bottom,#171e31_1px,transparent_1px)]"></div> <div class="mx-auto flex h-screen w-4/5 items-center justify-between" id="hero"><div class="flex flex-1 flex-col gap-5 text-flutter-gray dark:text-flutter-white"><p class="text-7xl font-black" data-svelte-h="svelte-p2679r">A New Way to <br> Empower <br> <span class="text-flutter-blue">Startups</span></p> <p class="text-xl font-medium" data-svelte-h="svelte-1e9aarb">Your startup&#39;s path to empowerment <br> and success</p> <a data-sveltekit-reload href="/register">${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "shadow-lg shadow-flutter-blue/50 text-white"
    },
    {},
    {
      default: () => {
        return `Get Started!`;
      }
    }
  )}</a></div> <div class="relative flex-1" data-svelte-h="svelte-1k4v858"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-flutter-blue opacity-20 blur-[100px]"></div> <img src="startup.svg" alt="startup" class="w-full animate-fade"></div></div></div>`;
});
const HowItWork = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="mx-auto w-4/5 py-24 text-flutter-gray dark:text-flutter-white" id="howitwork"><div class="flex flex-col justify-center gap-20"><p class="text-4xl font-extrabold" data-svelte-h="svelte-g3y0d7">How It Works</p> <div class="flex gap-16">${validate_component(Card, "Card.Root").$$render(
    $$result,
    {
      class: "flex flex-1 flex-col justify-center rounded-xl p-8"
    },
    {},
    {
      default: () => {
        return `<p class="text-6xl font-bold text-slate-300" data-svelte-h="svelte-1mqu0m6">01</p> <p class="text-xl font-bold" data-svelte-h="svelte-125m31k">Application</p> <p class="text-lg" data-svelte-h="svelte-jaejng">Start by submitting your startup <br>application to ChumCheck for evaluation <br>and
					confirmation.</p>`;
      }
    }
  )} ${validate_component(Card, "Card.Root").$$render(
    $$result,
    {
      class: "flex flex-1 flex-col justify-center rounded-xl p-8"
    },
    {},
    {
      default: () => {
        return `<p class="text-6xl font-bold text-slate-300" data-svelte-h="svelte-8p3jal">02</p> <p class="text-xl font-bold" data-svelte-h="svelte-12xlv0t">Incubation and Acceleration</p> <p class="text-lg" data-svelte-h="svelte-9pi87w">Accepted startups enter the program, <br>gaining mentorship and resources to
					<br>nurture their concepts towards success.</p>`;
      }
    }
  )} ${validate_component(Card, "Card.Root").$$render(
    $$result,
    {
      class: "flex flex-1 flex-col justify-center rounded-xl p-8"
    },
    {},
    {
      default: () => {
        return `<p class="text-6xl font-bold text-slate-300" data-svelte-h="svelte-gk8l50">03</p> <p class="text-xl font-bold" data-svelte-h="svelte-xj8273">Investment-Ready</p> <p class="text-lg" data-svelte-h="svelte-cwl1jj">Incubation and acceleration make your <br>startup investment-ready, benefiting your
					<br>business and the startup ecosystem.</p>`;
      }
    }
  )}</div></div></div>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer class="grid-rows-auto text-base-content mx-auto grid w-4/5 justify-start gap-x-4 gap-y-10 border-t py-4 sm:flex sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-x-2 sm:gap-y-4" data-svelte-h="svelte-q9w6p4"><aside class="flex grid-flow-col items-center gap-5"><img src="logo.png" alt="" class="w-8"> <p>ChumCheck <br>Fueling Startup Success</p></aside> <nav class="md:place-self-center md:justify-self-end"><div class="grid grid-flow-col gap-4"><a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> <a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a> <a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a></div></nav></footer>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1tbr4kt_START -->${$$result.title = `<title>ChumCheck</title>`, ""}<!-- HEAD_svelte-1tbr4kt_END -->`, ""} <div class="bg-grid"><div class="mx-auto w-full">${escape(PUBLIC_API_URL)} ${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})} ${validate_component(HowItWork, "HowItWork").$$render($$result, {}, {}, {})} ${validate_component(AboutUs, "AboutUs").$$render($$result, {}, {}, {})} ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div></div>`;
});
export {
  Page as default
};
