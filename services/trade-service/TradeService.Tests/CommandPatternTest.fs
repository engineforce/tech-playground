module Tests

open System
open Xunit
open TradeService

[<Fact>]
let ``My test`` () =
    let document1 = { CommandPattern.Document.Key = "Document 1" }
    let copy1 = CommandPattern.copy(document1)
    let paste1 = CommandPattern.paste(document1)
    Assert.Equal("Document 1: Copy document", copy1())
    Assert.Equal("Document 1: Paste document", paste1())

    let expected = ["Display Document 2: Copy document"; "Display Document 2: Paste document"]
    let actual = CommandPattern.run("Document 2")
    Assert.Equal<Collections.Generic.IEnumerable<string>>(expected, actual)
