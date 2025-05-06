const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Mock ERP/TMS response
const mockErpTmsResponse = {
    erp: {
        "inventoryStatus": "available",
        "stockLevel": 100
    },
    tms: {
        "deliveryStatus": "confirmed",
        "estimatedDelivery": "2025-05-03"
    }
};

exports.handler = async (event) => {
    try {
        // Check if event.body exists and is a valid string
        if (!event.body || typeof event.body !== 'string') {
            throw new Error('Invalid request: body is missing or not a string');
        }

        // Parse form data from API Gateway
        let body;
        try {
            body = JSON.parse(event.body);
        } catch (parseError) {
            throw new Error('Invalid request: body is not valid JSON');
        }

        // Validate required fields
        const { customerId, item, quantity, deliverySlot } = body;
        if (!customerId || !item || !quantity || !deliverySlot) {
            throw new Error('Missing required fields: customerId, item, quantity, or deliverySlot');
        }

        // Generate unique OrderID using UUID
        const orderId = uuidv4();

        // Prepare DynamoDB item
        const params = {
            TableName: 'Orders',
            Item: {
                OrderID: orderId,
                CustomerID: customerId,
                Item: item,
                DeliveryInstructions: body.deliveryInstructions || '',
                Quantity: parseInt(quantity),
                DeliverySlot: deliverySlot
            }
        };

        // Store in DynamoDB
        await dynamoDB.put(params).promise();

        // Return success response with order details and ERP/TMS data
        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Order submitted successfully',
                orderId,
                customerId,
                item,
                quantity,
                deliverySlot,
                deliveryInstructions: body.deliveryInstructions || '',
                erp: mockErpTmsResponse.erp,
                tms: mockErpTmsResponse.tms
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ message: 'Error submitting order', error: error.message })
        };
    }
};