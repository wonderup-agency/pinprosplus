# PinPros Quote Forms — JS Project Context

## What we're building

We're rebuilding 6 multi-step quote forms for **PinPros Plus** (pinprosplus.com), a custom products company. The forms collect product specifications and contact info, then submit to Webflow's native form handler which connects to an existing backend (likely Airtable via integrations).

The 6 products are: **Pins, Patches, Coins, Medals, Belt Buckles, and Buttons.**

## Why we're rebuilding

The previous developer built these forms using **Webflow's slider component** hacked into a multi-step wizard. The implementation had:

- Massive HTML duplication (banner content repeated in every slide)
- Broken lead source tracking (JS targeted wrong form IDs)
- No per-step validation
- Copy-pasted JS across all 6 pages
- External datepicker loaded from a GitHub Pages URL (fragile)
- Several data bugs (duplicate values, wrong min enforcement)

## The new approach

### Webflow side (HTML/CSS)

- Forms are built in **Webflow's designer** using a native form element
- Radio buttons are **custom elements** (not Webflow native inputs) for full styling control
- Banner section lives **outside** the form steps — rendered once
- Progress bar and navigation buttons live **outside** the step divs — updated via JS
- Each step is a `<div data-quote-form="step">` containing only its fields
- Each form has a `prev`, `next`, and `submit` button identified by `data-quote-form="prev|next|submit"`

### JS side (this project)

- A single JS file handles **all 6 forms** — no per-page duplication
- Bundled via npm, output as a single script to embed in Webflow
- Handles: step navigation, progress bar updates, field validation, radio auto-advance, quantity toggle, date picker, phone formatting, ghost field cleanup, `data-name` syncing, and lead source tracking

## What the JS needs to do

### On page load

1. **Sync `data-name` from `name`** — Webflow submits `data-name`, but we only set `name` in the designer. Copy it over.
2. **Remove ghost fields** — Webflow auto-creates `Field-*` inputs. Remove them.
3. **Init Flatpickr** on the date field with 10 business day minimum, format `MM/DD/YYYY`.
4. **Init step navigation** — show step 1, hide all others.
5. **Populate `source` hidden field** from URL query string.

### Step navigation

- **Radio steps** auto-advance when an option is selected.
- **Next/Prev buttons** navigate between steps.
- **Progress bar** and step counter update on each transition.
- **Prev button** hidden on step 1. **Next button** hidden on last step. **Submit button** only visible on last step.
- **Prevent nav buttons from submitting the form** — Webflow renders all nav buttons (`prev`, `next`, `submit`) inside the `<form>`, so clicking any of them triggers a form submission by default. On page load, set `type="button"` on `prev` and `next` so only the `submit` button can submit:

```js
document
  .querySelectorAll('[data-quote-form="prev"], [data-quote-form="next"]')
  .forEach((btn) => {
    btn.type = 'button'
  })
```

### Field behaviors

- **Quantity "Other" toggle** — show/hide manual input, clear on deselect.
- **Progressive file upload** — show file 2 after file 1 uploaded, file 3 after file 2.
- **Phone formatting** — `(XXX) XXX-XXXX` as user types.

### On submit

- Webflow handles the actual form submission natively (no custom submit logic needed).
- The form redirects to `/thank-you` on success.
- **Submit button wait text** — The new forms use a `<button>` with inner `<div>` text (not an `<input type="submit">`), so the old `data-wait` attribute won't work natively. JS must handle the "Working on that..." feedback on submit:

```js
const form = document.querySelector('form')
const submitBtn = form.querySelector('[data-quote-form="submit"]')
const submitText = submitBtn.querySelector('div')
const originalText = submitText.textContent

form.addEventListener('submit', () => {
  submitBtn.disabled = true
  submitText.textContent = 'Working on that...'
})
```

## Backend compatibility — DO NOT CHANGE

The existing backend expects exact field names and values. The JS must not alter what gets submitted beyond what's documented here. The submission format is Webflow's native `fields[Field Name]=value` payload.

---

## Technical Reference

Everything below is extracted from the form specs and confirmed against the old form submission payloads.

---

## CRITICAL: Field Naming — `name` and `data-name`

Webflow's form handler submits the **`data-name`** attribute value as the field key in the payload. The backend expects exact field names from the old forms.

### Strategy: Set `name` to the correct value, auto-generate `data-name` via JS

Instead of manually managing both `name` and `data-name` in the Webflow designer, use this approach:

