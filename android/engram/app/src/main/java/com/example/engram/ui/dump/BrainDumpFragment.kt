package com.example.engram.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.engram.databinding.FragmentBrainDumpBinding

class BrainDumpFragment : Fragment() {

    private lateinit var brainDumpViewModel: BrainDumpViewModel
    private var _binding: FragmentBrainDumpBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        brainDumpViewModel =
                ViewModelProvider(this).get(BrainDumpViewModel::class.java)

        _binding = FragmentBrainDumpBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val editText: EditText = binding.note

        val notes = arrayListOf<String>()

        val submitButton: Button = binding.submitButton
        submitButton.setOnClickListener {
            var body = editText.text.toString()
            notes.add(body)
            editText.setText("")
        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}