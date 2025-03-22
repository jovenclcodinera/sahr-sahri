# Step 1: Use an Nginx image to serve the Angular app
FROM nginx:alpine

# Copy the build output from the local machine into the Nginx container
COPY ./dist/sahri-sahri-store /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
