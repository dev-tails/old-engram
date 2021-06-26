//
//  CKDailyViewModel.swift
//  engram
//
//  Created by Adam Berg on 2021-06-25.
//

import Foundation
import CloudKit

let sharedCKDailyViewModel = CKDailyViewModel()


class CKDailyViewModel: ObservableObject {
    @Published var notes: [Note] = []
    @Published var typeFilter: String = "all"
    @Published var date: Date = Date()
    
    
    let container = CKContainer.default()
    let db: CKDatabase
    
    init() {
        db = container.privateCloudDatabase
        
        fetchNotesForDate(date: date)
    }
    
    func setDate(date: Date) {
        self.date = date
        self.fetchNotesForDate(date: date)
    }
    
    func fetchNotesForDate(date: Date) {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd";
        let dateString = dateFormatter.string(from: date)
        
        let query = CKQuery(recordType: "Note",
              predicate: NSPredicate(format: "date == %@", dateString))
        
        var newNotes: [Note] = []
        
        db.perform(query, inZoneWith: nil) { results, error in
            if results != nil {
                for result in results! {
                    newNotes.append(Note(body: result["body"], type: result["type"], start: result["start"], recordId: result.recordID))
                }
                DispatchQueue.main.async {
                    self.notes = newNotes
                }
            }
        }
    }
    
    func addNote(note: Note) {
        let noteRecord = CKRecord(recordType: "note")
        noteRecord["start"] = note.start
        noteRecord["date"] = note.date
        noteRecord["body"] = note.body
        noteRecord["type"] = note.type
        db.save(noteRecord, completionHandler: handleNoteSave)
    }
    
    func saveNote(note: Note) {
        let recordToSave = CKRecord(recordType: "note", recordID: note.recordId!)
        if note.start != nil {
            recordToSave["start"] = note.start
        }
        if note.type != nil {
            recordToSave["type"] = note.type
        }
        
        let modifyRecords = CKModifyRecordsOperation(recordsToSave:[recordToSave], recordIDsToDelete: nil)
        modifyRecords.savePolicy = CKModifyRecordsOperation.RecordSavePolicy.changedKeys
        modifyRecords.qualityOfService = QualityOfService.userInitiated
        modifyRecords.modifyRecordsCompletionBlock = { savedRecords, deletedRecordIDs, error in
            if error == nil {
                for record in savedRecords! {
                    self.handleNoteSave(savedRecord: record, error: nil)
                }
            } else {
                print(error)
            }
        }
        db.add(modifyRecords)
    }
    
    func handleNoteSave(savedRecord: CKRecord?, error: Error?) -> Void {
        if error != nil {
            print(error)
        }
        
        if savedRecord == nil {
            return
        }
        
        DispatchQueue.main.async {
            let savedNote = self.convertCKRecordToNote(record: savedRecord!)
            
            var index = 0
            var foundIndex = -1
            for note in self.notes {
                if note.recordId == savedNote.recordId {
                    foundIndex = index
                    break
                }
                index += 1;
            }
            
            if foundIndex >= 0 {
                if savedNote.type != nil {
                    self.notes[foundIndex].type = savedNote.type
                }
                if savedNote.start != nil {
                    self.notes[foundIndex].start = savedNote.start
                }
                
            } else {
                self.notes.insert(savedNote, at: 0)
            }
        }
    }
    
    func deleteNote(id: CKRecord.ID) {
        self.notes.removeAll(where: { $0.recordId == id })
        db.delete(withRecordID: id, completionHandler: handleDelete)
    }
    
    
    func handleDelete(deletedRecordId: CKRecord.ID?, error: Error?) {
        
    }
    
    func convertCKRecordToNote(record: CKRecord) -> Note {
        return Note(body: record["body"], type: record["type"], start: record["start"], recordId: record.recordID)
    }
}


