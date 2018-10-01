JBEI ICE EGF configuration
============================

This is a fork of the standard EGF configuration of ICE on 27/09/2018.

This repo is basically a clone from the ``/docker`` subfolder on the
[Github ICE repo](https://github.com/JBEI/ice.git). It has some small
modifications in ``docker-compose.yml``, an NGINX configuration file,
and more importantly, all the instructions below.

Deployment on a new server
--------------------------

First update the server

```bash
apt update
apt upgrade
```

Install git to download this repository:

```bash
apt install git
git clone ...
cd ice_egf_config
```

Install NGINX, copy this repo's NGINX configuration:

```bash
apt install nginx
cp ./nginx.conf /etc/nginx/nginx.conf
systemctl start nginx
```

Start the ICE docker instance:

```bash
mkdir /backups
apt install docker-compose
docker-compose up
```

Check that everything is ok, press Ctrl + Z to detach the process.

Go to yourdomain.org/ to check that the ICE instance is online.

Change the admin password.

Database backup and restoration
-------------------------------

(Instructions from [there](http://durandom.de/docker/postgres/2016/12/20/pg_dump/))

**To backup the database:**

```bash
docker exec docker_postgres_1 bash -lc 'pg_dump --username iceuser --format custom ice' > /backups/ice_backup.dmp
```

To automate daily backups you can also simply copy this repo's ``ice_backup_cron`` file into the server's ``/etc/cron.daily``:

```bash
cp ice_backup_cron /etc/cron.daily/
cd /etc/cron.daily
chmod +x ice_backup_cron
```

To get the backuped file from another server:

```bash
scp root@ice.genomefoundry.org:/backups/ice_backup.dmp .
```

**To restore the database:**
```bash
docker exec -i docker_postgres_1 pg_restore --dbname=ice --username=iceuser --verbose --clean < /backups/ice_backup.dmp
```


Setting up the logo
-------------------

The simplest way to replace the logo is to overwrite the logo in the JAVA docker
instance of ICE with the logo in this folder:

```bash
docker cp logo.png docker_ice_1:/usr/local/tomcat/webapps/ROOT/img/
```

There is also an NGINX way but it is a tad more complex.


Manually editing the database
------------------------------

In the server, open a terminal session in the postgres container with:

```bash
docker exec -it docker_postgres_1 bash
```

You are now in a Linux terminal session inside the container. To escape back to
your sever's terminal, use (ctrl+P) followed by (ctrl+Q).

In the container terminal open postgres with

```
psql --username iceuser --dbname ice
```

You are now in a postgres session which you can escape with ``\q`` (also,
ensure that all your commands end with ``;``).

Use SQL commands to explore or update the database from there, e.g.

```
SELECT * FROM groups
```

Which will display all groups.