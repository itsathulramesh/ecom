#!/bin/bash

sudo sed -i 's#proxy_pass http://backend_blue;#proxy_pass http://backend_green;#' /etc/nginx/conf.d/app.conf
sudo nginx -t && sudo systemctl reload nginx

echo "Traffic switched to GREEN"