1. **In Webflow:** Set each input's `name` attribute to the exact value the backend expects (the `data-name` value from the old forms). Use Webflow's custom attribute settings panel if needed to override auto-generated names.
2. **On page load:** A single JS snippet copies `name` into `data-name` for every field:

```js
document.querySelectorAll('[name]').forEach((el) => {
  if (!el.dataset.name) {
    el.dataset.name = el.name
  }
})
```

This way you only manage **one value** per field in the designer.

### Example

In Webflow, set `name="Pin Type"`. The JS adds `data-name="Pin Type"` automatically.

Result in DOM:

```html
<input
  type="radio"
  name="Pin Type"
  data-name="Pin Type"
  value="reclvBmEcTUMrZ5Ol"
/>
```

Submits as: `fields[Pin Type]=reclvBmEcTUMrZ5Ol`

### All field names (set `name` to these exact values)

| Field                           | name (set this in Webflow) |
| ------------------------------- | -------------------------- |
| Pin type (Pins only)            | `Pin Type`                 |
| Coin type (Coins only)          | `Coin Type`                |
| Medal type (Medals only)        | `Medal Type`               |
| Buckle type (Belt Buckles only) | `Buckle Type`              |
| Size                            | `Size`                     |
| Attachments                     | `Attachments`              |
| Quantity dropdown               | `quantity`                 |
| Quantity manual input           | `Quantity Manual`          |
| Date needed                     | `dateneeded`               |
| File upload 1                   | `File`                     |
| File upload 2                   | `File 2`                   |
| File upload 3                   | `File 3`                   |
| Help text                       | `help text`                |
| First name                      | `first name`               |
| Last name                       | `last name`                |
| Company name                    | `company name`             |
| Phone                           | `phone`                    |
| Email                           | `email`                    |
| Source (hidden)                 | `source`                   |

### Ghost fields warning

Webflow may auto-create default fields (e.g. `Field 6`, `Field 14`) when you add elements to a form. These submit as empty values and pollute the payload. To handle this, add this JS to remove them on page load:

```js
document.querySelectorAll('[name^="Field-"]').forEach((el) => el.remove())
```

### Quantity "Other" behavior

The `quantity` dropdown and `Quantity Manual` input are **always both submitted**. When a dropdown option is selected, `Quantity Manual` submits empty. When "Other" is selected, `Quantity Manual` submits the typed number. JS should:

1. When dropdown changes to "Other" → show the manual input
2. When dropdown changes to anything else → hide the manual input AND clear its value

```js
dropdown.addEventListener('change', () => {
  if (dropdown.value === 'Other') {
    manualInput.style.display = ''
  } else {
    manualInput.style.display = 'none'
    manualInput.value = ''
  }
})
```

### Date field handling

Use **Flatpickr** (~16KB) instead of the old external datepicker library. It provides consistent cross-browser visual feedback (grayed-out disabled dates) and handles the date format natively.

**CDN:** Add to page `<head>`:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
```

**Use `<input type="text">` for the date field** (not `type="date"`, which conflicts with Flatpickr).

**Init on page load:**

```js
// Calculate 10 business days from today
const today = new Date()
let businessDays = 0
const minDate = new Date(today)
while (businessDays < 10) {
  minDate.setDate(minDate.getDate() + 1)
  if (minDate.getDay() !== 0 && minDate.getDay() !== 6) businessDays++
}

