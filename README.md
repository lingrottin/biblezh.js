# biblezh.js

[![](https://img.shields.io/npm/v/biblezh.js)](https://www.npmjs.com/package/biblezh.js) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/biblezh.js) ![](https://img.shields.io/npm/types/biblezh.js) ![NPM Last Update](https://img.shields.io/npm/last-update/biblezh.js) ![GitHub License](https://img.shields.io/github/license/lingrottin/biblezh.js)

Useful Web Component for displaying Bible contents.

![](/readme-assets/screenshot.png)

## Including in your project

simply run

```bash
npm install biblezh.js
```

Or if you prefer CDN:

```html
<script
  src="https://cdn.jsdelivr.net/npm/biblezh.js/dist/biblezh.bundled.js"
  type="module"
></script>
```

## Usage

The `<bz-bible>` element generates a Bible verse on your page, with the location (in which book, chapter and verse) provided. When you click on the location text, a popup will allow you to change translations and go to several Bible websites.

```html
<!-- Common usage, allowing to change translations -->
<bz-bible
  data='[{"version":"NIV", "text":"In the beginning God created the heaven and the earth."}, {"version":"和合本", "text":"起初，　神创造天地。"}]'
  book="Genesis"
  chapter="1"
  verse="1"
></bz-bible>

<!-- With a custom quote provided, not allowing to change translations -->
<bz-bible
  customquote="In the beginning"
  book="Genesis"
  chapter="1"
  verse="1"
></bz-bible>
```

You can also use this in JavaScript or TypeScript:

```javascript
import Bible from "biblezh.js";
let bible = new Bible();
bible.book = "Genesis";
bible.chapter = 1;
bible.verse = 1;
bible.data = JSON.stringify([
  {
    version: "NIV",
    text: "In the beginning God created the heaven and the earth.",
  },
  { version: "和合本", text: "起初，　神创造天地。" },
]);
document.appendChild(bible);
```

This package also provided a useful database (available as a JavaScript array constant):

```javascript
// Declaration of the database
export const BIBLE_BOOKS: BibleBooksType = {
  Gen: ["创世记", "创", "Genesis", "Gen"],
  Exo: ["出埃及记", "出", "Exodus", "Exo"],
  // remaining entries
};

// Usage
import { BIBLE_BOOKS, getBookAbbr, getBookIndex } from "biblezh.js";

BIBLE_BOOKS["Mrk"][0]; // -> "马可福音"

// get abbreviation by all 4 names
getBookAbbr("1 John"); // -> "1Jn"

// accepts English abbreviations only
getBookIndex("Mrk"); // -> 40
```

## Configuration

This package provides a document-wide configuration option.

```html
<!-- Set language to English (for UI) -->
<meta name="biblezh-language" content="en" />

<!-- adjust the orders and the presence of Bible websites -->
<!-- allowed values: yv bg wd zn -->
<!-- where: yv-[YouVersion] bg-[Bible Gateway] wd-[微读圣经] zn-[主内圣经] -->
<meta name="biblezh-websites" content='["yv", "bg"]' />

<!-- you can also pass the websites like this -->
<meta name="biblezh-websites" content="wd, bg" />
```
