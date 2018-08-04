function format_currency(price) {
    let priceFormat = price.toLocaleString()
    return `Rp. ${priceFormat}`
}

module.exports = format_currency