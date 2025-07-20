// Examples:
// - decodeBencode("5:hello") -> "hello"
// - decodeBencode("10:hello12345") -> "hello12345"
function decodeBencode(bencodedValue: string): [string | number | Array<any> | Map<any, any>, number] {
    if (!isNaN(parseInt(bencodedValue[0]))) {
        return decodeBencodeString(bencodedValue);
    } else if (bencodedValue[0] == 'i') {
        return decodeBencodeNumber(bencodedValue);
    } else if (bencodedValue[0] == 'l') {
        return decodeBencodeList(bencodedValue);
    }
    // } else if (bencodedValue[0] == 'd') {
    //     return decodeBencodeDictionary(bencodedValue);
    // } else {
    else {
        throw new Error("Only strings and numbers are supported at this moment.");
    }
}

function decodeBencodeString(bencodedValue: string): [string, number] {
    // Input = "5:hello"
    const firstColonIndex = bencodedValue.indexOf(":"); // 1
    if (firstColonIndex === -1) {
        throw new Error("Invalid encoded value");
    }
    const lenStr = bencodedValue.substring(0, firstColonIndex); // "5"
    const len = parseInt(lenStr); // 5
    // eg "5:hello".subString(1+1, 1+1+5) = "5:hello".substring(2, 7) ==> hello
    return [bencodedValue.substring(firstColonIndex + 1, firstColonIndex + 1 + len), firstColonIndex + 1 + len]; // ["hello", 7]
}

function decodeBencodeNumber(bencodedValue: string): [number, number] {
    // Input = i52e ===> [52, 4]
    const firstEIndex = bencodedValue.indexOf("e"); // 3
    const numberStr = bencodedValue.substring(1, firstEIndex); // "53"
    const ans = parseInt(numberStr); // 53
    return [ans, firstEIndex+1]; // [53, 4]
}

function decodeBencodeList(bencodedValue: string): [Array<any>, number] {
    // Input = "l5:helloi52ee"
    const ans = new Array<any>;
    let index = 1;
    while(bencodedValue[index] != 'e'){
        const [parsedStr, len] = decodeBencode(bencodedValue.substring(index));
        console.log("## Looping Output: " + index + " Parsed: " + parsedStr + " Length: " +  len + "\n");
        ans.push(parsedStr);
        index += len;
    }
    return [ans, index+1];
}

const args = process.argv;
const bencodedValue = args[3];

if (args[2] === "decode") {
    console.error("Logs from your program will appear here!");

    try {
        const decoded = decodeBencode(bencodedValue);
        console.log(decoded);
        console.log(JSON.stringify(decoded));
    } catch (error: any) {
        console.error(error.message);
    }
}
