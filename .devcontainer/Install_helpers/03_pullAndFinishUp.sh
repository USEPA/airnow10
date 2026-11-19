## After user token is updated, this script will finish setting up the AirNow website cw 2026-03-02
cd /workspaces/airnow10/airnowgov10

ddev start -y

ddev pull pantheon -y
ddev drush cr
ddev composer require drush/drush:^11 --with-all-dependencies
ddev drush cr

## Extra stuff
cd Helpers
yes Y | bash codespace-add_ons.sh

## Install Terminus (Pantheon CLI) cw 2026-10-27
mkdir -p "$HOME/.local/bin"
curl -fsSL https://github.com/pantheon-systems/terminus/releases/latest/download/terminus.phar \
  -o "$HOME/.local/bin/terminus"
chmod +x "$HOME/.local/bin/terminus"
export XDEBUG_MODE=off
"$HOME/.local/bin/terminus" --version

echo '' 
echo ' Installing BitBucket repositories...'
echo ''
echo '  How to Create an API Token...'
echo '    Go to Bitbucket and login with your Atlassian ID. There will be two-factor authentication via @epa.gov email.'
echo '      https://bitbucket.org/epaeis/workspace/overview/'
echo '    Go to the API Tokens page under Secuirty on the Account Settings page'
echo '      https://id.atlassian.com/manage-profile/security/api-tokens'
echo '    Click on "Create API Token with Scopes"'
echo '      Name it and push the date up to one yearinto the future'
echo '    Click "Next"'
echo '    Select "Bitbucket"'
echo '    Click "Next"'
echo '  In the search box type "repository" or "rep"'
echo '    Select "read:repository:bitbucket"'
echo '    Select "write:repository:bitbucket"'
echo '    Click "Next"'
echo '      Review your settings'
echo '    Click "Create token"'
echo '    Click "Copy" to Copy & Save the API Token! You only have one chance to save it.'
echo ''
echo 'Press Enter to continue.'
read -r
bash bitbucket-repo-list.sh

# instal "trash" command for deleting files to the trash instead of permanently deleting them
sudo apt-get install trash-cli
sudo apt --fix-broken install
sudo apt-get install trash-cli
sudo apt-get update

ddev drush cr
echo ''
echo '   Did it work?'
echo ''
ddev drush cr
echo ''
echo '  Are we getting a clean cache rebuild?'
echo ''
