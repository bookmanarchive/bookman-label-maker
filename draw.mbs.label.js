const { readFileSync } = require('fs');
const { createSVGWindow } = require('svgdom');
const window = createSVGWindow();
const document = window.document;
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { SVG_TEXT_TO_PATH_PARAMS, SVG_PATH, COLOR } = require('./constants');

registerWindow(window, document);

async function draw({ titleText = [], cartridgeCode = '' }) {
    // Create SVG - 1 unit = 1mm
    const canvas = SVG(document.documentElement);
    canvas.viewbox('0 0 52 32');

    // Label bounding box
    canvas
        .path(SVG_PATH.LABEL_BOUNDS)
        .fill('#000').move(1, 1)
        .stroke({ color: '#222', width: 0.25 });

    // Graphic elements
    [
        { svg: 'images/MBS-label-outline.svg', pos: [1, 1.5], width: 50 },
        { svg: 'images/franklin-logo-white.svg', pos: [2, 4], width: 20 },
        { svg: 'images/MBS-logo.svg', pos: [30.5, 25.25], width: 18 },
    ].forEach(g => {
        if (!g) return;

        canvas.svg(readFileSync(g.svg).toString());

        canvas.last()
            .size(g.width)
            .move(g.pos[0], g.pos[1]);
    });
    
    // Cartridge Title
    [
        { text: titleText[0] || '', pos: [4.5, 8], size: 7, color: '#fff', family: 'BookmanCartridgeTitle' },
        { text: titleText[1] || '', pos: [4.5, 8 + 6.5], size: 7, color: '#fff', family: 'BookmanCartridgeTitle' },
    ].forEach(t => {
        if (!t) return;

        const text = canvas
            .plain(t.text)
            .font('size', t.size)
            .font('family', t.family)
            .fill(t.color);

        if (t.attrs) text.attr(t.attrs);

        text.move(t.pos[0], t.pos[1]);
    });

    // Cartidge code
    canvas
        .plain(cartridgeCode)
        .font('size', 1.8)
        .font('family', 'BookmanCartridgeCode')
        .fill('#fff')
        .move(37, 3.5);

    



    //////////////////////////////
    // 4. Bake text into the SVG as paths so we don't need to include any fonts
    //////////////////////////////
    const { replaceAllInString } = await import('svg-text-to-path')

    return replaceAllInString(canvas.svg(), SVG_TEXT_TO_PATH_PARAMS);
}

module.exports = {
    draw
};