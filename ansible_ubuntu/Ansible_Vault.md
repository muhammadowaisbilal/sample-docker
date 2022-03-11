# ubuntu-ssh-enabled

NOTE: THIS IMAGE IS TO BE USED FOR TEST AND LEARNIGN PURPOSES ONLY! NOT TO BE USED IN A PRODUCTION ENVIRONMENT!

SSH Enabled Ubuntu and Ansible

# Ansible Vault

## Create an encrypted file

```ansible-vault create vault.yml```

Insert New Vault password: `12345`

## Encrypt an existing file
```ansible-vault encrypt vault.yml```


A vault ID is an identifier for one or more vault secrets; Ansible supports multiple vault passwords.
Vault IDs provide labels to distinguish between individual vault passwords

The following command is used to create encrypted files with `--vault id`
```ansible-vault create --vault-id password@prompt vault.yml```

## Editing the encrypted file

If the file is encrypted and changes are required, use the edit command.
```ansible-vault edit vault.yml```

## Decrypting a file
The ansible-vault decrypt command is used to decrypt the encrypted file.
```ansible-vault decrypt vault.yml```

## Decrypt a running playbook
To decrypt the playbook while it is running, you usually ask for its password.
```ansible-playbook --ask-vault-pass vault.yml```

## Reset the file password
Use the ansible-vault rekey command to reset the encrypted file password.
```ansible-vault rekey vault_2.yml```
```Vault password:```
```New Vault password:```
```Confirm New Vault password:```
```Rekey successful```

# Using Vault in Playbook

## Secret from HashiCorp Vault

`- hosts: all`
`  gather_facts: false`
`  tasks:`
`    - name: Ensure API key is present in config file`
`      ansible.builtin.lineinfile:`
`        path: /etc/app/configuration.ini`
`        line: "API_KEY={{ lookup('hashi_vault', 'secret=config-secrets/data/app/api-key:data token=s.FOmpGEHjzSdxGixLNi0AkdA7 url=http://localhost:8201')['key'] }}"`

## Ansible Secrets
Ansible provides a no_log parameter for tasks that protects sensitive data:
---

`- hosts: all`
`  gather_facts: false`
`  tasks:`
`    - name: Ensure API key is present in config file`
`      ansible.builtin.lineinfile:`
`        path: /etc/app/configuration.ini`
`        line: "API_KEY={{ api_key }}"`
`      no_log: True`


# Reference
- https://www.redhat.com/sysadmin/introduction-ansible-vault
- https://www.redhat.com/sysadmin/ansible-playbooks-secrets
- https://www.redhat.com/sysadmin/ansible-playbooks-secrets





