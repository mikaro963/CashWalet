// Per-page scripts for add_funds.html
function copySpecificText() {
    var copyText = document.getElementById("walletAddressInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied: " + copyText.value);
  }

function copyWalletAddress(address) {
    const textarea = document.createElement("textarea");
    textarea.value = address;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert('Copied successfully: ' + address);
  }

  function toggleAddress(button) {
    const next = button.nextElementSibling;
    if (next.classList.contains('hidden')) {
      next.classList.remove('hidden');
    } else {
      next.classList.add('hidden');
    }
  }
  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied: ' + text);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

    function updateForm() {
      const toWallet = document.getElementById('toWallet').value;
      const method = document.getElementById('receiveMethod').value;
      const details = document.getElementById('detailsSection');
      details.innerHTML = '';
      details.classList.add('hidden');

      
  if (toWallet === 'USD' && method === 'Visa / Master') {
    const details = document.getElementById('detailsSection');
    details.innerHTML = `
      <label>Amount</label>
      <input type="number" placeholder="Enter Amount">
      <button style="margin-top: 10px; width: 100%;">Send</button>
    `;
    details.classList.remove('hidden');
    return;
  }

  if (!toWallet || !method) return;
if (toWallet === 'USD' && method === 'Visa / Master') {
    const details = document.getElementById('detailsSection');
    details.innerHTML = `
      <label>Amount</label>
      <input type="number" placeholder="Enter Amount">
      <button style="margin-top: 10px; width: 100%;">Send</button>
    `;
    details.classList.remove('hidden');
    return;
  }
      else if (toWallet === 'USD' && method === 'Visa / Master') {
    const details = document.getElementById('detailsSection');
    details.innerHTML = `
      <label>Amount</label>
      <input type="number" placeholder="Enter Amount">
      <button style="margin-top: 10px; width: 100%;">Send</button>
    `;
    details.classList.remove('hidden');
    return;
  }


      let html = '';

      if (['USD', 'SYP', 'TRY'].includes(toWallet) && method === 'Sham Cash') {
        html = `
          <label>Amount</label>
          <input type="number" placeholder="Enter Amount">
          <img src="https://www2.0zz0.com/2025/05/15/08/400262889.jpg" alt="Sham Cash Barcode" style="display: block; margin: 0 auto;" /><input type="text" value="7a4bde679468d8a8a359fad655fba182" id="walletAddressInput" readonly style="width: 100%; margin: 10px 0;"><button onclick="copySpecificText()" style="margin-top:5px; width:100%;">Copy Address</button> 
          
    <div style='margin: 10px 0;'>
      
    </div>
    
        <label>Upload Receipt</label><input type="file" style="width: 100%; margin: 5px 0;"><button style="margin-top: 10px; width: 100%;">Send</button>`;
      } else if (toWallet === 'USDT' && method === 'USDT Wallet') {
        html = `
          <label>Network</label>
          <select id="network" onchange="updateNetwork()">
            <option value="">Select Network</option>
            <option value="BEP20">BEP20</option>
            <option value="TRC20">TRC20</option>
            <option value="ERC20">ERC20</option>
          </select>
          <div id="networkDetails"></div>
        <button style="margin-top: 10px; width: 100%;">Send</button>`;
      } else if (['USD', 'SYP', 'TRY'].includes(toWallet) && method === 'Office Pickup') {
        html = `
          <label>First Name</label><input type="text" placeholder="First Name">
          <label>Last Name</label><input type="text" placeholder="Last Name">
          <label>Phone Number</label><input type="text" placeholder="Phone Number">
          <label>Amount</label><input type="number" placeholder="Enter Amount">
          <label>Upload Receipt</label><input type="file">
        <button style="margin-top: 10px; width: 100%;">Send</button>`;
      }

      details.innerHTML = html;
      details.classList.remove('hidden');
    }

    function updateNetwork() {
      const network = document.getElementById('network').value;
      const networkDetails = document.getElementById('networkDetails');
      let content = '';

      if (network === 'BEP20') {
        content = `
          <label>Amount</label><input type="number" placeholder="Enter Amount">
          <img src="https://www2.0zz0.com/2025/05/15/09/606768335.jpg" alt="BEP20 Barcode" style="display: block; margin: 0 auto;" /><input type="text" value="0xa620c185e1d703b27dcb5916a001ba5716f08fff" id="walletAddressInput" readonly style="width: 100%; margin: 10px 0;"><button onclick="copySpecificText()" style="margin-top:5px; width:100%;">Copy Address</button> 
          
    <div style='margin: 10px 0;'>
      
    </div>
    
          <label>Upload Receipt</label><input type="file">
        `;
      } else if (network === 'TRC20') {
        content = `
          <label>Amount</label><input type="number" placeholder="Enter Amount">
          <img src="https://www2.0zz0.com/2025/05/15/09/567335534.jpg" alt="TRC20 Barcode" style="display: block; margin: 0 auto;" /><input type="text" value="TSiQtpNAE3tHHhZH8X8FHs8v2ecDEE6XJY" id="walletAddressInput" readonly style="width: 100%; margin: 10px 0;"><button onclick="copySpecificText()" style="margin-top:5px; width:100%;">Copy Address</button> 
          
    <div style='margin: 10px 0;'>
      
    </div>
    
          <label>Upload Receipt</label><input type="file">
        `;
      } else if (network === 'ERC20') {
        content = `
          <label>Amount</label><input type="number" placeholder="Enter Amount">
          <img src="https://www2.0zz0.com/2025/05/15/09/501493248.jpg" alt="ERC20 Barcode" style="display: block; margin: 0 auto;" /><input type="text" value="0xc0905629e81e337a903cfbe392848a15f74acd15" id="walletAddressInput" readonly style="width: 100%; margin: 10px 0;"><button onclick="copySpecificText()" style="margin-top:5px; width:100%;">Copy Address</button> 
          
    <div style='margin: 10px 0;'>
      
    </div>
    
          <label>Upload Receipt</label><input type="file">
        `;
      }

      networkDetails.innerHTML = content;
    }

    function copyText(text) {
      navigator.clipboard.writeText(text);
      alert('Copied: ' + text);
    }
