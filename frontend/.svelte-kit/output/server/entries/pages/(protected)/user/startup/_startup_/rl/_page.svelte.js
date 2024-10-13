import { c as create_ssr_component } from "../../../../../../../chunks/ssr.js";
import "../../../../../../../chunks/index4.js";
import "chart.js/auto";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log(data.readiness);
  if (data.readiness.length > 0) {
    data.readiness.filter((d) => d.readiness_type === "Technology")[0].readiness_level;
    data.readiness.filter((d) => d.readiness_type === "Organizational")[0].readiness_level;
    data.readiness.filter((d) => d.readiness_type === "Market")[0].readiness_level;
    data.readiness.filter((d) => d.readiness_type === "Regulatory")[0].readiness_level;
    data.readiness.filter((d) => d.readiness_type === "Acceptance")[0].readiness_level;
    data.readiness.filter((d) => d.readiness_type === "Investment")[0].readiness_level;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-12tpo2e_START -->${$$result.title = `<title>Readiness Level</title>`, ""}<!-- HEAD_svelte-12tpo2e_END -->`, ""} <div class="flex items-center" data-svelte-h="svelte-qpxg14"><h1 class="text-lg font-semibold md:text-2xl">Readiness Level</h1></div> <div class="flex flex-1 items-center justify-center p-20">${data.readiness.length > 0 ? `<canvas id="chart"></canvas>` : `<div data-svelte-h="svelte-9vrda4">Readiness Level Radar Chart will show once your mentor rated you startup</div>`}</div>`;
});
export {
  Page as default
};
