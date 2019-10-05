# eweb

Project to test excluding files from electron-webpack and electron-builder

# Summary

This repo has been used to test an issue with electron-builder and for practicing git flow

# Different package files

* **package.json**
  
  Does not exclude any files under the global files declaration, only under the platform declaration

* **package.json.all**

  Excludes files under the global files declaration and the platform declaration

* **package.json.global**

  Only excludes files under the global files declaration and not under the platform declaration

* **package.json.mac**

  Same as `package.json.all`

# Git

Project uses git-flow
