# Pins Quote Form — 5 Steps

**Form name:** `quoteformpins`
**Redirect:** `/thank-you`
**Steps:** Pin Type → Pin Size → Pin Attachments → Order Details → Contact Details

---

## Step 1: Choose your pin type

- **Heading:** "Choose your pin type"
- **Progress:** 16.66%
- **name:** `Pin Type` | **Type:** radio | **Required:** Yes
- **Auto-advance:** Yes (advances on selection)

| Value               | Display Label    | Image Class   | Tooltip                    |
| ------------------- | ---------------- | ------------- | -------------------------- |
| `reclvBmEcTUMrZ5Ol` | Soft Enamel Pins | `soft-enamel` | Best Value                 |
| `reclUbfvcktNPG4dj` | Hard Enamel Pins | `hard-enamel` | Best Quality               |
| `recDfLM3nIblr4A07` | Die Cast Pins    | `die-cast`    | For Cutout Designs         |
| `recrAN9lwjOga5dlF` | Die Struck Pins  | `die-struck`  | Clean & Professional       |
| `recHvkabZEQkqRope` | Photo Dome Pins  | `photo-dome`  | For Photorealistic Designs |

> **Note:** Values are Airtable record IDs (not human-readable). Keep them exactly as-is — they map to the backend.

---

## Step 2: Choose a Pin Size

- **Heading:** "Choose a Pin Size"
- **Progress:** 33.33%
- **name:** `Size` | **Type:** radio | **Required:** Yes
- **Auto-advance:** Yes
- **Layout:** 4-column grid

| Value        | Display Label | Tooltip                   | Tag         |
| ------------ | ------------- | ------------------------- | ----------- |
| `3/4"`       | 3/4"          | Size of Penny             | —           |
| `1"`         | 1"            | Size of Quarter           | Most Common |
| `1 1/4"`     | 1 1/4"        | Size of Half Dollar       | —           |
| `1 3/8"`     | 1 3/8"        | 1 3/8"                    | —           |
| `1 1/2"`     | 1 1/2"        | Size of Eisenhower Dollar | —           |
| `1 3/4"`     | 1 3/4"        | Size of Golf Ball         | —           |
| `2"`         | 2"            | Size of V8 Can            | —           |
| `Other Size` | Other         | Other Size                | —           |

---

## Step 3: Choose Pin Attachments

- **Heading:** "Choose Pin Attachments"
- **Progress:** 50%
- **name:** `Attachments` | **Type:** radio | **Required:** Yes
- **Auto-advance:** Yes

| Value              | Display Label    | Image Class        | Tooltip           |
| ------------------ | ---------------- | ------------------ | ----------------- |
| `Rubber Clutch`    | Rubber Clutch    | `rubber-clutch`    | Black Rubber      |
| `Butterfly Clutch` | Butterfly Clutch | `butterfly-clutch` | Silver or Gold    |
| `Magnet`           | Magnet           | `magnet`           | Silver or Gold    |
| `Other Attachment` | Other            | `screw-back`       | Screw Back & More |

---

## Step 4: Pin Order Details

- **Progress:** 83.32%

| Field           | name (exact)      | Type             | Required | Label                                                  | Placeholder                       | Notes                                                      |
| --------------- | ----------------- | ---------------- | -------- | ------------------------------------------------------ | --------------------------------- | ---------------------------------------------------------- |
| Quantity        | `quantity`        | select           | Yes      | "How many pins do you need? (minimum 50)"              | `Quantity...`                     | See options below                                          |
| Quantity Manual | `Quantity Manual` | number           | No       | _(none)_                                               | `Type your quantity`              | Hidden by default. Show when "Other" selected. **Min: 50** |
| Date Needed     | `dateneeded`      | text (Flatpickr) | Yes      | "When do you need the pins in hand?"                   | `MM/DD/YYYY`                      | Min = today + 10 business days. Submits as `MM/DD/YYYY`.   |
| File Upload 1   | `File`            | file             | No       | "Do you have a sketch or design of your pin?"          | —                                 | Info: "Max image size 4MB."                                |
| File Upload 2   | `File 2`          | file             | No       | _(none)_                                               | —                                 | Hidden by default. Show after file 1 uploaded.             |
| File Upload 3   | `File 3`          | file             | No       | _(none)_                                               | —                                 | Hidden by default. Show after file 2 uploaded.             |
| Help Text       | `help text`       | textarea         | No       | "Anything else we should know about your custom pins?" | `Include additional details here` | maxlength=5000                                             |

**Quantity dropdown options:**

| Value     | Display     |
| --------- | ----------- |
| _(empty)_ | Quantity... |
| _(empty)_ | Other       |
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

> **BUG in original:** The "Other" option has `value=""` (empty) instead of `value="Other"` like the other 5 forms. This means the "Other" selection doesn't submit a value for the quantity field.

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
