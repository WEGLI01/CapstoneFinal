Capstone Project Test Report
Test Environment

URL: http://capstonefinal-wesley.s3-website.us-east-2.amazonaws.com
API: https://fejipopgpe.execute-api.us-east-2.amazonaws.com/prod/orders
Region: us-east-2
Date: May 06, 2025

Test Scenarios
1. Successful Order Submission

Description: Submit a valid order and verify DynamoDB storage and confirmation page.
Steps:
Access http://capstonefinal-wesley.s3-website.us-east-2.amazonaws.com.
Enter: Customer ID: cust123, Item: beef-tripe, Delivery Instructions: Leave at door, Quantity: 2, Delivery Slot: morning.
Click "Submit Order".


Expected Result:
Redirect to /confirmation.html with details (Customer ID: cust123, Item: beef-tripe, Quantity: 2, Delivery Slot: morning, Delivery Instructions: Leave at door, Inventory Status: available, Delivery Status: confirmed).
Order stored in DynamoDB Orders table.


Actual Result: Redirect to /confirmation.html with details (Customer ID: cust123, Item: beef-tripe, Quantity: 2, Delivery Slot: morning, Delivery Instructions: Leave at door, Inventory Status: available, Delivery Status: confirmed).
Order stored in DynamoDB Orders table.
Status: [Pass]

2. Missing Required Fields

Description: Submit an order with missing fields and verify Lambda error handling.
Steps:
Access the form.
Enter: (omit customer ID), Item: CTC-cereal, Quantity: 1, Delivery Instructions: Hand to customer, Delivery Slot: afternoon.
Click "Submit Order".


Expected Result:
Prevents redirect to /confirmation.html (citing: Missing required fields)
Order not stored in DynamoDB (Lambda rejects invalid input).


Actual Result: Prevents redirect to /confirmation.html (citing: Missing required fields)
Order not stored in DynamoDB (Lambda rejects invalid input).
Status: [Pass]

3. Invalid JSON Payload

Description: Send invalid JSON to API Gateway and verify error handling.
Steps:
Run: Invoke-WebRequest -Method Post -Uri "https://fejipopgpe.execute-api.us-east-2.amazonaws.com/prod/orders" -Headers @{"Content-Type"="application/json"} -Body '{"customerId":"cust789","item":"pork-belly","quantity":"2"}'

Expected Result:
Lambda recognizes invalid JSON, no order submitted to DynamoDB Orders table. 
Error message: {"message":"Error submitting 
order","error":"Missing required fields:
customerId, item, quantity, or deliverySlot"} 


Actual Result: Lambda recognizes invalid JSON, no order submitted to DynamoDB Orders table. 
Error message: {"message":"Error submitting 
order","error":"Missing required fields:
customerId, item, quantity, or deliverySlot"} 
Status: [Pass]

Summary

Total Tests: 3
Passed: 3
Failed: 0
Notes: Tests 1-3 successful, with only successful orders passing through to Orders table. The only missing field that the page will allow(Test 2) is delivery instructions, with all other missing fields met with "Please fill out the required field"