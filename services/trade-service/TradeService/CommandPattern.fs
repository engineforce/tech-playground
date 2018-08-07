namespace TradeService

open System

module CommandPattern = 
    type Document = { Key: string }

    let copy (document: Document) () = 
        document.Key + ": Copy document";

    let paste (document: Document) () = 
        document.Key + ": Paste document";

    let displayMenu (commands) =
        commands |> List.map (fun command -> "Display " + command())

    let run (name: string) = 
        let document2 = { Key = name }
        displayMenu([ copy(document2); paste(document2) ])
