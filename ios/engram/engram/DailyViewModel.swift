//
//  DailyViewModel.swift
//  engram
//
//  Created by Adam Berg on 2021-06-20.
//

import Foundation

struct DecodableNote: Decodable {
    var _id: String?
    var body: String?
    var date: String?
    var type: String?
}

class DailyViewModel: ObservableObject {
    @Published var notes: [Note] = []
    @Published var typeFilter: String = "all"
    @Published var date: Date = Date()
    
    func setDate(date: Date) {
        self.date = date
        self.fetchNotesForDate(date: date)
    }
    
    func fetchNotesForDate(date: Date) {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd";
        let dateString = dateFormatter.string(from: date)
        
        let url = URL(string: String(format: "https://engram.xyzdigital.com/api/notes?date=%@", dateString))!
        var request = URLRequest(url: url)
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Accept")
        let session = URLSession.shared
        let task = session.dataTask(with: request) { (data, response, error) in

            if let error = error {
                print("error")
                print(error)
            } else if let data = data {
                let decoder = JSONDecoder()
                let decodedNotes = try! decoder.decode([DecodableNote].self, from: data)
                
                var newNotes: [Note] = []
                for note in decodedNotes {
                    newNotes.append(Note(_id: note._id, body: note.body, type: note.type))
                }
                
                self.notes = newNotes
                
            } else {
                // Handle unexpected error
            }
        }
        task.resume()
    }
}
