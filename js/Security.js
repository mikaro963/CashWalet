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
  var el = document.getElementById(id);
  if (el) el.style.display = "flex";
}
function closeModal(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  // Phone input intl-tel-input (existing behavior)
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

  // ===== Password modal logic (new conditions + eye toggles) =====
  var passwordModal = document.getElementById('passwordModal');
  if (!passwordModal) return;

  var currentPasswordInput = document.getElementById('current_password');
  var newPasswordInput     = document.getElementById('new_password');
  var confirmPasswordInput = document.getElementById('new_password_confirmation');

  if (!newPasswordInput || !confirmPasswordInput) return;

  // Eye toggles
  var toggles = passwordModal.querySelectorAll('.password-toggle');
  toggles.forEach(function(btn) {
    var targetId = btn.getAttribute('data-target');
    var inputEl = document.getElementById(targetId);
    if (!inputEl) return;

    var eyeOpen   = btn.querySelector('.eye-open');
    var eyeClosed = btn.querySelector('.eye-closed');

    btn.addEventListener('click', function() {
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

  // Requirements + strength
  var progressContainer = document.getElementById('pw-progress-container');
  var progressBar       = document.getElementById('pw-progress');
  var strengthText      = document.getElementById('pw-strength-text');
  var reqBox            = document.getElementById('pw-requirements');

  var reqLength = document.getElementById('pw-req-length');
  var reqUpper  = document.getElementById('pw-req-upper');
  var reqLower  = document.getElementById('pw-req-lower');
  var reqNumber = document.getElementById('pw-req-number');

  var matchText = document.getElementById('pw-match-text');

  function setReq(li, ok) {
    if (!li) return;
    var icon = li.querySelector('.req-icon');
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
    var pw = newPasswordInput.value || '';
    var checks = checkPassword(pw);

    setReq(reqLength, checks.length);
    setReq(reqUpper,  checks.upper);
    setReq(reqLower,  checks.lower);
    setReq(reqNumber, checks.number);

    var score = 0;
    if (checks.length) score++;
    if (checks.upper)  score++;
    if (checks.lower)  score++;
    if (checks.number) score++;

    if (progressContainer && progressBar) {
      if (!pw) {
        progressContainer.style.display = 'none';
        progressBar.style.width = '0%';
      } else {
        progressContainer.style.display = 'block';
        var percent = (score / 4) * 100;
        progressBar.style.width = percent + '%';

        var color;
        if (score <= 1)      color = '#dc2626';   // Weak
        else if (score === 2) color = '#f59e0b'; // Fair
        else if (score === 3) color = '#eab308'; // Good
        else                  color = '#22c55e'; // Strong

        progressBar.style.backgroundColor = color;
      }
    }

    if (strengthText) {
      if (!pw) {
        strengthText.style.display = 'none';
        strengthText.textContent = '';
      } else {
        strengthText.style.display = 'block';
        if (score <= 1)      strengthText.textContent = 'Weak';
        else if (score === 2) strengthText.textContent = 'Fair';
        else if (score === 3) strengthText.textContent = 'Good';
        else                  strengthText.textContent = 'Strong';
      }
    }

    if (reqBox) {
      reqBox.style.display = pw ? 'block' : 'none';
    }

    updatePasswordMatch();
  }

  function updatePasswordMatch() {
    if (!matchText) return;
    var pw  = newPasswordInput.value || '';
    var cpw = confirmPasswordInput.value || '';

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

  newPasswordInput.addEventListener('focus', function() {
    if (reqBox && newPasswordInput.value) reqBox.style.display = 'block';
    if (progressContainer && newPasswordInput.value) progressContainer.style.display = 'block';
    if (strengthText && newPasswordInput.value) strengthText.style.display = 'block';
  });

  confirmPasswordInput.addEventListener('focus', function() {
    if (reqBox)            reqBox.style.display = 'none';
    if (progressContainer) progressContainer.style.display = 'none';
    if (strengthText)      strengthText.style.display = 'none';
  });

  newPasswordInput.addEventListener('input', updatePasswordStrength);
  confirmPasswordInput.addEventListener('input', updatePasswordMatch);

  updatePasswordStrength();
});
