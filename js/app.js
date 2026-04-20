function generateFormattedParagraph(itemName, buyPrice, sellPrice, isNew) {
    const priceRatio = (sellPrice - buyPrice) / buyPrice * 100;
    const status = isNew ? "new" : "used";
    
    return `The item "${itemName}" is currently available for purchase. It is a ${status} item. The buy price is $${buyPrice.toFixed(2)} and the sell price is $${sellPrice.toFixed(2)}. This represents a price change of ${priceRatio.toFixed(2)}%.`;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('item-form');
    const output = document.getElementById('output');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const itemName = document.getElementById('item-name').value;
        const buyPrice = parseFloat(document.getElementById('buy-price').value);
        const sellPrice = parseFloat(document.getElementById('sell-price').value);
        const isNew = document.getElementById('is-new').checked;

        const formattedParagraph = generateFormattedParagraph(itemName, buyPrice, sellPrice, isNew);
        output.textContent = formattedParagraph;
    });
});