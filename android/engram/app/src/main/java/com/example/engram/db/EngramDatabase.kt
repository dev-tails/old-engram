package com.example.engram.db

import android.content.Context
import com.example.engram.db.daos.NoteDao
import com.example.engram.db.entities.Note
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;


@Database(entities = arrayOf(Note::class), version = 1)
abstract class EngramDatabase : RoomDatabase() {
    abstract fun noteDao(): NoteDao

    companion object {
        // Singleton prevents multiple instances of database opening at the
        // same time.
        @Volatile
        private var INSTANCE: EngramDatabase? = null

        fun getDatabase(context: Context): EngramDatabase {
            // if the INSTANCE is not null, then return it,
            // if it is, then create the database
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    EngramDatabase::class.java,
                    "engram"
                ).build()
                INSTANCE = instance
                // return instance
                instance
            }
        }
    }
}