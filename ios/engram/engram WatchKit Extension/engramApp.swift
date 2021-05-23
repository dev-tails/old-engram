//
//  engramApp.swift
//  engram WatchKit Extension
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI

@main
struct engramApp: App {
    let persistenceController = PersistenceController.shared
    
    @SceneBuilder var body: some Scene {
        WindowGroup {
            NavigationView {
                ContentView()
                    .environment(\.managedObjectContext, persistenceController.container.viewContext)
            }
        }

        WKNotificationScene(controller: NotificationController.self, category: "myCategory")
    }
}
