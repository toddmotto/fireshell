path=`dirname $0`
cd $path
if [ ! -d node_modules ];then
    sudo npm install
fi
grunt build
