type Rules = {
  host: Array<string>;
  customStyle?: string;
  downloadPageCheckBySelector?: Array<string>;
  downloadPageCheckByRegex?: Array<RegExp>;
  remove: Array<string>;
  removeByRegex?: Array<removeByRegexObject>;
  hideElements?: Array<HTMLElement | string>;
  removeIFrames?: boolean;
  removeDisabledAttr?: boolean;
  destroyWindowFunctions?: Array<string>;
  addInfoBanner?: Array<addInfoBannerType>;
  createCountdown?: createCountdownType;
  modifyButtons?: Array<Array<HTMLElement | string, modifyButtonType>>;
  customScript?: function;
};

type siteRules = {
  [key: string]: Rules;
};

type intervalID = string | number;
type timerID = string | number;

type _intervals = {
  [key: string | number]: {
    fn: string;
    interval: number;
    id: intervalID;
    customID: intervalID;
  };
};

type modifyButtonType = {
  replaceWithFor: boolean = false;
  replaceWithTag: string;
  copyAttributesFromElement: HTMLElement | string;
  customText: string;
  className: string;
  props: object;
  styles: object;
  attributes: object;
  eventHandlers: object;
  makeListener: boolean;
  requiresCaptcha: boolean;
  requiresTimer: boolean;
  addHoverAbility: boolean;
  moveTo: moveToType;
  fn: function;
};

type moveToType = {
  target: HTMLElement | string;
  position: insertLocation;
  findParentByTag: string;
};

type createCountdownType = {
  element: HTMLElement | string;
  timer: number;
};

type addInfoBannerType = {
  targetElement: HTMLElement | string | null;
  where: insertLocation;
};

type removeByRegexObject = {
  query: string;
  regex: RegExp;
};

type removeElementsByRegexType = {
  query: string;
  regex: RegExp;
};

type addIntervalType = {
  fn: Function;
  interval: number;
  customID: intervalID;
};

type addTimeoutType = {
  fn: Function;
  timeout: number;
  customID: intervalID;
};

type addListenerType = {
  element: HTMLElement;
  event: string;
  listener: Function;
  options: EventListenerOptions | false;
};

type removeListenerType = {
  element: HTMLElement;
  event: string;
};

type _timeouts = {
  [
    key: intervalID = {
      fn: string,
      timeout: number,
      id: intervalID,
      customID: intervalID,
    }
  ];
};

type insertLocation = "beforebegin" | "afterbegin" | "beforeend" | "afterend";

interface HTMLElement {
  trackedEvents: { [key: string] };
  dataset: {timeout: number};
}

class SiteScrubber2 {
  private readonly o_debug: boolean = true;
  readonly ssButtonWatchDog: boolean = true;
  readonly window: object = window;
  readonly document: object = window.document;
  readonly logNative: Function = window.console.log;
  readonly console: object = window.console;
  readonly openNative: object = window.open.bind(window);
  constructor(rules: Rules) {
    this.console.groupCollapsed = window.console.groupCollapsed;
    this.console.groupEnd = window.console.groupEnd;
  }
}
