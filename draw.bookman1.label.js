const { readFileSync } = require('fs');
const { createSVGWindow } = require('svgdom');
const window = createSVGWindow();
const document = window.document;
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { SVG_TEXT_TO_PATH_PARAMS, SVG_PATH, COLOR } = require('./constants');

registerWindow(window, document);

async function draw({ buttonText = [], titleText = [], cartridgeCode = '' }) {
    // Create SVG - 1 unit = 1mm
    const canvas = SVG(document.documentElement);
    canvas.viewbox('0 0 52 32');

    // Label bounding box
    canvas
        .path(SVG_PATH.LABEL_BOUNDS)
        .fill('#000').move(1, 1)
        .stroke({ color: '#222', width: 0.25 });

    const STROKE_FN_BUTTON = { color: '#fff', width: 0.15 };

    // Colored function buttons
    const dx = 1 + 2;
    const dy = 1 + 1.5;

    const fnButtons = [
        canvas.group(),
        canvas.group(),
        canvas.group(),
        canvas.group()
    ];

    fnButtons.forEach((b, i) => {
        // Fill
        b
            .path(SVG_PATH.FN_BUTTON)
            .fill(COLOR.FN_BUTTONS[i])
            .move(dx + i * 12, dy)
            .stroke(STROKE_FN_BUTTON);

        // Text
        b
            .plain(buttonText[i])
            .font('size', 2.2)
            .font('family', 'BookmanFunctionKey')
            .fill({ color: '#000' })
            .move(dx + i * 12, dy)
            .dmove(5, -0.125)
            .attr({ 'dominant-baseline': 'middle', 'text-anchor': 'middle' });
    });


    // Cartridge Title
    [
        { text: titleText[0] || '', pos: [3, 6], size: 10, color: '#fff', family: 'BookmanCartridgeTitle' },
        { text: titleText[1] || '', pos: [3, 6 + 8.5], size: 10, color: '#fff', family: 'BookmanCartridgeTitle' },
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
        .move(2.5, 27.25);

    // Additional graphic elements
    [
        { svg: 'images/franklin-logo-red.svg', pos: [32.75, 8], width: 20 },
        { svg: 'images/bookman-logo-white.svg', pos: [35.5, 12], width: 13.5 },
        { svg: 'images/bookman-mascot-white.svg', pos: [39, 16.5], width: 6 },
    ].forEach(g => {
        if (!g) return;

        canvas.svg(readFileSync(g.svg).toString());

        canvas.last()
            .size(g.width)
            .move(g.pos[0], g.pos[1]);
    });



    //////////////////////////////
    // 4. Bake text into the SVG as paths so we don't need to include any fonts
    //////////////////////////////
    const { replaceAllInString } = await import('svg-text-to-path')

    return replaceAllInString(canvas.svg(), SVG_TEXT_TO_PATH_PARAMS);
}

module.exports = {
    draw
};