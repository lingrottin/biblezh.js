import { LitElement, PropertyValues, css, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  computePosition,
  autoPlacement,
  offset,
  shift,
  inline,
  autoUpdate,
  arrow,
} from "@floating-ui/dom";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import YOUVERSION_ICON from "./assets/youversion-icon.png";
import BIBLEGATEWAY_ICON from "./assets/biblegateway-icon.svg";
import WDBIBLE_ICON from "./assets/wdbible-icon.png";
import BIBLEPRO_ICON from "./assets/biblepro-icon.svg";

export type BibleBooksType = {
  [key: string]: string[];
};

export const BIBLE_BOOKS: BibleBooksType = {
  Gen: ["创世记", "创", "Genesis", "Gen"],
  Exo: ["出埃及记", "出", "Exodus", "Exo"],
  Lev: ["利未记", "利", "Leviticus", "Lev"],
  Num: ["民数记", "民", "Numbers", "Num"],
  Deu: ["申命记", "申", "Deuteronomy", "Deu"],
  Jos: ["约书亚记", "书", "Joshua", "Jos"],
  Jug: ["士师记", "士", "Judges", "Jug"],
  Rut: ["路得记", "得", "Ruth", "Rut"],
  "1Sa": ["撒母耳记上", "撒上", "1 Samuel", "1Sa"],
  "2Sa": ["撒母耳记下", "撒下", "2 Samuel", "2Sa"],
  "1Ki": ["列王记上", "王上", "1 Kings", "1Ki"],
  "2Ki": ["列王记下", "王下", "2 Kings", "2Ki"],
  "1Ch": ["历代志上", "代上", "1 Chronicles", "1Ch"],
  "2Ch": ["历代志下", "代下", "2 Chronicles", "2Ch"],
  Ezr: ["以斯拉记", "拉", "Ezra", "Ezr"],
  Neh: ["尼希米记", "尼", "Nehemiah", "Neh"],
  Est: ["以斯帖记", "斯", "Esther", "Est"],
  Job: ["约伯记", "伯", "Job", "Job"],
  Psm: ["诗篇", "诗", "Psalms", "Psm"],
  Pro: ["箴言", "箴", "Proverbs", "Pro"],
  Ecc: ["传道书", "传", "Ecclesiastes", "Ecc"],
  Son: ["雅歌", "歌", "Song of Solomon", "Son"],
  Isa: ["以赛亚书", "赛", "Isaiah", "Isa"],
  Jer: ["耶利米书", "耶", "Jeremiah", "Jer"],
  Lam: ["耶利米哀歌", "哀", "Lamentations", "Lam"],
  Eze: ["以西结书", "结", "Ezekiel", "Eze"],
  Dan: ["但以理书", "但", "Daniel", "Dan"],
  Hos: ["何西阿书", "何", "Hosea", "Hos"],
  Joe: ["约珥书", "珥", "Joel", "Joe"],
  Amo: ["阿摩司书", "摩", "Amos", "Amo"],
  Oba: ["俄巴底亚书", "俄", "Obadiah", "Oba"],
  Jon: ["约拿书", "拿", "Jonah", "Jon"],
  Mic: ["弥迦书", "弥", "Micah", "Mic"],
  Nah: ["那鸿书", "鸿", "Nahum", "Nah"],
  Hab: ["哈巴谷书", "哈", "Habakkuk", "Hab"],
  Zep: ["西番雅书", "番", "Zephaniah", "Zep"],
  Hag: ["哈该书", "该", "Haggai", "Hag"],
  Zec: ["撒迦利亚书", "亚", "Zechariah", "Zec"],
  Mal: ["玛拉基书", "玛", "Malachi", "Mal"],
  Mat: ["马太福音", "太", "Matthew", "Mat"],
  Mrk: ["马可福音", "可", "Mark", "Mrk"],
  Luk: ["路加福音", "路", "Luke", "Luk"],
  Jhn: ["约翰福音", "约", "John", "Jhn"],
  Act: ["使徒行传", "徒", "Acts", "Act"],
  Rom: ["罗马书", "罗", "Romans", "Rom"],
  "1Co": ["哥林多前书", "林前", "1 Corinthians", "1Co"],
  "2Co": ["哥林多后书", "林后", "2 Corinthians", "2Co"],
  Gal: ["加拉太书", "加", "Galatians", "Gal"],
  Eph: ["以弗所书", "弗", "Ephesians", "Eph"],
  Phl: ["腓利比书", "腓", "Philippians", "Phl"],
  Col: ["歌罗西书", "西", "Colossians", "Col"],
  "1Ts": ["帖撒罗尼迦前书", "帖前", "1 Thessalonians", "1Ts"],
  "2Ts": ["帖撒罗尼迦后书", "帖后", "2 Thessalonians", "2Ts"],
  "1Ti": ["提摩太前书", "提前", "1 Timothy", "1Ti"],
  "2Ti": ["提摩太后书", "提后", "2 Timothy", "2Ti"],
  Tit: ["提多书", "多", "Titus", "Tit"],
  Phm: ["腓利门书", "门", "Philemon", "Phm"],
  Heb: ["希伯来书", "来", "Hebrews", "Heb"],
  Jas: ["雅各书", "雅", "James", "Jas"],
  "1Pe": ["彼得前书", "彼前", "1 Peter", "1Pe"],
  "2Pe": ["彼得后书", "彼后", "2 Peter", "2Pe"],
  "1Jn": ["约翰一书", "约一", "1 John", "1Jn"],
  "2Jn": ["约翰二书", "约二", "2 John", "2Jn"],
  "3Jn": ["约翰三书", "约三", "3 John", "3Jn"],
  Jud: ["犹大书", "犹", "Jude", "Jud"],
  Rev: ["启示录", "启", "Revelation", "Rev"],
};

