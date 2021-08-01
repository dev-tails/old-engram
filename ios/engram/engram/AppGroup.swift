// AppGroup.swift
import Foundation

public enum AppGroup: String {
  case engram = "group.engram"

  public var containerURL: URL {
    switch self {
    case .engram:
      return FileManager.default.containerURL(
      forSecurityApplicationGroupIdentifier: self.rawValue)!
    }
  }
}
