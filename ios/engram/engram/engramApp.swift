//
//  engramApp.swift
//  engram
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI

@main
struct engramApp: App {
    let persistenceController = PersistenceController.shared
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