export function getBookAbbr(name: string): string {
  for (const key in BIBLE_BOOKS) {
    const [fullName, shortName, englishName, englishShort] = BIBLE_BOOKS[key];
    if (
      name === fullName ||
      name === shortName ||
      name === englishName ||
      name === englishShort
    ) {
      return key;
    }
  }
  return "Nul";
}

export function getBookIndex(key: string): number | null {
  let index = 0;
  for (const bookKey in BIBLE_BOOKS) {
    if (bookKey === key) {
      return index;
    }
    index++;
  }
  return null;
}

type BibleWebsite = "yv" | "bg" | "wd" | "zn";

const enterEvents = ["click", "focus"];
const leaveEvents = ["pointerleave", "blur"];

@customElement("bz-tooltip")
export class Tooltip extends LitElement {
  constructor() {
    super();
    // Finish hiding at end of animation
    this.addEventListener("transitionend", this.finishHide);
  }

  // Lazy creation
  static lazy(target: Element, callback: (target: Tooltip) => void) {
    const createTooltip = () => {
      const tooltip = document.createElement("bz-tooltip") as Tooltip;
      callback(tooltip);
      target.parentNode!.insertBefore(tooltip, target.nextSibling);
      tooltip.show();
    };
    enterEvents.forEach((eventName) =>
      target.removeEventListener(eventName, createTooltip)
    );
    enterEvents.forEach((eventName) =>
      target.addEventListener(eventName, createTooltip)
    );
  }

