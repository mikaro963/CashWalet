// Per-page scripts for profile.html
function copyAccountId() {
  const accountIdText = document.getElementById('accountId').textContent.trim();
  const tempInput = document.createElement('input');
  document.body.appendChild(tempInput);
  tempInput.value = accountIdText;
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  const feedback = document.getElementById('copyFeedback');
  feedback.style.display = 'block';
  setTimeout(() => { feedback.style.display = 'none'; }, 2000);
}
