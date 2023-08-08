+++
author = "Vasav"
categories = ["devops"]
date = "2023-08-08"
description = "Reverse proxy metabase using nginx"
featuredpath = "date"
linktitle = ""
title = "Use HTTPS with metabase"
type = "post"

+++

To reverse proxy Metabase running on port 3000 with Nginx and enable SSL using your SSL keys on an Ubuntu machine, follow these steps:

1. Install Docker Compose and Nginx:
   Make sure Docker Compose and Nginx are installed on your Ubuntu machine. If not, you can install them using the following commands:

   ```
   # Install Docker Compose
   sudo apt update
   sudo apt install docker-compose

   # Install Nginx
   sudo apt update
   sudo apt install nginx
   ```

2. Obtain SSL Certificates:
   If you have already purchased SSL certificates, you should have received the necessary files like `your_domain.crt` (certificate) and `your_domain.key` (private key). Place these files on your server, for example, in the `/etc/ssl/certs/` and `/etc/ssl/private/` directories, respectively.

3. Configure Docker Compose:
   Ensure that you have a Docker Compose file (usually named `docker-compose.yml`) to run Metabase. If you don't have one, create a file with the appropriate configuration. Make sure your Metabase container is exposed on port 3000.

   For example, your `docker-compose.yml` might look like this:

   ```yaml
   version: '3'

   services:
     metabase:
       image: metabase/metabase
       restart: always
       ports:
         - "3000:3000"
   ```

   Run Metabase using Docker Compose:

   ```
   sudo docker-compose up -d
   ```

4. Configure Nginx:
   Create an Nginx configuration file for Metabase. Create a new file named `metabase.conf` in the `/etc/nginx/sites-available/` directory with the following content:

   ```nginx
   server {
       listen 80;
       server_name your_domain.com;

       location / {
           return 301 https://$host$request_uri;
       }
   }

   server {
       listen 443 ssl;
       server_name your_domain.com;

       ssl_certificate /etc/ssl/certs/your_domain.crt;
       ssl_certificate_key /etc/ssl/private/your_domain.key;

       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   Replace `your_domain.com` with your actual domain name and adjust other settings accordingly.

5. Create a symbolic link:
   Create a symbolic link to the `metabase.conf` file in the `sites-enabled` directory:

   ```
   sudo ln -s /etc/nginx/sites-available/metabase.conf /etc/nginx/sites-enabled/
   ```

6. Test Nginx configuration:
   Check if the Nginx configuration is valid:

   ```
   sudo nginx -t
   ```

   If there are no errors, proceed to the next step.

7. Reload Nginx:
   Reload Nginx to apply the changes:

   ```
   sudo systemctl reload nginx
   ```

8. Adjust firewall settings (if necessary):
   If you have a firewall enabled (e.g., UFW), allow traffic on ports 80 and 443:

   ```
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

Now, Nginx should be proxying requests to Metabase on port 3000 and handling SSL using your SSL certificates. You should be able to access Metabase securely over HTTPS by visiting your domain in a web browser.