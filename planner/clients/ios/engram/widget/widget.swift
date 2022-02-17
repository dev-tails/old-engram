//
//  widget.swift
//  widget
//
//  Created by Adam Berg on 2021-07-18.
//

import WidgetKit
import SwiftUI
import Intents
import CoreData

struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), notes: [], configuration: ConfigurationIntent())
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), notes: [], configuration: configuration)
        completion(entry)
    }

    func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        
        let currentDate = Date()
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd";
        let dateString = dateFormatter.string(from: currentDate)
         
        let request: NSFetchRequest<CDNote> = CDNote.fetchRequest()
        request.predicate = NSPredicate(format: "date == %@ AND type == 'task'", dateString)
        request.sortDescriptors = [NSSortDescriptor(keyPath: \CDNote.date, ascending: false)]
        request.fetchLimit = 10

            
        persistentContainer.viewContext.perform {
            do {
                let newCDNotes = try request.execute()
                var newNotes: [Note] = []
                for n in newCDNotes {
                    newNotes.append(CDNoteToNote(cdNote: n))
                }
                
                let entry = SimpleEntry(date: currentDate, notes: newNotes, configuration: configuration)
                entries.append(entry)

                let nextDate = Calendar.current.date(byAdding: .minute, value: 15, to: currentDate)!
                let timeline = Timeline(entries: entries, policy: .after(nextDate))
                completion(timeline)
            } catch {
                print("Unable to Execute Fetch Request, \(error)")
            }
        }
    }
}

func CDNoteToNote(cdNote: CDNote) -> Note {
    return Note(id:cdNote.id, body: cdNote.body, date: cdNote.date, type: cdNote.type, start: cdNote.start)
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let notes: [Note]
    let configuration: ConfigurationIntent
}

struct widgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        VStack {
            ZStack {
                Color(hex: 0x3f51b5)
                Text(entry.date, style: .date).foregroundColor(.white)
            }.frame(height: 32)
            ForEach(entry.notes, id: \.id) { note in
                HStack {
                    if note.type == "task" {
                        Image(systemName: "square")
                    }
                    Text(note.body  ?? "")
                    Spacer()
                }.padding(.horizontal)
                Divider()
            }
        }.frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity, alignment: .topLeading)
    }
}

@main
struct widget: Widget {
    let kind: String = "widget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            widgetEntryView(entry: entry)
        }
        .configurationDisplayName("Tasks")
        .description("Keep track of your tasks on your home screen")
    }
}

struct widget_Previews: PreviewProvider {
    static var previews: some View {
        widgetEntryView(entry: SimpleEntry(date: Date(), notes: [], configuration: ConfigurationIntent()))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}

extension Color {
    init(hex: UInt, alpha: Double = 1) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xff) / 255,
            green: Double((hex >> 08) & 0xff) / 255,
            blue: Double((hex >> 00) & 0xff) / 255,
            opacity: alpha
        )
    }
}
