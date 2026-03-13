# Buttons Quote Form — 3 Steps

**Form name:** `quoteformbuttons`
**Redirect:** `/thank-you`
**Steps:** Button Size → Order Details → Contact Details

---

## Step 1: Choose a Button Size

- **Heading:** "Choose a Button Size"
- **Progress:** 33.33%
- **name:** `Size` | **Type:** radio | **Required:** Yes
- **Auto-advance:** Yes
- **Layout:** 4-column grid

| Value        | Display Label | Tag         |
| ------------ | ------------- | ----------- |
| `1/2"`       | 1/2"          | —           |
| `3/4"`       | 3/4"          | —           |
| `1"`         | 1"            | —           |
| `1 1/2"`     | 1 1/2"        | —           |
| `2"`         | 2"            | Most Common |
| `2 1/2"`     | 2 1/2"        | Most Common |
| `3"`         | 3"            | —           |
| `Other Size` | Other         | —           |

---

## Step 2: Button Order Details

- **Progress:** 83.32%

| Field           | name (exact)      | Type             | Required | Label                                            | Placeholder                       | Notes                                                                                                                |
| --------------- | ----------------- | ---------------- | -------- | ------------------------------------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Quantity        | `quantity`        | select           | Yes      | "How many buttons do you need? (minimum 100)"    | `Quantity...`                     | See options below                                                                                                    |
| Quantity Manual | `Quantity Manual` | number           | No       | _(none)_                                         | `Type your quantity`              | Hidden by default. Show when "Other" selected. **Min: 100** (label says 100; old HTML had `min="50"` — likely a bug) |
| Date Needed     | `dateneeded`      | text (Flatpickr) | Yes      | "When do you need the buttons in hand?"          | `MM/DD/YYYY`                      | Min = today + 10 business days. Submits as `MM/DD/YYYY`.                                                             |
| File Upload 1   | `File`            | file             | No       | "Do you have a sketch or design of your button?" | —                                 | Info: "Max image size 4MB."                                                                                          |
| File Upload 2   | `File 2`          | file             | No       | _(none)_                                         | —                                 | Hidden by default. Show after file 1 uploaded.                                                                       |
| File Upload 3   | `File 3`          | file             | No       | _(none)_                                         | —                                 | Hidden by default. Show after file 2 uploaded.                                                                       |
| Help Text       | `help text`       | textarea         | No       | "Do you have a sketch or design of your button?" | `Include additional details here` | maxlength=5000                                                                                                       |

**Quantity dropdown options:**

| Value     | Display     |
| --------- | ----------- |
| _(empty)_ | Quantity... |
| `Other`   | Other       |
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

## Step 3: Contact Details

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
