## This script will install cypress, the headless browser, and Cloud Foundry CLI. cw 2026-10-09
set -e -o pipefail
cd /workspaces/airnow10/airnowgov10

# Install Cypress
sudo apt-get update
sudo apt-get install -y xvfb
npm install cypress --save-dev

# Install Google Chrome for Cypress's --browser chrome (Ubuntu's chromium-browser requires Snap).
chrome_deb=$(mktemp --suffix=.deb)
trap 'rm -f "$chrome_deb"' EXIT
curl -fL https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o "$chrome_deb"
chmod a+r "$chrome_deb"
sudo apt-get install -y "$chrome_deb"
npx cypress info

# Install Cloud Foundry CLI
curl -fsSL https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key \
  | gpg --dearmor \
  | sudo tee /usr/share/keyrings/cloudfoundry-cli.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudfoundry-cli.gpg] https://packages.cloudfoundry.org/debian stable main" \
  | sudo tee /etc/apt/sources.list.d/cloudfoundry-cli.list
sudo apt-get update
sudo apt-get install cf8-cli -y
echo -e "\nCloud Foundry CLI version:"
cf --version
echo -e "\nDone. Done. Done."