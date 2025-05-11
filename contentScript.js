const blackout = document.createElement('div');
blackout.style.position = 'fixed';
blackout.style.top = '0';
blackout.style.left = '0';
blackout.style.width = '100%';
blackout.style.height = '100%';
blackout.style.backgroundColor = 'black';
blackout.style.zIndex = '2147483647';  // Max z-index possible
blackout.style.pointerEvents = 'auto'; // ACTUALLY block clicks
blackout.style.opacity = '1';
blackout.style.display = 'flex';
blackout.style.justifyContent = 'center';
blackout.style.alignItems = 'center';
blackout.style.flexDirection = 'column';
blackout.style.fontFamily = 'Arial, sans-serif';

const message = document.createElement('div');
message.textContent = 'This company supports Israel in Genocide.';
message.style.color = 'white';
message.style.fontSize = '24px';
message.style.fontWeight = 'bold';
message.style.textAlign = 'center';
message.style.marginBottom = '10px';

const subMessage = document.createElement('div');
subMessage.textContent = 'Access to this site is blocked.';
subMessage.style.color = 'white';
subMessage.style.fontSize = '18px';
subMessage.style.textAlign = 'center';

blackout.appendChild(message);
blackout.appendChild(subMessage);

document.body.innerHTML = ''; // Optional: remove all existing content
document.body.appendChild(blackout);
document.body.style.overflow = 'hidden'; // Disable scrolling

