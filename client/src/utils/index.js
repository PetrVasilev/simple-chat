export const phoneMasked = (value) => {
    return value
        ? value.match(/^(\+|\+7|7|8)+/g)
            ? value
                  .replace(/^(\+7|7|8)+/g, '+7')
                  .replace(/^(\+7|7|8)+(\d{3})+(\d{3})+(\d{2})+(\d{2})+/g, '$1 ($2) $3 $4 $5')
            : '+7' + value
        : ''
}
