function generateFormattedParagraph(itemName, sellPrice, origPrice, availability) {
    const priceRatio = sellPrice / origPrice;

    return '【商品名稱】 ' + itemName + '\n' +
           '【日幣原價】 ' + origPrice + ' JPY\n' +
           '【換算匯率】 ' + (priceRatio).toFixed(2) + '\n' +
           '【官方管道是否可取得】 ' + availability + '\n';
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('item-form');
    const output = document.getElementById('output');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const itemName = document.getElementById('item-name').value;
        const sellPrice = parseFloat(document.getElementById('sell-price').value);
        const origPrice = parseFloat(document.getElementById('orig-price').value);
        const availability = document.getElementById('availability').value;

        const formattedParagraph = generateFormattedParagraph(itemName, sellPrice, origPrice, availability);
        output.textContent = formattedParagraph;
    });
});
