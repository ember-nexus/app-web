#!/bin/bash

echo "Starting sync."

echo "Uploading terms from English translation file."
updateTermRequest=$(curl -s -X POST https://api.poeditor.com/v2/projects/upload \
     -F api_token="${POEDITOR_API_KEY}" \
     -F id="${POEDITOR_PROJECT_ID}" \
     -F updating="terms" \
     -F language="en" \
     -F sync_terms="1" \
     -F file=@"./src/Asset/Translation/en.json")

echo "Downloading list of available languages."
languagesRequest=$(curl -s -X POST https://api.poeditor.com/v2/languages/list \
     -d api_token="${POEDITOR_API_KEY}" \
     -d id="${POEDITOR_PROJECT_ID}")

echo "Downloading language files for available languages"
for language in $(echo $languagesRequest | jq -r '.result.languages[].code'); do
    echo "Downloading file for language '$language'."
    exportRequest=$(curl -s -X POST https://api.poeditor.com/v2/projects/export \
         -d api_token="${POEDITOR_API_KEY}" \
         -d id="${POEDITOR_PROJECT_ID}" \
         -d language="$language" \
         -d type="i18next" \
         -d fallback_language="en")
    exportUrl=$(echo $exportRequest | jq -r '.result.url')
    curl -s -o "./src/Asset/Translation/${language}.json" "$exportUrl"
    sleep 0.5
done

echo "Finished sync."
