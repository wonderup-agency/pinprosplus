# Coins Quote Form — 5 Steps

**Form name:** `quoteformcoins`
**Redirect:** `/thank-you`
**Steps:** Coin Type → Coin Size → Coin Attachments → Order Details → Contact Details

---

## Step 1: Choose your coin type

- **Heading:** "Choose your coin type"
- **Progress:** 20%
- **name:** `Coin Type` | **Type:** radio | **Required:** Yes
- **Auto-advance:** Yes

| Value         | Display Label | Image Class        | Tooltip              | Tag      |
| ------------- | ------------- | ------------------ | -------------------- | -------- |
| `Soft Enamel` | Soft Enamel   | `soft-enamel-coin` | Best Value           | —        |
| `Die Struck`  | Die Struck    | `die-struck-coin`  | Clean & Professional | —        |
| `Hard Enamel` | Hard Enamel   | `hard-enamel-coin` | Best Quality         | Uncommon |
| `Other`       | Other         | _(none)_           | For Gradient Colors  | —        |

---

## Step 2: Choose a Coin Size

- **Heading:** "Choose a Coin Size"
- **Progress:** 40%
- **name:** `Size` | **Type:** radio | **Required:** No
- **Auto-advance:** Yes

| Value        | Display Label | Tooltip    | Tag         |
| ------------ | ------------- | ---------- | ----------- |
| `1 1/4"`     | 1 1/4"        | 1.25       | —           |
| `1 1/2"`     | 1 1/2"        | 1.5        | —           |
| `1 3/4"`     | 1 3/4"        | 1.75       | Most Common |
| `2"`         | 2"            | 2          | Most Common |
| `Other Size` | Other         | Other Size | —           |

---

## Step 3: Choose Coin Attachments

- **Heading:** "Choose Coin Attachments"
- **Progress:** 50%
- **name:** `Attachments` | **Type:** radio | **Required:** Yes
- **Auto-advance:** Yes

| Value          | Display Label | Image Class    | Tooltip           | Price       |
| -------------- | ------------- | -------------- | ----------------- | ----------- |
| `PVC Pouch`    | PVC Pouch     | `pvc-pouch`    | Silver or Gold    | Included    |
| `Coin Capsule` | Coin Capsule  | `coin-capsule` | Black Rubber      | +$0.35/each |
| `Velvet Box`   | Velvet Box    | `velvet-box`   | Screw Back & More | Varies      |

---

## Step 4: Coin Order Details

- **Progress:** 80%

| Field           | name (exact)      | Type             | Required | Label                                                   | Placeholder                       | Notes                                                      |
| --------------- | ----------------- | ---------------- | -------- | ------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| Quantity        | `quantity`        | select           | Yes      | "How many coins do you need? (minimum 50)"              | `Quantity...`                     | See options below                                          |
| Quantity Manual | `Quantity Manual` | number           | No       | _(none)_                                                | `Type your quantity`              | Hidden by default. Show when "Other" selected. **Min: 50** |
| Date Needed     | `dateneeded`      | text (Flatpickr) | Yes      | "When do you need the coins in hand?"                   | `MM/DD/YYYY`                      | Min = today + 10 business days. Submits as `MM/DD/YYYY`.   |
| File Upload 1   | `File`            | file             | No       | "Do you have a sketch or design of your coin?"          | —                                 | Info: "Max image size 4MB."                                |
| File Upload 2   | `File 2`          | file             | No       | _(none)_                                                | —                                 | Hidden by default. Show after file 1 uploaded.             |
| File Upload 3   | `File 3`          | file             | No       | _(none)_                                                | —                                 | Hidden by default. Show after file 2 uploaded.             |
| Help Text       | `help text`       | textarea         | No       | "Anything else we should know about your custom coins?" | `Include additional details here` | maxlength=5000                                             |

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
