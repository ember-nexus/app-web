import * as chroma from "chroma-js";

export default function getColorWithHighestContrast(baseColor: string, availableColors: string[]): string
{
    let currentColor: string = '';
    let currentContrast = 0;

    for (let i = 0; i < availableColors.length; i++) {
        const contrast = chroma.contrast(baseColor, availableColors[i]);
        if (contrast > currentContrast) {
            currentContrast = contrast;
            currentColor = availableColors[i];
        }
    }


    return currentColor;
}