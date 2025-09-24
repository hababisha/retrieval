
// console.log('hello world')
export class TrieNode{
    children : Record<string, TrieNode> 
    is_end : boolean

    constructor(){
        this.children = {}
        this.is_end = false
    }
}

export class Trie{
    root: TrieNode

    constructor(){
        this.root = new TrieNode()
    }

    insert(word: string){
        let node = this.root
        for (const c of word){
            if (!node.children[c]){
                node.children[c] = new TrieNode()
            }
            node = node.children[c]
        }
        node.is_end = true
    }

    searchPrefix(prefix: string): TrieNode | null {
        let node: TrieNode = this.root
        for (const c of prefix){
            if (!node.children[c]) return null
            node = node.children[c]
        }
        return node
    }

    collectWords(node: TrieNode, prefix: string, results: string[]){
        if (node.is_end) results.push(prefix)
        for (const c in node.children){
            this.collectWords(node.children[c], prefix + c, results)
        }
    }

    autocomplete(prefix: string): string[]{
        const node = this.searchPrefix(prefix)
        if (!node) return []
        const results: string[] = []
        this.collectWords(node, prefix, results)
        return results
    }

}