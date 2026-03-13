# Patches Quote Form — 4 Steps

**Form name:** `quoteformpatches`
**Redirect:** `/thank-you`
**Steps:** Patch Size → Patch Attachments → Order Details → Contact Details

---

## Step 1: Choose a Patch Size

- **Heading:** "Choose a Patch Size"
- **Progress:** 20%
- **name:** `Size` | **Type:** radio | **Required:** Yes
- **Auto-advance:** Yes
- **Layout:** 4-column grid

| Value        | Display Label | Tag         |
| ------------ | ------------- | ----------- |
| `2"`         | 2"            | —           |
| `2 1/2"`     | 2 1/2"        | —           |
| `3"`         | 3"            | Most Common |
| `3 1/2"`     | 3 1/2"        | Most Common |
| `4"`         | 4"            | Most Common |
| `4 1/2"`     | 4 1/2"        | —           |
| `5"`         | 5"            | —           |
| `Other Size` | Other         | —           |

---

## Step 2: Choose Patch Attachments

- **Heading:** "Choose Patch Attachments"
- **Progress:** 40%
- **name:** `Attachments` | **Type:** radio | **Required:** Yes
- **Auto-advance:** Yes

| Value          | Display Label | Image Class   | Tooltip            | Price       |
| -------------- | ------------- | ------------- | ------------------ | ----------- |
| `Plain`        | Plain         | `plain`       | No special backing | Included    |
| `Iron On Back` | Iron on Back  | `iron-back`   | Iron on Back       | +$0.40/each |
| `Velcro`       | Velcro        | `velcro-back` | Velcro Back        | +$0.20/each |
| `Digitape`     | Other         | _(none)_      | Other              | —           |

> **Note:** Original had `+$0.205/each` for Velcro — likely a typo. Confirm if it should be $0.20 or $0.25.

---

## Step 3: Patch Order Details

- **Progress:** 80%

| Field           | name (exact)      | Type             | Required | Label                                                     | Placeholder                       | Notes                                                      |
| --------------- | ----------------- | ---------------- | -------- | --------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| Quantity        | `quantity`        | select           | Yes      | "How many patches do you need? (minimum 50)"              | `Quantity...`                     | See options below                                          |
| Quantity Manual | `Quantity Manual` | number           | No       | _(none)_                                                  | `Type your quantity`              | Hidden by default. Show when "Other" selected. **Min: 50** |
| Date Needed     | `dateneeded`      | text (Flatpickr) | Yes      | "When do you need the patches in hand?"                   | `MM/DD/YYYY`                      | Min = today + 10 business days. Submits as `MM/DD/YYYY`.   |
| File Upload 1   | `File`            | file             | No       | "Do you have a sketch or design of your patch?"           | —                                 | Info: "Max image size 4MB."                                |
| File Upload 2   | `File 2`          | file             | No       | _(none)_                                                  | —                                 | Hidden by default. Show after file 1 uploaded.             |
| File Upload 3   | `File 3`          | file             | No       | _(none)_                                                  | —                                 | Hidden by default. Show after file 2 uploaded.             |
| Help Text       | `help text`       | textarea         | No       | "Anything else we should know about your custom patches?" | `Include additional details here` | maxlength=5000                                             |

**Quantity dropdown options:**

| Value     | Display     |
| --------- | ----------- |
| _(empty)_ | Quantity... |
| `Other`   | Other       |
| `50`      | 50          |
| `100`     | 100         |
| `150`     | 150         |
| `200`     | 200         |
| `250`     | 250         |
| `300`     | 300         |
| `500`     | 500         |
| `750`     | 750         |
| `1000`    | 1,000       |
| `2000`    | 2,000       |
| `3000`    | 3,000       |
| `4000`    | 4,000       |
| `5000`    | 5,000       |
| `7500`    | 7,500       |
| `10000`   | 10,000      |

---

## Step 4: Contact Details

- **Progress:** 99%

| Field        | name (exact)           | Type         | Required | Label                   | Placeholder             |
| ------------ | ---------------------- | ------------ | -------- | ----------------------- | ----------------------- | ------------------------------------------------------------- |
| First Name   | `first name`           | text         | Yes      | "Enter your first name" | `First name`            |
| Last Name    | `last name`            | text         | Yes      | "Enter your last name"  | `Last name`             |
| Company Name | `company name`         | text         | No       | "Company Name"          | `Company name`          |
| Phone        | `phone`                | tel          | No       | "Phone"                 | `Phone`                 |
| Email        | `email`                | email        | Yes      | "Enter your email"      | `hello@yourwebsite.com` |
| Source       | `source`               | hidden       | No       | _(none)_                | —                       | Populated from URL query string via JS                        |
| reCAPTCHA    | `g-recaptcha-response` | reCAPTCHA v2 | —        | _(none)_                | —                       | Sitekey: `6LfTKEYqAAAAAGhgcppbY8jUOWdCFsq1jQComAOD`           |
| Submit       | —                      | submit       | —        | _(none)_                | —                       | Value: `Complete Submission`, data-wait: `Working on that...` |
