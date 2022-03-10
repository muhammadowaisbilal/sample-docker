# ubuntu-ssh-enabled

NOTE: THIS IMAGE IS TO BE USED FOR TEST AND LEARNIGN PURPOSES ONLY! NOT TO BE USED IN A PRODUCTION ENVIRONMENT!

SSH Enabled Ubuntu and Ansible

## Use:
Pull Ubuntu image

```docker pull ubuntu```

Run Ubuntu container named 'ansible_master' in iteractive mode and detach mode to run /bin/bash :

```docker run -itd --name ansible_master ubuntu /bin/bash```

Go into docker created

```docker attach <container-id>```

Run Ubuntu container named 'ansible_slave' in iteractive mode and detach mode to run /bin/bash :

```docker run -itd --name ansible_slave ubuntu /bin/bash```

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

```passwd root```

I wil be using `ansible123`

Permit Root Login

```vim /etc/ssh/sshd_config```

Uncommit 
```#PermitRootLogin prohibit-password```
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




