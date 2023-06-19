# sample-docker

Docker Compose on Windows
- Python
- Checkmk
- Ubuntu (SSH and Ansible)
- Ansible
- Ansible with multiple containers and networking
- Bitnami Wordpress
- Official Wordpress with local working directory
- Dockerization of Solidity Ticket Master tutorial
- Wordpress testwp
- Laravel Ubuntu
- Node JS

## Local Working Directory
To bring your code from container to local working directory use volumes with first parameter point to local directory:
```
    volumes:
      - ./wp_data:/var/www/html
```
