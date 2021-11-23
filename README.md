# yaml-ci

## Install

    npm i yaml-ci

## Usage

This app lets you pass yaml via a Unix pipe (stdin) and specify a path and tag in a yaml file to output the new tag version. Example with git clone:

    cat db.yaml | node tag stringData.boo 123 > new.yaml

Example with `npx` when installed using `npm i yaml-ci`:

    cat db.yaml | npx yaml-ci stringData.boo 123 > new.yaml

You may also find it helpful to use `tee` if you are working with obtuse tooling:

    cat db.yaml | npx yaml-ci stringData.boo 123 | tee db.yaml

This is useful in gitlab ci when overwriting a file.

This is especially useful with any CI that let's you pass a new tag version. You can pass the new tag version to a container running with git and update the `values.yaml` file in a helm chart to include this tag. This pattern works great for any GitOps architecture and was developed for argocd.

This method lets you control tag or branch indirectly