// Per-page scripts for dashboard.html
const menuToggle = document.getElementById('menuToggle');
      const wideSidebar = document.getElementById('wideSidebar');
      const sidebarBackdrop = document.getElementById('sidebarBackdrop');
      const closeSidebar = document.getElementById('closeSidebar');

      function openSidebar() {
        wideSidebar.style.transform = 'translateX(0)';
        sidebarBackdrop.style.display = 'block';
      }

      function closeSidebarFunc() {
        wideSidebar.style.transform = 'translateX(-100%)';
        sidebarBackdrop.style.display = 'none';
      }

      menuToggle.addEventListener('click', openSidebar);
      sidebarBackdrop.addEventListener('click', closeSidebarFunc);
      closeSidebar.addEventListener('click', closeSidebarFunc);

function copyAccountId() {
        const accountIdText = document.getElementById('accountId').textContent;
        navigator.clipboard.writeText(accountIdText).then(() => {
          alert('Account ID copied: ' + accountIdText);
        });
      }

document.addEventListener('click', function(event) {
  if (event.target && event.target.classList.contains('copy-account-id-btn')) {
    const accountIdElement = event.target.previousElementSibling;
    const accountIdText = accountIdElement.textContent.trim();
    navigator.clipboard.writeText(accountIdText).then(() => {
      event.target.textContent = 'Copied!';
      setTimeout(() => { event.target.textContent = 'Copy'; }, 2000);
    });
  }
});
