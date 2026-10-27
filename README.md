# airnow10
Core ddev container fro airnow in drupal 10

## Static sandbox assets

Drupal 10's document root is `airnowgov10/web`. The sandbox helper
`airnowgov10/Helpers/fastSandBox.sh` copies themes from `web/themes` so exported
URLs such as `/themes/custom/anblue/css/DroidSans-webfont.ttf` resolve.
It copies public uploads from `web/sites/default/files`, not site settings.
Spanish compatibility images come from `web/themes/custom/anblue/images`.

After staging and deploying, verify that the font URL returns HTTP 200 with
font data, rather than an HTML 404 page. Updating the helper or local staging
files alone does not update the deployed cloud.gov app.

## Fire_Mode Python setup

The devcontainer includes Python 3.12. After changing the devcontainer
configuration, rebuild the container to apply it.

Once the separate `airnowjson` repository is checked out in this workspace,
install its Fire_Mode dependencies from the workspace root:

```sh
python -m pip install -r airnowjson/Fire_Mode/requirements.txt
```

Use the same Python interpreter to run the smoke alert script:

```sh
python airnowjson/Fire_Mode/updateStatesSmokeAlerts.py
```

Repeat the dependency installation after rebuilding the container. Installation
is explicit because `airnowjson` may not be available when the container is
created. GeoPandas is already included in the requirements; a
`ModuleNotFoundError: No module named 'geopandas'` indicates those requirements
have not been installed for the interpreter running the script.
