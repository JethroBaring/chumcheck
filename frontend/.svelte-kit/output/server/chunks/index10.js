import { s as setContext, g as getContext, c as compute_rest_props, a as subscribe } from "./lifecycle.js";
import { c as create_ssr_component, s as spread, b as escape_object, a as add_attribute, v as validate_component } from "./ssr.js";
import "dequal";
import { o as omit, t as safeOnMount, c as effect, m as makeElement, v as disabledAttr, e as executeCallbacks, b as addMeltEventListener, l as isHTMLElement, E as getDirectionalKeys, k as kbd, C as createHiddenInput, f as createElHelpers, a as addEventListener } from "./create.js";
import { c as cn } from "./utils.js";
import { c as createBitAttrs, a as createDispatcher } from "./events.js";
import { C as Check } from "./Check.js";
import { t as toWritableStores, o as overridable, r as removeUndefined, g as getOptionUpdater } from "./updater.js";
import { g as getElemDirection } from "./locale.js";
import { w as writable, d as derived } from "./index2.js";
import "clsx";
const defaults = {
  orientation: "vertical",
  loop: true,
  disabled: false,
  required: false,
  defaultValue: void 0
};
const prefix = "radio-group";
const { name, selector } = createElHelpers(prefix);
function createRadioGroup(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "value"));
  const { disabled, required, loop, orientation } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  safeOnMount(() => {
    return addEventListener(document, "focus", (e) => {
      const focusedItem = e.target;
      if (!isHTMLElement(focusedItem))
        return;
    });
  });
  let hasActiveTabIndex = false;
  effect(value, ($value) => {
    if ($value === void 0) {
      hasActiveTabIndex = false;
    } else {
      hasActiveTabIndex = true;
    }
  });
  const selectItem = (item2) => {
    const disabled2 = item2.dataset.disabled === "true";
    const itemValue = item2.dataset.value;
    if (disabled2 || itemValue === void 0)
      return;
    value.set(itemValue);
  };
  const root = makeElement(name(), {
    stores: [required, orientation],
    returned: ([$required, $orientation]) => {
      return {
        role: "radiogroup",
        "aria-required": $required,
        "data-orientation": $orientation
      };
    }
  });
  const item = makeElement(name("item"), {
    stores: [value, orientation, disabled],
    returned: ([$value, $orientation, $disabled]) => {
      return (props2) => {
        const itemValue = typeof props2 === "string" ? props2 : props2.value;
        const argDisabled = typeof props2 === "string" ? false : !!props2.disabled;
        const disabled2 = $disabled || argDisabled;
        const checked = $value === itemValue;
        const tabindex = !hasActiveTabIndex ? 0 : checked ? 0 : -1;
        hasActiveTabIndex = true;
        return {
          disabled: disabled2,
          "data-value": itemValue,
          "data-orientation": $orientation,
          "data-disabled": disabledAttr(disabled2),
          "data-state": checked ? "checked" : "unchecked",
          "aria-checked": checked,
          type: "button",
          role: "radio",
          tabindex
        };
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        selectItem(node);
      }), addMeltEventListener(node, "keydown", (e) => {
        const el = e.currentTarget;
        if (!isHTMLElement(el))
          return;
        const root2 = el.closest(selector());
        if (!isHTMLElement(root2))
          return;
        const items = Array.from(root2.querySelectorAll(selector("item"))).filter((el2) => isHTMLElement(el2) && !el2.hasAttribute("data-disabled"));
        const currentIndex = items.indexOf(el);
        const dir = getElemDirection(root2);
        const { nextKey, prevKey } = getDirectionalKeys(dir, orientation.get());
        const $loop = loop.get();
        let itemToFocus = null;
        if (e.key === nextKey) {
          e.preventDefault();
          const nextIndex = currentIndex + 1;
          if (nextIndex >= items.length && $loop) {
            itemToFocus = items[0];
          } else {
            itemToFocus = items[nextIndex];
          }
        } else if (e.key === prevKey) {
          e.preventDefault();
          const prevIndex = currentIndex - 1;
          if (prevIndex < 0 && $loop) {
            itemToFocus = items[items.length - 1];
          } else {
            itemToFocus = items[prevIndex];
          }
        } else if (e.key === kbd.HOME) {
          e.preventDefault();
          itemToFocus = items[0];
        } else if (e.key === kbd.END) {
          e.preventDefault();
          itemToFocus = items[items.length - 1];
        }
        if (itemToFocus) {
          itemToFocus.focus();
          selectItem(itemToFocus);
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const hiddenInput = createHiddenInput({
    value,
    disabled,
    required
  });
  const isChecked = derived(value, ($value) => {
    return (itemValue) => {
      return $value === itemValue;
    };
  });
  return {
    elements: {
      root,
      item,
      hiddenInput
    },
    states: {
      value
    },
    helpers: {
      isChecked
    },
    options
  };
}
function getRadioGroupData() {
  const NAME = "radio-group";
  const ITEM_NAME = "radio-group-item";
  const PARTS = ["root", "item", "input", "item-indicator"];
  return {
    NAME,
    ITEM_NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getRadioGroupData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const radioGroup = { ...createRadioGroup(removeUndefined(props)), getAttrs };
  setContext(NAME, radioGroup);
  return {
    ...radioGroup,
    updateOption: getOptionUpdater(radioGroup.options)
  };
}
function getCtx() {
  const { NAME } = getRadioGroupData();
  return getContext(NAME);
}
function setItemCtx(value) {
  const { ITEM_NAME } = getRadioGroupData();
  const radioGroup = { ...getCtx(), value };
  setContext(ITEM_NAME, radioGroup);
  return radioGroup;
}
function getRadioIndicator() {
  const { ITEM_NAME } = getRadioGroupData();
  return getContext(ITEM_NAME);
}
const Radio_group$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "required",
    "disabled",
    "value",
    "onValueChange",
    "loop",
    "orientation",
    "asChild",
    "el"
  ]);
  let $root, $$unsubscribe_root;
  let { required = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { orientation = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, states: { value: localValue }, updateOption, getAttrs } = setCtx({
    required,
    disabled,
    defaultValue: value,
    loop,
    orientation,
    onValueChange: ({ next }) => {
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  const attrs = getAttrs("root");
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0)
    $$bindings.onValueChange(onValueChange);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0)
    $$bindings.loop(loop);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  value !== void 0 && localValue.set(value);
  {
    updateOption("required", required);
  }
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("orientation", orientation);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Radio_group_input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $hiddenInput, $$unsubscribe_hiddenInput;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { hiddenInput }, getAttrs } = getCtx();
  $$unsubscribe_hiddenInput = subscribe(hiddenInput, (value) => $hiddenInput = value);
  const attrs = getAttrs("input");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $hiddenInput;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_hiddenInput();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<input${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>`}`;
});
const Radio_group_item$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "asChild", "el"]);
  let $item, $$unsubscribe_item;
  let { value } = $$props;
  let { disabled = false } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { item }, getAttrs } = setItemCtx(value);
  $$unsubscribe_item = subscribe(item, (value2) => $item = value2);
  createDispatcher();
  const attrs = getAttrs("item");
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $item({ value, disabled });
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Radio_group_item_indicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let checked;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $isChecked, $$unsubscribe_isChecked;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { helpers: { isChecked }, value, getAttrs } = getRadioIndicator();
  $$unsubscribe_isChecked = subscribe(isChecked, (value2) => $isChecked = value2);
  const attrs = getAttrs("item-indicator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  checked = $isChecked(value);
  $$unsubscribe_isChecked();
  return `${asChild ? `${slots.default ? slots.default({ checked, attrs }) : ``}` : `<div${spread([escape_object(attrs), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${checked ? `${slots.default ? slots.default({ checked, attrs }) : ``}` : ``}</div>`}`;
});
const Radio_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Radio_group$1, "RadioGroupPrimitive.Root").$$render(
      $$result,
      Object.assign({}, { class: cn("grid gap-2", className) }, $$restProps, { value }),
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Radio_group_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `${validate_component(Radio_group_item$1, "RadioGroupPrimitive.Item").$$render(
    $$result,
    Object.assign(
      {},
      { value },
      {
        class: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `<div class="flex items-center justify-center">${validate_component(Radio_group_item_indicator, "RadioGroupPrimitive.ItemIndicator").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Check, "Check").$$render($$result, { class: "h-3.5 w-3.5 fill-primary" }, {}, {})}`;
          }
        })}</div>`;
      }
    }
  )}`;
});
const Input = Radio_group_input;
export {
  Input as I,
  Radio_group as R,
  Radio_group_item as a
};
