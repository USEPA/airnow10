# bash
## Does the required SSH set-up to generate the SSH key for the Pantheon website cw 2026-02-24
cd /workspaces/airnow10
ssh-keygen -t rsa -m PEM -f ~/.ssh/id_rsa -N ""
echo ''
cat ~/.ssh/id_rsa.pub
echo ''
eval `ssh-agent`
echo ''
ssh-add ~/.ssh/id_rsa

echo '' 
echo -e "\033[31mCopy the following SSH key and add it to your Pantheon account:\033[0m"
echo ''
cat ~/.ssh/id_rsa.pub

sensible-browser https://dashboard.pantheon.io/personal-settings/ssh-keys/create