  static override styles = css`
    @keyframes switch-index {
      from {
        background: #422;
      }
      40% {
        line-height: 1.5em;
      }
      to {
        background: #362626;
        border: #955 1px solid;
      }
    }

    .bz-tooltip {
      color: #bbb;
      background: #222;
      padding: 0;
      border-radius: 10px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      width: 14em;
      box-shadow: 0 0 20px 0px rgba(0, 0, 0, 50%);
    }
    .bz-verse {
      line-height: 2.5em;
      grid-column-start: span 3;
      font-weight: bold;
    }
    .center {
      text-align: center;
    }
    .bz-translation-container {
      grid-column-start: span 3;
      display: flex;
      width: inherit;
    }
    .bz-translation {
      flex-grow: 1;
      height: 2em;
      line-height: 2em;
      border-radius: 0.5em;
      margin: 0.5em;
      border: transparent 1px solid;
      background: transparent;
      transition-property: background-color border-color;
      transition-duration: 150ms;
      transition-timing-function: ease-in-out;
    }
    .bz-translation[active] {
      background: #362626 !important;
      border: #955 1px solid;
    }
    .bz-clickable:hover {
      background: #2e2424;
      transition-property: all;
      transition-duration: 150ms;
      transition-timing-function: ease-in-out;
      cursor: pointer;
    }
    .bz-openwebsite {
      grid-column-start: span 3;
      line-height: 3em;
      padding-left: 1em;
      transition-duration: 300ms;
      transition-timing-function: ease-in-out;
    }
    .bz-openwebsite:hover {
      padding-left: 1.5em;
      transition-duration: 300ms;
      transition-timing-function: ease-in-out;
    }
    .bz-openwebsite img {
      height: 2em;
      width: 2em;
      display: inline-block;
      vertical-align: middle;
      padding-right: 0.5em;
      /* filter: grayscale(50%); */
      border-radius: 4px;
    }
    .bz-comment {
      grid-column-start: span 3;
      padding-left: 1em;
      padding-top: 0.4em;
      padding-bottom: 0;
      font-size: smaller;
      color: #666;
    }
    .bz-end {
      grid-column-start: span 3;
      padding-left: 1em;
      padding-bottom: 0.2em;
      font-size: smaller;
      color: #666;
    }
    .bz-divider {
      border-bottom: #444 solid 1px;
      grid-column-start: span 3;
    }
    .bz-text {
      padding-left: 1em;
      padding-right: 1em;
      padding-top: 0.3em;
      padding-bottom: 0.3em;
      grid-column-start: span 3;
    }
    .bz-arrow {
      width: 1em;
      height: 1em;
      background: #222;
      position: absolute;
      rotate: 45deg;
      z-index: -1;
    }
    :host {
      position: fixed;
      padding-top: 50px;
      padding-bottom: 40px;
      opacity: 0;
      transition-property: opacity padding-top;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out();
    }
    :host([showing]) {
      padding-top: 40px;
      opacity: 1;
    }
  `;

  @property({ type: Array })
  versions: string[] = ["NIV", "和合"];

  @property()
  book: string = "Genesis";

  @property()
  chapter: number = 1;

  @property()
  verse: number = 1;

  @property({ reflect: true, type: Boolean })
  showing = false;

  index: number = 0;
  customQuote: boolean = false;

  setIndex: (index: number) => void = () => {};
  setActive: (active: boolean) => void = () => {};

  private _target: Element | null = null;
  private cleanup: Function = () => {};
  get target() {
    return this._target;
  }

  set target(target: Element | null) {
    // Remove events from existing target
    if (this.target) {
      enterEvents.forEach((name) =>
        this.target!.removeEventListener(name, this.show)
      );
      leaveEvents.forEach((name) => this.removeEventListener(name, this.hide));
    }
    // Add events to new target
    if (target) {
      enterEvents.forEach((name) => target.addEventListener(name, this.show));
      leaveEvents.forEach((name) => this.addEventListener(name, this.hide));
    }
    this._target = target;
  }

  arrow: Ref<HTMLDivElement> = createRef();

  settingIndex: boolean = false;

  biblelanguage: "zh" | "en" = "zh";

  bibleWebsites: BibleWebsite[] = ["yv", "bg", "wd", "zn"];

  openWebsite = (
    website: BibleWebsite,
    book: string,
    chapter: number,
    verse: number
  ) => {
    switch (website) {
      case "yv": {
        const bookAbbr = getBookAbbr(book).toUpperCase();
        if (bookAbbr === "NUL") break;
        if (this.biblelanguage === "zh")
          window.open(
            `https://www.bible.com/bible/48/${bookAbbr}.${chapter}.${verse}.CUNPSS-%25E7%25A5%259E#4`
          );
        else
          window.open(
            `https://www.bible.com/bible/111/${bookAbbr}.${chapter}.${verse}.NIV`
          );
        break;
      }
      case "bg": {
        const bookAbbr = getBookAbbr(book);
        if (bookAbbr === "Nul") break;
        const bookarr = BIBLE_BOOKS[bookAbbr];
        if (bookarr) {
          if (this.biblelanguage === "zh") {
            window.open(
              `https://www.biblegateway.com/passage/?search=${bookarr[0]}%20${chapter}%3A${verse}&version=CUVMPS`
            );
          } else {
            window.open(
              `https://www.biblegateway.com/passage/?search=${bookarr[2].replace(
                " ",
                "%20"
              )}%20${chapter}%3A${verse}&version=NIV`
            );
          }
        }
        break;
      }
      case "wd": {
        const bookAbbr = getBookAbbr(book).toLowerCase();
        if (bookAbbr === "nul") break;
        window.open(`https://wd.bible/${bookAbbr}.${chapter}.${verse}.cunps`);
        break;
      }
      case "zn": {
        const bookAbbr = getBookAbbr(book);
        if (bookAbbr === "Nul") break;
        const bookIndex = getBookIndex(bookAbbr);
        if (bookIndex) {
          window.open(
            `https://znsj.wxsorg.com/read/${bookIndex + 1}/${chapter}/`
          );
        }
        break;
      }
      default: {
      }
    }
  };

