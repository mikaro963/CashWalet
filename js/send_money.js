// Per-page scripts for send_money.html
const walletSelect = document.getElementById('walletSelect');
  const methodSelect = document.getElementById('methodSelect');
  const networkSelect = document.getElementById('networkSelect');
  const networkSection = document.getElementById('networkSection');
  const formContainer = document.getElementById('formContainer');

  walletSelect.addEventListener('change', checkSelections);
  methodSelect.addEventListener('change', checkSelections);
  networkSelect.addEventListener('change', showForm);

  function checkSelections() {
    formContainer.innerHTML = '';
    if (walletSelect.value === 'usdt' && methodSelect.value === 'usdt_wallet') {
      networkSection.style.display = 'block';
    } else {
      networkSection.style.display = 'none';
      showForm();
    }
  }

  function showForm() {
    formContainer.innerHTML = '';
    if (walletSelect.value === 'usdt' && methodSelect.value === 'usdt_wallet' && networkSelect.value) {
      formContainer.innerHTML = `
        <input type="text" placeholder="Wallet Address (${networkSelect.value})" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Amount" style="width: 100%; margin-bottom: 10px;" />
        <button style="width: 100%;">Send</button>
      `;
    } else if (['usd', 'syp', 'try'].includes(walletSelect.value) && methodSelect.value === 'sham_cash') {
      formContainer.innerHTML = `
        <input type="text" placeholder="First Name" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Last Name" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Phone Number" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Wallet Address" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Amount" style="width: 100%; margin-bottom: 10px;" />
        <button style="width: 100%;">Send</button>
      `;
    } else if (['usd', 'syp', 'try', 'usdt'].includes(walletSelect.value) && methodSelect.value === 'account_id') {
      formContainer.innerHTML = `
        <input type="text" placeholder="First Name" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Last Name" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Phone Number" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Account ID" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Amount" style="width: 100%; margin-bottom: 10px;" />
        <button style="width: 100%;">Send</button>
      `;
    } else if (['usd', 'syp', 'try'].includes(walletSelect.value) && methodSelect.value === 'office_pickup') {
      formContainer.innerHTML = `
        <input type="text" placeholder="First Name" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Last Name" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Phone Number" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Country" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="State / Province" style="width: 100%; margin-bottom: 10px;" />
        <input type="text" placeholder="Amount" style="width: 100%; margin-bottom: 10px;" />
        <button style="width: 100%;">Send</button>
      `;
    }
  }
