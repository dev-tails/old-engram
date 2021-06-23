//
//  DailyScreen.swift
//  engram
//
//  Created by Adam Berg on 2021-06-20.
//

import SwiftUI

struct DailyScreen: View {
    @ObservedObject var vm = sharedDailyViewModel
    
    var type: String
    
    func navigateDateLeft() {
        let timeInterval = TimeInterval(-24 * 60 * 60)
        vm.setDate(date: Date(timeInterval: timeInterval, since: vm.date))
    }
    
    func navigateDateRight() {
        let timeInterval = TimeInterval(24 * 60 * 60)
        vm.setDate(date: Date(timeInterval: timeInterval, since: vm.date))
    }
    
    func handleTodayPressed() {
        vm.setDate(date: Date())
    }
    
    func handleSync() {
        vm.setDate(date: vm.date)
    }
    
    var body: some View {
        VStack {
            HStack {
                Button(action: handleTodayPressed) {
                    Image(systemName: "calendar")
                        .imageScale(.large)
                }
                Spacer()
                Button(action: navigateDateLeft) {
                    Image(systemName: "arrow.left")
                        .imageScale(.large)
                }
                DatePicker(
                        "",
                        selection: $vm.date,
                        displayedComponents: [.date]
                    ).labelsHidden()
                Button(action: navigateDateRight) {
                    Image(systemName: "arrow.right")
                        .imageScale(.large)
                }
                Spacer()
                Button(action: handleSync) {
                    Image(systemName: "arrow.clockwise.icloud")
                        .imageScale(.large)
                }
            }.padding()
            NoteListView(vm: vm, type: type)
        }
    }
}

struct DailyScreen_Previews: PreviewProvider {
    static var previews: some View {
        DailyScreen(type: "all")
    }
}
