### Screen dimensions

- Mobile `320px to 480px`
- Tablet/Notebook/Ipads `480px to 768px`
- Laptop `768px to 1024px`
- Large screens and desktops `1024px to 1200px`
- Extra large screens `1200px to 1920px`
- Ultra wide screens `1920px and more` `// rare`

## Incase of Bootstrap – 576px, 768px, 992px, 1200px and 1400px

## TLDR

- Conclusion:
  The `min-width approach is most preferred choice` in most responsive design projects. It allows for a more natural, scalable, and maintainable way of handling CSS as screen sizes increase.

```js
const breakpoints: {
  xs: "0px",
  sm: "576px",
  md: "768px",
  lg: "992px", // ≥992px is a large
  xl: "1200px", // ≥1200px is a Extra large
  xxl: "1400px" // ≥1400px is a Extra extra large
}
```

### Let’s check several common breakpoints that most websites nowadays use. The following CSS snippet uses four breakpoints with a `mobile-first design strategy` (the default style is for the smallest screen group):

```css
/* Default: Extra-small devices such as small phones (less than 640px) */

/* Small devices such as large phones (640px and up) */
@media only screen and (min-width: 640px) {
}

/* Medium devices such as tablets (768px and up) */
@media only screen and (min-width: 768px) {
}

/* Large devices such as laptops (1024px and up) */
@media only screen and (min-width: 1024px) {
}

/* Largest devices such as desktops (1280px and up) */
@media only screen and (min-width: 1280px) {
}
```

### Here is another example CSS snippet that only defines two breakpoints with a desktop-first design strategy (the default style is for the largest screen group):

```css
/* Default: Large devices such as laptops, computers (greater than 1024px) *

/* Medium devices such as tablets (1024px or lesser) */
@media only screen and (max-width: 1024px) {
}

/* Small devices such as phones (768px or lesser) */
@media only screen and (max-width: 768px) {
}
```
