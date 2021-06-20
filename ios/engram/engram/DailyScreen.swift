//
//  DailyScreen.swift
//  engram
//
//  Created by Adam Berg on 2021-06-20.
//

import SwiftUI

struct DailyScreen: View {
    @ObservedObject var vm = sharedDailyViewModel
    
    init(type: String) {
        self.vm.typeFilter = type
    }
    
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
        
    }
    
    var body: some View {
        VStack {
            HStack {
                Button(action: handleTodayPressed) {
                    Image(systemName: "calendar")
                        .renderingMode(.template)
                        .foregroundColor(.white)
                        .imageScale(.large)
                }
                Spacer()
                Button(action: navigateDateLeft) {
                    Image(systemName: "arrow.left")
                        .renderingMode(.template)
                        .foregroundColor(.white)
                        .imageScale(.large)
                }
                DatePicker(
                        "",
                        selection: $vm.date,
                        displayedComponents: [.date]
                    ).labelsHidden()
                Button(action: navigateDateRight) {
                    Image(systemName: "arrow.right")
                        .renderingMode(.template)
                        .foregroundColor(.white)
                        .imageScale(.large)
                }
                Spacer()
                Button(action: handleSync) {
                    Image(systemName: "arrow.clockwise.icloud")
                        .renderingMode(.template)
                        .foregroundColor(.white)
                        .imageScale(.large)
                }
            }.padding()
            NoteListView(vm: vm, type: vm.typeFilter)
        }
    }
}

struct DailyScreen_Previews: PreviewProvider {
    static var previews: some View {
        DailyScreen(type: "all")
    }
}
