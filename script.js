document.addEventListener("DOMContentLoaded", function() {
    let dictionary = []; // Assuming the dictionary words are stored as an array

    fetch('dictionary.txt')
    .then(response => response.text())
    .then(data => {
        dictionary = data.split("\n");
    })
    .catch(error => {
        console.error("Error fetching dictionary:", error);
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
            // Inside the search function
            console.log("Current Word:", currentWord);

    
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
        console.log(word);
        trie.insert(word);
    }
    
    function getPossibleWords(chars) {
        let acceptedWords = [];
        trie.search(trie.root, chars, "", acceptedWords);
        console.log(acceptedWords);
        return [...new Set(acceptedWords)]; // Remove duplicates
    }
    

    const input = document.getElementById("playerInput");
    input.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            const enteredWord = input.value;
            
            // Get the possible words
            let possibleWords = getPossibleWords(chars); // Assuming `chars` contains your set of characters
    
            if (possibleWords.includes(enteredWord)) {
                // The word is correct!
                // Update the UI to reflect the correctly guessed word. 
                // This will be dependent on your exact HTML structure, 
                // but as an example, let's assume you have a div for displaying correct guesses:
    
                let correctWordsDiv = document.getElementById("correctWords");
                let wordElement = document.createElement("div");
                wordElement.innerText = enteredWord;
                correctWordsDiv.appendChild(wordElement);
    
                // Optionally: clear the input for the next word
                input.value = '';
            } else {
                // The word isn't in the list of possible words.
                // Provide feedback to the user. Maybe you have an alert box or an error message div:
    
                alert('The word is not valid or not possible from the given letters.'); 
                // or update a specific div with an error message if you want to avoid pop-up alerts.
            }
        }
    });
    

    // Initialization
    const lettersContainer = document.querySelector(".letters");
    const chars = generateRandomChars();
    lettersContainer.textContent = chars;

    console.log("testing");
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
