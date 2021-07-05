//
//  CDDailyViewModel.swift
//  engram
//
//  Created by Adam Berg on 2021-07-02.
//

import Foundation
import SwiftUI

let sharedCDDailyViewModel = CDDailyViewModel()

class CDDailyViewModel: ObservableObject {
    @Published var notes: [Note] = []
    @Published var typeFilter: String = "all"
    @Published var date: Date = Date()
    
    func addNote(note: Note) {
        let cdNote = CDNote(context: persistentContainer.viewContext)
        cdNote.body = note.body
        cdNote.type = note.type
        cdNote.start = note.start
        cdNote.date = note.date
        
        notes.insert(note, at: 0)
        saveContext()
    }
}
    
