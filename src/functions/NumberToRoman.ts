const numberToRoman = (num: number): string => {
    const romanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];
    
    if (num < 1 || num > 15) {
        return '';
    }
    return romanNumbers[num - 1];
}

export default numberToRoman;