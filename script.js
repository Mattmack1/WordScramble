document.addEventListener("DOMContentLoaded", function() {
    let dictionary = []; // Assuming the dictionary words are stored as an array

    fetch('dictionary.txt')
    .then(response => response.text())
    .then(data => {
        dictionary = data.split("\n");
    });

    function generateRandomChars(length = 6) {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    class TrieNode {
        constructor() {
            this.children = {};
            this.isEndOfWord = false;
        }
    }
    
    class Trie {
        constructor() {
            this.root = new TrieNode();
        }
    
        // Insert a word into the Trie
        insert(word) {
            let node = this.root;
            for (let char of word) {
                if (!node.children[char]) {
                    node.children[char] = new TrieNode();
                }
                node = node.children[char];
            }
            node.isEndOfWord = true;
        }
    
        // Recursively search the Trie for possible words
        search(node, chars, currentWord, acceptedWords) {
            if (node.isEndOfWord) {
                acceptedWords.push(currentWord);
            }
    
            for (let i = 0; i < chars.length; i++) {
                const char = chars[i];
                if (node.children[char]) {
                    // Using the character and exploring further
                    const newChars = chars.slice(0, i) + chars.slice(i + 1);
                    this.search(node.children[char], newChars, currentWord + char, acceptedWords);
                }
            }
        }
    }
    
    const trie = new Trie();
    for (let word of dictionary) {
        trie.insert(word);
    }
    
    function getPossibleWords(chars) {
        let acceptedWords = [];
        trie.search(trie.root, chars, "", acceptedWords);
        return [...new Set(acceptedWords)]; // Remove duplicates
    }
    

    const input = document.getElementById("playerInput");
    input.addEventListener("keyup", function(event) {
        if(event.key === "Enter") {
            const enteredWord = input.value;
            // Logic to check if the word is in the possible words
            // And updating the UI accordingly
        }
    });

    // Initialization
    const lettersContainer = document.querySelector(".letters");
    const chars = generateRandomChars();
    lettersContainer.textContent = chars;

    const possibleWords = getPossibleWords(chars);
    console.log(possibleWords);
    const wordListContainer = document.querySelector(".wordList");
    possibleWords.forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "word";
        for(let i = 0; i < word.length; i++) {
            const boxDiv = document.createElement("div");
            boxDiv.className = "box";
            wordDiv.appendChild(boxDiv);
        }
        wordListContainer.appendChild(wordDiv);
    });
});
