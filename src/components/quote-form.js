/*
Component: quote-form
Webflow attribute: data-component="quote-form"
*/

/**
 * @param {HTMLElement[]} elements - All elements matching [data-component='quote-form']
 */
export default function (elements) {
  elements.forEach((wrapper) => {
    const form = wrapper.querySelector('form')
    if (!form) return

    const steps = [...form.querySelectorAll('[data-quote-form="step"]')]
    const prevBtn = form.querySelector('[data-quote-form="prev"]')
    const nextBtn = form.querySelector('[data-quote-form="next"]')
    const submitBtn = form.querySelector('[data-quote-form="submit"]')
    const progressFill = form.querySelector('[data-quote-form="progress-fill"]')
    const progressText = form.querySelector('[data-quote-form="progress-text"]')
    const totalSteps = steps.length

    let currentStep = 0

    const radioStepFlags = detectRadioSteps(steps)

    // -- Init --

    syncDataNames(form)
    clearHiddenFields(form)
    preventButtonSubmit(prevBtn, nextBtn)
    initStepVisibility(steps)
    updateNav()
    updateProgress()
    updateNextVisibility()
    initFlatpickr(form)
    initFileUploads(form)
    initQuantityToggle(form)
    initPhoneFormatting(form)
    initRadioAutoAdvance()
    initSourceTracking(form)
    initSubmitFeedback(form, submitBtn)

    // -- Navigation --

    prevBtn.addEventListener('click', () => {
      if (currentStep <= 0) return
      goToStep(currentStep - 1)
    })

    nextBtn.addEventListener('click', () => {
      if (currentStep >= totalSteps - 1) return
      if (!radioStepFlags[currentStep] && !validateStep(steps[currentStep]))
        return
      goToStep(currentStep + 1)
    })

    function goToStep(target) {
      if (target === currentStep) return
      steps[currentStep].classList.add('hide')
      steps[target].classList.remove('hide')
      currentStep = target
      updateNav()
      updateProgress()
      updateNextVisibility()
      scrollToTop()
    }

    // -- Step visibility (init) --

    function initStepVisibility(steps) {
      steps.forEach((step, i) => {
        if (i === 0) {
          step.classList.remove('hide')
        } else {
          step.classList.add('hide')
        }
      })
    }

    // -- Nav updates --

    function updateNav() {
      const isFirst = currentStep === 0
      const isLast = currentStep === totalSteps - 1

      prevBtn.closest('.button_container').style.display = isFirst ? 'none' : ''
      submitBtn.closest('.button_container').style.display = isLast
        ? ''
        : 'none'
      nextBtn.closest('.button_container').style.display = isLast ? 'none' : ''
    }

    function updateNextVisibility() {
      if (currentStep >= totalSteps - 1) return
      if (!radioStepFlags[currentStep]) return

      const hasSelection = steps[currentStep].querySelector(
        '.quote-form_radio_input:checked'
      )
      nextBtn.closest('.button_container').style.display = hasSelection
        ? ''
        : 'none'
    }

    // -- Progress --

    function updateProgress() {
      const progress = (currentStep + 1) / totalSteps

      if (progressText) {
        progressText.textContent = `${currentStep + 1}/${totalSteps}`
      }

      if (progressFill) {
        progressFill.style.transform = `scaleX(${progress})`
      }
    }

    // -- Radio auto-advance --

    function initRadioAutoAdvance() {
      steps.forEach((step, i) => {
        if (!radioStepFlags[i]) return
        step.querySelectorAll('.quote-form_radio_input').forEach((radio) => {
          radio.addEventListener('change', () => {
            updateNextVisibility()
            if (i < totalSteps - 1) {
              goToStep(i + 1)
            }
          })
        })
      })
    }
  })
}

// -- Pure helpers --

function detectRadioSteps(steps) {
  return steps.map((step) => {
    const radios = step.querySelectorAll('.quote-form_radio_input')
    if (radios.length === 0) return false
    const otherInputs = step.querySelectorAll(
      'input:not(.quote-form_radio_input):not([type="hidden"]), select, textarea'
    )
    return otherInputs.length === 0
  })
}

function syncDataNames(form) {
  form.querySelectorAll('[name]').forEach((el) => {
    if (!el.dataset.name && el.type !== 'hidden') {
      el.dataset.name = el.name
    }
  })
}

function clearHiddenFields(form) {
  form.querySelectorAll('input[type="hidden"]').forEach((field) => {
    if (field.value === 'undefined') field.value = ''
  })
}

