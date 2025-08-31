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