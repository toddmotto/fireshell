@echo off
IF not exist node_modules (npm install)

IF not exist src/scss/bourbon (gem install bourbon && bourbon install --path src/scss/)

grunt
