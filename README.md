# CuongNV LiveChat App - API

CuongNV LiveChat App - API is the web API of the LiveChat application, designed to power real-time chat functionality in web applications. This API enables seamless communication between the front-end chat interface and the back-end server, facilitating smooth and instant customer-agent interactions. The API is built using modern technologies and offers endpoints for managing chats, users, and more.

## Features

- **Chat Management**: Create, retrieve, update, and delete chat conversations.
- **Customer Management**: Handle customer registration, delete customers.
- **Message Exchange**: Send and receive messages in real-time between customers and agent.
- **Agent Authentication**: Secure agent authentication using tokens for API requests.
- **Notification System**: Receive notifications for new messages and chat requests.
- **Store Integration**: Integrate the customer chat feature into your store effortlessly using provided code snippets.

## How to install

To get started with the CuongNV LiveChat App - API, follow these steps:

1. Set up the server:
  
To begin, you will need a server with an nginx configuration in order to successfully install and run the application. Configure the domain and port of the application you will run in the nginx file

```
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;

    root /var/www/your_application;  # Path to your application's root directory

    location / {
        proxy_pass http://localhost:3000;  # Forward requests to your application's backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```


2. Clone the repository:

```bash
git clone https://github.com/NgoVietCuong/CuongNV-LiveChat-API.git
```


3. Install the required dependencies:

```bash
npm install
```


4. Set up the database

Create a cluster on MongoDB Atlas:

- If you don't have a MongoDB Atlas account, sign up at MongoDB Atlas.
- Create a new cluster and choose the preferred cloud provider, region, and cluster tier.
- Configure the cluster settings, including the cluster name and preferred settings.

Get your MongoDB Atlas connection string:

- After creating the cluster, navigate to the "Clusters" view.
- Click on the "Connect" button for your cluster.
- Choose "Connect your application" and copy the provided connection string.


5. Configure the environment variables:

Rename `.env.example` to `.env` and fill in the necessary environment variables down below.
```bash
# Shopify
SHOPIFY_API_SECRET_KEY='<your_shopify_app_client_secret>'
API_VERSION='<your_shopify_api_version>'
# App
APP_HOST='<your_app_api_domain>'
APP_PORT='<your_app_running_port>'
# Database
MONGO_URI='<your_mongodb_atlas_connection_string>'
# JWT
JWT_ALGORITHM='<jwt_algorithm>'
JWT_SECRET_KEY='<your_key>'
# CMS
CMS_HOST='<your_app_cms_domain>'
# Cloudinary
CLOUD_NAME='<your_cloudinary_cloud_name>'
UPLOAD_PRESET='<your_cloudinary_upload_preset>'
```


6. Run the application:

Intall PM2 in your server, build and run the application with PM2:
```
npm install pm2
npm run build
pm2 start npm --name '<your_process_name>' -- run start 
```