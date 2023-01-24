import Foundation
import SwiftUI

struct DecodableNote: Decodable, Encodable {
    var _id: String?
    var localId: String
    var body: String?
    var date: String?
    var type: String?
    var start: String?
}

let sharedNoteApi = NoteApi()

class NoteApi {

    func addRemoteNote(note: Note, completion: @escaping (Error?, Note?) -> ()) {
        if (!sharedLoginViewModel.loggedIn) {
            return
        }
        
        let url = URL(string: "https://engram.xyzdigital.com/api/notes")!
        var request = URLRequest(url: url)
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Accept")
        
        let bodyData = try? JSONSerialization.data(
            withJSONObject: ["localId": note.id.uuidString, "body": note.body, "date": note.date, "type": note.type],
            options: []
        )

        request.httpMethod = "POST"
        request.httpBody = bodyData

        let session = URLSession.shared
        let task = session.dataTask(with: request) { (data, response, error) in

            if let error = error {
                completion(error, nil)
            } else if data != nil {
                let decoder = JSONDecoder()
                let decodedNote = try? decoder.decode(DecodableNote.self, from: data!)
                
                if let note = decodedNote {
                    let newNote = Note(id: UUID(uuidString: note.localId), _id: note._id, body: note.body, type: note.type)
                    
                    completion(nil, newNote)
                }
            } else {
                // Handle unexpected error
            }
        }
        task.resume()
    }

}
