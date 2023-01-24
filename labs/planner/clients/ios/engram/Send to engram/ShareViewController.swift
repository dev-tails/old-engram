//
//  ShareViewController.swift
//  Send to engram
//
//  Created by Adam Berg on 2021-06-21.
//

import UIKit
import Social
import CloudKit

class ShareViewController: SLComposeServiceViewController {

    override func isContentValid() -> Bool {
        // Do validation of contentText and/or NSExtensionContext attachments here
        return true
    }

    override func didSelectPost() {
        
        if let item = extensionContext?.inputItems.first as? NSExtensionItem,
            let itemProvider = item.attachments?.first,
            itemProvider.hasItemConformingToTypeIdentifier("public.url") {
            itemProvider.loadItem(forTypeIdentifier: "public.url", options: nil) { (url, error) in
                if let shareURL = url as? URL {
                    self.addNote(body: String(format: "[%@](%@)", self.contentText!, shareURL.absoluteString))
                }
            }
        } else {
            self.addNote(body: contentText!)
        }
    }

    override func configurationItems() -> [Any]! {
        // To add configuration options via table cells at the bottom of the sheet, return an array of SLComposeSheetConfigurationItem here.
        return []
    }

    
    func addNote(body: String) {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd";
        let dateString = dateFormatter.string(from: Date())
        
        let cdNote = CDNote(context: persistentContainer.viewContext)
        cdNote.id = UUID()
        cdNote.date = dateString
        cdNote.body = body
        cdNote.type = "note"
        
        saveContext()
        
        let note = CDNoteToNote(cdNote: cdNote)
        
        sharedLoginViewModel.login(completion: { error in
            sharedNoteApi.addRemoteNote(note: note, completion: self.handleRemoteNoteAdded)
        })
        
        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }
    
    func handleRemoteNoteAdded(error: Error?, note: Note?) {
    }
    
    func CDNoteToNote(cdNote: CDNote) -> Note {
        return Note(id:cdNote.id, body: cdNote.body, date: cdNote.date, type: cdNote.type, start: cdNote.start)
    }
}
