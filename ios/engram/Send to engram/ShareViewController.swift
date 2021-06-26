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
        let container = CKContainer(identifier: "iCloud.com.xyzdigital.engram")
        let db: CKDatabase = container.privateCloudDatabase
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd";
        let dateString = dateFormatter.string(from: Date())
        
        let noteRecord = CKRecord(recordType: "note")
        noteRecord["date"] = dateString
        noteRecord["body"] = body
        noteRecord["type"] = "note"
        db.save(noteRecord, completionHandler: handleNoteSaved)
    }

    func handleNoteSaved(record: CKRecord?, error: Error?) {
        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }
}
