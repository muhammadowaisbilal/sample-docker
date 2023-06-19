#FROM node:19-bullseye
FROM node:18.16.0

# With Node version 15 and higher a WORKDIR needs to be specified else it would try to run the root directory
# Secondly, it is recomended to create the working folder and assign permission to our working user: node
RUN mkdir -p /app/ticketmaster && chown node:node /app/ticketmaster
WORKDIR /app/ticketmaster

# We will be working as user: node
USER node

# Copy all json files including package, package-lock and hardhat
COPY --chown=node:node *.json ./

# Once .json files are copied we can install the packages and depenedencies and be it part of image and no need to re-build the image until required
# Make sure not to install globally else we will have permission issues in docker-compose # RUN npm update -g npm
RUN npm update npm

# We need to install hardhat.json dependencies locally, also that it is dev dependency
RUN npm install --save-dev hardhat

# Assigning permission to node
COPY --chown=node:node . .

#RUN npm audit fix
#RUN npm audit fix --force

# RUN npm prune --production
RUN npm prune --omit=dev