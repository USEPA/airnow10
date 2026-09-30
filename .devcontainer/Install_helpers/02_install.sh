## After ssh key is set up and added to Pantheon, this script install the AirNow website ccw 2026-02-24
cd /workspaces/airnow10

GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=accept-new' git clone ssh://codeserver.dev.837626a4-a2b8-4cf4-bf00-f3e776b805cd@codeserver.dev.837626a4-a2b8-4cf4-bf00-f3e776b805cd.drush.in:2222/~/repository.git -b master airnowgov10

sudo apt-get update
sudo apt-get install ddev

echo ''
printf '\033[31m We will use Drupal10\033[0m\n'n
echo ''

cd airnowgov10
ddev config --project-name=airnowgov10 \
  --project-type=drupal10 \
  --php-version=8.2 

ddev composer config audit.block-insecure false
ddev composer require drush/drush:^12 --with-all-dependencies

# Make some changes to the config.yaml file cw 2026-03-02
sed -i '/^web_environment: \[\]$/c\web_environment:\
    - TERMINUS_MACHINE_TOKEN=<your_token>\
    -  DDEV_PANTHEON_SITE=airnowgov10\
    -  DDEV_PANTHEON_ENVIRONMENT=dev' /workspaces/airnow10/airnowgov10/.ddev/config.yaml

echo ''
printf 'Now add your \033[31mPantheon\033[0m machine token to the \033[31m/airnowgov10/.ddev/config.yaml\033[0m file on Line 15\n'
echo ''

code /workspaces/airnow10/airnowgov10/.ddev/config.yaml
