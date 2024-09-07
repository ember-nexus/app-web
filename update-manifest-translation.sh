#!/bin/bash

echo "Updating plugin manifest."

manifest=$(cat ember-nexus-plugin.json)

for file in ./src/Asset/Translation/*.json; do
    language=$(basename "$file" .json)
    translation=$(cat "$file")
    manifest=$(
        echo $manifest |
        jq \
            --arg language "$language" \
            --argjson translation "$translation" \
            '.i18n.[($language)] = {"name": ($translation.name), "description": ($translation.description)}'
    )
done

echo "$manifest" > ember-nexus-plugin.json

echo "Finished."
