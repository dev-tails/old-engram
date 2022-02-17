//
//  ContentView.swift
//  engram
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI

struct ContentView: View {
    private var idiom : UIUserInterfaceIdiom { UIDevice.current.userInterfaceIdiom }
    
    var body: some View {
        if idiom == .pad {
            MainView()
        } else {
            NavigationView {
                MainView()
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
