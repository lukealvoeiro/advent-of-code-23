export class TrieNode {
  children: Record<string, TrieNode>;
  isWord: boolean;
  value: undefined | number;

  constructor() {
    this.children = {};
    this.isWord = false;
    this.value = undefined;
  }

  static populate(words: { [key: string]: number }) {
    const dictionary = new TrieNode();
    for (const word in words) {
      dictionary.addWord(word, words[word]);
    }
    return dictionary;
  }

  addWord(word: string, value: number) {
    let current: TrieNode = this;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isWord = true;
    current.value = value;
  }

  getWords() {
    let words: string[] = [];
    this.getWordsHelper(this, "", words);
    return words;
  }

  isValidWord(word: string) {
    let current: TrieNode = this;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!current.children[char]) {
        return false;
      }
      current = current.children[char];
    }
    return current.isWord;
  }

  getWordValue(word: string) {
    let current: TrieNode = this;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!current.children[char]) {
        return undefined;
      }
      current = current.children[char];
    }
    return current.value;
  }

  private getWordsHelper(node: TrieNode, word: string, words: string[]) {
    if (node.isWord) {
      words.push([word, node.value].join(", "));
    }
    for (const char in node.children) {
      this.getWordsHelper(node.children[char], word + char, words);
    }
  }
}
