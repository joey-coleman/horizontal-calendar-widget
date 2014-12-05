#!/usr/bin/swift

//
//  main.swift
//  cmdline-cal-access
//
//  Created by Joey Coleman on 12/11/14.
//  Copyright (c) 2014 Joey Coleman. All rights reserved.
//

import Foundation
import EventKit

// The days we're interested in...
let daysOff = [ "vacation", "holiday", "omsorgsdag", "nytårsdag", "skærtorsdag",
    "langfredag", "2. påskedag", "store bededag", "kristi himmelfartsdag",
    "grundlovsdag", "juleaften", "juledag", "2. juledag", "nytårsaften" ]

// http://stackoverflow.com/a/24102152/753029
// This is a nice trick; also shows a few language quirks/features
extension Array {
    func contains<T where T : Equatable>(obj:T) -> Bool {
        return self.filter({$0 as? T == obj}).count > 0
    }
}

// One assumes we're in the current month, but this needs to be parametrized.
let today = NSDate()
// useful for debugging to set specific dates
//let today = NSDate.dateWithNaturalLanguageString("2014-12-14") as NSDate

// ...grab the month start/end days...
let calendar = NSCalendar.currentCalendar()
let flags : NSCalendarUnit = .CalendarUnitMonth | .CalendarUnitYear
let comps = calendar.components(flags, fromDate: today)
let fromDate = calendar.dateFromComponents(comps)!
comps.month += 1
comps.day    = 0
comps.hour   = 23
comps.minute = 59
let toDate = calendar.dateFromComponents(comps)

// ...and, finally grab Apple's "EventStore" to get at the system calendars.
// Note that we're content to let things fail (un)gracefully if we have no
// access to the system calendars, hence no completion callback.
let store = EKEventStore()
store.requestAccessToEntityType(EKEntityTypeEvent, completion: nil)
let myPred = store.predicateForEventsWithStartDate(fromDate, endDate: toDate, calendars: nil)
let events = store.eventsMatchingPredicate(myPred) as [EKEvent]

// Filter the sequence of events for the month to only consider all day events
// that have a title in the daysOff array; then print their day numbers out to
// stdout.  I'm tempted to stuff this into a JSON array to make empty explicit.
let filtered_events = filter(events) { event in
    return event.allDay && daysOff.contains(event.title.lowercaseString)
}

map(filtered_events) { event in
    println(calendar.components(.CalendarUnitDay, fromDate: event.startDate).day)
}


