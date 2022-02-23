# ubuntu-ssh-enabled

NOTE: THIS IMAGE IS TO BE USED FOR TEST AND LEARNIGN PURPOSES ONLY! NOT TO BE USED IN A PRODUCTION ENVIRONMENT!

SSH Enabled Ubuntu Image for Test and Dev purposes ONLY!

## Use:
Build Dockerfile as 

```docker build -t ubuntu-ssh .```

Run the container:

```docker run -d ubuntu-ssh```

Identify the Internal IP

```docker inspect <container-id-name>```

SSH

```ssh <container-ip>```

**Username:** root

**Password:** Passw0rd

Based on : https://docs.docker.com/engine/examples/running_ssh_service/
