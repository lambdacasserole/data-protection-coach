#!/bin/zsh

# Download JAR if needed.
if [ ! -e metabase.jar ]; 
then
    curl https://downloads.metabase.com/v0.47.8/metabase.jar -o metabase.jar
fi

# Remove all databases.
rm -f metabase.*.db

# Run metabase.
java -jar metabase.jar
