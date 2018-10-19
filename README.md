This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

-This Project is a sampler to demonstrate CI/CD into a docker container.
-The workflow is as follows:
1. Ansible will create a AWS instance with Docker/Nginx production environment.
2. When a push happens on this repository code is automatically sent to production, through Jenkins build process, and deployed to instance
