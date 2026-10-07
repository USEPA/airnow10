# Use these scripts to quickly set up AirNow as Drupal 10 in Github codespaces. 
## Respond with the defalut (or Enter key) to the prompts.

0) Install VS Code and the "Remote Explorer" plugin; Sign-in to USEPA Enterprise GitHub
1) Create a new codespace using the Master branch of USEPA/airnow10
2) Find the Power User Scripts in the .devcontainer/Install_helpers/ directory
3) Run 01_sshSetUp.sh
4) Paste the key into the Pantheon dashboard at "Personal Settings >> SSH Keys >> Add New Key >> Your Key" box
5) Run 02_install.sh 
6) Put YOUR Terminus Machine Token on Line 15 of /airnowgov10/.ddev/config.yaml
7) Run 03_pullAndFinishUp.sh
8) You will need your BitBucket username & App Password (or API Token after May 2026) towards the end.
9) Run 04_aliasTricks.sh to get some useful tools for your terminal.

   Good Luck!
