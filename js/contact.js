// Contact form validation with vanilla JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Get form elements
  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  // Error elements
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  // Validation functions
  const validators = {
    name: (value) => {
      if (!value.trim()) {
        return "Name is required";
      }
      if (value.trim().length < 2) {
        return "Name must be at least 2 characters";
      }
      if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        return "Name can only contain letters, spaces, hyphens and apostrophes";
      }
      return "";
    },

    email: (value) => {
      if (!value.trim()) {
        return "Email is required";
      }
      // RFC 5322 compliant email regex
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
      return "";
    },

    subject: (value) => {
      if (!value.trim()) {
        return "Subject is required";
      }
      if (value.trim().length < 3) {
        return "Subject must be at least 3 characters";
      }
      return "";
    },

    message: (value) => {
      if (!value.trim()) {
        return "Message is required";
      }
      if (value.trim().length < 10) {
        return "Message must be at least 10 characters";
      }
      return "";
    },
  };

  // Real-time validation for each field
  nameInput.addEventListener("input", () =>
    validateField(nameInput, nameError, validators.name)
  );
  emailInput.addEventListener("input", () =>
    validateField(emailInput, emailError, validators.email)
  );
  subjectInput.addEventListener("input", () =>
    validateField(subjectInput, subjectError, validators.subject)
  );
  messageInput.addEventListener("input", () =>
    validateField(messageInput, messageError, validators.message)
  );

  // Blur event validation (validate when user leaves the field)
  nameInput.addEventListener("blur", () =>
    validateField(nameInput, nameError, validators.name)
  );
  emailInput.addEventListener("blur", () =>
    validateField(emailInput, emailError, validators.email)
  );
  subjectInput.addEventListener("blur", () =>
    validateField(subjectInput, subjectError, validators.subject)
  );
  messageInput.addEventListener("blur", () =>
    validateField(messageInput, messageError, validators.message)
  );

  // Validate a single field
  function validateField(inputElement, errorElement, validatorFn) {
    const errorMessage = validatorFn(inputElement.value);
    errorElement.textContent = errorMessage;

    if (errorMessage) {
      // Add error class if there's an error
      inputElement.classList.add("error");
      return false;
    } else {
      // Remove error class if validation passes
      inputElement.classList.remove("error");
      return true;
    }
  }

  // Validate all fields at once
  function validateForm() {
    let isValid = true;

    // Validate each field and update isValid if any fail
    isValid = validateField(nameInput, nameError, validators.name) && isValid;
    isValid =
      validateField(emailInput, emailError, validators.email) && isValid;
    isValid =
      validateField(subjectInput, subjectError, validators.subject) && isValid;
    isValid =
      validateField(messageInput, messageError, validators.message) && isValid;

    return isValid;
  }

  // Form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // First clear any existing status message
    formStatus.textContent = "";
    formStatus.className = "form-status";

    console.log("Form submition", formStatus);
    console.log("Form submition", contactForm);

    // Validate all fields
    const isValid = validateForm();

    if (!isValid) {
      // Add shake effect to invalid form
      contactForm.classList.add("shake");

      // Show error status
      formStatus.textContent = "Please fill out all required fields.";
      formStatus.classList.add("error");

      // Remove shake effect after animation completes
      setTimeout(() => {
        contactForm.classList.remove("shake");
      }, 500);

      // Focus on the first field with an error
      if (nameError.textContent) nameInput.focus();
      else if (emailError.textContent) emailInput.focus();
      else if (subjectError.textContent) subjectInput.focus();
      else if (messageError.textContent) messageInput.focus();

      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

    // Simulate form submission (replace with actual AJAX call to your backend)
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success for demo purposes

      if (success) {
        // Show success message
        formStatus.textContent =
          "Message sent successfully! I'll get back to you soon.";
        formStatus.classList.add("success");

        // Submit the form
        contactForm.submit();

        // Reset form
        contactForm.reset();

        // Reset button state after delay
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bx bx-send"></i> Send Message';
        }, 2000);

        // Clear success message after delay
        setTimeout(() => {
          formStatus.classList.remove("success");
          formStatus.textContent = "";
        }, 5000);
      } else {
        // Show error message
        formStatus.textContent =
          "Something went wrong. Please try again later.";
        formStatus.classList.add("error");

        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bx bx-send"></i> Try Again';
      }
    }, 1500);
  });

  // Helper function to debounce events (reduces number of times a function can fire)
  function debounce(func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  // Add debounced input handlers for improved performance on slower devices
  const debouncedInputHandler = debounce(() => {
    // Check if all fields are valid to control button state
    const allFieldsValid = validateForm();

    // Update button state based on form validity
    if (allFieldsValid) {
      submitBtn.disabled = false;
    }
  }, 300);

  // Add debounced handler to all input fields
  const formInputs = [nameInput, emailInput, subjectInput, messageInput];
  formInputs.forEach((input) => {
    input.addEventListener("input", debouncedInputHandler);
  });
});
