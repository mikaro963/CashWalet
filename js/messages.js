// Per-page scripts for messages.html
function toggleDetails(id) {
      var details = document.getElementById('details-' + id);
      
    details.style.display = 'block';
    details.parentElement.style.border = 'none';
    
    }
    function closeDetails(id) {
      var details = document.getElementById('details-' + id);
      
    details.style.display = 'none';
    details.parentElement.style.border = 'none';
    
    }
