# Step 1: Build the Angular application
FROM node:14 AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source files and build the app
COPY . .
RUN npm run build --prod

# Step 2: Serve the built app using Nginx
FROM nginx:alpine

# Copy the build output from the previous step to the Nginx server
COPY --from=build /app/dist/<your-app-name> /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