function preventButtonSubmit(prevBtn, nextBtn) {
  if (prevBtn) prevBtn.type = 'button'
  if (nextBtn) nextBtn.type = 'button'
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// -- Validation --

function validateStep(step) {
  const fields = step.querySelectorAll('input, select, textarea')

  fields.forEach((field) => clearFieldError(field))

  let valid = true
  fields.forEach((field) => {
    // Skip Quantity Manual when hidden (validated separately when "Other" is selected)
    if (field.name === 'Quantity Manual' && field.classList.contains('hide'))
      return

    // Readonly fields (Flatpickr) bypass checkValidity, so check manually
    const isRequired = field.hasAttribute('required')
    const isEmpty = isRequired && !field.value.trim()
    const fails = isEmpty || !field.checkValidity()

    if (fails) {
      valid = false
      showFieldError(field)
    }
  })

  return valid
}

function showFieldError(field) {
  field.classList.add('is-error')

  const container = field.parentElement
  if (container.querySelector('.quote-form_error-text')) return

  const msg = document.createElement('div')
  msg.className = 'quote-form_error-text'
  msg.textContent = getErrorMessage(field)
  container.appendChild(msg)

  const clearHandler = () => {
    clearFieldError(field)
    field.removeEventListener('input', clearHandler)
    field.removeEventListener('change', clearHandler)
  }
  field.addEventListener('input', clearHandler)
  field.addEventListener('change', clearHandler)
}

function clearFieldError(field) {
  field.classList.remove('is-error')
  const msg = field.parentElement.querySelector('.quote-form_error-text')
  if (msg) msg.remove()
}

function getErrorMessage(field) {
  if (field.validity.valueMissing || !field.value.trim())
    return 'This field is required'
  if (field.validity.typeMismatch && field.type === 'email')
    return 'Please enter a valid email'
  if (field.validity.typeMismatch) return 'Please enter a valid value'
  if (field.validity.rangeUnderflow) return `Minimum value is ${field.min}`
  return 'Please check this field'
}

// -- Flatpickr --

function initFlatpickr(form) {
  const dateField = form.querySelector('[name="dateneeded"]')
  if (!dateField || !window.flatpickr) return

  const today = new Date()
  let businessDays = 0
  const minDate = new Date(today)
  while (businessDays < 10) {
    minDate.setDate(minDate.getDate() + 1)
    if (minDate.getDay() !== 0 && minDate.getDay() !== 6) businessDays++
  }

  window.flatpickr(dateField, {
    minDate: minDate,
    dateFormat: 'm/d/Y',
  })
}

// -- File uploads --

function initFileUploads(form) {
  const file1 = form.querySelector('#file')
  const file2 = form.querySelector('#file-2')
  const fileWrap2 = form.querySelector('#file-upload-2')
  const fileWrap3 = form.querySelector('#file-upload-3')

  if (!file1 || !fileWrap2 || !fileWrap3) return

  fileWrap2.classList.add('hide')
  fileWrap3.classList.add('hide')

  file1.addEventListener('change', function () {
    if (this.files.length > 0) fileWrap2.classList.remove('hide')
  })

  if (file2) {
    file2.addEventListener('change', function () {
      if (this.files.length > 0) fileWrap3.classList.remove('hide')
    })
  }
}

// -- Quantity toggle --

function initQuantityToggle(form) {
  const dropdown = form.querySelector('[name="quantity"]')
  const manualInput = form.querySelector('[name="Quantity Manual"]')
  if (!dropdown || !manualInput) return

  manualInput.classList.add('hide')

  dropdown.addEventListener('change', () => {
    if (dropdown.value === 'Other') {
      manualInput.classList.remove('hide')
      manualInput.required = true
    } else {
      manualInput.classList.add('hide')
      manualInput.value = ''
      manualInput.required = false
    }
  })
}

// -- Phone formatting --

function initPhoneFormatting(form) {
  const phoneInput = form.querySelector('[name="phone"]')
  if (!phoneInput) return

  phoneInput.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '')

    if (!value) {
      this.value = ''
      return
    }

    if (value.length <= 3) {
      this.value = value.replace(/(\d{0,3})/, '($1)')
    } else if (value.length <= 6) {
      this.value = value.replace(/(\d{0,3})(\d{0,3})/, '($1) $2')
    } else {
      this.value = value
        .replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3')
        .substr(0, 14)
    }
  })
}

// -- Source tracking --

function initSourceTracking(form) {
  const params = new URLSearchParams(window.location.search)
  if (!params.size) return

  form.addEventListener('submit', () => {
    params.forEach((value, key) => {
      const existing = form.querySelector(`[name="${CSS.escape(key)}"]`)
      if (existing) {
        existing.value = value
      } else {
        const field = document.createElement('input')
        field.type = 'hidden'
        field.name = key
        field.value = value
        form.appendChild(field)
      }
    })
  })
}

// -- Submit feedback --

function initSubmitFeedback(form, submitBtn) {
  if (!submitBtn) return
  const submitText = submitBtn.querySelector('div')
  if (!submitText) return

  const originalText = submitText.textContent

  form.addEventListener('submit', () => {
    submitBtn.disabled = true
    submitText.textContent = 'Working on that...'

    setTimeout(() => {
      if (form.offsetParent !== null) {
        submitBtn.disabled = false
        submitText.textContent = originalText
      }
    }, 5000)
  })
}
