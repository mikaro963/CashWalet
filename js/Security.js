// Per-page scripts for Security.html
function copySecretKey() {
  const keyField = document.getElementById('secretKeyField');
  if (!keyField) return;
  keyField.select();
  keyField.setSelectionRange(0, 99999);
  try {
    document.execCommand('copy');
    alert('Secret Key Copied!');
  } catch (err) {
    alert('Failed to copy text.');
  }
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "flex";
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  // === Phone intl-tel-input (كما هو) ===
  var input = document.querySelector('#phoneModal input[type="tel"]');
  if (input && window.intlTelInput) {
    window.intlTelInput(input, {
      initialCountry: "auto",
      geoIpLookup: function(success, failure) {
        fetch('https://ipinfo.io/json?token=YOUR_TOKEN_HERE')
          .then(function(resp) { return resp.json(); })
          .then(function(data) { success(data.country); })
          .catch(function() { success("us"); });
      },
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
  }

  // === Password modal logic (eyes + conditions) ===
  const passwordModal = document.getElementById('passwordModal');
  if (!passwordModal) return;

  const currentPasswordInput  = document.getElementById('current_password');
  const newPasswordInput      = document.getElementById('new_password');
  const confirmPasswordInput  = document.getElementById('new_password_confirmation');

  if (!newPasswordInput || !confirmPasswordInput) return;

  // عيون إظهار / إخفاء
  const toggles = passwordModal.querySelectorAll('.password-toggle');
  toggles.forEach(btn => {
    const targetId = btn.getAttribute('data-target');
    const inputEl  = document.getElementById(targetId);
    if (!inputEl) return;

    const eyeOpen   = btn.querySelector('.eye-open');
    const eyeClosed = btn.querySelector('.eye-closed');

    btn.addEventListener('click', () => {
      if (inputEl.type === 'password') {
        inputEl.type = 'text';
        if (eyeOpen)   eyeOpen.style.display   = 'none';
        if (eyeClosed) eyeClosed.style.display = 'block';
      } else {
        inputEl.type = 'password';
        if (eyeClosed) eyeClosed.style.display = 'none';
        if (eyeOpen)   eyeOpen.style.display   = 'block';
      }
    });
  });

  // عناصر الشروط
  const progressContainer = document.getElementById('pw-progress-container');
  const progressBar       = document.getElementById('pw-progress');
  const strengthText      = document.getElementById('pw-strength-text');
  const reqBox            = document.getElementById('pw-requirements');

  const reqLength = document.getElementById('pw-req-length');
  const reqUpper  = document.getElementById('pw-req-upper');
  const reqLower  = document.getElementById('pw-req-lower');
  const reqNumber = document.getElementById('pw-req-number');

  const matchText = document.getElementById('pw-match-text');

  function setReq(li, ok) {
    if (!li) return;
    const icon = li.querySelector('.req-icon');
    if (icon) icon.textContent = ok ? '✅' : '❌';
    li.style.color = ok ? '#22c55e' : '#dc2626';
  }

  function checkPassword(pw) {
    return {
      length: pw.length >= 8 && pw.length <= 16,
      upper:  /[A-Z]/.test(pw),
      lower:  /[a-z]/.test(pw),
      number: /[0-9]/.test(pw)
    };
  }

  function updatePasswordStrength() {
    const pw = newPasswordInput.value || '';
    const c  = checkPassword(pw);

    setReq(reqLength, c.length);
    setReq(reqUpper,  c.upper);
    setReq(reqLower,  c.lower);
    setReq(reqNumber, c.number);

    let score = 0;
    if (c.length) score++;
    if (c.upper)  score++;
    if (c.lower)  score++;
    if (c.number) score++;

    if (!pw) {
      if (progressContainer) progressContainer.style.display = 'none';
      if (strengthText)      strengthText.style.display      = 'none';
      if (reqBox)            reqBox.style.display            = 'none';
      if (progressBar)       progressBar.style.width         = '0%';
      return;
    }

    if (reqBox)            reqBox.style.display            = 'block';
    if (progressContainer) progressContainer.style.display = 'block';
    if (strengthText)      strengthText.style.display      = 'block';

    if (progressBar) {
      const percent = (score / 4) * 100;
      progressBar.style.width = percent + '%';

      let color;
      if (score <= 1)       color = '#dc2626';  // Weak
      else if (score === 2) color = '#f59e0b'; // Fair
      else if (score === 3) color = '#eab308'; // Good
      else                  color = '#22c55e'; // Strong

      progressBar.style.backgroundColor = color;
    }

    if (strengthText) {
      if (score <= 1)       strengthText.textContent = 'Weak';
      else if (score === 2) strengthText.textContent = 'Fair';
      else if (score === 3) strengthText.textContent = 'Good';
      else                  strengthText.textContent = 'Strong';
    }

    updatePasswordMatch();
  }

  function updatePasswordMatch() {
    if (!matchText) return;
    const pw  = newPasswordInput.value || '';
    const cpw = confirmPasswordInput.value || '';

    if (!cpw) {
      matchText.textContent = '';
      matchText.style.color = '#a0aec0';
      return;
    }

    if (pw === cpw) {
      matchText.textContent = 'Passwords match';
      matchText.style.color = '#22c55e';
    } else {
      matchText.textContent = 'Passwords do not match';
      matchText.style.color = '#dc2626';
    }
  }

  newPasswordInput.addEventListener('input', function () {
    updatePasswordStrength();
  });

  confirmPasswordInput.addEventListener('input', function () {
    updatePasswordMatch();
  });

  newPasswordInput.addEventListener('focus', function () {
    if (reqBox && newPasswordInput.value)            reqBox.style.display            = 'block';
    if (progressContainer && newPasswordInput.value) progressContainer.style.display = 'block';
    if (strengthText && newPasswordInput.value)      strengthText.style.display      = 'block';
  });

  confirmPasswordInput.addEventListener('focus', function () {
    if (reqBox)            reqBox.style.display            = 'none';
    if (progressContainer) progressContainer.style.display = 'none';
    if (strengthText)      strengthText.style.display      = 'none';
  });

  // تشغيل أولي
  updatePasswordStrength();
});
