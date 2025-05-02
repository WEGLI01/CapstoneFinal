## Architecture Overview
This document will function as the architecture overview for a cloud-based e-commerce platform for a medium-sized food distributor.
## Components
**Front-End** Static website hosted using Amazon S3 bucket. Potentially using pre-built template found online, and has a product list as well as an order form.
**Back-End** AWS Lambda functions to handle order processing and mock integrations.
**API** Amazon API Gateway connects front-end website form to the back-end Lambda functions using HTTP endpoints.
**Database** Amazon DynamoDB to store order data.
**Storage** Amazon S3 also used to store static images like product images

## AWS Services Configuration
**Amazon S3**
Bucket Name: wesley-ecommerce-capstone
Role: Hosts front-end website and other static images
URL: http://wesley-ecommerce-capstone.s3-website.us-east-2.amazonaws.com
**Amazon DynamoDB**
Table Name: Orders
Role: Stores order data. Partition key name is OrderID, with attributes of CustomerID, Items, and DeliveryOptions
Sample Data: two sample orders (order001 and order002)
**AWS Lambda** 
Role: Order processing and ERP/TMS mock integrations
**Amazon API Gateway**
Role: Links front-end and back-end using HTTP endpoints