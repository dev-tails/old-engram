//
//  engramApp.swift
//  engram
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI

@main
struct engramApp: App {
    let context = persistentContainer.viewContext
    
    var body: some Scene {
        WindowGroup {
            ContentView().environment(\.managedObjectContext, context)
        }
    }
}
