// Per-page scripts for Security.html
function copySecretKey() {
  const keyField = document.getElementById('secretKeyField');
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
  document.getElementById(id).style.display = "flex";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  var input = document.querySelector('#phoneModal input[type="tel"]');
  if (input) {
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
});


// === NAVBAR / SIDEBAR ===
(function(){
  const menuToggle      = document.getElementById('menuToggle');
  const wideSidebar     = document.getElementById('wideSidebar');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const closeSidebar    = document.getElementById('closeSidebar');
  function openSidebar(){  if(wideSidebar){wideSidebar.style.transform='translateX(0)';} if(sidebarBackdrop){sidebarBackdrop.style.display='block';} }
  function closeSidebarF(){ if(wideSidebar){wideSidebar.style.transform='translateX(-100%)';} if(sidebarBackdrop){sidebarBackdrop.style.display='none';} }
  if(menuToggle) menuToggle.addEventListener('click', openSidebar);
  if(sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebarF);
  if(closeSidebar) closeSidebar.addEventListener('click', closeSidebarF);
})();