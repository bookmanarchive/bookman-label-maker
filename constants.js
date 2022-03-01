const FONTMAP = {
    'BookmanCartridgeTitle': 'fonts/Univers_LT_59_Ultra_Condensed.ttf',
    'BookmanFunctionKey': 'fonts/Frutiger_Neue_LT_Black.ttf',
    'BookmanCartridgeCode': 'fonts/FrutigerNeueLT.ttf',
    // 2021-11-29: had to modify the default font
    // 1. Select all glyphs
    // 2. Metrics > Set Width
    // 3. Scale Width By: 115%
    // 4. Select the dash/hyphen glyph
    // 5. Metrics > Set Width
    // 6. Scale Width By: 115%
    // 7. File > Generate Fonts
    //      - TrueType
    //      - Uncheck validate before saving
};

const getMappedFont = style => FONTMAP[style.family] || null;
const SVG_TEXT_TO_PATH_PARAMS = { handlers: [getMappedFont] };

const SVG_PATH = {
    LABEL_BOUNDS : 'M 0 1.5 C 0 0.5 0.5 0 1.5 0 L 48.5 0 C 49.5 0 50 0.5 50 1.5 L 50 28.5 C 50 29.5 49.5 30 48.5 30 L 1.5 30 C 0.5 30 0 29.5 0 28.5 Z',
    FN_BUTTON : 'M 0 0 L 4.2458 0.2301 C 4.66 0.2301 5 0.5523 5 0.954 V 3.0251 C 5 3.4268 4.66 3.749 4.2458 3.749 L 0.1091 4 L -4.2065 3.749 C -4.6206 3.749 -4.9607 3.4268 -4.9607 3.0251 V 0.954 C -4.9607 0.5523 -4.6206 0.2301 -3.5047 0.2301 Z',
};

const COLOR = {
    FN_BUTTONS : [
        '#db0e0b',
        '#00ae9f',
        '#e3c900',
        '#4283b5'
    ],
    MBS: '#00b3ac'
};

module.exports = {
    SVG_TEXT_TO_PATH_PARAMS,
    SVG_PATH,
    COLOR,
};