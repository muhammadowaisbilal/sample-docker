# ubuntu-ssh-enabled

NOTE: THIS IMAGE IS TO BE USED FOR TEST AND LEARNING PURPOSES ONLY! NOT TO BE USED IN A PRODUCTION ENVIRONMENT!

SSH Enabled Ubuntu and Ansible

## Use
Pull Ubuntu image

```
docker pull ubuntu
```

Run the Ubuntu container named 'ansible_master' in interactive mode and detach mode to run /bin/bash :

```
docker run -itd --name ansible_master ubuntu /bin/bash
```

**Go into docker created**

When you run the docker attach command, it attaches your current terminal session to the input and output streams of the specified container. This means that you can see the container's console output and interact with its command prompt as if you were directly connected to it.

It's important to note that attaching to a container with docker attach is different from running a new shell session inside the container using docker exec -it. When you attach to a container, you connect to the main process running in the container, typically the process that was specified when the container was created.

To detach from a container without stopping it, you can use the key combination Ctrl + P followed by Ctrl + Q. This detaches your terminal from the container while leaving the container running in the background.

```
docker attach <container-id>
```

Run the Ubuntu container named 'ansible_slave' in interactive mode and detach mode to run /bin/bash :

```
docker run -itd --name ansible_slave ubuntu /bin/bash
```

### Master

Install following
- ```apt-get update```
- ```apt-get install --yes python ansible openssh-client vim iputils-ping```

Generate SSH Key
```ssh-keygen```
Have entered empty as passkey by pressing enter couple of times
Copy ID
```ssh-copy-id root@172.17.0.2```
where 172.17.0.2 is the IP Address of ansible_slave

Add ip to the ansible host
```vim /etc/ansible/hosts```

    [machine]
    172.17.0.2

Testing if ansible is communicating with its slave using ping module(-m)
 ```ansible -m ping 172.17.0.2```

### Slave 

Install following

- ```apt-get update```
- ```apt-get install --yes python ssh vim ```

Set password

```
passwd root
```

I will be using `ansible123`

Permit Root Login

```
vim /etc/ssh/sshd_config
```

Uncommit 

```
# PermitRootLogin prohibit-password
```

to
- ```PermitRootLogin yes```
- ```service ssh restart```
- ```service ssh start```

# Useful commands
- Get ipaddress of networks/container on birdge
    ```docker network inspect bridge```
- Generate ssh key
    ```ssh-keygen```



# Reference
- https://www.youtube.com/watch?v=Sf8urGA-Yhs&ab_channel=RedAakash




