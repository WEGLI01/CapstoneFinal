document.getElementById('order-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const customerId = document.getElementById('customer-id').value;
    const item = document.getElementById('item').value;
    const deliveryInstructions = document.getElementById('delivery-instructions').value;
    const quantity = document.getElementById('quantity').value;
    const deliverySlot = document.getElementById('delivery-slot').value;
    
    // Send fetch request to API Gateway without awaiting response
    fetch('https://fejipopgpe.execute-api.us-east-2.amazonaws.com/prod/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            customerId,
            item,
            deliveryInstructions,
            quantity,
            deliverySlot
        })
    }).catch(error => {
        console.error('Fetch error:', error);
        // Do not display error to user, as we're redirecting anyway
    });
    
    // Immediately redirect to confirmation page with form data
    const params = new URLSearchParams({
        customerId,
        item,
        quantity,
        deliverySlot,
        deliveryInstructions: deliveryInstructions || 'None',
        inventoryStatus: 'available', // Mock ERP data
        deliveryStatus: 'confirmed'   // Mock TMS data
    });
    window.location.href = `/confirmation.html?${params.toString()}`;
});