cd "$(dirname "$0")"
if [ ! -d node_modules ];then
    sudo npm install
fi

if [ ! -d src/scss/bourbon ];then 
  echo "Searching gem bourbon ..."
  gem install bourbon;
  bourbon install --path src/scss/
fi

grunt
