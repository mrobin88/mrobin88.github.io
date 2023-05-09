

function Copy() {
    // Copy email to clipboard
    const email = 'ratthewrobin@gmail.com';
    navigator.clipboard.writeText(email);
  
    // Display notification
    const notification = document.createElement('div');
    notification.textContent = 'Email copied!';
    notification.classList.add('notification');
  
    document.body.appendChild(notification);
  
    // Remove notification after 2 seconds
    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
  