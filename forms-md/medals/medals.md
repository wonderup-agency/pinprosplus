# Medals Quote Form — 5 Steps

**Form name:** `quoteformmedals`
**Redirect:** `/thank-you`
**Steps:** Medal Type → Medal Size → Medal Attachments → Order Details → Contact Details

---

## Step 1: Choose your medal type

- **Heading:** "Choose your medal type"
- **Progress:** 16.66%
- **name:** `Medal Type` | **Type:** radio | **Required:** Yes
- **Auto-advance:** Yes

| Value         | Display Label | Tooltip              |
| ------------- | ------------- | -------------------- |
| `Soft Enamel` | Soft Enamel   | Best Value           |
| `Hard Enamel` | Hard Enamel   | Best Quality         |
| `Die Struck`  | Die Struck    | Clean & Professional |

> **Note:** No product images on medal type radios (text only with tooltip icons).

---

## Step 2: Choose a Medal Size

- **Heading:** "Choose a Medal Size"
- **Progress:** 33.33%
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
| `5"`         | 5"            | —           |
| `Other Size` | Other         | —           |

---

## Step 3: Choose Medal Attachments

- **Heading:** "Choose Medal Attachments"
- **Progress:** 50%
- **name:** `Attachments` | **Type:** radio | **Required:** No
- **Auto-advance:** Yes

| Value                 | Display Label       | Image Class     | Price       |
| --------------------- | ------------------- | --------------- | ----------- |
| `Single Color Ribbon` | Single Color Ribbon | `single-color`  | Included    |
| `Custom Ribbon`       | Custom Ribbon       | `custom-ribbon` | +$0.25/each |

> **BUG in original:** Both options had `value="Custom Ribbon"`. Fix: the first should be `Single Color Ribbon`.

---

## Step 4: Medal Order Details

- **Progress:** 83.32%

| Field           | name (exact)      | Type             | Required | Label                                                    | Placeholder                       | Notes                                                      |
| --------------- | ----------------- | ---------------- | -------- | -------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| Quantity        | `quantity`        | select           | Yes      | "How many medals do you need? (minimum 10)"              | `Quantity...`                     | See options below                                          |
| Quantity Manual | `Quantity Manual` | number           | No       | _(none)_                                                 | `Type your quantity`              | Hidden by default. Show when "Other" selected. **Min: 10** |
| Date Needed     | `dateneeded`      | text (Flatpickr) | Yes      | "When do you need the medals in hand?"                   | `MM/DD/YYYY`                      | Min = today + 10 business days. Submits as `MM/DD/YYYY`.   |
| File Upload 1   | `File`            | file             | No       | "Do you have a sketch or design of your medal?"          | —                                 | Info: "Max image size 4MB."                                |
| File Upload 2   | `File 2`          | file             | No       | _(none)_                                                 | —                                 | Hidden by default. Show after file 1 uploaded.             |
| File Upload 3   | `File 3`          | file             | No       | _(none)_                                                 | —                                 | Hidden by default. Show after file 2 uploaded.             |
| Help Text       | `help text`       | textarea         | No       | "Anything else we should know about your custom medals?" | `Include additional details here` | maxlength=5000                                             |

**Quantity dropdown options:**

| Value     | Display     |
| --------- | ----------- |
| _(empty)_ | Quantity... |
| `Other`   | Other       |
| `10`      | 10          |
| `25`      | 25          |
| `50`      | 50          |
| `100`     | 100         |
| `200`     | 200         |
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

## Step 5: Contact Details

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
