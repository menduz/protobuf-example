import { BinaryReader } from "google-protobuf"
import { debugPrint } from "./helpers"

describe("presentation", () => {
  it("deserializes string", () => {
    const reader = new BinaryReader(Uint8Array.from([10, 5, 72, 101, 108, 108, 111]))
    debugPrint(reader)
    expect(reader.nextField()).toEqual(true)
    expect(reader.getWireType()).toEqual(2)
    expect(reader.getFieldNumber()).toEqual(1)
    expect(reader.readString()).toEqual('Hello')
  })
})
