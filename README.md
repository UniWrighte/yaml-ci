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


### Possible Issues

If you're running in a low memory environment, the file may be overwritten as it's created. You will get an error like:

    /usr/local/lib/node_modules/yaml-ci/tag.js:21
     if (ref[stop]) {
            ^
    TypeError: Cannot read properties of null (reading 'stringData')

This makes it seem like your in file is missing, but really it's just the file is being overwritten before it's fully read. This happens because `cat` reads the input stream through the whole pipe before storing it in memory. You can fix this by storing the file in a variable first, then reading it out:

    file=$(cat db.yaml) && echo "$file" | npx yaml-ci stringData.boo 4 | tee oof.yaml