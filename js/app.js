function generateFormattedParagraph(itemName, sellPrice, origPrice, availability) {
    // Normalize inputs
    const name = String(itemName ?? '').trim();
    const sell = Number(sellPrice);
    const orig = Number(origPrice);
    const avail = String(availability ?? '').trim();

    // Basic validation with helpful messages
    if (!name) {
        return { ok: false, error: '請輸入商品名稱' };
    }
    if (!Number.isFinite(sell) || !Number.isFinite(orig)) {
        return { ok: false, error: '價格必須為數字' };
    }
    if (orig <= 0) {
        return { ok: false, error: '日幣原價必須大於 0' };
    }

    const priceRatio = Number(sell / orig);
    const ratioText = priceRatio.toFixed(3);
    const status = avail.toLowerCase() === 'yes' ? 'new' : 'used';

    const text =    '【商品名稱】 ' + name + '\n' +
                    '【日幣原價】 ' + orig + ' JPY\n' +
                    //'【賣價】 ' + sell + '\n' +
                    '【換算匯率】 ' + ratioText + '\n' +
                    '【官方管道是否可取得】 ' + avail + '\n';
    return { ok: true, text };
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('item-form');
    const output = document.getElementById('output');

    if (!form) {
        console.error('Missing element: #item-form');
        return;
    }
    if (!output) {
        console.error('Missing element: #output');
        return;
    }

    // Ensure newlines are visible
    output.style.whiteSpace = 'pre-wrap';

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Defensive element checks to surface which element is missing
        const ids = ['item-name', 'sell-price', 'orig-price', 'availability'];
        for (const id of ids) {
            if (!document.getElementById(id)) {
                const msg = 'Internal error: missing form element ' + id;
                console.error(msg);
                output.textContent = msg;
                return;
            }
        }

        const itemName = document.getElementById('item-name').value;
        const sellPrice = parseFloat(document.getElementById('sell-price').value);
        const origPrice = parseFloat(document.getElementById('orig-price').value);
        const availability = document.getElementById('availability').value;

        const result = generateFormattedParagraph(itemName, sellPrice, origPrice, availability);
        if (!result.ok) {
            output.textContent = result.error;
            return;
        }

        output.textContent = result.text;
    });
});
