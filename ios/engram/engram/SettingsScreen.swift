//
//  SettingsScreen.swift
//  engram
//
//  Created by Adam Berg on 2021-07-10.
//

import SwiftUI

struct SettingsScreen: View {
    var body: some View {
        List {
            NavigationLink(destination: LoginScreen(), label: {
                Image(systemName: "icloud.and.arrow.up")
                Text("Sync")
            })
        }.navigationTitle(Text("Settings"))
    }
}

struct SettingsScreen_Previews: PreviewProvider {
    static var previews: some View {
        SettingsScreen()
    }
}
