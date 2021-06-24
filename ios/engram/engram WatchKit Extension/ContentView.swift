//
//  ContentView.swift
//  engram WatchKit Extension
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI

struct ContentView: View {
    @ObservedObject var vm = sharedLoginViewModel
    
    var body: some View {
        if sharedLoginViewModel.loggedIn {
            DailyView()
        } else {
            LoginView()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
