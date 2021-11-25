//
//  MainView.swift
//  engram
//
//  Created by Adam Berg on 2021-06-23.
//

import SwiftUI

struct MainView: View {
    @State private var tab = 0
    
    var body: some View {
        DailyScreen(type: "all")
        .navigationTitle("engram")
        .toolbar {
            ToolbarItemGroup(placement: .navigationBarLeading, content: {
                NavigationLink(destination: SettingsScreen(), label: {
                    Image(systemName: "line.horizontal.3")
                })
            })
        }
        .navigationBarTitleDisplayMode(.inline)
        .navigationViewStyle(StackNavigationViewStyle())
    }
}

struct MainView_Previews: PreviewProvider {
    static var previews: some View {
        MainView()
    }
}
