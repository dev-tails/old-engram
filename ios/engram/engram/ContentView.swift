//
//  ContentView.swift
//  engram
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI

struct ContentView: View {
    
    var body: some View {
//        NavigationView {
            MainView()
//        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView().environment(\.managedObjectContext, PersistenceController.preview.container.viewContext)
    }
}
