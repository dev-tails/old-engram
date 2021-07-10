//
//  SettingsScreen.swift
//  engram
//
//  Created by Adam Berg on 2021-07-10.
//

import SwiftUI

struct SettingsScreen: View {
    var body: some View {
        VStack {
            Text("Sync")
            Text("Sign up to sync across all devices")
            HStack {
                Button(action: {}) {
                    Text("Sign Up")
                }
                Button(action: {}) {
                    Text("Log in")
                }
            }
        }.navigationTitle(Text("Settings"))
    }
}

struct SettingsScreen_Previews: PreviewProvider {
    static var previews: some View {
        SettingsScreen()
    }
}
