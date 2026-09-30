## This script install some helpful aliases for the AirNow project cw 2026-03-04

echo ''
echo 'Adding some helpful aliases to your .bashrc file...'
echo '' 
echo 'alias an="cd /workspaces/airnow/airnowgov9"' >> ~/.bashrc
echo 'alias alert="notify-send --urgency=low -i \"$( [ $? = 0 ] && echo terminal || echo error )\" \"$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')\""' >> ~/.bashrc
echo 'alias cfl="cf login -a api.fr.cloud.gov --sso"' >> ~/.bashrc
echo 'alias cflc="cf login -a api.fr.cloud.gov --sso-passcode "' >> ~/.bashrc
echo 'alias cy="cd /workspaces/airnow/airnowgov9; npx cypress run --config-file '\''cypress.config.js'\'' -b chrome --config baseUrl='\''https://www.airnow.gov'\'' "' >> ~/.bashrc
echo 'alias editalias="nano ~/.bashrc"' >> ~/.bashrc
echo 'alias egrep="egrep --color=auto"' >> ~/.bashrc        
echo 'alias fgrep="fgrep --color=auto"' >> ~/.bashrc
echo 'alias grep="grep --color=auto"' >> ~/.bashrc
echo 'alias ka="cd /workspaces/airnow/airnowgov9/Helpers/keepAlive; ll; ./listDir.sh"' >> ~/.bashrc
echo 'alias l="ls -CF"' >> ~/.bashrc
echo 'alias la="ls -A"' >> ~/.bashrc
echo 'alias ll="ls -alF"' >> ~/.bashrc
echo 'alias ls="ls --color=auto"' >> ~/.bashrc
echo 'alias rvm-restart="rvm_reload_flag=1 source '\''/usr/local/rvm/scripts/rvm'\''"' >> ~/.bashrc
echo 'alias st="curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python -"' >> ~/.bashrc
echo 'alias start="time /workspaces/airnow/airnowgov9/Helpers/startUp.sh"' >> ~/.bashrc
echo 'alias wtr="curl wttr.in/Durham,NC?u"' >> ~/.bashrc
echo 'alias wtrh="curl wttr.in/Hampton?u"' >> ~/.bashrc
echo 'alias wtrnb="curl wttr.in/New+Bern?u"' >> ~/.bashrc   
echo ''
echo 'Some helpful aliases have been added to your .bashrc file. You can edit them by running "editalias" or "nano ~/.bashrc".'
echo ''
echo 'Here are some of the aliases you can use:'
echo '  an - Change directory to the airnowgov9 project'
echo '  alert - Send a desktop notification with the last command and its exit status'
echo -e '\033[31m  cfl - Log in to Cloud Foundry with single sign-on\033[0m'
echo '  cflc - Log in to Cloud Foundry with single sign-on and passcode'
echo '  cy - Run Cypress tests for the AirNow website'
echo '  editalias - Edit the .bashrc file to add or modify aliases'
echo '  egrep - Search for patterns in files with color highlighting'
echo '  fgrep - Search for fixed strings in files with color highlighting'
echo '  grep - Search for patterns in files with color highlighting'            
echo '  ka - Change directory to the keepAlive folder and list its contents'
echo '  l - List files in the current directory in columns'
echo '  la - List all files in the current directory, including hidden files'
echo '  ll - List all files in the current directory in long format'
echo '  ls - List files in the current directory with color highlighting'
echo '  rvm-restart - Restart RVM to apply changes'
echo '  st - Run a speed test using speedtest-cli'
echo -e '\033[31m  start - Run the startUp.sh script and time its execution\033[0m'
echo '  wtr - Get the weather for Durham, NC from wttr.in'
echo '  wtrh - Get the weather for Hampton from wttr.in'
echo '  wtrnb - Get the weather for New Bern from wttr.in'
echo ''
echo -e 'You can use these aliases to save time and make your workflow more efficient after you \033[31mstart a new terminal session\033[0m.'
echo ''