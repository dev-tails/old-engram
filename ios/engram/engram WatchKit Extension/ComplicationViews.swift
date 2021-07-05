//
//  ComplicationViews.swift
//  engram WatchKit Extension
//
//  Created by Adam Berg on 2021-05-23.
//

import SwiftUI
import ClockKit

struct ComplicationViews: View {
    var body: some View {
        Text(/*@START_MENU_TOKEN@*/"Hello, World!"/*@END_MENU_TOKEN@*/)
    }
}

struct ComplicationViews_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            CLKComplicationTemplateGraphicCircularView(
                ComplicationViewCircular()
            ).previewContext()
        }
    }
}

struct ComplicationViewCircular: View {
    
    var body: some View {
        Text("-")
    }
}
