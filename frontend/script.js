document.getElementById('order-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const customerId = document.getElementById('customer-id').value;
    const item = document.getElementById('item').value;
    const deliveryInstructions = document.getElementById('delivery-instructions').value;
    const quantity = document.getElementById('quantity').value;
    const deliverySlot = document.getElementById('delivery-slot').value;
    
    const responseEl = document.getElementById('response');
    
    try {
        const response = await fetch('https://fejipopgpe.execute-api.us-east-2.amazonaws.com/prod/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerId,
                item,
                deliveryInstructions,
                quantity,
                deliverySlot
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        // Redirect to confirmation page with order details
        const params = new URLSearchParams({
            orderId: result.orderId,
            customerId: result.customerId,
            item: result.item,
            quantity: result.quantity,
            deliverySlot: result.deliverySlot,
            deliveryInstructions: result.deliveryInstructions
        });
        window.location.href = `/confirmation.html?${params.toString()}`;
    } catch (error) {
        console.error('Fetch error:', error);
        responseEl.textContent = `Error submitting order: ${error.message}. Check console for details.`;
    }
});