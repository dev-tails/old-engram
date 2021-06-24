import Foundation
import SwiftUI

struct CustomTextField: UIViewRepresentable {

    class Coordinator: NSObject, UITextFieldDelegate {

        var placeholder: String
        @Binding var text: String
        var onCommit:() -> Void
        var didBecomeFirstResponder = false
        
        @objc func handleEditingDidEnd() {
            onCommit();
        }

        init(text: Binding<String>, placeholder: String, onCommit: @escaping () -> Void) {
            _text = text
            self.placeholder = placeholder
            self.onCommit = onCommit
        }

        func textFieldDidChangeSelection(_ textField: UITextField) {
            text = textField.text ?? ""
        }
        
        func textFieldShouldReturn(_ textField: UITextField) -> Bool {
            if (text != "") {
                onCommit();
                return false
            }
            
            return true
        }

    }

    var placeholder: String
    @Binding var text: String
    var isFirstResponder: Bool = false

    
    let onCommit:() -> Void
    
    func makeUIView(context: UIViewRepresentableContext<CustomTextField>) -> UITextField {
        let textField = UITextField(frame: .zero)
        textField.delegate = context.coordinator
        textField.placeholder = placeholder
        textField.addTarget(self, action: #selector(context.coordinator.handleEditingDidEnd), for: .editingDidEndOnExit)
        textField.returnKeyType = .send
        textField.adjustsFontSizeToFitWidth = true
        return textField
    }

    func makeCoordinator() -> CustomTextField.Coordinator {
        return Coordinator(text: $text, placeholder: placeholder, onCommit: onCommit)
    }

    func updateUIView(_ uiView: UITextField, context: UIViewRepresentableContext<CustomTextField>) {
        uiView.text = text
        if isFirstResponder && !context.coordinator.didBecomeFirstResponder  {
            uiView.becomeFirstResponder()
            context.coordinator.didBecomeFirstResponder = true
        }
    }
}
