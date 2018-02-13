## Installing Argon2 - Password hashing

To install GCC >= 4.8 on OSX, use homebrew:

        $ brew install gcc

Once you've got GCC installed and ready to run, you then need to install node-gyp, you must do this globally:

        $ npm install -g node-gyp

Finally, once node-gyp is installed and ready to go, you can install this library, specifying the GCC or Clang binary to use:

        $ CXX=g++-6 npm install argon2
