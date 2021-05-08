package com.example.engram.ui.dump

import androidx.lifecycle.LiveData
import androidx.lifecycle.*
import com.example.engram.db.entities.Note
import com.example.engram.db.repositories.NoteRepository
import kotlinx.coroutines.launch

class BrainDumpViewModel(private val repository: NoteRepository) : ViewModel() {
    val allNotes: LiveData<List<Note>> = repository.allNotes.asLiveData()

    fun insert(note: Note) = viewModelScope.launch {
        repository.insert(note)
    }
}