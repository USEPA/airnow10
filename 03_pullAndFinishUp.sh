## After user token is updated, this script will finish setting up the AirNow website cw 2026-03-02
cd /workspaces/airnow/airnowgov9

ddev start -y

ddev pull pantheon -y
ddev drush cr
ddev composer require drush/drush:^11 --with-all-dependencies
ddev drush cr

## Extra stuff
cd Helpers
yes Y | bash codespace-add_ons.sh

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