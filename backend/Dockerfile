FROM arm32v7/node

# Set workdir to /app
WORKDIR /app

# Copy everything except files in dockerignore
COPY . .

# Install dependancies
RUN yarn install

# Expose port 3000
EXPOSE 3000

# Run in productionmode
CMD ["yarn", "start"]
