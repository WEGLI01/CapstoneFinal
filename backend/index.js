const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // Parse form data from API Gateway
        const body = JSON.parse(event.body);
        const { customerId, item, deliveryInstructions, quantity, deliverySlot } = body;

        // Generate unique OrderID using UUID
        const orderId = uuidv4();

        // Prepare DynamoDB item
        const params = {
            TableName: 'Orders',
            Item: {
                OrderID: orderId,
                CustomerID: customerId,
                Item: item,
                DeliveryInstructions: deliveryInstructions || '',
                Quantity: parseInt(quantity),
                DeliverySlot: deliverySlot
            }
        };

        // Store in DynamoDB
        await dynamoDB.put(params).promise();

        // Return success response
        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ message: 'Order submitted successfully', orderId })
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