flatpickr('[name="dateneeded"]', {
  minDate: minDate,
  dateFormat: 'm/d/Y', // submits as MM/DD/YYYY — matches backend, no conversion needed
})
```

No submit conversion JS needed — Flatpickr handles the format directly.

**The `data-name` column in all tables below is what must match exactly.**

---

## Architecture Overview

### Common Pattern (all forms)

- Each form is a single `<form>` with multiple steps shown/hidden via JS
- **Banner section** (left side): Static, lives OUTSIDE the steps — rendered once
- **Progress bar + navigation buttons**: OUTSIDE the steps — updated via JS
- **Step content** (right side): Each step is a `<div>` — only contains fields and labels
- Radio-selection steps auto-advance to next step on click
- Final step has a "Complete Submission" submit button

### Form Names & Redirect

| Product      | Form Name          | Redirect     |
| ------------ | ------------------ | ------------ |
| Pins         | `quoteformpins`    | `/thank-you` |
| Patches      | `quoteformpatches` | `/thank-you` |
| Coins        | `quoteformcoins`   | `/thank-you` |
| Medals       | `quoteformmedals`  | `/thank-you` |
| Belt Buckles | `quoteformbuckles` | `/thank-you` |
| Buttons      | `quoteformbuttons` | `/thank-you` |

### reCAPTCHA (all forms)

- Type: reCAPTCHA v2
- Sitekey: `6LfTKEYqAAAAAGhgcppbY8jUOWdCFsq1jQComAOD`

---

## Shared Steps (All Forms)

These two steps appear as the **last two steps** of every form. Only the product name in labels changes.

### Step: Order Details

| Field           | data-name (exact) | Type             | Required | Placeholder                       | Notes                                                                                                                                                         |
| --------------- | ----------------- | ---------------- | -------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Quantity        | `quantity`        | select           | Yes      | `Quantity...`                     | Options vary per product (see form-specs.md)                                                                                                                  |
| Quantity Manual | `Quantity Manual` | number           | No       | `Type your quantity`              | Hidden by default. Show when "Other" selected. Min varies per product.                                                                                        |
| Date Needed     | `dateneeded`      | text (Flatpickr) | Yes      | —                                 | Use `<input type="text">`. Flatpickr handles the picker UI, blocks dates within 10 business days, and submits as `MM/DD/YYYY` directly. See JS section above. |
| File Upload 1   | `File`            | file             | No       | —                                 | Label: "Do you have a sketch or design of your [product]?" Info: "Max image size 4MB."                                                                        |
| File Upload 2   | `File 2`          | file             | No       | —                                 | Hidden by default. Show after file 1 uploaded.                                                                                                                |
| File Upload 3   | `File 3`          | file             | No       | —                                 | Hidden by default. Show after file 2 uploaded.                                                                                                                |
| Help Text       | `help text`       | textarea         | No       | `Include additional details here` | maxlength=5000. Label: "Anything else we should know about your custom [product]?"                                                                            |

### Step: Contact Details

| Field        | data-name (exact)      | Type         | Required | Placeholder             |
| ------------ | ---------------------- | ------------ | -------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| First Name   | `first name`           | text         | Yes      | `First name`            |
| Last Name    | `last name`            | text         | Yes      | `Last name`             |
| Company Name | `company name`         | text         | No       | `Company name`          |
| Phone        | `phone`                | tel          | No       | `Phone`                 |
| Email        | `email`                | email        | Yes      | `hello@yourwebsite.com` |
| Source       | `source`               | hidden       | No       | —                       | Populated from URL query string via JS                                                                                                         |
| reCAPTCHA    | `g-recaptcha-response` | reCAPTCHA v2 | —        | —                       | Sitekey above                                                                                                                                  |
| Submit       | —                      | submit       | —        | —                       | Button text: `Complete Submission`. On submit, JS changes text to `Working on that...` and disables the button. See "On submit" section above. |

---

## Webflow HTML Conventions (for JS selectors)

These are the `data-*` attributes used in the Webflow build that the JS should target:

| Attribute                   | Used On                  | Purpose                                      |
| --------------------------- | ------------------------ | -------------------------------------------- |
| `data-quote-form="step"`    | `<div>`                  | Identifies each step container               |
| `data-quote-form="prev"`    | `<button>`               | Previous step button                         |
| `data-quote-form="next"`    | `<button>`               | Next step button                             |
| `data-quote-form="submit"`  | `<button type="submit">` | Submit button                                |
| `.quote-form_progress-fill` | `<div>`                  | Progress bar fill element (set width via JS) |
| `.quote-form_progress-text` | `<div>`                  | Progress text (e.g. "Progress 2/5")          |
| `.quote-form_radio_input`   | `<input type="radio">`   | Radio inputs (for auto-advance listener)     |

---

## Quick Reference: What Differs Per Form

|                           | Pins             | Patches | Coins             | Medals             | Belt Buckles        | Buttons |
| ------------------------- | ---------------- | ------- | ----------------- | ------------------ | ------------------- | ------- |
| **Total Steps**           | 5                | 4       | 5                 | 5                  | 4                   | 3       |
| **Has Product Type Step** | Yes (`Pin Type`) | No      | Yes (`Coin Type`) | Yes (`Medal Type`) | Yes (`Buckle Type`) | No      |
| **Has Attachments Step**  | Yes              | Yes     | Yes               | Yes                | No                  | No      |
| **Min Quantity**          | 50               | 50      | 50                | 10                 | 1                   | 100     |
| **Qty Options Start**     | 50               | 50      | 50                | 10                 | 1                   | 100     |

> For the full per-form field specs (all options, values, tooltips, etc.), see `form-specs.md`.
