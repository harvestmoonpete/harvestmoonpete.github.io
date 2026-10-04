const dialog = document.querySelector('#preview');
const frameHost = document.querySelector('#preview-frame');
const title = document.querySelector('#preview-title');
const fullPage = document.querySelector('#preview-open');
let trigger;
for (const button of document.querySelectorAll('[data-preview]')) {
  button.addEventListener('click', () => {
    trigger = button;
    const url = `https://harvestmoonpete.github.io/${button.dataset.preview}/`;
    const frame = document.createElement('iframe');
    frame.title = `${button.dataset.title} interactive demo`;
    frame.src = url;
    frame.referrerPolicy = 'no-referrer';
    title.textContent = button.dataset.title;
    fullPage.href = url;
    frameHost.replaceChildren(frame);
    dialog.showModal();
    document.querySelector('#preview-close').focus();
  });
}
document.querySelector('#preview-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { frameHost.replaceChildren(); trigger?.focus(); });
