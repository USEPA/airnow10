## This script install some helpful aliases for the AirNow project cw 2026-03-04

echo ''
echo 'Adding some helpful aliases to your .bashrc file...'
echo '' 
echo 'alias an="cd /workspaces/airnow10/airnowgov10; pwd; start"' >> ~/.bashrc
echo 'alias alert="notify-send --urgency=low -i \"$( [ $? = 0 ] && echo terminal || echo error )\" \"$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')\""' >> ~/.bashrc
echo 'alias cfl="cf login -a api.fr.cloud.gov --sso"' >> ~/.bashrc
echo 'alias cflc="cf login -a api.fr.cloud.gov --sso-passcode "' >> ~/.bashrc
echo 'alias cy="cd /workspaces/airnow10/airnowgov10; npx cypress run --config-file '\''cypress.config.js'\'' -b chrome --quiet --config baseUrl='\''https://www.airnow.gov'\'' "' >> ~/.bashrc
cat <<'EOF' >> ~/.bashrc
cylast() (
  cd /workspaces/airnow10/airnowgov10 || return
  local spec latest="" base_url="${1:-https://www.airnow.gov}"
  case "$base_url" in
    127|127.0.0.1|127.0.0.1:*|http://127.0.0.1|http://127.0.0.1:*|https://127.0.0.1|https://127.0.0.1:*)
      base_url="http://127.0.0.1:8080" ;;
    http://*|https://*) ;;
    *.*) base_url="https://$base_url" ;;
    *)
      if [[ "$base_url" == *[!a-zA-Z0-9-]* || "$base_url" == -* || "$base_url" == *- ]]; then
        printf 'Invalid preview app name: %s\n' "$base_url" >&2
        return 1
      fi
      base_url="https://preview:Welcome1@${base_url}.app.cloud.gov" ;;
  esac
  for spec in cypress/_Current_specs/*.cy.js; do
    [ -f "$spec" ] || continue
    if [ -z "$latest" ] || [ "$spec" -nt "$latest" ]; then
      latest="$spec"
    fi
  done
  if [ -z "$latest" ]; then
    printf 'No Cypress specs found in cypress/_Current_specs/.\n' >&2
    return 1
  fi
  FORCE_COLOR=1 npx cypress run --config-file cypress.config.js --spec "cypress/_Critical_specs/AirNow Content and Version.cy.js" -b chrome --quiet --config "baseUrl=$base_url" 2> >(sed '/^DevTools listening on ws:\/\//d' >&2)
  FORCE_COLOR=1 npx cypress run --config-file cypress.config.js --spec "$latest" -b chrome --quiet --config "baseUrl=$base_url" 2> >(sed '/^DevTools listening on ws:\/\//d' >&2)
)
alias cy30='while true; do printf "\n=== Cypress run started: "; date -Is; cd /workspaces/airnow10/airnowgov10 && npx cypress run --config-file cypress.config.js -b chrome --quiet --config baseUrl=https://www.airnow.gov; status=$?; printf "=== Cypress run finished (exit %s): " "$status"; date -Is; sleep 1800; done'
EOF
echo 'alias editalias="nano ~/.bashrc"' >> ~/.bashrc
echo 'alias egrep="egrep --color=auto"' >> ~/.bashrc        
echo 'alias fgrep="fgrep --color=auto"' >> ~/.bashrc
echo 'alias grep="grep --color=auto"' >> ~/.bashrc
echo 'alias ka="cd /workspaces/airnow10/airnowgov10/Helpers/keepAlive; pwd; ll; printf '\''\033]0;keepAlive\007'\''; ./listDir.sh"' >> ~/.bashrc
echo 'alias l="ls -CF"' >> ~/.bashrc
echo 'alias la="ls -A"' >> ~/.bashrc
echo 'alias ll="ls -alF"' >> ~/.bashrc
echo 'alias ls="ls --color=auto"' >> ~/.bashrc
echo 'alias rvm-restart="rvm_reload_flag=1 source '\''/usr/local/rvm/scripts/rvm'\''"' >> ~/.bashrc
echo 'alias st="curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python -"' >> ~/.bashrc
echo 'alias start="time /workspaces/airnow10/airnowgov10/Helpers/startUp.sh"' >> ~/.bashrc
echo 'alias wtr="curl wttr.in/Durham,NC?u"' >> ~/.bashrc
echo 'alias wtrh="curl wttr.in/Hampton?u"' >> ~/.bashrc
echo 'alias wtrnb="curl wttr.in/New+Bern?u"' >> ~/.bashrc   
echo ''
echo 'Some helpful aliases have been added to your .bashrc file. You can edit them by running "editalias" or "nano ~/.bashrc".'
echo ''
echo 'Here are some of the aliases you can use:'
echo '  an - Change directory to the airnowgov10 project'
echo '  alert - Send a desktop notification with the last command and its exit status'
echo -e '\033[31m  cfl - Log in to Cloud Foundry with single sign-on\033[0m'
echo '  cflc - Log in to Cloud Foundry with single sign-on and passcode'
echo '  cy - Run Cypress tests for the AirNow website'
echo '  cylast [URL|app|127] - Run the newest Cypress spec; defaults to https://www.airnow.gov'
echo '    app uses HTTPS at app.app.cloud.gov with preview:Welcome1 AUTH; 127 uses http://127.0.0.1:8080'
echo '  cy30 - Run Cypress tests repeatedly, waiting 30 minutes after each run; stop with Ctrl+C'
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