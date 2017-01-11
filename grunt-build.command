cd "$(dirname "$0")"
if [ ! -d node_modules ];then
    sudo npm install
fi

if gem list --local | grep bourbon ; then 
  
  echo "bourbon already installed" ; 

  if [ ! -d src/scss/bourbon ];then 
    bourbon install --path src/scss/
  fi

else 
  
  gem install bourbon ; 

  if [ ! -d src/scss/bourbon ];then 
    bourbon install --path src/scss/
  fi

fi

grunt build
