# Processor hosting

Currently they are now processor hosted, but you can easily install a version on any server that fills the processor requirements, follow the processor [installation guide](../server/1_install.md) to see actual processor dependencies.

## Proxy websockets

We recomment to use a websocket proxy between the python app and the client, it allows you to easily setup a secure websocket connexion (wss) with an SSL certificate. This is necessary to use the processor from the client if the client is served under https as github pages.

[Nginx](https://nginx.org/en/) can do this job with a few configuration.

1. Install nginx
2. Install [LetsEncrypt](https://letsencrypt.org/) which provides free ssl certificates. You can follow this [guide](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-18-04).
3. Setup a new nginx site with a reverse proxy configuration that points to the python app. Example :
```conf
server {

  server_name example.test;

  # Proxy
  location /livecoding-processor/ {
    proxy_pass http://localhost:12800/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;
  }

  # SSL configuration
  listen [::]:443 ssl ipv6only=on;
  listen 443 ssl;
  ssl_certificate /etc/letsencrypt/live/ioon.ch/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/ioon.ch/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```
