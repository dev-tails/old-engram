//
//  DailyViewModel.swift
//  engram
//
//  Created by Adam Berg on 2021-06-20.
//

import Foundation

class DailyViewModel: ObservableObject {
    @Published var notes: [Note] = []
    @Published var typeFilter: String = "all"
}
