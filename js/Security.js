function togglePass(id, btn){
  const input = document.getElementById(id);
  const openIcon = btn.querySelector('.eye-open');
  const closedIcon = btn.querySelector('.eye-closed');
  if (input.type === 'password'){
    input.type = 'text';
    openIcon.classList.add('hidden');
    closedIcon.classList.remove('hidden');
  } else {
    input.type = 'password';
    closedIcon.classList.add('hidden');
    openIcon.classList.remove('hidden');
  }
}

const newPass = document.getElementById('newPass');
const confirmPass = document.getElementById('confirmPass');
const ruleLength = document.getElementById('rule-length');
const ruleUpper = document.getElementById('rule-upper');
const ruleLower = document.getElementById('rule-lower');
const ruleNumber = document.getElementById('rule-number');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const matchMsg = document.getElementById('matchMsg');
const validationArea = document.getElementById('validationArea');

function checkPassword(pw){
  return {
    length: pw.length >= 8 && pw.length <= 16,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    number: /[0-9]/.test(pw)
  };
}

function updateUI(){
  const pw = newPass.value;
  const c = checkPassword(pw);

  setRule(ruleLength, c.length);
  setRule(ruleUpper, c.upper);
  setRule(ruleLower, c.lower);
  setRule(ruleNumber, c.number);

  let score = 0;
  if (c.length) score++;
  if (c.upper) score++;
  if (c.lower) score++;
  if (c.number) score++;

  const segs = strengthBar.children;
  for (let i = 0; i < 4; i++) segs[i].className = '';
  for (let i = 0; i < score; i++) segs[i].classList.add('s' + (i+1));

  if (score <= 1) strengthText.textContent = 'ضعيف';
  else if (score === 2) strengthText.textContent = 'متوسط';
  else if (score === 3) strengthText.textContent = 'جيد';
  else strengthText.textContent = 'قوي';

  const cv = confirmPass.value;
  if (!cv){
    matchMsg.textContent = '';
    matchMsg.className = 'match';
  } else if (cv === pw){
    matchMsg.textContent = 'كلمتا المرور متطابقتان';
    matchMsg.className = 'match ok';
  } else {
    matchMsg.textContent = 'كلمتا المرور غير متطابقتين';
    matchMsg.className = 'match error';
  }
}

function setRule(el, ok){
  el.classList.toggle('ok', ok);
  el.classList.toggle('error', !ok);
}

newPass.addEventListener('focus', () => {
  validationArea.classList.remove('hidden');
});
confirmPass.addEventListener('focus', () => {
  validationArea.classList.add('hidden');
});

newPass.addEventListener('input', updateUI);
confirmPass.addEventListener('input', updateUI);
updateUI();
