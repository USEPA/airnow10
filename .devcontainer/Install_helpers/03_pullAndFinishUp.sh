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
echo ' Copy and paste your BitBucket App password... OR API token...'
echo ''
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
