
export const toCapitalize = (textString: string) => {
    const lower = textString.toLowerCase();
    return textString.charAt(0).toUpperCase() + lower.slice(1);
}