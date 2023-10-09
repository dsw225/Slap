# local deploy script for the web front-end

# This file is responsible for preprocessing all TypeScript files, making sure
# all dependencies are up-to-date, and copying all necessary files into a
# local web deploy directory, and starting a web server

# This is the resource folder we will use as the web root
TARGETFOLDER=./target

# step 1: make sure we have someplace to put everything.  We will delete the
#         old folder, and then make it from scratch
echo "Deleting and recreating $TARGETFOLDER"
rm -rf $TARGETFOLDER
mkdir $TARGETFOLDER

# step 2: update our npm dependencies
echo "Updating node dependencies"
npm update

# step 3: copy static html, css, and JavaScript files
echo "Copying static html, css, and js files"
cp index_simple.html $TARGETFOLDER/index.html
cp todo.js todo.css $TARGETFOLDER
cp -r src $TARGETFOLDER/src
cp app.css $TARGETFOLDER

# step 4: compile TypeScript files
echo "Compiling app.ts"
node_modules/typescript/bin/tsc app.ts --lib "es2015","dom" --target es5 --strict --outFile $TARGETFOLDER/app.js

# step final: launch the server.  Be sure to disable caching
# (Note: we don't currently use -s for silent operation)
echo "Starting local webserver at $TARGETFOLDER"
npx http-server -c-1 $TARGETFOLDER