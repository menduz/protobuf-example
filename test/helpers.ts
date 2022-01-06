import { BinaryReader } from "google-protobuf"
import { inspect } from "util"

export function debugPrint(data: any) {
  if (data instanceof BinaryReader) {
    data.reset()
    process.stderr.write(`BinaryReader [\n`)
    while (data.nextField()) {
      if (data.isEndGroup()) {
        break
      }
      const fieldNumber = data.getFieldNumber()
      const wireType = data.getWireType()
      process.stderr.write(`  Got field #${fieldNumber} of type ${wireType}\n`)
      data.skipField()
    }
    process.stderr.write(`]\n`)
    data.reset()
  } else {
    process.stderr.write(inspect(data, false, 100, true) + "\n")
  }
}

export function hexToBytes(hex: string): Uint8Array {
  if (typeof hex != "string") throw new Error("hexToBytes only accept strings, got: " + typeof hex)

  if (hex.substr(0, 2) === "0x") {
    return hexToBytes(hex.substr(2))
  }

  const result = new Uint8Array(Math.ceil(hex.length / 2))

  let i = 0
  for (let char = 0; char < hex.length; char += 2) {
    const n = parseInt(hex.substr(char, 2), 16)
    if (isNaN(n)) throw new Error("Cannot read hex string:" + JSON.stringify(hex))
    result[i] = n
    i++
  }

  return result
}
