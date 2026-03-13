# Belt Buckles Quote Form — 4 Steps

**Form name:** `quoteformbuckles`
**Redirect:** `/thank-you`
**Steps:** Buckle Type → Buckle Size → Order Details → Contact Details

---

## Step 1: Choose your buckle type

- **Heading:** "Choose your buckle type"
- **Progress:** 25%
- **name:** `Buckle Type` | **Type:** radio | **Required:** Yes
- **Auto-advance:** Yes

| Value         | Display Label | Image Class               | Tooltip              |
| ------------- | ------------- | ------------------------- | -------------------- |
| `Soft Enamel` | With Color    | `soft-enamel-belt-buckle` | Best Value           |
| `Die Struck`  | Without Color | `die-struck-belt-buckle`  | Clean & Professional |

---

## Step 2: Choose a Buckle Size

- **Heading:** "Choose a Buckle Size"
- **Progress:** 50%
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

## Step 3: Buckle Order Details

- **Progress:** 75%

| Field           | name (exact)      | Type             | Required | Label                                                     | Placeholder                       | Notes                                                     |
| --------------- | ----------------- | ---------------- | -------- | --------------------------------------------------------- | --------------------------------- | --------------------------------------------------------- |
| Quantity        | `quantity`        | select           | Yes      | "How many buckles do you need?"                           | `Quantity...`                     | See options below                                         |
| Quantity Manual | `Quantity Manual` | number           | No       | _(none)_                                                  | `Type your quantity`              | Hidden by default. Show when "Other" selected. **Min: 1** |
| Date Needed     | `dateneeded`      | text (Flatpickr) | Yes      | "When do you need the buckles in hand?"                   | `MM/DD/YYYY`                      | Min = today + 10 business days. Submits as `MM/DD/YYYY`.  |
| File Upload 1   | `File`            | file             | No       | "Do you have a sketch or design of your buckle?"          | —                                 | Info: "Max image size 4MB."                               |
| File Upload 2   | `File 2`          | file             | No       | _(none)_                                                  | —                                 | Hidden by default. Show after file 1 uploaded.            |
| File Upload 3   | `File 3`          | file             | No       | _(none)_                                                  | —                                 | Hidden by default. Show after file 2 uploaded.            |
| Help Text       | `help text`       | textarea         | No       | "Anything else we should know about your custom buckles?" | `Include additional details here` | maxlength=5000                                            |

**Quantity dropdown options:**

| Value     | Display     |
| --------- | ----------- |
| _(empty)_ | Quantity... |
| `Other`   | Other       |
| `1`       | 1           |
| `5`       | 5           |
| `10`      | 10          |
| `15`      | 15          |
| `20`      | 20          |
| `25`      | 25          |
| `50`      | 50          |
| `100`     | 100         |

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
