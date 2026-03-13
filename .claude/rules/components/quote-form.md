# quote-form

## Purpose

Multi-step quote form wizard that handles step navigation, validation, and field behaviors for all 6 product quote forms (Pins, Patches, Coins, Medals, Belt Buckles, Buttons).

## Webflow Setup

Add to the form wrapper element in Webflow:

```
data-component="quote-form"
```

### Required CDN scripts in Webflow `<head>`:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
```

### Required `data-quote-form` attributes inside the component:

| Attribute                         | Element                  | Purpose                                |
| --------------------------------- | ------------------------ | -------------------------------------- |
| `data-quote-form="step"`          | `<div>`                  | Each step container                    |
| `data-quote-form="prev"`          | `<button>`               | Previous step button                   |
| `data-quote-form="next"`          | `<button>`               | Next step button                       |
| `data-quote-form="submit"`        | `<button type="submit">` | Submit button                          |
| `data-quote-form="progress-fill"` | `<div>`                  | Progress bar fill (uses scaleX via JS) |
| `data-quote-form="progress-text"` | `<div>`                  | Step counter text (e.g. "1/5")         |

### Required element IDs (for file uploads):

- `file-upload-2`, `file-upload-3` — file upload wrappers (hidden via `hide` class by JS)
- `file`, `file-2`, `file-3` — file input elements

### Required classes:

- `.quote-form_radio_input` — radio inputs inside radio-only steps (for auto-advance)
- `.hide` — utility class with `display: none !important` (must exist in Webflow)
- `.is-error` — applied to invalid fields for red border styling
- `.quote-form_error-text` — error message text below invalid fields

## Behavior

- **Init**:
  1. Syncs `name` → `data-name` for all non-hidden inputs inside the form (skips `type="hidden"` to avoid Webflow serialization conflicts)
  2. Clears any hidden fields with value `"undefined"` (Webflow's JS can set this on the source field)
  3. Sets `type="button"` on prev/next to prevent form submission
  4. Hides all steps except step 1 via `hide` class
  5. Hides prev button and submit button on step 1
  6. Auto-detects radio-only steps (steps with only radio inputs)
  7. On radio steps, hides Next until a radio is selected
  8. Inits Flatpickr on `[name="dateneeded"]` with 10 business day minimum
  9. Hides file upload 2/3 wrappers via `hide` class
  10. Sets up quantity "Other" toggle on `[name="quantity"]` — when "Other" is selected, shows and requires `Quantity Manual` field
  11. Sets up phone formatting on `[name="phone"]` (strips non-digits, formats as `(xxx) xxx-xxxx`, clears to empty on full delete)
  12. Sets up radio auto-advance on radio-only steps
  13. Appends all URL query params as hidden fields on form submit (keys are sanitized via `CSS.escape`)
  14. Sets up submit feedback — disables button and shows "Working on that..." text, re-enables after 5s if form is still visible (handles failed submissions)

- **Resize**: Not used

## Step Navigation

- **Radio steps**: Auto-advance immediately on selection
- **Form steps**: User clicks Next, validation runs first, step changes only if valid
- **Visibility**: Steps shown/hidden via `hide` class (no animations)
- **Progress bar**: scaleX set directly via JS on step change
- **Scroll**: Smooth scroll to top of page on every step change

## Validation

- Runs on Next click for non-radio steps
- Uses HTML5 constraint validation API (vanilla JS)
- Handles Flatpickr date fields specially (Flatpickr adds `readonly` which can bypass `checkValidity()` in some browsers — component explicitly checks empty value on all required fields before calling `checkValidity()`)
- Shows red border (`.is-error`) + error message (`.quote-form_error-text`) below invalid fields
- Errors clear immediately when user starts typing/selecting

## Dependencies

- **Flatpickr** (CDN) — date picker

## DOM Expectations

Elements matching `[data-component='quote-form']`. Each form must contain `data-quote-form` attributed elements as listed above. The component auto-detects the number of steps and adapts to any form structure.
