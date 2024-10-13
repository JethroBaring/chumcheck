import { c as create_ssr_component, v as validate_component, d as each, a as add_attribute, e as escape } from "./ssr.js";
import { B as Button } from "./button.js";
import { L as Label } from "./label.js";
import { R as Radio_group, a as Radio_group_item, I as Input } from "./index10.js";
import { I as Input$1 } from "./input.js";
import { P as Plus } from "./plus.js";
import "dequal";
import "./create.js";
import "clsx";
import "devalue";
import "./client.js";
const DataPrivacy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { dataPrivacy, toggleDataPrivacy } = $$props;
  let { currentActive } = $$props;
  if ($$props.dataPrivacy === void 0 && $$bindings.dataPrivacy && dataPrivacy !== void 0)
    $$bindings.dataPrivacy(dataPrivacy);
  if ($$props.toggleDataPrivacy === void 0 && $$bindings.toggleDataPrivacy && toggleDataPrivacy !== void 0)
    $$bindings.toggleDataPrivacy(toggleDataPrivacy);
  if ($$props.currentActive === void 0 && $$bindings.currentActive && currentActive !== void 0)
    $$bindings.currentActive(currentActive);
  return `<div class="${["flex-1 overflow-scroll", currentActive !== 0 ? "hidden" : ""].join(" ").trim()}"><div class="h-0 flex flex-col gap-5"><label class="label" for="data_privacy" data-svelte-h="svelte-wwkjsr"><span class="label-text text-base">By accomplishing this form, the following personal information will be collected including,
				startup team members&#39; names, personal email address, mobile phone number and other relevant
				information. The personal information you will provide in this form will be used within
				ChumCheck Program, DASIG consortium committee and will not be shared with any outside
				parties unless you have prior written consent. Development and Acceleration Support for
				Innovation Growth (DASIG) respects your rights as a data subject under the Data Privacy Act.
				<br><br>
				If you have further questions and concerns regarding the processing of your personal information,
				you are welcome to contact our project lead, Engr. Jurydel Rama, at jurydel.rama@cit.edu.
				<br><br>
				In compliance with the Data Privacy Act (DPA) of 2012, also known as the Republic Act of 10173
				(RA 10173), I agree and authorize the Development and Acceleration Support for Innovation Growth
				(DASIG) consortium members to use the personal information for the purpose of ChumCheck programs
				and initiatives. I also acknowledge and warrant that I have acquired the consent from all parties
				relevant to this consent and hold free and harmless and indemnify Development and Acceleration
				Support for Innovation Growth (DASIG) from any complaint, suit, or damages which any party may
				file or claim in relation to my consent.</span></label> ${validate_component(Radio_group, "RadioGroup.Root").$$render($$result, { value: dataPrivacy ? "true" : "false" }, {}, {
    default: () => {
      return `<div class="flex items-center space-x-2">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "true", id: "dataAgree" }, {}, {})} ${validate_component(Label, "Label").$$render($$result, { for: "dataAgree" }, {}, {
        default: () => {
          return `Agree`;
        }
      })}</div> <div class="flex items-center space-x-2">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "false", id: "dataDisagree" }, {}, {})} ${validate_component(Label, "Label").$$render($$result, { for: "dataDisagree" }, {}, {
        default: () => {
          return `Disagree`;
        }
      })}</div> ${validate_component(Input, "RadioGroup.Input").$$render($$result, { name: "data_privacy" }, {}, {})}`;
    }
  })}</div></div>`;
});
const EligibilityAgreement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toggleEligibility } = $$props;
  let { eligibility } = $$props;
  let { currentActive } = $$props;
  if ($$props.toggleEligibility === void 0 && $$bindings.toggleEligibility && toggleEligibility !== void 0)
    $$bindings.toggleEligibility(toggleEligibility);
  if ($$props.eligibility === void 0 && $$bindings.eligibility && eligibility !== void 0)
    $$bindings.eligibility(eligibility);
  if ($$props.currentActive === void 0 && $$bindings.currentActive && currentActive !== void 0)
    $$bindings.currentActive(currentActive);
  return `<div class="${["flex-1 overflow-scroll", currentActive !== 1 ? "hidden" : ""].join(" ").trim()}"><div class="h-0 flex flex-col gap-5"><p class="text-base" data-svelte-h="svelte-1q2kii5">I confirm that I have read, understood, and agree to comply with the eligibility criteria and
			rules of the competition. Additionally, I will review the eligibility requirements and
			agreement.</p> ${validate_component(Radio_group, "RadioGroup.Root").$$render($$result, { value: eligibility ? "true" : "false" }, {}, {
    default: () => {
      return `<div class="flex items-center space-x-2">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "true", id: "eligibilityAgree" }, {}, {})} ${validate_component(Label, "Label").$$render($$result, { for: "eligibilityAgree" }, {}, {
        default: () => {
          return `Agree`;
        }
      })}</div> <div class="flex items-center space-x-2">${validate_component(Radio_group_item, "RadioGroup.Item").$$render(
        $$result,
        {
          value: "false",
          id: "eligibilityDisagree"
        },
        {},
        {}
      )} ${validate_component(Label, "Label").$$render($$result, { for: "eligibilityDisagree" }, {}, {
        default: () => {
          return `Disagree`;
        }
      })}</div> ${validate_component(Input, "RadioGroup.Input").$$render($$result, { name: "eligibility" }, {}, {})}`;
    }
  })}</div></div>`;
});
const ProjectDetails = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { currentActive } = $$props;
  if ($$props.currentActive === void 0 && $$bindings.currentActive && currentActive !== void 0)
    $$bindings.currentActive(currentActive);
  return `<div class="${["flex-1 overflow-scroll", currentActive !== 2 ? "hidden" : ""].join(" ").trim()}"><div class="flex h-0 flex-col gap-5"><div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "startup_name" }, {}, {
    default: () => {
      return `Startup name`;
    }
  })} ${validate_component(Input$1, "Input").$$render(
    $$result,
    {
      name: "startup_name",
      id: "startup_name",
      type: "text",
      placeholder: "m@example.com",
      required: true
    },
    {},
    {}
  )}</div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, {}, {}, {
    default: () => {
      return `Capsule Proposal`;
    }
  })} <label for="capsule_proposal" class="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm">${`Upload or drag your capsule proposal here.`}</label> <input id="capsule_proposal" name="capsule_proposal" class="hidden" type="file" accept=".pdf"></div> ${``} <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "links" }, {}, {
    default: () => {
      return `Links to any supporting materials (e.g., website, explainer video)`;
    }
  })} ${validate_component(Input$1, "Input").$$render(
    $$result,
    {
      name: "links",
      id: "links",
      type: "text",
      placeholder: "links",
      required: true
    },
    {},
    {}
  )}</div></div></div>`;
});
const GroupInformation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { currentActive } = $$props;
  let members = [];
  let search;
  let searchedUsers = [];
  if ($$props.currentActive === void 0 && $$bindings.currentActive && currentActive !== void 0)
    $$bindings.currentActive(currentActive);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="${["flex-1 overflow-scroll", currentActive !== 3 ? "hidden" : ""].join(" ").trim()}"><div class="flex h-0 flex-col gap-5"><div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "group_name" }, {}, {
      default: () => {
        return `Group name`;
      }
    })} ${validate_component(Input$1, "Input").$$render(
      $$result,
      {
        name: "group_name",
        id: "group_name",
        type: "text",
        placeholder: "m@example.com",
        required: true
      },
      {},
      {}
    )}</div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "university_name" }, {}, {
      default: () => {
        return `University name`;
      }
    })} ${validate_component(Input$1, "Input").$$render(
      $$result,
      {
        name: "university_name",
        id: "university_name",
        type: "text",
        placeholder: "m@example.com",
        required: true
      },
      {},
      {}
    )}</div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "group_name" }, {}, {
      default: () => {
        return `Members`;
      }
    })} ${each(members, (user, i) => {
      return `<input type="hidden"${add_attribute("name", `member_${i + 2}`, 0)}${add_attribute("value", user.id, 0)}> <div class="flex items-center justify-between gap-3"><div class="flex items-center gap-3"><img src="/images/placeholder.jpg"${add_attribute("width", 36, 0)}${add_attribute("height", 36, 0)} alt="Avatar" class="overflow-hidden rounded-full"> <p>${escape(user.email)}</p></div> <button>${validate_component(Plus, "Add").$$render($$result, { class: "h-4 w-4" }, {}, {})}</button> </div>`;
    })}</div> <form><div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
      default: () => {
        return `Type an email, then invite them to your startup.`;
      }
    })} ${validate_component(Input$1, "Input").$$render(
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
    })}</div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const ApplicationForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const steps = [
    "data-privacy",
    "eligibility-agreement",
    "project-details",
    "group-information",
    "technology",
    "market",
    "regulatory",
    "acceptance",
    "organizational",
    "investment",
    "calculator"
  ];
  const labels = [
    "Data Privacy and Consent",
    "Eligibility and Agreement",
    "Project Details",
    "Group Information",
    "Technology Readiness Level",
    "Market Readiness Level",
    "Regulatory Readiness Level",
    "Acceptance Readiness Level",
    "Organizational Readiness Level",
    "Investment Readiness Level",
    "Technology and Commercialization Readiness Level Calculator"
  ];
  let currentActive = 0;
  let formData = { dataPrivacy: false, eligibility: false };
  const toggleDataPrivacy = () => {
    formData.dataPrivacy = !formData.dataPrivacy;
  };
  const toggleEligibility = () => {
    formData.eligibility = !formData.eligibility;
  };
  return `<form method="post" class="flex flex-col gap-5 p-5" enctype="multipart/form-data"><h1 class="text-2xl font-semibold">${escape(labels[currentActive])}</h1> ${validate_component(DataPrivacy, "DataPrivacy").$$render(
    $$result,
    {
      dataPrivacy: formData.dataPrivacy,
      toggleDataPrivacy,
      currentActive
    },
    {},
    {}
  )} ${validate_component(EligibilityAgreement, "EligibilityAgreement").$$render(
    $$result,
    {
      currentActive,
      toggleEligibility,
      eligibility: formData.eligibility
    },
    {},
    {}
  )} ${validate_component(ProjectDetails, "ProjectDetails").$$render($$result, { currentActive }, {}, {})} ${validate_component(GroupInformation, "GroupInformation").$$render($$result, { currentActive }, {}, {})} ${``} <div class="flex justify-end gap-3">${``} ${currentActive < steps.length - 1 ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "secondary",
      class: "w-24",
      disabled: !formData.dataPrivacy ? true : false
    },
    {},
    {
      default: () => {
        return `Next`;
      }
    }
  )}` : `${validate_component(Button, "Button").$$render($$result, { class: "w-24", type: "submit" }, {}, {
    default: () => {
      return `Submit`;
    }
  })}`}</div></form>`;
});
export {
  ApplicationForm as A
};
