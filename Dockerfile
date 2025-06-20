# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package.lock.json files
COPY package*.json ./

# Install dependencies
RUN npm Install

# Copy the rest of the application code
COPY . .

# Generate Database
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Expose the port app runs on
EXPOSE 3000

# start the next.js application
CMD ["npm", "run", "strat"]