  indexChanged = (index: number) => {
    let translations = this.shadowRoot!.querySelectorAll(
      "div.bz-translation"
    ) as NodeListOf<HTMLDivElement>;
    if (
      index < 0 ||
      index >= translations.length ||
      index >= this.versions.length
    )
      return;
    this.settingIndex = true;
    translations.forEach((translation, i) => {
      translation.style.animationPlayState = "running";
      if (i === index) {
        translation.setAttribute("active", "");
        translation.style.animation = "300ms switch-index";
      } else {
        translation.removeAttribute("active");
        translation.style.animation = "none";
      }
    });
    this.index = index;
    this.setIndex(index);
  };

  updatePosition = () => {
    if (this.target) {
      computePosition(this.target, this, {
        strategy: "fixed",
        middleware: [
          inline(),
          offset(-35),
          shift({ padding: 5 }),
          autoPlacement({ allowedPlacements: ["top", "bottom"] }),
          arrow({ element: this.arrow.value! }),
        ],
      }).then((data) => {
        if (!this.settingIndex) {
          this.style.left = `${data.x}px`;
          if (data.placement != "top") this.style.top = `${data.y}px`;
          else this.style.top = `${data.y + 15}px`;
        }
        if (this.arrow.value) {
          if (data.middlewareData.arrow!.x)
            this.arrow.value!.style.left = `${data.middlewareData.arrow!.x}px`;
          if (data.placement === "top") this.arrow.value!.style.bottom = `40px`;
        }
      });
    }
  };

  show = () => {
    if (this.target) {
      this.style.display = "block";
      this.cleanup = autoUpdate(this.target, this, this.updatePosition);
      this.showing = true;
    }
  };

  hide = () => {
    this.showing = false;
    this.setActive(false);
  };

