// Per-page scripts for gifts.html
function copyInviteLink() {
      const linkInput = document.getElementById("inviteLink");
      linkInput.select();
      document.execCommand("copy");
      alert("Copied: " + linkInput.value);
    }
