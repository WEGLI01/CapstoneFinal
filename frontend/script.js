document.getElementById('order-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const responseEl = document.getElementById('response');
    responseEl.textContent = 'Order submission not yet connected to API.';
});