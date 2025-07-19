// Examples:
// - decodeBencode("5:hello") -> "hello"
// - decodeBencode("10:hello12345") -> "hello12345"
function decodeBencode(bencodedValue: string): any {
    /* This function is used to decode a bencoded string
    The bencoded string is a string that is prefixed by the length of the string
    **/

    // Check if the first character is a digit
    if (bencodedValue[0] === 'i' && bencodedValue[bencodedValue.length - 1] === 'e' && bencodedValue.length > 2) {
        const value = bencodedValue.substring(1, bencodedValue.length - 1)
        if (isNaN(+value)) {
            throw new Error('Invalid value');
        } else {
            return +value;
        }
    } else if (!isNaN(parseInt(bencodedValue[0]))) {
        const firstColonIndex = bencodedValue.indexOf(":");
        if (firstColonIndex === -1) {
            throw new Error("Invalid encoded value");
        }
        return bencodedValue.substring(firstColonIndex + 1);
    } else {
        throw new Error("Only strings are supported at the moment");
    }
}

const args = process.argv;
const bencodedValue = args[3];

if (args[2] === "decode") {
    console.error("Logs from your program will appear here!");

    try {
        const decoded = decodeBencode(bencodedValue);
        console.log(JSON.stringify(decoded));
    } catch (error: any) {
        console.error(error.message);
    }
}