  finishHide = () => {
    if (!this.showing) {
      this.style.display = "none";
      this.remove();
      this.cleanup();
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    this.target ??= this.previousElementSibling;
    this.style.display = "none";
    let meta_lang = document.querySelector("meta[name='biblezh-language']");
    if (meta_lang) {
      if (meta_lang.getAttribute("content") === "en") {
        this.biblelanguage = "en";
      }
    }
    let meta_websites = document.querySelector("meta[name='biblezh-websites']");
    if (meta_websites) {
      let websites; // = meta_websites.getAttribute("content")?.split(",");
      websites = JSON.parse(meta_websites.getAttribute("content") || "");
      if (!Array.isArray(websites))
        websites = meta_websites.getAttribute("content")?.split(",");
      if (Array.isArray(websites)) {
        this.bibleWebsites = [];
        websites.map((website: string) => {
          switch (website) {
            case "yv":
              this.bibleWebsites.push("yv");
              break;
            case "bg":
              this.bibleWebsites.push("bg");
              break;
            case "wd":
              this.bibleWebsites.push("wd");
              break;
            case "zn":
              this.bibleWebsites.push("zn");
          }
        });
      }
    }
  }

  override render() {
    let changeTranslation = "切换译本";
    if (this.biblelanguage === "en") {
      changeTranslation = "Change Translation";
    }
    let openIn = "转到圣经网站";
    if (this.biblelanguage === "en") {
      openIn = "Open in Bible Website";
    }
    return html`
      <div class="bz-tooltip">
        <div class="bz-verse center">
          ${this.book} ${this.chapter}:${this.verse}
        </div>
        <div class="bz-divider"></div>
        ${(() => {
          if (!this.customQuote)
            return html`<div class="bz-comment">${changeTranslation}</div>
              <div class="bz-translation-container">
                ${this.versions.map(
                  (version, index) =>
                    html`
                      <div
                        class="center bz-translation bz-clickable"
                        @click=${() => this.indexChanged(index)}
                        ?active=${index === this.index}
                      >
                        ${version}
                      </div>
                    `
                )}
              </div>
              <div class="bz-divider"></div>`;
          else return html``;
        })()}
        ${(() => {
          let biblewebsite: TemplateResult[] = [];
          if (this.bibleWebsites.length != 0) {
            biblewebsite.push(html` <div class="bz-comment">${openIn}</div> `);
            this.bibleWebsites.forEach((website, index) => {
              let websitename = "YouVersion";
              let icon = YOUVERSION_ICON;
              switch (website) {
                case "yv":
                  websitename = "YouVersion";
                  icon = YOUVERSION_ICON;
                  break;
                case "bg":
                  websitename = "BibleGateway";
                  icon = BIBLEGATEWAY_ICON;
                  break;
                case "wd":
                  websitename = "微读圣经";
                  icon = WDBIBLE_ICON;
                  break;
                case "zn":
                  websitename = "主内圣经";
                  icon = BIBLEPRO_ICON;
                  break;
              }
              biblewebsite.push(html`<div
                class="bz-openwebsite bz-clickable"
                @click=${() =>
                  this.openWebsite(
                    website,
                    this.book,
                    this.chapter,
                    this.verse
                  )}
                ?active=${index === this.index}
              >
                <img src=${icon}></img> ${websitename}
              </div>`);
            });
            biblewebsite.push(html` <div class="bz-divider"></div> `);
          }
          return biblewebsite;
        })()}
        <div class="bz-end">Powered by biblezh.js</div>
        <div class="bz-arrow" ${ref(this.arrow)}></div>
      </div>
    `;
  }
}

export type BibleData = {
  version: string;
  text: string;
};

function isBibleData(obj: any): obj is BibleData {
  return typeof obj.version === "string" && typeof obj.text === "string";
}

@customElement("bz-bible")
export class Bible extends LitElement {
  @property()
  book: string = "Genesis";

  @property()
  chapter: number = 1;

  @property()
  verse: number = 1;

  @property({ type: Array })
  data: BibleData[] = [
    {
      version: "NIV",
      text: "In the beginning God created the heaven and the earth.",
    },
    {
      version: "和合",
      text: "起初，上帝创造天地。",
    },
  ];

  @property()
  customQuote: string | undefined;

  @property({ reflect: true, type: Boolean })
  active: boolean = false;

  @state()
  private index: number = 0;

  static override styles = css`
    .biblezh-ref {
      text-decoration: underline;
      display: inline-block;
      cursor: pointer;
    }
    :host([active]) {
      background-color: #ffffcd55;
    }
  `;

  setIndex = (index: number) => (this.index = index);
  setActive = (active: boolean) => (this.active = active);

  override render() {
    let text = "biblezh.js: Error: No text provided.";
    if (this.customQuote) text = this.customQuote;
    else if (
      Array.isArray(this.data) &&
      this.data.length != 0 &&
      this.data.every(isBibleData)
    ) {
      text =
        0 <= this.index && this.index < this.data.length
          ? this.data[this.index].text
          : this.data[0].text;
    }

    return html`
      <span class="biblezh">
        <span class="biblezh-text">${text}</span>
        <span class="biblezh-ref">
          (${this.book} ${this.chapter}:${this.verse})
        </span>
      </span>
    `;
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    const ref = this.shadowRoot!.querySelector(".biblezh-ref");
    Tooltip.lazy(ref!, (tooltip: Tooltip) => {
      this.active = true;
      tooltip.book = this.book;
      tooltip.chapter = this.chapter;
      tooltip.verse = this.verse;
      tooltip.index = this.index;
      tooltip.setIndex = this.setIndex;
      tooltip.setActive = this.setActive;
      tooltip.versions = this.data.map((d) => d.version);
      tooltip.customQuote = !!this.customQuote;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bz-bible": Bible;
  }
  interface HTMLElementTagNameMap {
    "bz-tooltip": Tooltip;
  }
}
