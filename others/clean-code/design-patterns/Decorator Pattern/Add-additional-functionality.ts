interface TextEditor {
  write(text: string): void;
}

class ConcreteTextEditor implements TextEditor {
  write(text: string) {
    console.log(`Writing: ${text}`);
  }
}

class BoldDecorator implements TextEditor {
  constructor(private editor: TextEditor) {}

  write(text: string) {
    console.log(`Writing bold text: ${text}`);
    this.editor.write(text);
  }
}

const editor: TextEditor = new ConcreteTextEditor();
const boldEditor: TextEditor = new BoldDecorator(editor);

editor.write("Hello"); // Output: 'Writing: Hello'
boldEditor.write("Hello"); // Output: 'Writing bold text: Hello' followed by 'Writing: Hello'
