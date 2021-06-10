////
////  ComplicationViews.swift
////  engram WatchKit Extension
////
////  Created by Adam Berg on 2021-05-23.
////
//
//import SwiftUI
//import ClockKit
//
//struct ComplicationViews: View {
//    var body: some View {
//        Text(/*@START_MENU_TOKEN@*/"Hello, World!"/*@END_MENU_TOKEN@*/)
//    }
//}
//
//struct ComplicationViews_Previews: PreviewProvider {
//    static var previews: some View {
//        Group {
//            CLKComplicationTemplateGraphicCircularView(
//                ComplicationViewCircular()
//            ).previewContext()
//            
//            CLKComplicationTemplateGraphicCornerCircularView(
//                ComplicationViewCornerCircular(
//                ).previewContext(faceColor: .red)
//        }
//    }
//}
//
//struct ComplicationViewCircular: View {
//    
//    var body: some View {
//        ZStack {
//            ProgressView(
//                "0.5",
//                value: (1.0 - 0.5),
//                total: 1.0)
//                .progressViewStyle(
//                    CircularProgressViewStyle())
//        }
//    }
//}
//
//struct ComplicationViewCornerCircular: View {
//    var body: some View {
//        // 3
//        ZStack {
//            Circle()
//                .fill(Color.white)
//            Text("eng")
//                .foregroundColor(Color.black)
//            Circle()
//                .fill(Color.blue)
//        }
//    }
//}
