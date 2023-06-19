# Node JS

Building Node JS application.
The intent is not to install NodeJS on local machine but docker.
The core intent is to work with Solidity (Block Chain). The tutorial I will be following to learn Solidity can be found at [Code a Web 3.0 Ticketmaster Clone Step-By-Step with Solidity, Ethers.js, React & Hardhat](https://www.youtube.com/watch?v=_H9Qppf13GI&t=2271s).


Before getting started, download the latest [Docker Desktop](https://www.docker.com/products/docker-desktop/) and install it.

## Using Dockerfile
Follow the each steps below:

Pulling the Node image. Enter `docker pull node:latest`. I will be using `node:19-bullseye` based upon the Docker tutorial page reference below.


### Dockerfile

Create a file in your local directory - `Dockerfile` and past the below code in the file.

```
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
```

**Build your image**

The command ends with a dot(.) representing the `Dockerfile` is local/current directory. The following only builds your image but does not run the container

```
docker build -t my-nodejs-app .
```

**Run your container**

To run the build image execute the following command. Basically, it may not be required with the code we have

```
docker run -it --rm --name my-running-app my-nodejs-app
```

**Fix your Hardhat code**

You may get the following error if you try to run `npx hardhat test` or terminal may ask you to install hardhat.

> You are using a version of Node.js that is not supported, and it may work incorrectly, or not work at all.*

Before doing anything just run the following command.

```
# npm install --save-dev hardhat
```

**Run your Hardhat test**

```
# npx hardhat test
```

### Docker Compose file
Create a `docker-compose.yml` file locally along side of the `Dockerfile`. Copy past the following in the `docker-compose.yml` file.

```
services:
  ticketmaster:
    #image: "node:latest"
    image: "ticket-master"
    user: "node"
    working_dir: /app/ticketmaster

    volumes:
      - ./ticketmaster:/app/ticketmaster

    #command: npm install --save-dev hardhat && npx hardhat test
    command: npx hardhat test

volumes:
  ticketmaster:
```

**Run the Docker Compose file**

The command to run the image as container use the following

```
docker compose up
```
Since, our `docker-compose.yml` file already include to run our test, the result should be displayed. 


#Useful commands

## NodeJS
**Check Node version**

```
# node -v
```
**Fix issues**
To address all issues (including breaking changes), run:

```
# npm audit fix --force
```

## Hardhat
**Installing Hardhat plugins**

```
# npm install --save-dev hardhat
```
**Installing hardhat in the globally**

```
# npm install --global hardhat
```

**Hardhat version**

```
# npx hardhat --version
```


## Reference
* [How to Use the Node Docker Official Image](https://www.docker.com/blog/how-to-use-the-node-docker-official-image/)

* Final Code [Ticket Master Solidity App](https://github.com/dappuniversity/tokenmaster)

* [Docker Node Modules Permission Denied](https://www.codeconcisely.com/posts/docker-node-modules-permission-denied/)
