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
            Link(destination: URL(string: "https://engramhq.xyz/contact")!, label: {
                HStack {
                    Image(systemName: "exclamationmark.bubble")
                    Text("Send Feedback")
                }
            })
            Link(destination: URL(string: "https://engramhq.xyz/help")!, label: {
                HStack {
                    Image(systemName: "questionmark.circle")
                    Text("Help")
                }
            })
        }.navigationTitle(Text("Settings"))
    }
}

struct SettingsScreen_Previews: PreviewProvider {
    static var previews: some View {
        SettingsScreen()
    }
}
