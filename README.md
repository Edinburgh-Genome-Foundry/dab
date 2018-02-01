
<!-- <p align="center">
<img alt="EMMA DB" title="EMMA DB" src="https://github.com/Edinburgh-Genome-Foundry/CUBA/raw/master/frontend/src/assets/images/cuba-title.png" width="400">
</p> -->
<h1 align="center"> EMMA DB </h1>

<!-- [![Build Status](https://travis-ci.org/Edinburgh-Genome-Foundry/CUBA.svg?branch=master)](https://travis-ci.org/Edinburgh-Genome-Foundry/CUBA) -->

This repository contains the source code of [design.emmadb.genomefoundry.org](design.emmadb.genomefoundry.org),
a website of the Edinburgh Genome Foundry enabling anyone to design and order DNA assemblies.

## How is it built ?

This project is based on the [CAB](https://github.com/Edinburgh-Genome-Foundry/CAB)
boilerplate, making it easy to create new apps with a form in the frontend and
custom computations in the backend. It features job
queues (with progress feedback for the user), form widgets like file uploaders,
help buttons, and many more.

CAB only uses techologies that are versatile and fun to work with:

- Python and Django in the backend, to run scientific/computational routines.
- Vue.js in the frontend, one of the easiest frameworks to learn and maintain.
- Docker-compose for deploying your app anywhere in just a few lines.

![docker-organization](https://github.com/Edinburgh-Genome-Foundry/CUBA/blob/master/docs/imgs/plan.png)

This comes with the following advantages:

- Creating a new app is super simple: just add one file in the front end (for
  the input form) and one file in the back-end (the code for computations).
- Full live-reload ! The changes you make to your backend or frontend code
  take effect immediately. No need to refresh a page or restart a server by hand.
- Plenty of easy-to-use library of components to build your user interface without
  headache, using [Element](http://element.eleme.io/#/en-US).
- Works on any nachine: one-line install, one-line deploy. No
  clash with the rest of your system since everything runs inside containers.

## User Guide

Developing with CUBA app requires a good familiarity with Python, Vue, and
base knowlege of Docker and Git.

### Getting started

The next steps will download, install, and launch CUBA on your computer.

1. Install ``docker`` and ``docker-compose`` on your machine. This step depends
   on your machine (Windows, Linux, MacOS) so you'll need to google it.

2. Download CUBA from Github:

```
git clone git+github.com/Edinburgh-Genome-Foundry/CUBA.git
```

3. Go to the root ``CUBA/`` directory (the one containing this README and the
   ``docker-compose.yml``) and launch your application in development mode. The
   first time you try this, Docker will download and build a lot of things,
   which may take several minutes. It will only take a few seconds the next
   times you run this command.

```
docker-compose up
```

4. Go to your browser and type ``localhost`` or ``127.0.0.1`` in the address bar.
   You should see the website appear. the console in which you launched
   ``docker-compose`` will keep printing logs of the different components
   (django, vue) so you can keep track and debug.

### How standards are stored / adding a new standard

### Deploying the website on the web

The next steps will put your website on the web. Note that many other deployment
workflows are possible.

1. Get a hosting server (for instance from Amazon Web Services or Digital Ocean).
   Get the IP address of this server (we'll assume it is ``123.12.123.123``).

2. Log in this server (``ssh root@123.12.123.123``) and install Docker and
   Docker-Compose (some Digital Ocean servers come with these already installed).

3. From your computer, in the CUBA root directory, run the following command to
   create a code repository on the distant server, and register that distant
   repository under the name ``prodserver``

```
./init_remote_git.sh root@123.12.123.123 CUBA prodserver
```

4. On the remote server, in the folder ``CUBA.git``, start the website in
   production mode:

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

5. Wait some time and go in your browser at the address ``123.12.123.123``,
   your website should be live !

Every time you want to update the website, from your computer in the CUBA root
directory run ``git push prodserver master``. You will need to rebuild the
containers on the server if you have modified the frontend or added dependencies
to the backend (we may simplify this later).

Licence
-------

CUBA is an open source software originally written by [Zulko](https://github.com/Zulko)
at the [Edinburgh Genome Foundry](http://genomefoundry.org/) and released on
[Github](https://github.com/Edinburgh-Genome-Foundry/CUBA) under the MIT licence
(¢ Edinburgh Genome Foundry). Everyone is welcome to contribute !

If you publish an app made with CAB, you can licence your own code under any
other licence and copyright, by placing the terms of the licence on top of each
new file you create (this will typically be one file in the frontend and one
file in the backend).
