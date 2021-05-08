package com.example.engram.db.entities

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Note(
    @PrimaryKey val uid: Int,
    @ColumnInfo(name = "body") val body: String?,
)